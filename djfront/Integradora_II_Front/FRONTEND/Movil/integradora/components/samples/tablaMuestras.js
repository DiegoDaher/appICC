import React from 'react';
import { FlatList, View, Text, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { ModalMuestra } from '../../components';
import { tableStyles } from '../../themes';
import { useModalMuestrasAdmin, useMuestrasUtils, useMuestrasActions } from '../../hooks';

const TablaMuestras = ({ data, onDelete }) => {
    // Hooks para manejo de modal
    const { selectedSample, modalVisible, handleViewSample, handleCloseModal } = useModalMuestrasAdmin();
    
    // Hooks para utilidades de formato
    const { getImageSource, getStatusColor, getStatusText, formatDate } = useMuestrasUtils();
    const { handleDelete } = useMuestrasActions(onDelete);

    return (
    <>
        <FlatList
            data={data}
            keyExtractor={(item) => item._id || item.id}
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
                        <View style={tableStyles.orderInfo}>
                            <Text style={tableStyles.orderText}>{item.nombrePaciente || 'N/A'}</Text>
                        </View>
                        <View style={tableStyles.infoRow}>
                            <View style={[tableStyles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                                <Text style={tableStyles.statusTextM}>{getStatusText(item.status)}</Text>
                            </View>
                            <Text style={tableStyles.dateText}>
                                {formatDate(item.createDate)}
                            </Text>
                        </View>
                    </View>
                    
                    <View style={tableStyles.actionsContainer}>
                        <TouchableOpacity style={tableStyles.actionButton} onPress={() => handleViewSample(item)}>
                            <MaterialCommunityIcons name="file-search-outline" size={30} color="#DA0C15" />
                        </TouchableOpacity>
                        <TouchableOpacity style={tableStyles.actionButton} onPress={() => handleDelete(item)}>
                            <MaterialCommunityIcons name="trash-can" size={30} color="#DA0C15" />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        />
        
        {/* Modal para mostrar detalles de la muestra */}
        <ModalMuestra
            visible={modalVisible}
            sample={selectedSample}
            onClose={handleCloseModal}
            showRegisterButton={true}
        />
    </>
);
};

// PropTypes para validación de props
TablaMuestras.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.string,
    nombrePaciente: PropTypes.string,
    tipoMuestra: PropTypes.string,
    status: PropTypes.bool,
    createDate: PropTypes.string,
    observaciones: PropTypes.string
  })).isRequired,
  onDelete: PropTypes.func.isRequired
};

export default TablaMuestras;
