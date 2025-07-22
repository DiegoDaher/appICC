import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import InputGroup from '../elements/inputGroup';
import { useFocusField, useBiometriaHematica } from '../../hooks';
import { muestrasFormStyles } from '../../themes';

const BiomHemResultados = ({ visible, sample, onClose }) => {
  // Usar el hook personalizado para manejar el focus
  const { setFocus, clearFocus, getFieldStyle } = useFocusField();
  
  // Usar el hook para manejo de biometría hemática
  const {
    resultados,
    loading,
    handleInputChange,
    handleSubmit,
  } = useBiometriaHematica(visible, sample, onClose);

  if (!sample) return null;

  return (
    <Modal isVisible={visible} onBackdropPress={onClose} swipeDirection="down" style={muestrasFormStyles.modal}>
      <View style={muestrasFormStyles.container}>
        <TouchableOpacity onPress={onClose} style={muestrasFormStyles.backArrow}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <ScrollView>
          <View style={muestrasFormStyles.iconContainer}>
            <Image
            // eslint-disable-next-line
              source={require('../../assets/biometriahematica.png')}
              style={muestrasFormStyles.image}
              resizeMode="contain"
            />
            <Text style={muestrasFormStyles.title}>Biometría Hemática</Text>
            <Text style={muestrasFormStyles.subtitle}>ID: {sample._id ? sample._id.slice(-8) : 'N/A'}</Text>
            <Text style={muestrasFormStyles.subtitle}>Paciente: {sample.nombrePaciente}</Text>
          </View>

          <InputGroup
            labelTitle="Hemoglobina (g/dL)"
            value={resultados.hemoglobina}
            onChangeText={(value) => handleInputChange('hemoglobina', value)}
            placeholder="12.0 - 15.5"
            onFocus={() => setFocus('hemoglobina')}
            onBlur={clearFocus}
            style={getFieldStyle('hemoglobina', {}, muestrasFormStyles.inputFocus)}
          />

          <InputGroup
            labelTitle="Hematocrito (%)"
            value={resultados.hematocrito}
            onChangeText={(value) => handleInputChange('hematocrito', value)}
            placeholder="36 - 46"
            onFocus={() => setFocus('hematocrito')}
            onBlur={clearFocus}
            style={getFieldStyle('hematocrito', {}, muestrasFormStyles.inputFocus)}
          />

          <InputGroup
            labelTitle="Eritrocitos (x10⁶/μL)"
            value={resultados.eritrocitos}
            onChangeText={(value) => handleInputChange('eritrocitos', value)}
            placeholder="4.2 - 5.4"
            onFocus={() => setFocus('eritrocitos')}
            onBlur={clearFocus}
            style={getFieldStyle('eritrocitos', {}, muestrasFormStyles.inputFocus)}
          />

          <InputGroup
            labelTitle="Concentración Media de Hb (g/dL)"
            value={resultados.conMediaHb}
            onChangeText={(value) => handleInputChange('conMediaHb', value)}
            placeholder="32 - 36"
            onFocus={() => setFocus('conMediaHb')}
            onBlur={clearFocus}
            style={getFieldStyle('conMediaHb', {}, muestrasFormStyles.inputFocus)}
          />

          <InputGroup
            labelTitle="Volumen Globular Medio (fL)"
            value={resultados.volGlobularMedia}
            onChangeText={(value) => handleInputChange('volGlobularMedia', value)}
            placeholder="80 - 100"
            onFocus={() => setFocus('volGlobularMedia')}
            onBlur={clearFocus}
            style={getFieldStyle('volGlobularMedia', {}, muestrasFormStyles.inputFocus)}
          />

          <InputGroup
            labelTitle="HB Corpuscular Media (pg)"
            value={resultados.HBCorpuscularMedia}
            onChangeText={(value) => handleInputChange('HBCorpuscularMedia', value)}
            placeholder="27 - 32"
            onFocus={() => setFocus('HBCorpuscularMedia')}
            onBlur={clearFocus}
            style={getFieldStyle('HBCorpuscularMedia', {}, muestrasFormStyles.inputFocus)}
          />

          <InputGroup
            labelTitle="Plaquetas (x10³/μL)"
            value={resultados.plaquetas}
            onChangeText={(value) => handleInputChange('plaquetas', value)}
            placeholder="150 - 450"
            onFocus={() => setFocus('plaquetas')}
            onBlur={clearFocus}
            style={getFieldStyle('plaquetas', {}, muestrasFormStyles.inputFocus)}
          />

          <InputGroup
            labelTitle="Cuenta Leucocitaria (x10³/μL)"
            value={resultados.cuentaLeucocitaria}
            onChangeText={(value) => handleInputChange('cuentaLeucocitaria', value)}
            placeholder="4.5 - 11.0"
            onFocus={() => setFocus('cuentaLeucocitaria')}
            onBlur={clearFocus}
            style={getFieldStyle('cuentaLeucocitaria', {}, muestrasFormStyles.inputFocus)}
          />

          <InputGroup
            labelTitle="Linfocitos (%)"
            value={resultados.linfocitos}
            onChangeText={(value) => handleInputChange('linfocitos', value)}
            placeholder="20 - 40"
            onFocus={() => setFocus('linfocitos')}
            onBlur={clearFocus}
            style={getFieldStyle('linfocitos', {}, muestrasFormStyles.inputFocus)}
          />

          <InputGroup
            labelTitle="Monocitos (%)"
            value={resultados.monocitos}
            onChangeText={(value) => handleInputChange('monocitos', value)}
            placeholder="2 - 8"
            onFocus={() => setFocus('monocitos')}
            onBlur={clearFocus}
            style={getFieldStyle('monocitos', {}, muestrasFormStyles.inputFocus)}
          />

          <InputGroup
            labelTitle="Segmentados (%)"
            value={resultados.segmentados}
            onChangeText={(value) => handleInputChange('segmentados', value)}
            placeholder="50 - 70"
            onFocus={() => setFocus('segmentados')}
            onBlur={clearFocus}
            style={getFieldStyle('segmentados', {}, muestrasFormStyles.inputFocus)}
          />

          <InputGroup
            labelTitle="En Banda (%)"
            value={resultados.enBanda}
            onChangeText={(value) => handleInputChange('enBanda', value)}
            placeholder="0 - 5"
            onFocus={() => setFocus('enBanda')}
            onBlur={clearFocus}
            style={getFieldStyle('enBanda', {}, muestrasFormStyles.inputFocus)}
          />

          <InputGroup
            labelTitle="Neutrófilos Totales (%)"
            value={resultados.neutrofilosT}
            onChangeText={(value) => handleInputChange('neutrofilosT', value)}
            placeholder="50 - 75"
            onFocus={() => setFocus('neutrofilosT')}
            onBlur={clearFocus}
            style={getFieldStyle('neutrofilosT', {}, muestrasFormStyles.inputFocus)}
          />

          <InputGroup
            labelTitle="Eosinófilos (%)"
            value={resultados.eosinofilos}
            onChangeText={(value) => handleInputChange('eosinofilos', value)}
            placeholder="1 - 4"
            onFocus={() => setFocus('eosinofilos')}
            onBlur={clearFocus}
            style={getFieldStyle('eosinofilos', {}, muestrasFormStyles.inputFocus)}
          />

          <InputGroup
            labelTitle="Basófilos (%)"
            value={resultados.basofilos}
            onChangeText={(value) => handleInputChange('basofilos', value)}
            placeholder="0 - 1"
            onFocus={() => setFocus('basofilos')}
            onBlur={clearFocus}
            style={getFieldStyle('basofilos', {}, muestrasFormStyles.inputFocus)}
          />

          <InputGroup
            labelTitle="Observaciones"
            value={resultados.observaciones}
            onChangeText={(value) => handleInputChange('observaciones', value)}
            placeholder="Observaciones adicionales..."
            multiline={true}
            numberOfLines={4}
            onFocus={() => setFocus('observaciones')}
            onBlur={clearFocus}
            style={getFieldStyle('observaciones', {}, muestrasFormStyles.inputFocus)}
          />
        </ScrollView>

        <View style={muestrasFormStyles.buttonContainer}>
          <TouchableOpacity style={muestrasFormStyles.cancelButton} onPress={onClose}>
            <Text style={muestrasFormStyles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[muestrasFormStyles.submitButton, loading && muestrasFormStyles.buttonDisabled]} 
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={muestrasFormStyles.submitButtonText}>
              {loading ? 'Guardando...' : 'Guardar'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// PropTypes para validación de props
BiomHemResultados.propTypes = {
  visible: PropTypes.bool.isRequired,
  sample: PropTypes.shape({
    _id: PropTypes.string,
    nombrePaciente: PropTypes.string,
    tipoMuestra: PropTypes.string,
    biometriaHematica: PropTypes.shape({
      formulaRoja: PropTypes.shape({
        hemoglobina: PropTypes.number,
        hematocrito: PropTypes.number,
        eritrocitos: PropTypes.number,
        conMediaHb: PropTypes.number,
        volGlobularMedia: PropTypes.number,
        HBCorpuscularMedia: PropTypes.number,
        plaqutas: PropTypes.number, // Nota: API usa "plaqutas" sin 'e'
      }),
      formulaBlanca: PropTypes.shape({
        cuentaLeucocitaria: PropTypes.number,
        linfocitos: PropTypes.number,
        monocitos: PropTypes.number,
        segmentados: PropTypes.number,
        enBanda: PropTypes.number,
        neutrofilosT: PropTypes.number,
        eosinofilos: PropTypes.number,
        basofilos: PropTypes.number,
      }),
      observaciones: PropTypes.string,
    }),
  }),
  onClose: PropTypes.func.isRequired
};

export default BiomHemResultados;
