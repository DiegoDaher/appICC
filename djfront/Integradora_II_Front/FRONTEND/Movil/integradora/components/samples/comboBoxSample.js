import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import { useComboBoxSample } from '../../hooks';
import { comboBoxStyles } from '../../themes';

const ComboBoxSample = ({ onSelect, selectedValue }) => {
  const {
    options,
    handleSelect,
    getOptionStyles,
    getTextStyles
  } = useComboBoxSample(onSelect, selectedValue);

  // Función para obtener la imagen según el tipo
  const getImage = (imagePath) => {
    if (imagePath === 'biometriahematica') {
      // eslint-disable-next-line
      return require('../../assets/biometriahematica.png');
    } else if (imagePath === 'quimicasanguinea') {
      // eslint-disable-next-line
      return require('../../assets/quimicasanguinea.png');
    }
    return null;
  };

  return (
    <View style={comboBoxStyles.container}>
      <Text style={comboBoxStyles.label}>Tipo de Prueba</Text>
      <View style={comboBoxStyles.comboBox}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.key}
            style={[
              comboBoxStyles.option,
              getOptionStyles(option.value, comboBoxStyles.selected, comboBoxStyles.unselected)
            ]}
            onPress={() => handleSelect(option.value)}
          >
            <Image source={getImage(option.imagePath)} style={comboBoxStyles.icon} />
            <Text style={[
              comboBoxStyles.optionText,
              getTextStyles(option.value, comboBoxStyles.textSelected, comboBoxStyles.textUnselected)
            ]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

ComboBoxSample.propTypes = {
  onSelect: PropTypes.func.isRequired,
  selectedValue: PropTypes.string,
};

export default ComboBoxSample;
