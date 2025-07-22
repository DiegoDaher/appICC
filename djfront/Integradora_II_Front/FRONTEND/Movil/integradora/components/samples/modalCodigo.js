import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { useFocusField } from '../../hooks';
import { modalCodeStyles } from '../../themes';

const ModalCodigo = ({ isVisible, onClose, onSubmit }) => {
  const [codigo, setCodigo] = useState('');
  const { setFocus, clearFocus, getFieldStyle } = useFocusField();

return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
        <View style={modalCodeStyles.modalContainer}>
            <Text style={modalCodeStyles.label}>Introduce el código</Text>
            <TextInput
                placeholder="Ej: ABC123"
                value={codigo}
                onChangeText={setCodigo}
                style={getFieldStyle('codigo', modalCodeStyles.input, modalCodeStyles.inputFocus)}
                onFocus={() => setFocus('codigo')}
                onBlur={clearFocus}
            />
            <TouchableOpacity
                style={modalCodeStyles.button}
                onPress={() => {onSubmit(codigo);setCodigo('');}}
            >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Enviar</Text>
            </TouchableOpacity>
        </View>
    </Modal>
);
};


// PropTypes para validación de props
ModalCodigo.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ModalCodigo;
