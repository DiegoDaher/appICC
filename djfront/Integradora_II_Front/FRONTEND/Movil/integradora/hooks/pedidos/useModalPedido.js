import { useState, useCallback, useMemo } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

export const useModalPedido = (order, onClose) => {
  const [showNuevaMuestraModal, setShowNuevaMuestraModal] = useState(false);

  // Información procesada del pedido
  const orderInfo = useMemo(() => {
    if (!order) return null;

    console.log('🔍 ModalPedido: Procesando order:', order);

    const orderId = order._id?.slice(-8) || 'N/A';
    
    // Información del cliente
    const clientInfo = order.usuarioId && typeof order.usuarioId === 'object' ? 
      `${order.usuarioId.nombre || ''} ${order.usuarioId.apellidoPaterno || ''} ${order.usuarioId.apellidoMaterno || ''}`.trim() || 'Sin nombre'
      : 'No disponible';

    const clientEmail = order.usuarioId?.correo || 'No disponible';

    console.log('👤 ModalPedido: Cliente procesado:', { clientInfo, clientEmail });

    // Información financiera
    const financial = {
      subtotal: order.subtotal || 0,
      descuento: order.porcentajeDescuento || 0,
      total: order.total || 0,
      anticipo: {
        monto: order.anticipo?.monto || 0,
        estado: order.anticipo?.estado || 'No definido',
        fechaPago: order.anticipo?.fechaPago
      }
    };

    // Fechas formateadas
    const dates = {
      creacion: order.fechaCreacion ? new Date(order.fechaCreacion).toLocaleString() : 'No disponible',
      actualizacion: order.fechaActualizacion ? new Date(order.fechaActualizacion).toLocaleString() : 'No disponible',
      pagoAnticipo: order.anticipo?.fechaPago ? new Date(order.anticipo.fechaPago).toLocaleDateString() : null
    };

    console.log('📊 ModalPedido: Información procesada para pedido:', orderId);

    return {
      _id: order._id, // ID original para compatibilidad
      id: orderId,
      clientInfo,
      clientEmail,
      financial,
      dates,
      analisis: order.analisis || [],
      estado: order.estado || 'No definido',
      notas: order.notas,
      hasNotas: Boolean(order.notas),
      hasAnalisis: Array.isArray(order.analisis) && order.analisis.length > 0,
      // Mantener la información original del usuario para compatibilidad
      usuarioId: order.usuarioId
    };
  }, [order]);

  // Funciones para manejar el modal de nueva muestra
  const handleNuevaMuestra = useCallback(() => {
    console.log('➕ ModalPedido: Abriendo modal de nueva muestra para pedido:', orderInfo?.id);
    setShowNuevaMuestraModal(true);
  }, [orderInfo?.id]);

  const handleCloseNuevaMuestra = useCallback(() => {
    console.log('🔒 ModalPedido: Cerrando modal de nueva muestra');
    setShowNuevaMuestraModal(false);
  }, []);

  const handleSubmitNuevaMuestra = useCallback((muestraData, onNuevaMuestra) => {
    console.log('💾 ModalPedido: Nueva muestra registrada:', muestraData);
    console.log('📋 ModalPedido: Para la orden:', order._id);
    
    // Si existe la prop onNuevaMuestra, la ejecutamos
    if (typeof onNuevaMuestra === 'function') {
      onNuevaMuestra({ order, muestra: muestraData });
    }
    
    setShowNuevaMuestraModal(false);
  }, [order]);

  // Funciones para manejo de estado del pedido
  const handleCompletarPedido = useCallback(() => {
    if (!orderInfo) return;

    Alert.alert(
      "Completar Pedido",
      `¿Estás seguro de que quieres marcar este pedido como completado?\n\nPedido: #${orderInfo.id}\nCliente: ${orderInfo.clientInfo}\nTotal: $${orderInfo.financial.total}\n\nEsta acción cambiará el estado del pedido a "pagado".`,
      [
        {
          text: "Cancelar",
          style: "cancel",
          onPress: () => console.log(' ModalPedido: Completar pedido cancelado por el usuario')
        },
        {
          text: "Completar",
          style: "default",
          onPress: () => updatePedidoEstado("pagado")
        }
      ]
    );
  }, [orderInfo]);

  const handleCancelarPedido = useCallback(() => {
    if (!orderInfo) return;

    Alert.alert(
      "Cancelar Pedido",
      `¿Estás seguro de que quieres cancelar este pedido?\n\nPedido: #${orderInfo.id}\nCliente: ${orderInfo.clientInfo}\nTotal: $${orderInfo.financial.total}\n\nEsta acción cambiará el estado del pedido a "cancelado".`,
      [
        {
          text: "No cancelar",
          style: "cancel",
          onPress: () => console.log(' ModalPedido: Cancelar pedido cancelado por el usuario')
        },
        {
          text: "Cancelar pedido",
          style: "destructive",
          onPress: () => updatePedidoEstado("cancelado")
        }
      ]
    );
  }, [orderInfo]);

  // Función para actualizar el estado del pedido en el servidor
  const updatePedidoEstado = useCallback(async (nuevoEstado) => {
    if (!order?._id) return;

    try {
      console.log(`🔄 ModalPedido: Actualizando pedido ${order._id} a estado: ${nuevoEstado}`);
      
      // Obtener el token de autenticación
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        console.error(' ModalPedido: No se encontró token de autenticación');
        Alert.alert('Error', 'No se encontró token de autenticación');
        return;
      }

      const response = await fetch(`${API_URL}/pedidos/${order._id}`, {
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
        const estadoTexto = nuevoEstado === 'pagado' ? 'completado' : 'cancelado';
        console.log(`✅ ModalPedido: Pedido ${estadoTexto} exitosamente`);
        
        Alert.alert(
          'Éxito', 
          `El pedido ha sido ${estadoTexto} correctamente`,
          [
            {
              text: 'OK',
              onPress: () => {
                console.log('🔄 ModalPedido: Cerrando modal después de actualización exitosa');
                onClose();
              }
            }
          ]
        );
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || 'Error al actualizar el estado del pedido';
        console.error(' ModalPedido: Error del servidor:', errorData);
        Alert.alert('Error del servidor', errorMessage);
      }
    } catch (error) {
      console.error(' ModalPedido: Error de conexión al actualizar pedido:', error);
      Alert.alert('Error', 'Error de conexión al actualizar el pedido');
    }
  }, [order, onClose]);

  // Funciones de utilidad para estilos y estados
  const getStatusStyle = useCallback((status, type = 'general') => {
    const styles = {
      general: {
        pending: { color: '#F59E0B', fontWeight: '600' },
        completed: { color: '#10B981', fontWeight: '600' },
        paid: { color: '#10B981', fontWeight: '600' },
        cancelled: { color: '#EF4444', fontWeight: '600' }
      },
      anticipo: {
        pending: { color: '#F59E0B', fontWeight: '600' },
        paid: { color: '#10B981', fontWeight: '600' },
        cancelled: { color: '#EF4444', fontWeight: '600' }
      }
    };

    const styleSet = styles[type] || styles.general;
    
    if (status === 'pendiente' || status === 'pending') return styleSet.pending;
    if (status === 'pagado' || status === 'paid' || status === 'completado') return styleSet.paid;
    if (status === 'cancelado' || status === 'cancelled') return styleSet.cancelled;
    
    return { color: '#666', fontWeight: '600' };
  }, []);

  console.log('📋 ModalPedido: Estado actual:', {
    hasOrder: !!order,
    orderId: orderInfo?.id || 'N/A',
    showNuevaMuestraModal,
    estado: orderInfo?.estado
  });

  return {
    // Estados
    showNuevaMuestraModal,
    
    // Información procesada
    orderInfo,
    
    // Funciones de nueva muestra
    handleNuevaMuestra,
    handleCloseNuevaMuestra,
    handleSubmitNuevaMuestra,
    
    // Funciones de estado del pedido
    handleCompletarPedido,
    handleCancelarPedido,
    updatePedidoEstado,
    
    // Utilidades
    getStatusStyle
  };
};
