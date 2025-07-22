import { StyleSheet } from "react-native";

export const DashboardStyles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Contenedor principal gris
    sensorCard: {
        backgroundColor: '#F5F5F5',
        borderRadius: 15,
        padding: 20,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        width: '70%',
        // Elevation for Android
        elevation: 3,
    },
    // Título del recuadro
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        textAlign: 'center',
    },
    // Contenedor para cada fila de datos
    dataRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    // Última fila sin borde
    lastDataRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    // Etiqueta del dato (lado izquierdo)
    dataLabel: {
        fontSize: 14,
        color: '#666',
        flex: 1,
    },
    // Valor del dato (lado derecho)
    dataValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'right',
        minWidth: 80,
    },
    // Estilos para el estado de luminosidad
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 0, // Sin padding adicional porque el color ya está en sensorCard
    },
    statusText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    statusValue: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.9,
    },
    // Estados de seguridad
    seguro: {
        backgroundColor: '#28A745', // Verde
    },
    advertencia: {
        backgroundColor: '#FFC107', // Amarillo
    },
    peligro: {
        backgroundColor: '#DC3545', // Rojo
    },
    // Estilos legacy para compatibilidad
    caja:{
        marginTop:20,
        paddingVertical:25,
        paddingHorizontal:30,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6,
    },
    ctemperatura:{
        backgroundColor:'#FD908B',
    },
    chumedad:{
        backgroundColor:'#FFC7BC',
    },
    cmuestra:{
        backgroundColor:'#DA9409',
    },
    cprecaucion:{
        backgroundColor:'#76F058',
    },
    TextoAlerta:{
        marginTop:20,
        fontSize:20,
        fontWeight:'bold',
        textDecorationStyle:'double',
    }
})