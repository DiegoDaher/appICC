import { useState, useCallback } from 'react';
import { Alert, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useMenuPerfil = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  // Función para cerrar sesión
  const handleLogout = useCallback(async () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar Sesión',
          onPress: async () => {
            try {
              // Cerrar el menú inmediatamente
              setIsOpen(false);
              
              // Remover tokens y datos del usuario
              await AsyncStorage.removeItem('userToken');
              await AsyncStorage.removeItem('userData');
              
              console.log('Logout exitoso - tokens removidos');
              
              // Mostrar mensaje de éxito
              Alert.alert('Éxito', 'Sesión cerrada correctamente');
              
              // El TabNavigator detectará automáticamente que no hay token
              // y redirigirá al AuthStack en el próximo render (máximo 10 segundos)
              
            } catch (error) {
              console.error('Error durante logout:', error);
              Alert.alert('Error', 'Hubo un problema al cerrar sesión. Intenta de nuevo.');
            }
          },
        },
      ]
    );
  }, []);

  // Función para alternar el menú
  const toggleMenu = useCallback(() => {
    const toValue = isOpen ? 0 : 1;
    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsOpen(!isOpen);
  }, [isOpen, animation]);

  // Función para manejar la edición de perfil
  const handleEditProfile = useCallback(() => {
    console.log('Abrir Modal de Editar Perfil');
    setShowEditProfile(true);
    setIsOpen(false);
  }, []);

  // Función para cerrar el modal de edición de perfil
  const handleCloseEditProfile = useCallback(() => {
    setShowEditProfile(false);
  }, []);

  // Función para guardar el perfil
  const handleSaveProfile = useCallback((profileData) => {
    console.log('Guardar perfil:', profileData);
    // Aquí puedes agregar la lógica para guardar el perfil
    Alert.alert('Éxito', 'Perfil actualizado correctamente');
    setShowEditProfile(false);
  }, []);

  // Interpolación para la animación del menú
  const menuHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
  });

  return {
    // Estados
    isOpen,
    showEditProfile,
    animation,
    menuHeight,
    
    // Funciones de autenticación
    handleLogout,
    
    // Funciones de UI
    toggleMenu,
    handleEditProfile,
    handleCloseEditProfile,
    handleSaveProfile,
  };
};
