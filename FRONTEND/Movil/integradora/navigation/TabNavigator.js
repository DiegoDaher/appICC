import React from 'react';
import Home from '../screens/home';
import Porfile from '../screens/porfile';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Inicio" component={Home} 
            options={{
                tabBarIcon: () =>(
                    <Ionicons name="home-outline" size={30} color={'#62bec0'}/>
                )
            }} />
            <Tab.Screen name="Porfile" component={Porfile} 
            options={{
                tabBarIcon: () =>(
                    <Ionicons name="heart-half-outline" size={30} color={'#62bec0'}/>
                )
            }}/>
        </Tab.Navigator>
    );
};

export default TabNavigator;