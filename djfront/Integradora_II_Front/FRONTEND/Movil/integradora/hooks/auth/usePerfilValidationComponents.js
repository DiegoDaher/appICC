import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import {validation} from '../../themes'


/**
 * Hook que proporciona componentes para mostrar el estado de validación del perfil
 * Incluye indicadores de validación y lista de requisitos para contraseñas
 */
export const usePerfilValidationComponents = () => {
  
  // Componente para mostrar el estado de validación de un campo
  const ValidationIndicator = ({ status, isValidating }) => {
    if (!status || status.isValid === null) return null;

    const iconColor = status.isValid ? '#4CAF50' : '#f44336';
    const icon = status.isValid ? '✓' : '✗';
    const bgColor = status.isValid ? '#E8F5E8' : '#FFEBEE';

    return (
      <View style={[validation.validationIndicator, { backgroundColor: bgColor }]}>
        <Text style={[validation.validationIcon, { color: iconColor }]}>
          {isValidating ? '⏳' : icon}
        </Text>
        <Text style={[validation.validationMessage, { color: iconColor }]}>
          {isValidating ? 'Validando...' : status.message}
        </Text>
      </View>
    );
  };

  // Componente para mostrar la validación de contraseña como lista de requisitos
  const PasswordValidationList = ({ password }) => {
    if (!password) return null;

    const checks = {
      length: {
        valid: password.length >= 8,
        text: 'Mínimo 8 caracteres'
      },
      uppercase: {
        valid: /[A-Z]/.test(password),
        text: 'Al menos una mayúscula (A-Z)'
      },
      lowercase: {
        valid: /[a-z]/.test(password),
        text: 'Al menos una minúscula (a-z)'
      },
      numbers: {
        valid: /\d/.test(password),
        text: 'Al menos un número (0-9)'
      },
      symbols: {
        valid: /[@#$!%*?&]/.test(password),
        text: 'Al menos un símbolo (@#$!%*?&)'
      }
    };

    return (
      <View style={validation.passwordValidationList}>
        <Text style={validation.passwordValidationTitle}>Requisitos de contraseña:</Text>
        {Object.entries(checks).map(([key, check]) => (
          <View key={key} style={validation.passwordCheckItem}>
            <Text style={[
              validation.passwordCheckIcon,
              { color: check.valid ? '#4CAF50' : '#ff4444' }
            ]}>
              {check.valid ? '✓' : '✗'}
            </Text>
            <Text style={[
              validation.passwordCheckText,
              { color: check.valid ? '#4CAF50' : '#666' }
            ]}>
              {check.text}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  // PropTypes para ValidationIndicator
  ValidationIndicator.propTypes = {
    status: PropTypes.shape({
      isValid: PropTypes.bool,
      message: PropTypes.string
    }),
    isValidating: PropTypes.bool
  };

  // PropTypes para PasswordValidationList
  PasswordValidationList.propTypes = {
    password: PropTypes.string
  };

  return {
    ValidationIndicator,
    PasswordValidationList,
  };
};

