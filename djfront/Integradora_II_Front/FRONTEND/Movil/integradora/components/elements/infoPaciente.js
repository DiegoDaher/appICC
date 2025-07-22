import React from 'react';
import { View, Text } from 'react-native';
import MenuPerfil from './menuPerfil';
import { styles } from '../../themes';
import { useInfoPaciente } from '../../hooks';

const InfoPaciente = () => {
  const { userInfo } = useInfoPaciente();

  return (
    <View style={styles.card}>
      <View style={styles.headerProfile}>
        <Text style={styles.name}>{userInfo.nombreCompleto}</Text>
        <MenuPerfil token={null} />
      </View>
      <Text style={styles.email}>{userInfo.email}</Text>
      <Text style={styles.birthDate}>{userInfo.fechaNacimiento}</Text>
    </View>
  );
};


export default InfoPaciente;