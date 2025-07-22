import React from 'react'
import { Text, View, ActivityIndicator} from 'react-native';
import { DashboardStyles } from '../themes';
import AnimatedContent from '../utils/AnimatedContent';
import { Header } from '../components';
import { useSensorData, useLdrStatus } from '../hooks';



const Dashboard = () => {
    const { ldrData, tempData, loading, error } = useSensorData();
    const { getLdrStatus } = useLdrStatus();

    // Debug logging
    console.log('🌡️ Dashboard - tempData:', tempData);
    console.log('💡 Dashboard - ldrData:', ldrData);
    console.log('⏳ Dashboard - loading:', loading);
    console.log('❌ Dashboard - error:', error);

    if (loading) {
        return (
            <View style={DashboardStyles.container}>
                <Header title="Dashboard" />
                <View style={[DashboardStyles.content, { justifyContent: 'center', alignItems: 'center' }]}>
                    <ActivityIndicator size="large" color="#DA0C15" />
                    <Text style={{ marginTop: 10 }}>Cargando datos de sensores...</Text>
                </View>
            </View>
        );
    }

    if (error) {
        return (
            <View style={DashboardStyles.container}>
                <Header title="Dashboard" />
                <View style={[DashboardStyles.content, { justifyContent: 'center', alignItems: 'center' }]}>
                    <Text style={{ color: '#DA0C15', textAlign: 'center', marginBottom: 10 }}>
                        Error al cargar datos de sensores
                    </Text>
                    <Text style={{ color: '#666', textAlign: 'center' }}>
                        {error}
                    </Text>
                </View>
            </View>
        );
    }
    return (        
            <View style={DashboardStyles.container}>
            <Header title="Dashboard" />
            <View style={DashboardStyles.content}>
                
                {/* Recuadro de Temperatura y Humedad */}
                <AnimatedContent>
                    <View style={DashboardStyles.sensorCard}>
                        <Text style={DashboardStyles.cardTitle}>Temperatura y Humedad</Text>
                        
                        <View style={DashboardStyles.dataRow}>
                            <Text style={DashboardStyles.dataLabel}>Temperatura del Recipiente</Text>
                            <Text style={DashboardStyles.dataValue}>
                                {tempData?.tempRecipient !== undefined && tempData?.tempRecipient !== null 
                                    ? `${Number(tempData.tempRecipient).toFixed(2)}°C` 
                                    : 'Sin datos'}
                            </Text>
                        </View>
                        
                        <View style={DashboardStyles.dataRow}>
                            <Text style={DashboardStyles.dataLabel}>Temperatura del Laboratorio</Text>
                            <Text style={DashboardStyles.dataValue}>
                                {tempData?.tempLab !== undefined && tempData?.tempLab !== null 
                                    ? `${tempData.tempLab}°C` 
                                    : 'Sin datos'}
                            </Text>
                        </View>
                        
                        <View style={DashboardStyles.lastDataRow}>
                            <Text style={DashboardStyles.dataLabel}>Humedad del Laboratorio</Text>
                            <Text style={DashboardStyles.dataValue}>
                                {tempData?.wetLab !== undefined && tempData?.wetLab !== null 
                                    ? `${tempData.wetLab}%` 
                                    : 'Sin datos'}
                            </Text>
                        </View>
                    </View>
                </AnimatedContent>

                {/* Recuadro de Luminosidad */}
                <AnimatedContent>
                    <View style={DashboardStyles.sensorCard}>
                        <Text style={DashboardStyles.cardTitle}>Sensor de Luminosidad</Text>
                        
                        <View style={DashboardStyles.dataRow}>
                            <Text style={DashboardStyles.dataLabel}>Valor LDR Actual</Text>
                            <Text style={DashboardStyles.dataValue}>
                                {ldrData?.ldr !== undefined && ldrData?.ldr !== null 
                                    ? `${ldrData.ldr}` 
                                    : 'Sin datos'}
                            </Text>
                        </View>
                        
                        <View style={DashboardStyles.dataRow}>
                            <Text style={DashboardStyles.dataLabel}>Valor Máximo</Text>
                            <Text style={DashboardStyles.dataValue}>
                                {ldrData?.ldrMax !== undefined && ldrData?.ldrMax !== null 
                                    ? `${ldrData.ldrMax}` 
                                    : 'Sin datos'}
                            </Text>
                        </View>
                        
                        <View style={DashboardStyles.lastDataRow}>
                            <Text style={DashboardStyles.dataLabel}>Valor Mínimo</Text>
                            <Text style={DashboardStyles.dataValue}>
                                {ldrData?.ldrMin !== undefined && ldrData?.ldrMin !== null 
                                    ? `${ldrData.ldrMin}` 
                                    : 'Sin datos'}
                            </Text>
                        </View>
                    </View>
                </AnimatedContent>

                {/* Estado de muestra con color de fondo dinámico */}
                <AnimatedContent>
                    <View style={[
                        DashboardStyles.sensorCard,
                        (ldrData?.ldr !== undefined && ldrData?.ldr !== null) 
                            ? getLdrStatus(ldrData.ldr).style 
                            : DashboardStyles.seguro
                    ]}>
                        <Text style={[DashboardStyles.cardTitle, { color: '#fff' }]}>
                            Estado de las Muestras
                        </Text>
                        
                        <View style={DashboardStyles.statusContainer}>
                            <View>
                                <Text style={DashboardStyles.statusText}>
                                    {(ldrData?.ldr !== undefined && ldrData?.ldr !== null) 
                                        ? getLdrStatus(ldrData.ldr).estado 
                                        : 'Verificando...'}
                                </Text>
                                <Text style={DashboardStyles.statusValue}>
                                    lightControl_001
                                </Text>
                            </View>
                            <Text style={DashboardStyles.statusText}>
                                {(ldrData?.ldr !== undefined && ldrData?.ldr !== null) 
                                    ? `LDR: ${ldrData.ldr}` 
                                    : 'Sin datos'}
                            </Text>
                        </View>
                    </View>
                </AnimatedContent>
                
            </View>
        </View>
    );
}


export default Dashboard;