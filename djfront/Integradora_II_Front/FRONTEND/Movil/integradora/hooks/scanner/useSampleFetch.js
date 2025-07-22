import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

export const useSampleFetch = () => {
  const [currentSample, setCurrentSample] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSampleById = useCallback(async (sampleId) => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('userToken');
      
      if (!token) {
        Alert.alert('Error', 'No se encontró token de autenticación');
        return;
      }

      console.log(`🔍 Buscando muestra con ID: ${sampleId}`);
      console.log(`📡 Endpoint: ${API_URL}/muestras/detalle/${sampleId}`);

      const response = await fetch(`${API_URL}/muestras/detalle/${sampleId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      // Obtener el texto de la respuesta para debuggear
      const responseText = await response.text();

      if (response.ok) {
        // Intentar parsear el JSON solo si hay contenido
        if (responseText && responseText.trim() !== '') {
          try {
            const data = JSON.parse(responseText);
            setCurrentSample(data.muestra || data);
            return data.muestra || data;
          } catch (parseError) {   
            console.error('Error al parsear JSON:', parseError);
            Alert.alert('Error', 'Respuesta del servidor inválida');
            return null;
          }
        } else {
          console.error('Respuesta vacía del servidor');
          Alert.alert('Error', 'El servidor devolvió una respuesta vacía');
          return null;
        }
      } else {
        // Manejar errores HTTP
        let errorMessage = `Error ${response.status}: ${response.statusText}`;
        
        if (response.status === 405) {
          errorMessage = 'Método no permitido. Verificar endpoint de la API.';
        } else if (response.status === 404) {
          errorMessage = 'Muestra no encontrada';
        } else if (response.status === 401) {
          errorMessage = 'Token de autenticación inválido';
        }

        // Intentar obtener más detalles del error si hay contenido
        if (responseText && responseText.trim() !== '') {
          try {
            const errorData = JSON.parse(responseText);
            errorMessage = errorData.message || errorMessage;
            console.error('Error del servidor:', errorData);
          } catch {
            console.error('Respuesta de error no es JSON válido:', responseText);
          }
        }
        
        Alert.alert('Error', errorMessage);
        console.error('Error al buscar muestra - Status:', response.status);
        return null;
      }
    } catch (error) {
      Alert.alert('Error', 'Error de conexión al buscar la muestra');
      console.error('Error de conexión al buscar muestra:', error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearCurrentSample = useCallback(() => {
    setCurrentSample(null);
  }, []);

  return {
    currentSample,
    loading,
    fetchSampleById,
    clearCurrentSample
  };
};
