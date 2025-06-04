import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { View, Text, FlatList, Image, ScrollView, StyleSheet, TouchableOpacity, TextInput } from "react-native";

const Porfile= () =>{
    return (
        <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Porfile; 