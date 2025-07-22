import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

export const usePedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchPedidos = async (isRefreshing = false) => {
    try {
      if (!isRefreshing) setLoading(true);
      setError(null);
      
      const token = await AsyncStorage.getItem('userToken');
      
      console.log('🔐 Token obtenido:', token ? 'Token presente' : 'No hay token');
      
      if (!token) {
        const errorMsg = 'No se encontró token de autenticación';
        setError(errorMsg);
        Alert.alert('Error', errorMsg);
        if (!isRefreshing) setLoading(false);
        return;
      }

      console.log('📡 Solicitando pedidos...');
      const response = await fetch(`${API_URL}/pedidos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('📊 Respuesta recibida:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('✅ Respuesta completa:', responseData);
        
        // Verificar si la respuesta tiene la estructura esperada
        if (responseData.success && responseData.data && Array.isArray(responseData.data)) {
          console.log('📋 Datos recibidos:', responseData.data);
          console.log('📊 Número de pedidos:', responseData.data.length);
          console.log('🔢 Count del servidor:', responseData.count);
          
          // Verificar la estructura de cada pedido
          responseData.data.forEach((pedido, index) => {
            console.log(`📦 Pedido ${index + 1}:`, {
              id: pedido._id,
              estado: pedido.estado,
              usuarioId: pedido.usuarioId,
              analisis: pedido.analisis,
              total: pedido.total,
              fechaCreacion: pedido.fechaCreacion,
              status: pedido.status
            });
          });
          //Alguien aqui estuvo moviendo codigo a lo menso (revisarlo plox)
          console.log('🔍 Diego Diaz estuvi aqui :)');
          // Filtrar solo los pedidos con status: true
          const pedidosActivos = responseData.data.filter(pedido => pedido.status === true);
          console.log('🔍 Pedidos filtrados (status: true):', pedidosActivos.length, 'de', responseData.data.length);
          
          setPedidos(pedidosActivos);
        } else {
          console.error(' Estructura de respuesta inesperada:', responseData);
          const errorMsg = 'La respuesta del servidor no tiene el formato esperado';
          setError(errorMsg);
          Alert.alert('Error', errorMsg);
        }
      } else {
        const errorData = await response.text();
        console.error(' Error response:', errorData);
        const errorMsg = `Error al obtener pedidos: ${response.status} - ${response.statusText}`;
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

  const deletePedido = async (pedidoId) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Error', 'No se encontró token de autenticación');
        return false;
      }

      console.log(`🗑️ Eliminando pedido con ID: ${pedidoId}`);

      const response = await fetch(`${API_URL}/pedidos/${pedidoId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('✅ Pedido eliminado exitosamente');
        // Remover el pedido del estado local
        setPedidos(prevPedidos => prevPedidos.filter(pedido => pedido._id !== pedidoId));
        return true;
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || 'Error al eliminar el pedido';
        console.error(' Error del servidor:', errorData);
        Alert.alert('Error del servidor', errorMessage);
        return false;
      }
    } catch (error) {
      console.error(' Error al eliminar pedido:', error);
      Alert.alert('Error', 'Error de conexión al eliminar el pedido');
      return false;
    }
  };

  const updatePedidoEstado = async (pedidoId, nuevoEstado) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Error', 'No se encontró token de autenticación');
        return false;
      }

      console.log(`🔄 Actualizando pedido ${pedidoId} a estado: ${nuevoEstado}`);

      const response = await fetch(`${API_URL}/pedidos/${pedidoId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          estado: nuevoEstado
        }),
      });

      if (response.ok) {
        console.log('✅ Estado del pedido actualizado exitosamente');
        // Actualizar el pedido en el estado local
        setPedidos(prevPedidos => 
          prevPedidos.map(pedido => 
            pedido._id === pedidoId 
              ? { ...pedido, estado: nuevoEstado }
              : pedido
          )
        );
        return true;
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || 'Error al actualizar el estado del pedido';
        console.error(' Error del servidor:', errorData);
        Alert.alert('Error del servidor', errorMessage);
        return false;
      }
    } catch (error) {
      console.error(' Error al actualizar pedido:', error);
      Alert.alert('Error', 'Error de conexión al actualizar el pedido');
      return false;
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchPedidos(true);
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  return {
    pedidos,
    loading,
    refreshing,
    error,
    fetchPedidos,
    deletePedido,
    updatePedidoEstado,
    onRefresh,
  };
};
