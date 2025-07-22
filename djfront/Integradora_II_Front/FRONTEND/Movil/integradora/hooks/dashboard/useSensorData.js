import { useState, useEffect } from 'react';
import { fetchWithAuth } from '../../utils/apiInterceptor';
import { API_URL } from '@env';

export const useSensorData = () => {
  const [ldrData, setLdrData] = useState(null);
  const [tempData, setTempData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSensorData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch LDR data usando el interceptor
      const ldrResponse = await fetchWithAuth(`${API_URL}/ldr/lightControl_001`, {
        method: 'GET',
      });

      if (ldrResponse.ok) {
        const ldrResult = await ldrResponse.json();
        setLdrData(ldrResult);
        console.log('✅ Datos LDR obtenidos:', ldrResult);
      } else if (ldrResponse.status === 401) {
        // El error 401 ya fue manejado por el interceptor
        console.log('🚫 Sesión expirada detectada en LDR');
        return;
      } else {
        console.error(' Error al obtener datos LDR:', ldrResponse.status);
        setError(`Error LDR: ${ldrResponse.status}`);
      }

      // Fetch Temperature and Humidity data usando el interceptor
      const tempResponse = await fetchWithAuth(`${API_URL}/tempwet/tempWetController_001`, {
        method: 'GET',
      });

      if (tempResponse.ok) {
        const tempResult = await tempResponse.json();
        // Si el resultado es un array, tomar el primer elemento (más reciente)
        const tempDataProcessed = Array.isArray(tempResult) && tempResult.length > 0 
          ? tempResult[0] 
          : tempResult;
        setTempData(tempDataProcessed);
        console.log('✅ Datos de temperatura obtenidos:', tempDataProcessed);
        console.log('📊 Datos originales recibidos:', tempResult);
      } else if (tempResponse.status === 401) {
        // El error 401 ya fue manejado por el interceptor
        console.log('🚫 Sesión expirada detectada en temperatura');
        return;
      } else {
        console.error(' Error al obtener datos de temperatura:', tempResponse.status);
        setError(`Error Temperatura: ${tempResponse.status}`);
      }

    } catch (error) {
      console.error(' Error al obtener datos de sensores:', error);
      setError('Error de conexión con los sensores');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSensorData();
    
    // Actualizar datos cada 30 segundos
    const interval = setInterval(fetchSensorData, 30000);

    return () => clearInterval(interval);
  }, []);

  const refreshData = () => {
    fetchSensorData();
  };

  return {
    ldrData,
    tempData,
    loading,
    error,
    refreshData,
  };
};
