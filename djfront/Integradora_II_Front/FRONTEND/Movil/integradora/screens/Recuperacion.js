import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFocusField, usePasswordRecovery } from '../hooks';
import { authStyles } from '../themes';
import LoadingButton from '../components/common/LoadingButton';

const Recuperacion = () => {
  const navigation = useNavigation();
  const [showValidationError, setShowValidationError] = useState(false);
  
  // Hooks para funcionalidad específica
  const { setFocus, clearFocus, getFieldStyle } = useFocusField();
  const { 
    email, 
    setEmail, 
    sendRecoveryRequest, 
    isLoading, 
    errorMessage, 
    successMessage, 
    clearMessages, 
  } = usePasswordRecovery();

  // Función para limpiar mensajes cuando el usuario empiece a escribir
  const handleEmailChange = (text) => {
    setEmail(text);
    if (errorMessage || successMessage) {
      clearMessages();
    }
    // Limpiar mensaje de validación cuando el usuario empiece a escribir
    if (showValidationError) {
      setShowValidationError(false);
    }
  };

  // Función wrapper para manejar validación antes de enviar
  const handleSendRecovery = async () => {
    // Si el campo está vacío, mostrar mensaje de validación
    if (!email.trim()) {
      setShowValidationError(true);
      return;
    }

    // Limpiar mensaje de validación y continuar con envío
    setShowValidationError(false);
    await sendRecoveryRequest();
  };

  return (
    <View style={authStyles.container}>
      <Image
        // eslint-disable-next-line
        source={require('../assets/logo-iic.png')}
        style={authStyles.logo}
        resizeMode="contain"
      />
      
      <Text style={authStyles.title}>Recuperar Contraseña</Text>

      <TextInput
        style={getFieldStyle('email', authStyles.input, authStyles.inputFocus)}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={handleEmailChange}
        autoCapitalize="none"
        keyboardType="email-address"
        onFocus={() => setFocus('email')}
        onBlur={clearFocus}
        editable={!isLoading}
      />

      {/* Contenedor para mensajes de error, validación y éxito */}
      <View style={authStyles.errorContainer}>
        {errorMessage && (
          <Text style={authStyles.errorText}>
            {errorMessage}
          </Text>
        )}
        {successMessage && (
          <Text style={authStyles.successText}>
            {successMessage}
          </Text>
        )}
      </View>

      {/* Mensaje de validación de campos vacíos */}
      {showValidationError && (
        <View style={authStyles.messageContainer}>
          <Text style={authStyles.validationErrorText}>
            Por favor, ingresa tu correo electrónico
          </Text>
        </View>
      )}

      <LoadingButton
        variant="primary"
        theme="auth"
        title="Recuperar Contraseña"
        loading={isLoading}
        loadingText="Enviando código..."
        onPress={handleSendRecovery}
        style={authStyles.button}
      />
      
      <TouchableOpacity 
        onPress={() => navigation.navigate('Login')}
        disabled={isLoading}
        style={{ opacity: isLoading ? 0.6 : 1 }}
      >
        <Text style={authStyles.linkText}>Volver al Inicio de Sesión</Text>
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

export default Recuperacion;
