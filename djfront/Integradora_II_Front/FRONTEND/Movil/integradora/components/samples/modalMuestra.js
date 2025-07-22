import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import PropTypes from 'prop-types';
import { QuimSangResultados, BiomHemResultados, ResultadosView } from '../../components';
import { useModalMuestra } from '../../hooks';
import { modalStyles } from '../../themes/elements/modal';

const ModalMuestra = ({ visible, sample, onClose, showRegisterButton = true }) => {
  const {
    showQuimModal,
    showBiomModal,
    sampleData,
    handleRegistrarResultado,
    handleCloseQuimModal,
    handleCloseBiomModal
  } = useModalMuestra(sample);

  // Verificación defensiva para modalStyles
  if (!modalStyles || !modalStyles.modal) {
    console.error('❌ modalStyles no está definido correctamente');
    return null;
  }

  if (!sampleData) return null;

  return (
    <Modal isVisible={visible} onBackdropPress={onClose} swipeDirection="down" style={modalStyles.modal}>
      <View style={modalStyles.container}>
        <TouchableOpacity onPress={onClose} style={modalStyles.backArrow}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <ScrollView>
          <View style={modalStyles.iconContainer}>
            <Ionicons name="flask" size={48} color="#DA0C15" />
            <Text style={modalStyles.idText}>ID: {sampleData.id}</Text>
          </View>

          <Text style={modalStyles.label}>Paciente</Text>
          <Text style={modalStyles.value}>{sampleData.nombrePaciente}</Text>

          <Text style={modalStyles.label}>Tipo de Muestra</Text>
          <Text style={modalStyles.value}>{sampleData.tipoMuestra}</Text>

          <Text style={modalStyles.label}>Estado</Text>
          <View style={[modalStyles.statusBadge, { backgroundColor: sampleData.statusColor }]}>
            <Text style={modalStyles.statusText}>{sampleData.statusText}</Text>
          </View>

          <Text style={modalStyles.label}>Fecha de Creación</Text>
          <Text style={modalStyles.value}>{sampleData.createDate}</Text>

          {sampleData.hasObservaciones && (
            <>
              <Text style={modalStyles.label}>Observaciones</Text>
              <Text style={modalStyles.value}>{sampleData.observaciones}</Text>
            </>
          )}

          {sampleData.hasPedidoId && (
            <>
              <Text style={modalStyles.label}>ID del Pedido</Text>
              <Text style={modalStyles.value}>{sampleData.pedidoId}</Text>
            </>
          )}
          
          {sampleData.hasQrCode && (
            <View style={{ alignItems: 'center', marginVertical: 20 }}>
              <Text style={modalStyles.label}>Código QR</Text>
              <QRCode value={sampleData.qrValue} size={150} />
            </View>
          )}

          {/* Mostrar resultados si están disponibles */}
          <ResultadosView sample={sample} />
        </ScrollView>
        
        {showRegisterButton && (
          <TouchableOpacity style={modalStyles.button} onPress={handleRegistrarResultado}>
            <Text style={modalStyles.buttonText}>Registrar Resultado</Text>
          </TouchableOpacity>
        )}

        {/* Modales de resultados */}
        <QuimSangResultados
          visible={showQuimModal}
          sample={sample}
          onClose={handleCloseQuimModal}
        />
        
        <BiomHemResultados
          visible={showBiomModal}
          sample={sample}
          onClose={handleCloseBiomModal}
        />
      </View>
    </Modal>
  );
};

// PropTypes para validación de props
ModalMuestra.propTypes = {
  visible: PropTypes.bool.isRequired,
  sample: PropTypes.shape({
    _id: PropTypes.string,
    nombrePaciente: PropTypes.string,
    tipoMuestra: PropTypes.string,
    status: PropTypes.bool,
    createDate: PropTypes.string,
    observaciones: PropTypes.string,
    pedidoId: PropTypes.string
  }),
  onClose: PropTypes.func.isRequired,
  showRegisterButton: PropTypes.bool
};

export default ModalMuestra;
