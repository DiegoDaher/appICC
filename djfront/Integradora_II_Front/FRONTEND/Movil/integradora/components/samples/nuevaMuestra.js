import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { muestrasFormStyles } from '../../themes';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import ComboBoxSample from './comboBoxSample';
import { InputGroup } from '../';
import { useFocusField, useNuevaMuestra } from '../../hooks';

const nuevaMuestra = ({ isVisible, onClose, onSubmit, orderData }) => {
  // Hook para manejar la lógica de nueva muestra
  const {
    selectedTipo,
    pedido,
    pacienteId,
    nombre,
    observaciones,
    loading,
    setSelectedTipo,
    setObservaciones,
    enviarMuestra,
  } = useNuevaMuestra(isVisible, orderData);

  // Hook para manejar el focus de los campos
  const { setFocus, clearFocus, getFieldStyle } = useFocusField();

  // Función para manejar el envío del formulario
  const handleSubmit = async () => {
    await enviarMuestra(onSubmit, onClose);
  };

  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={muestrasFormStyles.modal}
    >
      <View style={muestrasFormStyles.container}>
      <TouchableOpacity onPress={onClose} style={muestrasFormStyles.backArrow}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={muestrasFormStyles.title}>Registrar Muestra</Text>

        <ComboBoxSample 
          onSelect={setSelectedTipo} 
          selectedValue={selectedTipo}
        />

        <InputGroup
          labelTitle="Pedido"
          value={pedido}
          placeholder="ID del pedido"
          onFocus={() => setFocus('pedido')}
          onBlur={clearFocus}
          style={[
            getFieldStyle('pedido', {}, muestrasFormStyles.inputFocus),
            muestrasFormStyles.inputDisabled
          ]}
          keyboardType="default"
          editable={false}
        />

        <InputGroup
          labelTitle="ID del Paciente"
          value={pacienteId}
          placeholder="Identificador del paciente"
          onFocus={() => setFocus('pacienteId')}
          onBlur={clearFocus}
          style={[
            getFieldStyle('pacienteId', {}, muestrasFormStyles.inputFocus),
            muestrasFormStyles.inputDisabled
          ]}
          keyboardType="default"
          editable={false}
        />

        <InputGroup
          labelTitle="Nombre del Paciente"
          value={nombre}
          placeholder="Nombre completo del paciente"
          onFocus={() => setFocus('nombre')}
          onBlur={clearFocus}
          style={[
            getFieldStyle('nombre', {}, muestrasFormStyles.inputFocus),
            muestrasFormStyles.inputDisabled
          ]}
          keyboardType="default"
          editable={false}
        />

        <InputGroup
          labelTitle="Observaciones"
          value={observaciones}
          onChangeText={setObservaciones}
          placeholder="Observaciones adicionales sobre la muestra"
          multiline={true}
          numberOfLines={4}
          onFocus={() => setFocus('observaciones')}
          onBlur={clearFocus}
          style={getFieldStyle('observaciones', {}, muestrasFormStyles.inputFocus)}
          keyboardType="default"
        />

        <TouchableOpacity 
          style={[muestrasFormStyles.button, loading && muestrasFormStyles.buttonDisabled]} 
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={muestrasFormStyles.buttonText}>
            {loading ? "Registrando..." : "Registrar Muestra"}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

// PropTypes para validación
nuevaMuestra.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  orderData: PropTypes.shape({
    _id: PropTypes.string,
    analisis: PropTypes.arrayOf(PropTypes.shape({
      nombre: PropTypes.string,
      precio: PropTypes.number,
      descripcion: PropTypes.string,
    })),
    usuarioId: PropTypes.shape({
      _id: PropTypes.string,
      nombre: PropTypes.string,
      apellidoPaterno: PropTypes.string,
      apellidoMaterno: PropTypes.string,
      correo: PropTypes.string,
    }),
  }),
};

export default nuevaMuestra;
