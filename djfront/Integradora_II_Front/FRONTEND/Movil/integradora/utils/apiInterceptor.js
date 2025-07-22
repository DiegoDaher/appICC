import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Función para manejar automáticamente errores 401
const handle401Error = async (message = 'Tu sesión ha expirado') => {
    console.log('🚫 Error 401 detectado - cerrando sesión automáticamente');
    
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
                onPress: () => console.log('Usuario confirmó el logout automático por 401')
            }
        ],
        { cancelable: false }
    );
};

// Interceptor para fetch que maneja automáticamente errores 401
export const fetchWithAuth = async (url, options = {}) => {
    try {
        console.log(`🌐 Haciendo petición a: ${url}`);
        
        // Obtener token automáticamente si no se proporciona
        const token = await AsyncStorage.getItem('userToken');
        
        // Preparar headers
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...options.headers,
        };
        
        // Agregar token si existe
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        // Hacer la petición
        const response = await fetch(url, {
            ...options,
            headers,
        });

        // Verificar si es error 401
        if (response.status === 401) {
            console.log('🚫 Error 401 detectado en petición fetch');
            await handle401Error('Tu sesión ha expirado');
            
            // Devolver una respuesta de error controlada
            return {
                ok: false,
                status: 401,
                statusText: 'Unauthorized',
                json: async () => ({ 
                    error: 'Sesión expirada',
                    redirect_to_login: true 
                }),
            };
        }

        console.log(`✅ Petición exitosa: ${response.status}`);
        return response;

    } catch (error) {
        console.error('❌ Error en petición fetch:', error);
        throw error;
    }
};

// Hook para usar en componentes que necesiten hacer peticiones
export const useAuthenticatedFetch = () => {
    return {
        fetchWithAuth,
        handle401Error,
    };
};

export default fetchWithAuth;
