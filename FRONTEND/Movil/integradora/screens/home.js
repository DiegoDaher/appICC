import { StatusBar } from 'expo-status-bar';
import { View, Text, FlatList, Image, ScrollView, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, {useState} from 'react';


const Home = () =>{
    return (
        <View style={styles.container}>
        <Text>home!</Text>
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

export default Home 