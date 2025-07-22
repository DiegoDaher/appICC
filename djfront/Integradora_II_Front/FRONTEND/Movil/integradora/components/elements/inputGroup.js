import React from 'react';
import { View, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import {styles} from '../../themes';

const InputGroup = ({ 
  labelTitle, 
  value, 
  onChangeText, 
  placeholder, 
  multiline = false, 
  numberOfLines = 1,
  keyboardType = "numeric",
  secureTextEntry = false,
  onFocus,
  onBlur,
  style = {},
  editable = true
}) => {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{labelTitle}</Text>
      <TextInput
        style={[styles.input, multiline && styles.textArea, style]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={multiline ? "default" : keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical={multiline ? 'top' : 'center'}
        secureTextEntry={secureTextEntry}
        onFocus={onFocus}
        onBlur={onBlur}
        editable={editable}
      />
    </View>
  );
};

// PropTypes para validación de props
InputGroup.propTypes = {
  labelTitle: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  multiline: PropTypes.bool,
  numberOfLines: PropTypes.number,
  keyboardType: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  style: PropTypes.object,
  editable: PropTypes.bool,
};

export default InputGroup;
