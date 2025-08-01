import { StyleSheet } from 'react-native';

export const modalStyles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  backArrow: {
    marginBottom: 10,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  idText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#DA0C15',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    paddingBottom: 5,
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
    marginTop: 8,
    color: '#333',
  },
  value: {
    fontSize: 14,
    marginBottom: 5,
    color: '#555',
  },
  analysisItem: {
    backgroundColor: '#F9F9F9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  analysisName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  analysisPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DA0C15',
    marginBottom: 4,
  },
  analysisDescription: {
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
  },
  financialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  totalLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  totalValue: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#DA0C15',
  },
  pending: {
    color: '#F59E0B',
    fontWeight: '600',
  },
  paid: {
    color: '#10B981',
    fontWeight: '600',
  },
  completed: {
    color: '#10B981',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 10,
  },
  completarButton: {
    backgroundColor: '#28A745',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 5,
  },
  cancelarButton: {
    borderWidth: 1,
    borderColor: '#DA0C15',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginLeft: 5,
  },
  // Estilo para botón en estado de carga
  loadingButton: {
    borderWidth: 1,
    borderColor: '#DA0C15',
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginLeft: 5,
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
    color: '#999999',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  registrarButton: {
    backgroundColor: '#DA0C15',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonIcon: {
    marginRight: 8,
  },
  button: {
    backgroundColor: '#DA0C15',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  buttonTextCancelar: {
    color: '#DA0C15',
    fontWeight: '600',
    fontSize: 16,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
