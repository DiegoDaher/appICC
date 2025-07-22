import { View, StyleSheet, ActivityIndicator, Text, TouchableOpacity, SafeAreaView} from "react-native";
import React from 'react';
import {TablaMuestrasPaciente, InfoPaciente, Header} from "../components";
import { Ionicons } from '@expo/vector-icons';
import { useMuestrasPaciente, usePacienteActions } from '../hooks';

const PacienteInicio = () => {
    const { muestras, loading, error, handleRetry } = useMuestrasPaciente();
    const { handleView, handleDelete } = usePacienteActions();

    // Loading state
    if (loading) {
        return (
            <View style={[styles.container, styles.centeredContent]}>
                <ActivityIndicator size="large" color="#DA0C15" />
                <Text style={styles.loadingText}>Cargando tus muestras...</Text>
            </View>
        );
    }

    // Error state
    if (error) {
        return (
          <SafeAreaView>
                  <Header title="paciennte" />
                {/* <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <InfoPaciente/>
                    </View>
                </View> */}
                <View style={styles.centeredContent}>
                    <Ionicons name="alert-circle-outline" size={80} color="#DA0C15" />
                    <Text style={styles.errorTitle}>¡Ops! Algo salió mal</Text>
                    <Text style={styles.errorMessage}>
                        Ocurrió un error al obtener las muestras:{'\n'}
                        {error}
                    </Text>
                    <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
                        <Ionicons name="refresh-outline" size={20} color="#fff" />
                        <Text style={styles.retryButtonText}>Intentar nuevamente</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    // Empty state
    if (muestras.length === 0) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <InfoPaciente/>
                    </View>
                </View>
                <View style={styles.centeredContent}>
                    <Ionicons name="document-outline" size={80} color="#999" />
                    <Text style={styles.emptyTitle}>No hay muestras disponibles</Text>
                    <Text style={styles.emptyMessage}>
                        Aún no tienes muestras de laboratorio disponibles.{'\n'}
                        Cuando tengas resultados listos, aparecerán aquí.
                    </Text>
                    <TouchableOpacity style={styles.refreshButton} onPress={handleRetry}>
                        <Ionicons name="refresh-outline" size={20} color="#DA0C15" />
                        <Text style={styles.refreshButtonText}>Actualizar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    // Normal state with data
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                     <InfoPaciente/>
                </View>
            </View>
            <TablaMuestrasPaciente data={muestras} onView={handleView} onDelete={handleDelete} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {    
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: 50,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    headerContent: {
        flex: 1,
    },
    centeredContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    loadingText: {
        marginTop: 15,
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    errorTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#DA0C15',
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'center',
    },
    errorMessage: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 30,
    },
    emptyTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'center',
    },
    emptyMessage: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 30,
    },
    retryButton: {
        backgroundColor: '#DA0C15',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 25,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    retryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
    refreshButton: {
        backgroundColor: '#fff',
        paddingHorizontal: 25,
        paddingVertical: 12,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#DA0C15',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    refreshButtonText: {
        color: '#DA0C15',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 6,
    },
});

export default PacienteInicio;
