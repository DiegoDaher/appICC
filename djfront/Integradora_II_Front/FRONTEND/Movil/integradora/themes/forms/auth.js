import { StyleSheet } from 'react-native';

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'Montserrat',
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
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
  inputFocus: {
    borderColor: '#BF1E2D',
    borderWidth: 2,
    backgroundColor: '#fff',
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
  // Estilo para botón en estado de carga
  loadingButton: {
    backgroundColor: '#da0c15',
    borderColor: '#CCCCCC',
    borderWidth: 1,
    paddingVertical: 15,
    width: '100%',
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
    opacity: 0.7,
  },
  // Contenedor para texto y spinner
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Texto del botón cuando está cargando
  loadingText: {
    color: '#ffffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  linkText: {
    color: '#3b82f6',
    marginTop: 20,
  },
  // Mensajes de error
  errorContainer: {
    width: '100%',
    marginBottom: 15,
    minHeight: 20, // Espacio reservado para el mensaje
  },
  errorText: {
    color: '#DA0C15',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  // Mensaje de campos vacíos
  validationText: {
    color: '#DA0C15',
    fontSize: 13,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  // Mensaje de éxito
  successText: {
    color: '#28A745', // Verde para éxito
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  // Contenedor para mensajes de validación
  messageContainer: {
    width: '100%',
    marginBottom: 10,
    paddingVertical: 8,
    backgroundColor: '#FFEBEE',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#DA0C15',
  },
  // Mensaje de validación de campos vacíos
  validationErrorText: {
    color: '#DA0C15',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
    paddingHorizontal: 10,
  },
  logoBottom: {
    width: 120,
    height: 120,
    marginTop: 30,
  },
});
