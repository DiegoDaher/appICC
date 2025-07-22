import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

export const useMuestrasPaciente = () => {
  const [muestras, setMuestras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMuestrasUsuario = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      
      const token = await AsyncStorage.getItem('userToken');
      const userData = await AsyncStorage.getItem('userData');
      
      if (!token || !userData) {
        setError('No se encontró información de autenticación');
        setLoading(false);
        return;
      }

      const user = JSON.parse(userData);
      const usuarioId = user._id || user.id;

      if (!usuarioId) {
        setError('No se encontró ID de usuario');
        setLoading(false);
        return;
      }

      console.log('🔍 Obteniendo muestras para usuario:', usuarioId);

      const response = await fetch(`${API_URL}/muestras/usuario/${usuarioId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Filtrar solo las muestras que deben mostrarse al cliente y que estén activas
        const muestrasVisibles = data.muestras?.filter(muestra => 
          muestra.statusShowClient === true && muestra.status === true
        ) || [];
        
        console.log('🔍 Muestras filtradas (statusShowClient: true, status: true):', muestrasVisibles.length, 'de', data.muestras?.length || 0);
        setMuestras(muestrasVisibles);
        console.log('✅ Muestras del usuario cargadas:', muestrasVisibles.length);
      } else {
        setError(`Error del servidor: ${response.status}`);
        console.error('❌ Error al obtener muestras del usuario:', response.status);
      }
    } catch (error) {
      setError('Error de conexión al obtener las muestras');
      console.error('❌ Error al obtener muestras del usuario:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMuestrasUsuario();
  }, [fetchMuestrasUsuario]);

  const handleRetry = useCallback(() => {
    console.log('🔄 Reintentando cargar muestras del paciente...');
    fetchMuestrasUsuario();
  }, [fetchMuestrasUsuario]);

  return {
    muestras,
    loading,
    error,
    handleRetry,
    refreshMuestras: fetchMuestrasUsuario,
  };
};
