import { Alert } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Realizar login con credenciales
  const login = async (correo, contraseña, onSuccess) => {
    try {
      setIsLoading(true);
      setErrorMessage(''); // Limpiar errores previos
      const credentials = { correo, contraseña };

      // Para login no usamos fetchWithAuth porque es la primera petición sin token
      const response = await fetch(`${API_URL}/usuarios/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.status === 401) {
        setErrorMessage('Correo o contraseña incorrectos. Intente de nuevo');
        return;
      }

      if (response.ok) {
        const responseData = await response.json();
        
        if (responseData.login === 'successful' && responseData.usuario) {
          // Guardar datos en AsyncStorage
          await AsyncStorage.setItem('userToken', responseData.token);
          await AsyncStorage.setItem('userData', JSON.stringify(responseData.usuario));
          
          setErrorMessage(''); // Limpiar errores en caso de éxito
          Alert.alert('Éxito', 'Inicio de sesión exitoso');
          
          // Ejecutar callback de éxito
          if (onSuccess) {
            onSuccess();
          }
        } else {
          const errorMessage = responseData?.message || 'Correo o contraseña incorrectos. Intente de nuevo';
          setErrorMessage(errorMessage);
        }
      } else {
        setErrorMessage('Error en el servidor. Intenta de nuevo.');
      }
    } catch (error) {
      setErrorMessage('Algo salió mal. Por favor, intenta de nuevo.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    errorMessage,
    clearError: () => setErrorMessage('')
  };
};

export default useAuth;
