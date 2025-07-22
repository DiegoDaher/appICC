import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { fetchWithAuth } from '../../../utils/apiInterceptor';
import { API_URL } from '@env';

export const useMuestras = () => {
  const [muestras, setMuestras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchMuestras = async (isRefreshing = false) => {
    try {
      if (!isRefreshing) setLoading(true);
      setError(null);
      
      console.log('� Obteniendo muestras con fetchWithAuth...');

      // ✅ ANTES: Verificación manual de token + headers manuales
      // ✅ AHORA: fetchWithAuth maneja todo automáticamente
      const response = await fetchWithAuth(`${API_URL}/muestras`, {
        method: 'GET'
        // ✅ No necesitas headers manuales - fetchWithAuth los agrega automáticamente
      });

      console.log('📊 Respuesta recibida:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });

      if (response.status === 401) {
        // ✅ El error 401 ya fue manejado automáticamente por fetchWithAuth
        console.log('🚫 Sesión expirada detectada - usuario redirigido automáticamente');
        if (!isRefreshing) setLoading(false);
        return;
      }

      if (response.ok) {
        const data = await response.json();
        
        // Verificar si la respuesta tiene la estructura esperada
        if (data && data.muestrasList && Array.isArray(data.muestrasList)) {
          // Filtrar solo las muestras con status: true
          const muestrasActivas = data.muestrasList.filter(muestra => muestra.status === true);
          console.log('🔍 Muestras filtradas (status: true):', muestrasActivas.length, 'de', data.muestrasList.length);
          setMuestras(muestrasActivas);
        } else {
          const errorMsg = 'La respuesta del servidor no tiene el formato esperado';
          setError(errorMsg);
          Alert.alert('Error', errorMsg);
        }
      } else {
        const errorMsg = `Error al obtener muestras: ${response.status} - ${response.statusText}`;
        setError(errorMsg);
        Alert.alert('Error', errorMsg);
      }
    } catch (error) {
      console.error(' Error completo:', error);
      console.error(' Error name:', error.name);
      console.error(' Error message:', error.message);
      console.error(' Error stack:', error.stack);
      
      let errorMsg = `Error de conexión: ${error.message}`;
      
      if (error.name === 'TypeError' && error.message.includes('Network request failed')) {
        errorMsg = 'No se pudo conectar con el servidor. Verifica tu conexión a internet.';
        Alert.alert('Error de red', errorMsg);
      } else if (error.name === 'SyntaxError') {
        errorMsg = 'La respuesta del servidor no es válida.';
        Alert.alert('Error de formato', errorMsg);
      } else {
        Alert.alert('Error', errorMsg);
      }
      
      setError(errorMsg);
    } finally {
      if (!isRefreshing) setLoading(false);
      if (isRefreshing) setRefreshing(false);
    }
  };

  const deleteMuestra = async (muestraId) => {
    try {
      console.log(`🗑️ Eliminando muestra con ID: ${muestraId}`);

      // ✅ ANTES: Verificación manual de token + headers manuales
      // ✅ AHORA: fetchWithAuth maneja todo automáticamente
      const response = await fetchWithAuth(`${API_URL}/muestras/${muestraId}`, {
        method: 'DELETE'
        // ✅ No necesitas headers manuales
      });

      if (response.status === 401) {
        // ✅ Error 401 manejado automáticamente
        console.log('🚫 Sesión expirada al eliminar muestra');
        return false;
      }

      if (response.ok) {
        // Remover la muestra del estado local
        setMuestras(prevMuestras => prevMuestras.filter(muestra => muestra._id !== muestraId));
        return true;
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || 'Error al eliminar la muestra';
        console.error(' Error del servidor:', errorData);
        Alert.alert('Error del servidor', errorMessage);
        return false;
      }
    } catch (error) {
      console.error(' Error al eliminar muestra:', error);
      Alert.alert('Error', 'Error de conexión al eliminar la muestra');
      return false;
    }
  };

  const updateMuestraStatus = async (muestraId, nuevoStatus) => {
    try {
      console.log(`🔄 Actualizando status de muestra ${muestraId} a: ${nuevoStatus}`);

      // ✅ ANTES: Verificación manual de token + headers manuales
      // ✅ AHORA: fetchWithAuth maneja todo automáticamente
      const response = await fetchWithAuth(`${API_URL}/muestras/${muestraId}`, {
        method: 'PUT',
        body: JSON.stringify({
          status: nuevoStatus
        })
        // ✅ Headers agregados automáticamente por fetchWithAuth
      });

      if (response.status === 401) {
        // ✅ Error 401 manejado automáticamente
        console.log('🚫 Sesión expirada al actualizar muestra');
        return false;
      }

      if (response.ok) {
        // Actualizar la muestra en el estado local
        setMuestras(prevMuestras => 
          prevMuestras.map(muestra => 
            muestra._id === muestraId 
              ? { ...muestra, status: nuevoStatus }
              : muestra
          )
        );
        return true;
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || 'Error al actualizar el status de la muestra';
        console.error(' Error del servidor:', errorData);
        Alert.alert('Error del servidor', errorMessage);
        return false;
      }
    } catch (error) {
      console.error(' Error al actualizar muestra:', error);
      Alert.alert('Error', 'Error de conexión al actualizar la muestra');
      return false;
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchMuestras(true);
  };

  // Cargar muestras al montar el componente
  useEffect(() => {
    fetchMuestras();
  }, []);

  return {
    muestras,
    loading,
    refreshing,
    error,
    fetchMuestras,
    deleteMuestra,
    updateMuestraStatus,
    onRefresh,
  };
};
