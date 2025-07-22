import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useInfoPaciente = () => {
  const [userInfo, setUserInfo] = useState({
    nombreCompleto: 'Cargando...',
    email: 'Cargando...',
    fechaNacimiento: 'Cargando...'
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUserInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Obtener datos del usuario desde AsyncStorage
      const userData = await AsyncStorage.getItem('userData');
      
      if (userData) {
        const user = JSON.parse(userData);
        const nombreCompleto = `${user.nombre || ''} ${user.apellidoPaterno || ''} ${user.apellidoMaterno || ''}`.trim();
        
        setUserInfo({
          nombreCompleto: nombreCompleto || 'Usuario',
          email: user.email || user.correo || 'Sin email',
          fechaNacimiento: user.fechaNacimiento ? 
            new Date(user.fechaNacimiento).toLocaleDateString('es-ES') : 
            'Sin fecha'
        });
      } else {
        setUserInfo({
          nombreCompleto: 'Usuario no encontrado',
          email: 'Sin email',
          fechaNacimiento: 'Sin fecha'
        });
      }
    } catch (error) {
      console.error('Error al cargar información del usuario:', error);
      setError('Error al cargar información del usuario');
      setUserInfo({
        nombreCompleto: 'Error al cargar',
        email: 'Error al cargar',
        fechaNacimiento: 'Error al cargar'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserInfo();
  }, []);

  // Función para refrescar los datos del usuario
  const refreshUserInfo = async () => {
    await loadUserInfo();
  };

  return {
    userInfo,
    loading,
    error,
    refreshUserInfo
  };
};
