import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
import { useTabNavigation } from '../hooks';
import { useDrawerContext } from '../context/DrawerContext';
import TabNavigator from './TabNavigator';
import AuthStack from './AuthStack';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
    const { userRole, getTabsForRole } = useTabNavigation();
    const { handleLogout } = useDrawerContext();
    
    // Configuración de pestañas con iconos (misma del TabNavigator)
    const tabsConfig = { // Color para los iconos
        "Monitoreo": {
            icon: ({ size }) => <Ionicons name="home-outline" size={size} color="#DA0C15"/>
        },
        "Pedidos": {
            icon: ({ size }) => <FontAwesome5 name="clipboard-list" size={size} color="#DA0C15"/>
        },
        "Muestras": {
            icon: ({ size }) => <Fontisto name="test-tube" size={size} color="#DA0C15"/>
        },
        "Escaner": {
            icon: ({ size }) => <MaterialIcons name="qr-code-scanner" size={size} color="#DA0C15" />
        },
        "Pacientes": {
            icon: ({ size }) => <MaterialIcons name="people" size={size} color="#DA0C15" />
        },
        "Perfil": {
            icon: ({ size }) => <Ionicons name="person-circle-outline" size={size} color="#DA0C15" />
        }
    };

    // Obtener las pestañas disponibles para el rol actual
    const availableTabs = getTabsForRole(userRole);

    // Función para navegar a una pestaña específica del TabNavigator
    const navigateToTab = (tabName) => {
        // Primero navegar al TabNavigator
        props.navigation.navigate('Inicio');
        // Luego navegar a la pestaña específica
        props.navigation.navigate('Inicio', { 
            screen: tabName 
        });
        props.navigation.closeDrawer();
    };

    return (
        <DrawerContentScrollView {...props}>
            {/* Opción principal para ir al inicio */}
            <DrawerItem
                label="Inicio"
                icon={({ size }) => <Ionicons name="apps" size={size} color={'#DA0C15'}/>}
                onPress={() => {
                    props.navigation.navigate('Inicio');
                    props.navigation.closeDrawer();
                }}
            />
            
            {/* Pestañas disponibles para el rol - navegan dentro del TabNavigator */}
            {availableTabs.map((tab) => {
                const tabConfig = tabsConfig[tab.name];
                if (!tabConfig) return null;
                
                return (
                    <DrawerItem
                        key={tab.name}
                        label={`${tab.name}`}
                        icon={tabConfig.icon}
                        onPress={() => navigateToTab(tab.name)}
                    />
                );
            })}            
            {/* Opción para cerrar sesión */}
            <DrawerItem
                label="Cerrar Sesión"
                icon={({ size }) => <Ionicons name="log-out-outline" size={size} color="#DA0C15" />}
                onPress={() => {
                    handleLogout();
                    props.navigation.closeDrawer();
                }}
            />
        </DrawerContentScrollView>
    );
}

CustomDrawerContent.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        closeDrawer: PropTypes.func.isRequired,
    }).isRequired,
};

function AppDrawer() {
    const { 
        isAuthenticated, 
        isLoading, 
        userRole, 
        getTabsForRole,
        handleLoginSuccess 
    } = useTabNavigation();
    
    if (isLoading) {
        return null;
    }

    if (!isAuthenticated) {
        return <AuthStack onLoginSuccess={handleLoginSuccess} />;
    }

    // Obtener las pestañas disponibles para el rol actual
    const availableTabs = getTabsForRole(userRole);

    // Agregar fallback si no hay pestañas disponibles
    if (availableTabs.length === 0) {
        return <AuthStack onLoginSuccess={handleLoginSuccess} />;
    }

    return (
        <>
            <Drawer.Navigator 
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                screenOptions={{
                    headerShown: false,
                    headerStyle: { backgroundColor: '#DA0C15' }, 
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontWeight: 'bold' },
                    drawerActiveTintColor: '#DA0C15',
                    drawerInactiveTintColor: 'gray',
                }}
                initialRouteName="Inicio"
            >
                {/* Solo el TabNavigator como pantalla principal */}
                <Drawer.Screen 
                    name="Inicio" 
                    component={TabNavigator}
                    options={{
                        title: "Sistema Laboratorio",
                        drawerIcon: ({ size }) => <Ionicons name="apps" size={size} color="#DA0C15"/>
                    }}
                />
            </Drawer.Navigator>
        </>
    );
}

export default AppDrawer;
