import { useCallback } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

export const useEmailPaciente = () => {
  const handleSendEmail = useCallback(async (sample) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      
      if (!token) {
        Alert.alert('Error', 'No se encontró token de autenticación');
        return;
      }

      console.log(`📧 Enviando resultados por correo para muestra: ${sample._id}`);
      
      const response = await fetch(`${API_URL}/muestras/resultados/enviar/${sample._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Verificar si los resultados estaban listos
        if (sample.status === true) {
          Alert.alert(
            'Éxito', 
            'Resultados enviados a correo electrónico',
            [{ text: 'OK' }]
          );
        } else {
          Alert.alert(
            'Información', 
            'Resultados aún se encuentran no disponibles',
            [{ text: 'OK' }]
          );
        }
      } else {
        console.error('Error al enviar correo - Status:', response.status);
        Alert.alert(
          'Error', 
          'No se pudo enviar el correo. Intenta nuevamente.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error enviando correo:', error);
      Alert.alert(
        'Error', 
        'Error de conexión al enviar correo',
        [{ text: 'OK' }]
      );
    }
  }, []);

  return {
    handleSendEmail
  };
};
