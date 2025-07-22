import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import PropTypes from 'prop-types';
import { modalStyles } from '../../themes';
import { authStyles } from '../../themes';

const LoadingButton = ({ 
  onPress, 
  title, 
  loading = false, 
  disabled = false,
  style = {},
  loadingText = "Cargando...",
  variant = "primary", // "primary", "secondary", "danger"
  theme = "modal" // "modal" o "auth"
}) => {
  
  // Determinar qué tema usar
  const themeStyles = theme === "auth" ? authStyles : modalStyles;
  
  // Determinar estilos según el variant
  const getButtonStyle = () => {
    if (loading || disabled) {
      return [themeStyles.loadingButton, style];
    }
    
    // Si se pasa un estilo personalizado y no está en loading, úsalo
    if (style && Object.keys(style).length > 0) {
      return [style];
    }
    
    switch (variant) {
      case "primary":
        return [themeStyles.completarButton || themeStyles.button];
      case "secondary":
        return [themeStyles.cancelarButton];
      case "danger":
        return [themeStyles.registrarButton];
      default:
        return [themeStyles.cancelarButton];
    }
  };

  // Determinar color del texto
  const getTextStyle = () => {
    if (loading || disabled) {
      return themeStyles.loadingText;
    }
    
    // Si se pasa un estilo personalizado, usar el color blanco por defecto
    if (style && Object.keys(style).length > 0) {
      return themeStyles.buttonText;
    }
    
    switch (variant) {
      case "primary":
        return themeStyles.buttonText;
      case "secondary":
        return themeStyles.buttonTextCancelar || themeStyles.buttonText;
      case "danger":
        return themeStyles.buttonText;
      default:
        return themeStyles.buttonTextCancelar || themeStyles.buttonText;
    }
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={loading || disabled}
      activeOpacity={loading || disabled ? 1 : 0.7}
    >
      <View style={themeStyles.buttonContent}>
        {loading && (
          <ActivityIndicator 
            size="small" 
            color="#999999"
          />
        )}
        <Text style={getTextStyle()}>
          {loading ? loadingText : title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

LoadingButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  loadingText: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  theme: PropTypes.oneOf(['modal', 'auth'])
};

export default LoadingButton;
