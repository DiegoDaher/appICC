import React from 'react';
import { FlatList, View, Text,  TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { ModalMuestra } from '../../components';
import { tableStyles } from '../../themes';
import { useModalMuestraPaciente, useEmailPaciente, useFormatUtils } from '../../hooks';

const TablaMuestrasPaciente = ({ data, onView }) => {
  const { selectedSample, modalVisible, handleViewSample, handleCloseModal } = useModalMuestraPaciente();
  const { handleSendEmail } = useEmailPaciente();
  const { formatDate, formatTipoMuestra, getImageSource } = useFormatUtils();

  console.log('🔍 Modal visible:', modalVisible);
  console.log('📋 Selected sample:', selectedSample);

  return (
    <View style={tableStyles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id || item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={tableStyles.row}>
            <View style={tableStyles.iconContainer}>
              <Image
                source={getImageSource(item.tipoMuestra)}
                style={tableStyles.typeIcon}
                resizeMode="contain"
              />
            </View>
            <View style={tableStyles.dataContainer}>
              <Text style={tableStyles.patientText}>{formatTipoMuestra(item.tipoMuestra)}</Text>
              <Text style={tableStyles.patientName}>Paciente: {item.nombrePaciente || 'N/A'}</Text>
              <Text style={tableStyles.dateText}>Fecha: {formatDate(item.createDate)}</Text>
              <Text style={tableStyles.statusTextPM}>
                Estado: {item.status ? ' Completado' : '⏳ Pendiente'}
              </Text>
            </View>
            <View style={tableStyles.actionsContainer}>
              <TouchableOpacity 
                style={tableStyles.actionButton} 
                onPress={() => {
                  console.log('📋 Abriendo modal para muestra:', item.id || item._id);
                  handleViewSample(item, onView);
                }}
              >
                <MaterialCommunityIcons name="file-search-outline" size={25} color="#DA0C15" />
              </TouchableOpacity>
              {/* Solo mostrar botón de envío si los resultados están listos */}
              {item.status === true && (
                <TouchableOpacity style={tableStyles.actionButton} onPress={() => handleSendEmail(item)}>
                  <MaterialCommunityIcons name="email-send-outline" size={25} color="#DA0C15" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />
      
      {/* Modal para mostrar detalles de la muestra */}
      <ModalMuestra
        visible={modalVisible}
        sample={selectedSample}
        onClose={handleCloseModal}
        showRegisterButton={false}
      />
    </View>
  );
};


TablaMuestrasPaciente.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.string,
    tipoMuestra: PropTypes.string,
    createDate: PropTypes.string,
    status: PropTypes.bool,
  })).isRequired,
  onView: PropTypes.func.isRequired,
};

export default TablaMuestrasPaciente;