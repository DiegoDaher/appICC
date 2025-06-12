import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../App';
import { Image } from 'react-native';

const Recovery = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [email, setEmail] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Campos vacíos', 'Por favor, llena todos los campos');
      return;
    }

    try {
      const response = await fetch('https://ecommerceproyectserviceebs-se-production.up.railway.app/api/v1/esb/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.data) {
        Alert.alert('Éxito', 'Inicio de sesión exitoso');
        setIsAuthenticated(true);
      } else {
        Alert.alert('Error', data.message || 'Credenciales incorrectas');
      }
    } catch (error) {
      Alert.alert('Error', 'Algo salió mal');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
        <Image
            source={require('../assets/logo-iic.png')}
            style={{ width: 120, height: 120, marginBottom: 30 }}
            resizeMode="contain"
        />
      <Text style={styles.title}>Recuperacion</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('login')}>
            <Text style={{ color: '#3b82f6', marginTop: 20 }}>Iniciar Sesion</Text>
            
        </TouchableOpacity>
        <Image
            source={require('../assets/logo-ujed.png')}
            style={{ width: 120, height: 120, marginTop: 30}}
            resizeMode="contain"
        />
    </View>
  );
};

export default Recovery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'Montserrat',
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 28,
    faontWeight: 'bold',
    marginBottom: 40,
    color: '#000',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  button: {
    backgroundColor: '#DA0C15',
    paddingVertical: 15,
    width: '100%',
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
