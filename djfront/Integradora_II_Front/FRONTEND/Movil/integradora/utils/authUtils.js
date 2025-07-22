import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Función global para manejar errores 401 desde cualquier parte de la app
export const handle401Error = async (message = 'Tu sesión ha expirado') => {
    // Limpiar el storage
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userData');
    
    // Mostrar alerta
    Alert.alert(
        'Sesión Expirada',
        `${message}. Redirigiendo al login...`,
        [
            {
                text: 'Aceptar',
                onPress: () => {}
            }
        ],
        { cancelable: false }
    );
};

export const logout = async () => {
    try {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userData');
        return true;
    } catch {
        return false;
    }
};
