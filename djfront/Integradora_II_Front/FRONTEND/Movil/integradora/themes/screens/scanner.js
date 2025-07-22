import { StyleSheet } from 'react-native';

export const scannerStyles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    margin: 20,
  },
  containerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
  },
  cameraContainer: { 
    width: '100%', 
    height: 300, 
    borderRadius: 20, 
    overflow: 'hidden',
    marginHorizontal: 20,
    backgroundColor: '#000',
  },
  camera: { 
    flex: 1,
  },
  cameraInactive: {
    flex: 1,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraInactiveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  button: {
    marginTop: 20, 
    backgroundColor: '#DA0C15',
    padding: 14, 
    borderRadius: 10 
  },
  buttonText: { 
    color: '#fff', 
    textAlign: 'center', 
    fontWeight: 'bold' 
  },
  loadingContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
});
