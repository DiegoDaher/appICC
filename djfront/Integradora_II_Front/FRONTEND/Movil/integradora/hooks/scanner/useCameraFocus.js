import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export const useCameraFocus = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [scanned, setScanned] = useState(false);

  // Hook para manejar el enfoque de la pantalla
  useFocusEffect(
    useCallback(() => {
      // Cuando la pantalla se enfoca, activar la cámara
      console.log('📷 Pantalla de escáner enfocada - Activando cámara');
      setIsCameraActive(true);
      setScanned(false); // Reset del estado de escaneo

      // Cuando la pantalla se desenfoca, desactivar la cámara
      return () => {
        console.log('📷 Pantalla de escáner desenfocada - Desactivando cámara');
        setIsCameraActive(false);
      };
    }, [])
  );

  const handleScanAgain = useCallback(() => {
    console.log('🔄 Reiniciando escáner');
    setScanned(false);
    setIsCameraActive(true);
  }, []);

  return {
    isCameraActive,
    scanned,
    setScanned,
    handleScanAgain
  };
};
