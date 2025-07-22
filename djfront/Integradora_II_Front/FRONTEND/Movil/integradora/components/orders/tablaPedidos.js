import React from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { tableStyles } from '../../themes';
import ModalPedido from './modalPedido';
import { useTablaPedidos } from '../../hooks';

const TablaPedidos = ({ data, onView, onDelete, refreshing, onRefresh }) => {
  const {
    selectedOrder,
    handleView,
    handleCloseModal,
    handleDelete,
    getClientDisplayName,
    getStatusText,
    getStatusColor,
    formatDate
  } = useTablaPedidos(onDelete, onRefresh);

  // Función para manejar la visualización con callback opcional
  const handleViewWithCallback = (item) => {
    handleView(item);
    if (onView) onView(item);
  };

  return (
    <>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        refreshing={refreshing}
        onRefresh={onRefresh}
        renderItem={({ item }) => (
          <View style={tableStyles.row}>
            <MaterialCommunityIcons name="test-tube" size={30} color="#DA0C15" />
            <View style={tableStyles.orderInfo}>
              <Text style={tableStyles.orderText}>
                {getClientDisplayName(item)}
              </Text>
              
              <View style={tableStyles.infoRow}>
                <View style={[tableStyles.statusBadgeP, { backgroundColor: getStatusColor(item.estado) }]}>
                  <Text style={tableStyles.statusTextM}>{getStatusText(item.estado)}</Text>
                </View>
                <Text style={tableStyles.dateText}>
                  {formatDate(item.fechaCreacion)}
                </Text>
              </View>
            
            </View>
            <TouchableOpacity style={tableStyles.actionButton} onPress={() => handleViewWithCallback(item)}>
              <MaterialCommunityIcons name="file-search-outline" size={30} color="#DA0C15" />
            </TouchableOpacity>
            <TouchableOpacity style={tableStyles.actionButton} onPress={() => handleDelete(item)}>
              <MaterialCommunityIcons name="trash-can" size={30} color="#DA0C15" />
            </TouchableOpacity>
          </View>
        )}
      />
      {selectedOrder && (
        <ModalPedido
          visible={!!selectedOrder}
          order={selectedOrder}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

// PropTypes para validación de props
TablaPedidos.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    usuarioId: PropTypes.shape({
      _id: PropTypes.string,
      correo: PropTypes.string,
      nombre: PropTypes.string,
      apellidoPaterno: PropTypes.string,
      apellidoMaterno: PropTypes.string,
    }),
    status: PropTypes.bool,
    estado: PropTypes.string,
    analisis: PropTypes.array,
    anticipo: PropTypes.object,
    subtotal: PropTypes.number,
    porcentajeDescuento: PropTypes.number,
    total: PropTypes.number,
    notas: PropTypes.string,
    fechaCreacion: PropTypes.string,
    fechaActualizacion: PropTypes.string,
  })).isRequired,
  onView: PropTypes.func,
  onDelete: PropTypes.func.isRequired,
  refreshing: PropTypes.bool,
  onRefresh: PropTypes.func,
};

export default TablaPedidos;
