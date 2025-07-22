import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

export const useNuevaMuestra = (isVisible, orderData) => {
  const [selectedTipo, setSelectedTipo] = useState('');
  const [pedido, setPedido] = useState('');
  const [pacienteId, setPacienteId] = useState('');
  const [nombre, setNombre] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [loading, setLoading] = useState(false);

  // Función para determinar el tipo de muestra basado en el análisis
  const determinarTipoMuestra = (analisis) => {
    if (!analisis || analisis.length === 0) return '';
    
    // Si solo hay un análisis, devolver su tipo
    if (analisis.length === 1) {
      const nombreAnalisis = analisis[0].nombre;
      if (nombreAnalisis === 'Quimica Sanguinea') return 'Quimica Sanguinea';
      if (nombreAnalisis === 'Biometria Hematica') return 'Biometria Hematica';
      return nombreAnalisis;
    }
    
    // Si hay múltiples análisis, priorizar según algún criterio
    // Por ejemplo, si hay Química Sanguínea, priorizarla
    const tieneQuimica = analisis.some(a => a.nombre === 'Quimica Sanguinea');
    const tieneBiometria = analisis.some(a => a.nombre === 'Biometria Hematica');
    
    if (tieneQuimica && tieneBiometria) {
      // Si tiene ambos, usar Química Sanguínea por defecto
      return 'Quimica Sanguinea';
    }
    
    if (tieneQuimica) return 'Quimica Sanguinea';
    if (tieneBiometria) return 'Biometria Hematica';
    
    // Si no hay ninguno de los dos tipos conocidos, usar el primero
    return analisis[0].nombre;
  };

  // Función para llenar campos automáticamente basado en orderData
  const llenarCamposAutomaticamente = (orderData) => {
    if (!orderData) {
      console.log('⚠️ useNuevaMuestra: No hay orderData disponible');
      return;
    }

    console.log('📋 useNuevaMuestra: Llenando campos automáticamente con orderData:', orderData);

    // Determinar tipo de muestra basado en el análisis
    const tipoMuestra = determinarTipoMuestra(orderData.analisis);
    console.log('🔬 useNuevaMuestra: Tipo de muestra determinado:', tipoMuestra);
    setSelectedTipo(tipoMuestra);
    
    // Llenar pedido ID
    const pedidoId = orderData._id || '';
    console.log('🆔 useNuevaMuestra: Pedido ID:', pedidoId);
    setPedido(pedidoId);
    
    // Diagnosticar información del usuario
    console.log('👤 useNuevaMuestra: Información del usuario completa:', orderData.usuarioId);
    
    // Llenar paciente ID
    const pacienteIdValue = orderData.usuarioId?._id || '';
    console.log('🆔 useNuevaMuestra: Paciente ID:', pacienteIdValue);
    setPacienteId(pacienteIdValue);
    
    // Llenar nombre del paciente - intentar múltiples formas
    let nombrePaciente = '';
    if (orderData.usuarioId) {
      if (orderData.usuarioId.nombre) {
        nombrePaciente = orderData.usuarioId.nombre;
      } else if (orderData.clientInfo) {
        nombrePaciente = orderData.clientInfo;
      }
    }
    
    console.log('👤 useNuevaMuestra: Nombre del paciente:', nombrePaciente);
    setNombre(nombrePaciente);
    
    // Limpiar observaciones
    setObservaciones('');
    
    // Logs de resumen
    console.log('✅ useNuevaMuestra: Campos llenados:', {
      tipoMuestra,
      pedidoId,
      pacienteIdValue,
      nombrePaciente,
      hasUsuarioId: !!orderData.usuarioId,
      usuarioIdKeys: orderData.usuarioId ? Object.keys(orderData.usuarioId) : 'N/A'
    });
  };

  // Función para limpiar todos los campos
  const limpiarCampos = () => {
    console.log('🧹 Limpiando campos del formulario');
    setSelectedTipo('');
    setPedido('');
    setPacienteId('');
    setNombre('');
    setObservaciones('');
  };

  // Función para validar el formulario
  const validarFormulario = () => {
    if (!selectedTipo) {
      Alert.alert('Error', 'Por favor, selecciona un tipo de muestra');
      return false;
    }
    
    if (!pedido || !pacienteId || !nombre) {
      Alert.alert('Error', 'Faltan datos del pedido o paciente');
      return false;
    }

    return true;
  };

  // Función para mapear tipo de muestra al formato del backend
  const mapearTipoMuestra = (tipo) => {
    const tipoMuestraMap = {
      'Quimica Sanguinea': 'quimicaSanguinea',
      'Biometria Hematica': 'biometriaHematica',
      'quimicaSanguinea': 'quimicaSanguinea',
      'biometriaHematica': 'biometriaHematica'
    };

    return tipoMuestraMap[tipo] || tipo;
  };

  // Función principal para enviar la muestra
  const enviarMuestra = async (onSubmit, onClose) => {
    console.log('📤 Iniciando envío de muestra...');

    // Validar formulario
    if (!validarFormulario()) {
      return false;
    }

    setLoading(true);

    try {
      // Obtener el token del AsyncStorage
      const token = await AsyncStorage.getItem('userToken');
      
      console.log('🔐 Token obtenido:', token ? 'Token presente' : 'No hay token');
      
      if (!token) {
        Alert.alert('Error', 'No se encontró token de autenticación');
        setLoading(false);
        return false;
      }

      const tipoMuestraBackend = mapearTipoMuestra(selectedTipo);

      // Preparar los datos para enviar al backend
      const muestraData = {
        observaciones: observaciones || '',
        nombrePaciente: nombre,
        idusuario: pacienteId,
        tipoMuestra: tipoMuestraBackend,
        pedidoId: pedido
      };

      console.log('📋 Datos de muestra a enviar:', {
        ...muestraData,
        tipoMuestraOriginal: selectedTipo,
        tipoMuestraBackend
      });

      // Enviar petición al backend
      const response = await fetch(`${API_URL}/muestras`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(muestraData),
      });

      console.log('📊 Respuesta del servidor:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('✅ Muestra registrada exitosamente:', responseData);
        
        Alert.alert('Éxito', 'Muestra registrada correctamente');
        
        // Llamar al callback original si existe
        if (onSubmit) {
          onSubmit({ 
            selectedTipo, 
            pedido, 
            pacienteId, 
            nombre, 
            observaciones,
            responseData 
          });
        }
        
        // Cerrar modal
        if (onClose) {
          onClose();
        }

        return true;
      } else {
        const errorData = await response.text();
        console.error(' Error response:', errorData);
        Alert.alert('Error', 'Error al registrar la muestra. Intenta de nuevo.');
        return false;
      }
    } catch (error) {
      console.error(' Error al enviar muestra:', error);
      Alert.alert('Error', 'Error de conexión. Intenta de nuevo.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Efecto para llenar los campos cuando se reciben datos del pedido
  useEffect(() => {
    if (orderData && isVisible) {
      llenarCamposAutomaticamente(orderData);
    }
  }, [orderData, isVisible]);

  // Limpiar campos cuando se cierra el modal
  useEffect(() => {
    if (!isVisible) {
      limpiarCampos();
    }
  }, [isVisible]);

  return {
    // Estado
    selectedTipo,
    pedido,
    pacienteId,
    nombre,
    observaciones,
    loading,
    
    // Setters
    setSelectedTipo,
    setPedido,
    setPacienteId,
    setNombre,
    setObservaciones,
    
    // Funciones
    enviarMuestra,
    limpiarCampos,
    llenarCamposAutomaticamente,
    validarFormulario,
    determinarTipoMuestra,
    mapearTipoMuestra,
  };
};
