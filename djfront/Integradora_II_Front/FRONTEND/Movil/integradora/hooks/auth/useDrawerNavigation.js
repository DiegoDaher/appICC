import { useCallback } from 'react';
import { Alert } from 'react-native';
import { logout } from '../../utils/authUtils';

export const useDrawerNavigation = () => {
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
                    style: 'destructive',
                    onPress: async () => {
                        const success = await logout();
                        if (success) {
                            // La navegación se manejará automáticamente por el useTabNavigation
                        } else {
                            Alert.alert('Error', 'No se pudo cerrar la sesión');
                        }
                    },
                },
            ]
        );
    }, []);

    return {
        handleLogout,
    };
};
