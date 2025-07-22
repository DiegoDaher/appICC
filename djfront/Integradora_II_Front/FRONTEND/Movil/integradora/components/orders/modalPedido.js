import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, BackHandler } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import NuevaMuestra from '../samples/nuevaMuestra';
import { useModalPedido } from '../../hooks';
import { modalStyles } from '../../themes';

const ModalPedido = ({ visible, order, onClose, onNuevaMuestra }) => {
  const {
    showNuevaMuestraModal,
    orderInfo,
    handleNuevaMuestra,
    handleCloseNuevaMuestra,
    handleSubmitNuevaMuestra,
    handleCompletarPedido,
    handleCancelarPedido,
    getStatusStyle
  } = useModalPedido(order, onClose);

  // Manejo del BackHandler para cerrar el modal
  useEffect(() => {
    const backAction = () => {
      if (visible) {
        onClose();
        return true; // Previene el comportamiento por defecto
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      backHandler.remove();
    };
  }, [visible, onClose]);

  // Función para manejar envío de nueva muestra con callback
  const handleSubmitWithCallback = (muestraData) => {
    handleSubmitNuevaMuestra(muestraData, onNuevaMuestra);
  };

  if (!orderInfo) return null;

  // Log para verificar la información del pedido que se pasa
  console.log('📋 ModalPedido: orderInfo que se pasa a NuevaMuestra:', orderInfo);

  return (
    <Modal isVisible={visible} onBackdropPress={onClose} swipeDirection="down" style={modalStyles.modal}>
      <View style={modalStyles.container}>
        <TouchableOpacity onPress={onClose} style={modalStyles.backArrow}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <ScrollView>
          <View style={modalStyles.iconContainer}>
            <Ionicons name="flask" size={48} color="black" />
            <Text style={modalStyles.idText}>#{orderInfo.id || 'N/A'}</Text>
          </View>

          {/* Información del Cliente */}
          <Text style={modalStyles.sectionTitle}>INFORMACIÓN DEL CLIENTE</Text>
          <Text style={modalStyles.label}>Nombre</Text>
          <Text style={modalStyles.value}>
            {orderInfo.clientInfo || 'No disponible'}
          </Text>
          
          <Text style={modalStyles.label}>Correo</Text>
          <Text style={modalStyles.value}>{orderInfo.clientEmail || 'No disponible'}</Text>

          {/* Análisis */}
          <Text style={modalStyles.sectionTitle}>ANÁLISIS</Text>
          {orderInfo.analisis?.map((analisis, index) => (
            <View key={index} style={modalStyles.analysisItem}>
              <Text style={modalStyles.analysisName}>• {analisis.nombre}</Text>
              <Text style={modalStyles.analysisPrice}>${analisis.precio}</Text>
              <Text style={modalStyles.analysisDescription}>{analisis.descripcion}</Text>
            </View>
          ))}

          {/* Información Financiera */}
          <Text style={modalStyles.sectionTitle}>INFORMACIÓN FINANCIERA</Text>
          <View style={modalStyles.financialRow}>
            <Text style={modalStyles.label}>Subtotal:</Text>
            <Text style={modalStyles.value}>${orderInfo.financial?.subtotal || 0}</Text>
          </View>
          
          <View style={modalStyles.financialRow}>
            <Text style={modalStyles.label}>Descuento:</Text>
            <Text style={modalStyles.value}>{orderInfo.financial?.descuento || 0}%</Text>
          </View>
          
          <View style={modalStyles.financialRow}>
            <Text style={modalStyles.totalLabel}>Total:</Text>
            <Text style={modalStyles.totalValue}>${orderInfo.financial?.total || 0}</Text>
          </View>

          {/* Anticipo */}
          <Text style={modalStyles.sectionTitle}>ANTICIPO</Text>
          <View style={modalStyles.financialRow}>
            <Text style={modalStyles.label}>Monto:</Text>
            <Text style={modalStyles.value}>${orderInfo.financial?.anticipo?.monto || 0}</Text>
          </View>
          
          <View style={modalStyles.financialRow}>
            <Text style={modalStyles.label}>Estado:</Text>
            <Text style={[modalStyles.value, orderInfo.financial?.anticipo?.estado === 'pendiente' ? modalStyles.pending : modalStyles.paid]}>
              {orderInfo.financial?.anticipo?.estado || 'No definido'}
            </Text>
          </View>
          
          {orderInfo.financial?.anticipo?.fechaPago && (
            <View style={modalStyles.financialRow}>
              <Text style={modalStyles.label}>Fecha de Pago:</Text>
              <Text style={modalStyles.value}>{orderInfo.dates?.pagoAnticipo || 'No disponible'}</Text>
            </View>
          )}

          {/* Estado y Fechas */}
          <Text style={modalStyles.sectionTitle}>INFORMACIÓN GENERAL</Text>
          <Text style={modalStyles.label}>Estado del Pedido</Text>
          <Text style={[modalStyles.value, getStatusStyle(orderInfo.estado)]}>
            {orderInfo.estado || 'No definido'}
          </Text>

          {orderInfo.hasNotas && (
            <>
              <Text style={modalStyles.label}>Notas</Text>
              <Text style={modalStyles.value}>{orderInfo.notas}</Text>
            </>
          )}

          <Text style={modalStyles.label}>Fecha de Creación</Text>
          <Text style={modalStyles.value}>
            {orderInfo.dates?.creacion || 'No disponible'}
          </Text>

          <Text style={modalStyles.label}>Última Actualización</Text>
          <Text style={modalStyles.value}>
            {orderInfo.dates?.actualizacion || 'No disponible'}
          </Text>
        </ScrollView>

        <View style={modalStyles.buttonContainer}>
          <TouchableOpacity style={modalStyles.completarButton} onPress={handleCompletarPedido}>
            <Ionicons name="checkmark-circle" size={20} color="white" style={modalStyles.buttonIcon} />
            <Text style={modalStyles.buttonText}>Completado</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={modalStyles.cancelarButton} onPress={handleCancelarPedido}>
            <Ionicons name="close-circle" size={20} color="#DA0C15" style={modalStyles.buttonIcon} />
            <Text style={modalStyles.buttonTextCancelar}>Cancelar</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={modalStyles.registrarButton} onPress={handleNuevaMuestra}>
          <Ionicons name="add-circle" size={20} color="white" style={modalStyles.buttonIcon} />
          <Text style={modalStyles.buttonText}>Registrar muestra</Text>
        </TouchableOpacity>
      </View>
      <NuevaMuestra
        isVisible={showNuevaMuestraModal}
        onClose={handleCloseNuevaMuestra}
        onSubmit={handleSubmitWithCallback}
        orderData={orderInfo}
      />
    </Modal>
  );
};

// PropTypes para validación de props
ModalPedido.propTypes = {
  visible: PropTypes.bool.isRequired,
  order: PropTypes.shape({
    _id: PropTypes.string,
    status: PropTypes.bool,
    estado: PropTypes.string,
    usuarioId: PropTypes.shape({
      _id: PropTypes.string,
      correo: PropTypes.string,
      nombre: PropTypes.string,
      apellidoPaterno: PropTypes.string,
      apellidoMaterno: PropTypes.string,
    }),
    analisis: PropTypes.arrayOf(PropTypes.shape({
      analisisId: PropTypes.string,
      nombre: PropTypes.string,
      precio: PropTypes.number,
      descripcion: PropTypes.string,
      _id: PropTypes.string,
    })),
    anticipo: PropTypes.shape({
      monto: PropTypes.number,
      fechaPago: PropTypes.string,
      estado: PropTypes.string,
    }),
    subtotal: PropTypes.number,
    porcentajeDescuento: PropTypes.number,
    total: PropTypes.number,
    notas: PropTypes.string,
    fechaCreacion: PropTypes.string,
    fechaActualizacion: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onNuevaMuestra: PropTypes.func
};

export default ModalPedido;
