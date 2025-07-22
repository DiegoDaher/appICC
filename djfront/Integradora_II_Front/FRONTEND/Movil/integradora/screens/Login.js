import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { useFocusField, useLoginForm, useAuth } from '../hooks';
import { authStyles } from '../themes';
import LoadingButton from '../components/common/LoadingButton';

const Login = ({ onLoginSuccess }) => {
  const navigation = useNavigation();
  const [showValidationError, setShowValidationError] = useState(false);
  
  // Hooks para funcionalidad específica
  const { setFocus, clearFocus, getFieldStyle } = useFocusField();
  const { correo, contraseña, setCorreo, setContraseña, isFormValid } = useLoginForm();
  const { login, isLoading, errorMessage, clearError } = useAuth();

  const handleLogin = async () => {
    // Si los campos están vacíos, mostrar mensaje de validación
    if (!correo.trim() || !contraseña.trim()) {
      setShowValidationError(true);
      return;
    }

    // Limpiar mensaje de validación y continuar con login
    setShowValidationError(false);
    await login(correo, contraseña, onLoginSuccess);
  };

  // Función para limpiar errores cuando el usuario empiece a escribir
  const handleInputChange = (setter, clearErrorFn) => (text) => {
    setter(text);
    if (errorMessage) {
      clearErrorFn();
    }
  };

  return (
    <View style={authStyles.container}>
      <Image
        // eslint-disable-next-line
        source={require('../assets/logo-iic.png')}
        style={authStyles.logo}
        resizeMode="contain"
      />
      
      <Text style={authStyles.title}>Bienvenido</Text>
      
      <TextInput
        style={getFieldStyle('correo', authStyles.input, authStyles.inputFocus)}
        placeholder="Correo electrónico"
        value={correo}
        onChangeText={handleInputChange(setCorreo, clearError)}
        autoCapitalize="none"
        keyboardType="email-address"
        onFocus={() => setFocus('correo')}
        onBlur={clearFocus}
        editable={!isLoading}
      />
      
      <TextInput
        style={getFieldStyle('contraseña', authStyles.input, authStyles.inputFocus)}
        placeholder="Contraseña"
        value={contraseña}
        onChangeText={handleInputChange(setContraseña, clearError)}
        secureTextEntry
        onFocus={() => setFocus('contraseña')}
        onBlur={clearFocus}
        editable={!isLoading}
      />

      {/* Contenedor para mensajes de error y validación */}
      <View style={authStyles.errorContainer}>
        {!isFormValid() && correo && contraseña && (
          <Text style={authStyles.validationText}>
            Por favor, llena todos los campos correctamente
          </Text>
        )}
        {errorMessage && isFormValid() && (
          <Text style={authStyles.errorText}>
            {errorMessage}
          </Text>
        )}
      </View>
      
      {/* Mensaje de validación de campos vacíos */}
      {showValidationError && (
        <View style={authStyles.messageContainer}>
          <Text style={authStyles.validationErrorText}>
            Llena todos los campos por favor
          </Text>
        </View>
      )}
      
      <LoadingButton
        variant="primary"
        theme="auth"
        title="Entrar"
        loading={isLoading}
        loadingText="Iniciando sesión..."
        onPress={handleLogin}
        style={authStyles.button}
      />
      
      <TouchableOpacity 
        onPress={() => navigation.navigate('Recovery')}
        disabled={isLoading}
        style={{ opacity: isLoading ? 0.6 : 1 }}
      >
        <Text style={authStyles.linkText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
      
      <Image
        // eslint-disable-next-line
        source={require('../assets/logo-ujed.png')}
        style={authStyles.logoBottom}
        resizeMode="contain"
      />
    </View>
  );
};

Login.propTypes = {
  onLoginSuccess: PropTypes.func,
};

export default Login;
