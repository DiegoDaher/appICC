// src/navigation/PatientStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EditarPerfil, PacienteInicio } from '../screens';

const Stack = createNativeStackNavigator();

const PatientStack = () => (
    <Stack.Navigator
        screenOptions={{
            headerStyle: {
                height: 120, // Ajusta este valor para aumentar el espacio del header
            },
        }}
    >
        <Stack.Screen name="Paciente" component={PacienteInicio} />
        <Stack.Screen name="EditProfile" component={EditarPerfil} />
    </Stack.Navigator>
);

export default PatientStack;
