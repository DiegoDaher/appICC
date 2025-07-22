import { useState, useEffect } from 'react';
import { AppState, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

export const useTabNavigation = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        checkAuthStatus();
        
        // Verificar el estado de autenticación cada vez que la app se enfoque
        const handleAppStateChange = (nextAppState) => {
            if (nextAppState === 'active') {
                checkAuthStatus();
            }
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);
        
        // Verificar periódicamente el estado de autenticación (más frecuente para logout)
        const interval = setInterval(checkAuthStatus, 3000); // Cada 3 segundos
        
        return () => {
            subscription?.remove();
            clearInterval(interval);
        };
    }, []);

    // Función para manejar logout automático por error 401
    const handleUnauthorizedAccess = async (message = 'Tu sesión ha expirado') => {
        // Limpiar el storage
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userData');
        
        // Actualizar estados
        setIsAuthenticated(false);
        setUserRole(null);
        
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

    const checkAuthStatus = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const userData = await AsyncStorage.getItem('userData');
            
            if (!token) {
                setIsAuthenticated(false);
                setUserRole(null);
                return;
            }

            // Obtener el rol del usuario desde el token JWT
            let role = null;
            if (token) {
                try {
                    // Decodificar el payload del JWT para obtener el rol
                    const payload = JSON.parse(atob(token.split('.')[1]));
                    role = payload.rol || payload.role || null;
                    setUserRole(role);
                } catch {
                    // Como fallback, intentar obtener del userData almacenado
                    if (userData) {
                        try {
                            const user = JSON.parse(userData);
                            role = user.rol || user.role || null;
                            setUserRole(role);
                        } catch {
                            setUserRole(null);
                        }
                    }
                }
            }

            // Verificar la validez del token con el servidor
            const isValidToken = await verifyTokenWithServer(token);
            
            setIsAuthenticated(isValidToken);
            
            // Si el token no es válido, limpiar el storage
            if (!isValidToken) {
                await AsyncStorage.removeItem('userToken');
                await AsyncStorage.removeItem('userData');
            }
        } catch {
            setIsAuthenticated(false);
            // En caso de error, también limpiar el storage por seguridad
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userData');
        } finally {
            setIsLoading(false);
        }
    };

    // Función para verificar el token con el servidor
    const verifyTokenWithServer = async (token) => {
        try {
            // Verificación simple del formato JWT y expiración
            if (!token || !token.includes('.')) {
                return false;
            }

            // Decodificar el payload del JWT para verificar expiración y obtener datos
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                
                const currentTime = Math.floor(Date.now() / 1000);
                
                if (payload.exp && payload.exp < currentTime) {
                    return false;
                }

                // Extraer y actualizar el rol desde el token
                const tokenRole = payload.rol || payload.role || null;
                if (tokenRole) {
                    setUserRole(tokenRole);
                }
            } catch {
                return false;
            }

            // Verificación con servidor real
            try {
                const response = await fetch(`${API_URL}/auth/verify-token`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.status === 401) {
                    await handleUnauthorizedAccess('Tu sesión ha expirado o no es válida');
                    return false;
                }

                if (response.status === 404) {
                    // Si el endpoint no existe, confiar en la validación local del JWT
                    return true;
                }

                if (response.ok) {
                    return true;
                } else {
                    return false;
                }
            } catch {
                // En caso de error de red, usar solo verificación local
                return true;
            }
        } catch {
            // En caso de error general, asumir que el token es válido temporalmente
            return true;
        }
    };

    // Función para verificar token al cambiar de pestaña
    const handleTabPress = async (e) => {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
            setIsAuthenticated(false);
            e.preventDefault(); // Prevenir el cambio de pestaña
            return;
        }

        const isValidToken = await verifyTokenWithServer(token);
        if (!isValidToken) {
            setIsAuthenticated(false);
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userData');
            e.preventDefault(); // Prevenir el cambio de pestaña
            return;
        }
    };

    // Función para obtener las pestañas según el rol
    const getTabsForRole = (role) => {
        const allTabs = [
            {
                name: "Monitoreo",
                roles: ['admin', 'laboratory']
            },
            {
                name: "Pedidos", 
                roles: ['admin', 'accounting']
            },
            {
                name: "Muestras",
                roles: ['admin', 'laboratory']
            },
            {
                name: "Escaner",
                roles: ['admin', 'laboratory']
            },
            {
                name: "Pacientes",
                roles: ['patient']
            },
            {
                name: "Perfil",
                roles: ['admin', 'laboratory', 'accounting', 'patient'] // Disponible para todos los roles
            }
        ];

        // Si no hay rol, no mostrar pestañas
        if (!role) {
            return [];
        }

        // Filtrar pestañas según el rol
        return allTabs.filter(tab => tab.roles.includes(role));
    };

    // Función para manejar el login exitoso
    const handleLoginSuccess = async () => {
        setIsAuthenticated(true);
        
        // Verificar inmediatamente el estado después del login para obtener el rol
        await checkAuthStatus();
    };

    return {
        isAuthenticated,
        isLoading,
        userRole,
        handleTabPress,
        getTabsForRole,
        handleLoginSuccess
    };
};
