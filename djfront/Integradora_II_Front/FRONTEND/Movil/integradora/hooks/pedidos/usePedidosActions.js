import { useState } from 'react';
import { Alert } from 'react-native';

export const usePedidosActions = (deletePedido, updatePedidoEstado) => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleView = (item) => {
    console.log('👁️ Viewing order:', item._id);
    setSelectedOrder(item);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  const handleDelete = async (item) => {
    // Mostrar alerta de confirmación
    Alert.alert(
      "Confirmar eliminación",
      `¿Estás seguro de que quieres eliminar este pedido?\n\nPedido: #${item._id?.slice(-8) || 'N/A'}\nCliente: ${
        item.usuarioId && typeof item.usuarioId === 'object' && item.usuarioId.nombre ? 
        `${item.usuarioId.nombre || ''} ${item.usuarioId.apellidoPaterno || ''} ${item.usuarioId.apellidoMaterno || ''}`.trim()
        : 'Sin nombre'
      }\nTotal: $${item.total || 0}\n\nEsta acción no se puede deshacer.`,
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            const success = await deletePedido(item._id);
            if (success) {
              Alert.alert('Éxito', 'El pedido ha sido eliminado correctamente');
            }
          }
        }
      ]
    );
  };

  const handleCompletarPedido = (order) => {
    Alert.alert(
      "Completar Pedido",
      `¿Estás seguro de que quieres marcar este pedido como completado?\n\nPedido: #${order._id?.slice(-8) || 'N/A'}\nCliente: ${
        order.usuarioId && typeof order.usuarioId === 'object' && order.usuarioId.nombre ? 
        `${order.usuarioId.nombre || ''} ${order.usuarioId.apellidoPaterno || ''} ${order.usuarioId.apellidoMaterno || ''}`.trim()
        : 'Sin nombre'
      }\nTotal: $${order.total || 0}\n\nEsta acción cambiará el estado del pedido a "pagado".`,
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Completar",
          style: "default",
          onPress: async () => {
            const success = await updatePedidoEstado(order._id, "pagado");
            if (success) {
              const estadoTexto = 'completado';
              Alert.alert(
                'Éxito', 
                `El pedido ha sido ${estadoTexto} correctamente`,
                [
                  {
                    text: 'OK',
                    onPress: () => handleCloseModal()
                  }
                ]
              );
            }
          }
        }
      ]
    );
  };

  const handleCancelarPedido = (order) => {
    Alert.alert(
      "Cancelar Pedido",
      `¿Estás seguro de que quieres cancelar este pedido?\n\nPedido: #${order._id?.slice(-8) || 'N/A'}\nCliente: ${
        order.usuarioId && typeof order.usuarioId === 'object' && order.usuarioId.nombre ? 
        `${order.usuarioId.nombre || ''} ${order.usuarioId.apellidoPaterno || ''} ${order.usuarioId.apellidoMaterno || ''}`.trim()
        : 'Sin nombre'
      }\nTotal: $${order.total || 0}\n\nEsta acción cambiará el estado del pedido a "cancelado".`,
      [
        {
          text: "No cancelar",
          style: "cancel"
        },
        {
          text: "Cancelar pedido",
          style: "destructive",
          onPress: async () => {
            const success = await updatePedidoEstado(order._id, "cancelado");
            if (success) {
              const estadoTexto = 'cancelado';
              Alert.alert(
                'Éxito', 
                `El pedido ha sido ${estadoTexto} correctamente`,
                [
                  {
                    text: 'OK',
                    onPress: () => handleCloseModal()
                  }
                ]
              );
            }
          }
        }
      ]
    );
  };

  const handleNuevaMuestra = (data) => {
    console.log('📋 Nueva muestra registrada:', data);
    console.log('📦 Para la orden:', data.order._id);
    // Aquí puedes agregar lógica adicional si es necesaria
  };

  return {
    selectedOrder,
    handleView,
    handleCloseModal,
    handleDelete,
    handleCompletarPedido,
    handleCancelarPedido,
    handleNuevaMuestra,
  };
};
