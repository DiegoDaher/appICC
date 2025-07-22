import { useState, useEffect, useRef, useCallback } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

/**
 * Hook principal para manejar la lógica completa del formulario de editar perfil
 * Gestiona el estado del formulario, validaciones, y envío de datos
 */
export const useEditarPerfil = (onSave, onClose) => {
  // Estados principales del formulario
  const [formData, setFormData] = useState({
    email: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentUserData, setCurrentUserData] = useState(null);

  // Estados para validación en tiempo real
  const [validationStatus, setValidationStatus] = useState({
    email: { isValid: null, message: '' },
    oldPassword: { isValid: null, message: '' },
    newPassword: { isValid: null, message: '' },
    confirmPassword: { isValid: null, message: '' }
  });

  const [isValidating, setIsValidating] = useState({});
  const debounceTimers = useRef({});

  // Regex para validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Cargar datos del usuario actual
  useEffect(() => {
    const loadCurrentUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const user = JSON.parse(userData);
          setCurrentUserData(user);
          // Pre-cargar el email actual
          setFormData(prev => ({
            ...prev,
            email: user.correo || user.email || ''
          }));
        }
      } catch (error) {
        console.error('Error al cargar datos del usuario:', error);
      }
    };

    loadCurrentUserData();
  }, []);

  // Limpiar timers al desmontar el componente
  useEffect(() => {
    return () => {
      Object.values(debounceTimers.current).forEach(timer => {
        if (timer) clearTimeout(timer);
      });
    };
  }, []);

  // Función para validar email
  const validateEmail = useCallback(async (email) => {
    if (!email) return '';
    
    if (!emailRegex.test(email)) {
      return 'El formato del email no es válido';
    }

    // Verificar si el email ya está en uso por otro usuario
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) return 'No se encontró token de autenticación';

      const response = await fetch(`${API_URL}/usuarios/check-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ correo: email, currentUserId: currentUserData?._id }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.exists) {
          return 'Este email ya está en uso por otro usuario';
        }
      }
    } catch (error) {
      return 'Error al verificar la disponibilidad del email ', error;
    }

    return '';
  }, [currentUserData, emailRegex]);

  // Función para validar contraseña
  const validatePassword = useCallback((password) => {
    if (!password) return '';
    
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      numbers: /\d/.test(password),
      symbols: /[@#$!%*?&]/.test(password)
    };

    const allValid = Object.values(checks).every(check => check);
    
    if (!allValid) {
      return { checks, isValid: false };
    }
    
    return '';
  }, []);

  // Función para validar un campo en tiempo real
  const validateFieldRealTime = useCallback(async (field, value) => {
    try {
      setIsValidating(prev => ({ ...prev, [field]: true }));
      let isValid = false;
      let message = '';

      switch (field) {
        case 'email':
          if (value && value !== currentUserData?.correo) {
            const emailError = await validateEmail(value);
            isValid = !emailError;
            message = emailError || 'Email válido ✓';
          } else {
            isValid = true;
            message = 'Email sin cambios';
          }
          break;

        case 'oldPassword':
          if (value) {
            // Solo validar que no esté vacío
            // La validación real se hará en el backend
            isValid = true;
            message = 'Contraseña ingresada ✓';
          }
          break;

        case 'newPassword':
          if (value) {
            const passwordError = validatePassword(value);
            if (passwordError && typeof passwordError === 'object') {
              // Es un objeto con checks, así que la contraseña no es válida aún
              isValid = false;
              message = 'Completa todos los requisitos de contraseña';
            } else if (passwordError) {
              // Es un string de error
              isValid = false;
              message = passwordError;
            } else {
              // No hay error, contraseña válida
              isValid = true;
              message = 'Nueva contraseña válida ✓';
            }
            
            // Si hay confirmación de contraseña, re-validarla
            if (formData.confirmPassword) {
              setTimeout(() => validateFieldRealTime('confirmPassword', formData.confirmPassword), 100);
            }
          }
          break;

        case 'confirmPassword':
          if (value) {
            isValid = value === formData.newPassword;
            message = isValid ? 'Las contraseñas coinciden ✓' : 'Las contraseñas no coinciden';
          }
          break;

        default:
          break;
      }

      setValidationStatus(prev => ({
        ...prev,
        [field]: { isValid, message }
      }));

    } catch (error) {
      console.error(`Error en validación de ${field}:`, error);
      setValidationStatus(prev => ({
        ...prev,
        [field]: { isValid: false, message: 'Error en validación' }
      }));
    } finally {
      setIsValidating(prev => ({ ...prev, [field]: false }));
    }
  }, [formData.newPassword, formData.confirmPassword, currentUserData, validateEmail, validatePassword]);

  // Función para manejar cambios en los inputs
  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpiar errores de validación en tiempo real
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }

    // Limpiar timer anterior si existe
    if (debounceTimers.current[field]) {
      clearTimeout(debounceTimers.current[field]);
    }

    // Reset validation status mientras el usuario está escribiendo
    setValidationStatus(prev => ({
      ...prev,
      [field]: { isValid: null, message: '' }
    }));

    // Solo validar si el campo no está vacío
    if (value.trim()) {
      setIsValidating(prev => ({ ...prev, [field]: true }));
      
      // Establecer nuevo timer de 2 segundos
      debounceTimers.current[field] = setTimeout(() => {
        validateFieldRealTime(field, value);
      }, 2000);
    } else {
      // Si el campo está vacío, limpiar validación
      setValidationStatus(prev => ({
        ...prev,
        [field]: { isValid: null, message: '' }
      }));
      setIsValidating(prev => ({ ...prev, [field]: false }));
    }
  }, [validationErrors, validateFieldRealTime]);

  // Función para guardar los cambios
  const handleSave = useCallback(async () => {
    const errors = {};
    setLoading(true);

    try {
      // Validar email si se proporcionó
      if (formData.email && formData.email !== currentUserData?.correo) {
        const emailError = await validateEmail(formData.email);
        if (emailError) {
          errors.email = emailError;
        }
      }

      // Validar contraseñas si se va a cambiar
      const isChangingPassword = formData.oldPassword || formData.newPassword || formData.confirmPassword;
      
      if (isChangingPassword) {
        // Todos los campos de contraseña son obligatorios
        if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
          Alert.alert('Error', 'Todos los campos de contraseña son obligatorios para cambiar la contraseña');
          setLoading(false);
          return;
        }

        // Validar nueva contraseña
        const newPasswordError = validatePassword(formData.newPassword);
        if (newPasswordError) {
          if (typeof newPasswordError === 'object') {
            errors.newPassword = 'La contraseña no cumple con todos los requisitos';
          } else {
            errors.newPassword = newPasswordError;
          }
        }

        // Validar que las contraseñas coincidan
        if (formData.newPassword !== formData.confirmPassword) {
          errors.confirmPassword = 'Las contraseñas nuevas no coinciden';
        }
      }

      // Si hay errores de validación, mostrarlos
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        const firstError = Object.values(errors)[0];
        Alert.alert('Error de validación', firstError);
        setLoading(false);
        return;
      }

      // Si llegamos aquí, todas las validaciones pasaron
      // Proceder con el envío al servidor
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Error', 'No se encontró token de autenticación');
        setLoading(false);
        return;
      }

      const userId = currentUserData?._id;
      if (!userId) {
        Alert.alert('Error', 'No se encontró ID de usuario');
        setLoading(false);
        return;
      }

      // Preparar datos para enviar
      const updateData = {};
      
      if (formData.email && formData.email !== currentUserData?.correo) {
        updateData.correo = formData.email;
      }
      
      if (isChangingPassword) {
        updateData.anteriorContraseña = formData.oldPassword;
        updateData.contraseña = formData.newPassword;
      }

      // Si no hay cambios, no enviar nada
      if (Object.keys(updateData).length === 0) {
        Alert.alert('Información', 'No se han realizado cambios');
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/usuarios/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        Alert.alert('Éxito', 'Perfil actualizado correctamente');
        
        // Actualizar datos en AsyncStorage si el email cambió
        if (updateData.correo) {
          const updatedUserData = { ...currentUserData, correo: updateData.correo };
          await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
        }
        
        if (onSave) {
          onSave(formData);
        }
        
        if (onClose) {
          onClose();
        }
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || 'Error al actualizar el perfil';
        console.error('Error del servidor:', errorData);
        
        // Manejar errores específicos
        if (errorMessage.includes('Credenciales incorrectas')) {
          setValidationErrors(prev => ({
            ...prev,
            oldPassword: 'La contraseña anterior no es correcta'
          }));
          Alert.alert('Error', 'La contraseña anterior no es correcta');
        } else if (errorMessage.includes('correo ya está registrado')) {
          setValidationErrors(prev => ({
            ...prev,
            email: 'Este email ya está en uso por otro usuario'
          }));
          Alert.alert('Error', 'Este email ya está en uso por otro usuario');
        } else {
          Alert.alert('Error del servidor', errorMessage);
        }
      }
    } catch (error) {
      console.error(' Error al actualizar perfil:', error);
      Alert.alert('Error', 'Error de conexión al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  }, [formData, currentUserData, validateEmail, validatePassword, onSave, onClose]);

  // Función para cancelar y limpiar el formulario
  const handleCancel = useCallback(() => {
    // Limpiar el formulario al cancelar
    setFormData({
      email: '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    
    // Limpiar validaciones
    setValidationStatus({
      email: { isValid: null, message: '' },
      oldPassword: { isValid: null, message: '' },
      newPassword: { isValid: null, message: '' },
      confirmPassword: { isValid: null, message: '' }
    });
    
    // Limpiar errores
    setValidationErrors({});
    
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  return {
    // Estados del formulario
    formData,
    validationErrors,
    loading,
    currentUserData,
    validationStatus,
    isValidating,
    
    // Funciones de manejo
    handleInputChange,
    handleSave,
    handleCancel,
    
    // Utilidades de validación
    validatePassword,
  };
};
