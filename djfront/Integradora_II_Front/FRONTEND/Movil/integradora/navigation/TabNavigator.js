import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useTabNavigation } from '../hooks';
import {Dashboard, Escaner, Pedidos, Perfil} from '../screens';
import MuestrasScreen from '../screens/Muestras';
import AuthStack from './AuthStack';
import PatientStack from './PatientStack';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const {
        isAuthenticated,
        isLoading,
        userRole,
        handleTabPress,
        getTabsForRole,
        handleLoginSuccess
    } = useTabNavigation();

    // Configuración de pestañas con componentes e iconos
    const tabsConfig = {
        "Monitoreo": {
            component: Dashboard,
            icon: () => <Ionicons name="home-outline" size={30} color={'#DA0C15'}/>
        },
        "Pedidos": {
            component: Pedidos,
            icon: () => <FontAwesome5 name="clipboard-list" size={25} color={'#DA0C15'}/>
        },
        "Muestras": {
            component: MuestrasScreen,
            icon: () => <Fontisto name="test-tube" size={26} color={'#DA0C15'}/>
        },
        "Escaner": {
            component: Escaner,
            icon: () => <MaterialIcons name="qr-code-scanner" size={30} color={'#DA0C15'} />
        },
        "Pacientes": {
            component: PatientStack,
            icon: () => <MaterialIcons name="people" size={30} color={'#DA0C15'} />
        },
        "Perfil": {
            component: Perfil,
            icon: () => <Ionicons name="person-circle-outline" size={30} color={'#DA0C15'} />
        }
    };

    if (isLoading) {
        return null;
    }

    if (!isAuthenticated) {
        return <AuthStack onLoginSuccess={handleLoginSuccess} />;
    }

    const allowedTabs = getTabsForRole(userRole);

    if (allowedTabs.length === 0) {
        return <AuthStack onLoginSuccess={handleLoginSuccess} />;
    }

    return (
        <Tab.Navigator 
            screenOptions={{
                headerShown: false
            }}
        >
            {allowedTabs.map((tab) => (
                <Tab.Screen 
                    key={tab.name}
                    name={tab.name} 
                    component={tabsConfig[tab.name].component} 
                    options={{
                        tabBarIcon: tabsConfig[tab.name].icon
                    }}
                    listeners={{
                        tabPress: (e) => handleTabPress(e)
                    }}
                />
            ))}
        </Tab.Navigator>
    );
};

export default TabNavigator;
