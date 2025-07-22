import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { InputGroup } from '../components/';
import Header from '../components/elements/header';
import { useFocusField, useEditarPerfil, usePerfilValidationComponents } from '../hooks';
import { perfilStyles } from '../themes';

const Perfil = () => {
  // Debug log
  console.log('Perfil screen rendered');

  // Estados para mostrar/ocultar contraseñas
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Hooks principales (sin pasar onSave y onClose ya que no es modal)
  const {
    formData,
    validationErrors,
    loading,
    validationStatus,
    isValidating,
    handleInputChange,
    handleSave: originalHandleSave
  } = useEditarPerfil();

  const { setFocus, clearFocus, getFieldStyle } = useFocusField();
  const { ValidationIndicator, PasswordValidationList } = usePerfilValidationComponents();

  // Función personalizada para manejar el guardado y limpiar campos de contraseña
  const handleSave = async () => {
    try {
      // Llamar a la función original de guardado
      await originalHandleSave();
      
      // Si el guardado fue exitoso, limpiar los campos de contraseña
      handleInputChange('oldPassword', '');
      handleInputChange('newPassword', '');
      handleInputChange('confirmPassword', '');
      
      // También ocultar las contraseñas
      setShowOldPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
      
      console.log('Campos de contraseña limpiados después del guardado exitoso');
    } catch (error) {
      console.log('Error al guardar, manteniendo campos de contraseña:', error);
    }
  };

  // Funciones para alternar visibilidad de contraseñas
  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#DA0C15' }}>
      {/* Header componente */}
      <Header title="Mi Perfil" showMenu={true} />

      {/* Contenido de la pantalla */}
      <View style={[perfilStyles.container, { flex: 1, backgroundColor: 'white' }]}>
        <ScrollView 
          contentContainerStyle={[perfilStyles.scroll, { flexGrow: 1, padding: 20 }]}
          showsVerticalScrollIndicator={true}
        >
          <InputGroup
          labelTitle="Email"
          value={formData.email}
          onChangeText={(value) => handleInputChange('email', value)}
          placeholder="Ingresa tu email"
          keyboardType="email-address"
          onFocus={() => setFocus('email')}
          onBlur={clearFocus}
          style={[
            getFieldStyle('email', {}, perfilStyles.inputFocus),
            validationErrors.email ? perfilStyles.inputError : {}
          ]}
        />
        <ValidationIndicator 
          status={validationStatus.email} 
          isValidating={isValidating.email} 
        />
        {validationErrors.email ? (
          <Text style={perfilStyles.errorText}>{validationErrors.email}</Text>
        ) : null}

        <View style={{ position: 'relative' }}>
          <InputGroup
            labelTitle="Contraseña Anterior"
            value={formData.oldPassword}
            onChangeText={(value) => handleInputChange('oldPassword', value)}
            placeholder="Ingresa tu antigua contraseña"
            keyboardType="default"
            secureTextEntry={!showOldPassword}
            onFocus={() => setFocus('oldPassword')}
            onBlur={clearFocus}
            style={[
              getFieldStyle('oldPassword', {}, perfilStyles.inputFocus),
              validationErrors.oldPassword ? perfilStyles.inputError : {}
            ]}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 15,
              top: 45,
              padding: 5,
            }}
            onPress={toggleOldPasswordVisibility}
          >
            <Ionicons
              name={showOldPassword ? 'eye-off' : 'eye'}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        </View>
        <ValidationIndicator 
          status={validationStatus.oldPassword} 
          isValidating={isValidating.oldPassword} 
        />
        {validationErrors.oldPassword ? (
          <Text style={perfilStyles.errorText}>{validationErrors.oldPassword}</Text>
        ) : null}

        <View style={{ position: 'relative' }}>
          <InputGroup
            labelTitle="Nueva Contraseña"
            value={formData.newPassword}
            onChangeText={(value) => handleInputChange('newPassword', value)}
            placeholder="Ingresa tu nueva contraseña"
            keyboardType="default"
            secureTextEntry={!showNewPassword}
            onFocus={() => setFocus('newPassword')}
            onBlur={clearFocus}
            style={[
              getFieldStyle('newPassword', {}, perfilStyles.inputFocus),
              validationErrors.newPassword ? perfilStyles.inputError : {}
            ]}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 15,
              top: 45,
              padding: 5,
            }}
            onPress={toggleNewPasswordVisibility}
          >
            <Ionicons
              name={showNewPassword ? 'eye-off' : 'eye'}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        </View>
        <PasswordValidationList password={formData.newPassword} />
        {validationErrors.newPassword ? (
          <Text style={perfilStyles.errorText}>{validationErrors.newPassword}</Text>
        ) : null}

        <View style={{ position: 'relative' }}>
          <InputGroup
            labelTitle="Confirmar Contraseña"
            value={formData.confirmPassword}
            onChangeText={(value) => handleInputChange('confirmPassword', value)}
            placeholder="Confirma tu nueva contraseña"
            keyboardType="default"
            secureTextEntry={!showConfirmPassword}
            onFocus={() => setFocus('confirmPassword')}
            onBlur={clearFocus}
            style={[
              getFieldStyle('confirmPassword', {}, perfilStyles.inputFocus),
              validationErrors.confirmPassword ? perfilStyles.inputError : {}
            ]}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 15,
              top: 45,
              padding: 5,
            }}
            onPress={toggleConfirmPasswordVisibility}
          >
            <Ionicons
              name={showConfirmPassword ? 'eye-off' : 'eye'}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        </View>
        <ValidationIndicator 
          status={validationStatus.confirmPassword} 
          isValidating={isValidating.confirmPassword} 
        />
        {validationErrors.confirmPassword ? (
          <Text style={perfilStyles.errorText}>{validationErrors.confirmPassword}</Text>
        ) : null}

        <View style={perfilStyles.buttonContainerRow}>
          <TouchableOpacity 
            style={[
              perfilStyles.submitButton,
              loading ? perfilStyles.submitButtonDisabled : {}
            ]} 
            onPress={handleSave}
            disabled={loading}
          >
            <Text style={perfilStyles.submitButtonText}>
              {loading ? 'Guardando...' : 'Guardar cambios'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
    </SafeAreaView>
  ); 
};

export default Perfil;
