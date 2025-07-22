import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ModalCodigo, Header, ModalMuestra } from '../components';
import { CameraView } from 'expo-camera';
import { 
  useCameraPermissions, 
  useCameraFocus, 
  useSampleFetch, 
  useScannerModals, 
  useBarcodeScanner 
} from '../hooks';
import { scannerStyles } from '../themes';

const Escaner = () => {
  // Hooks para funcionalidad del scanner
  const { hasPermission } = useCameraPermissions();
  const { isCameraActive, scanned, setScanned, handleScanAgain } = useCameraFocus();
  const { currentSample, loading, fetchSampleById, clearCurrentSample } = useSampleFetch();
  const { 
    modalVisible, 
    sampleModalVisible, 
    openCodeModal, 
    closeCodeModal, 
    openSampleModal, 
    closeSampleModal 
  } = useScannerModals();
  
  const { handleBarCodeScanned, handleManualCodeSubmit } = useBarcodeScanner(
    setScanned, 
    fetchSampleById, 
    openSampleModal
  );

  const handleCloseSampleModal = () => {
    closeSampleModal();
    clearCurrentSample();
  };

  const handleManualSubmit = (codigo) => {
    closeCodeModal();
    handleManualCodeSubmit(codigo);
  };

  if (hasPermission === null) return <Text>Solicitando permisos...</Text>;
  if (hasPermission === false) return <Text>Permiso de cámara denegado</Text>;

  return (
    <View style={scannerStyles.container}>
      <Header title="Escanear Código" />
      <Text style={scannerStyles.header}>Escanea el código QR de la muestra</Text>
      
      <View style={scannerStyles.containerView}>
      <View style={scannerStyles.cameraContainer}>
        {isCameraActive ? (
          <CameraView
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ['qr', 'pdf417'],
            }}
            style={scannerStyles.camera}
          />
        ) : (
          <View style={scannerStyles.cameraInactive}>
            <Text style={scannerStyles.cameraInactiveText}>
              Cámara inicializando...
            </Text>
          </View>
        )}
      </View>
      
      {scanned && (
        <TouchableOpacity style={scannerStyles.button} onPress={handleScanAgain}>
          <Text style={scannerStyles.buttonText}>Escanear de nuevo</Text>
        </TouchableOpacity>
      )}
      
      <TouchableOpacity style={scannerStyles.button} onPress={openCodeModal}>
        <Text style={scannerStyles.buttonText}>Ingresar código manualmente</Text>
      </TouchableOpacity>

      {loading && (
        <View style={scannerStyles.loadingContainer}>
          <Text style={scannerStyles.loadingText}>Buscando muestra...</Text>
        </View>
      )}

      {/* Modal para ingresar código manualmente */}
      <ModalCodigo
        isVisible={modalVisible}
        onClose={closeCodeModal}
        onSubmit={handleManualSubmit}
      />

      {/* Modal para mostrar información de la muestra */}
      <ModalMuestra
        visible={sampleModalVisible}
        sample={currentSample}
        onClose={handleCloseSampleModal}
        showRegisterButton={true}
      />
      </View>
    </View>
  );
};

export default Escaner;
