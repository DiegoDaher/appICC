import { useCallback } from 'react';

export const useBarcodeScanner = (setScanned, fetchSampleById, openSampleModal) => {
  const handleBarCodeScanned = useCallback(({ type, data }) => {
    setScanned(true);
    console.log(`📱 Código escaneado (${type}): ${data}`);
    fetchSampleById(data).then((sample) => {
      if (sample) {
        openSampleModal();
      }
    });
  }, [setScanned, fetchSampleById, openSampleModal]);

  const handleManualCodeSubmit = useCallback((codigo) => {
    console.log('⌨️ Código ingresado manualmente:', codigo);
    fetchSampleById(codigo).then((sample) => {
      if (sample) {
        openSampleModal();
      }
    });
  }, [fetchSampleById, openSampleModal]);

  return {
    handleBarCodeScanned,
    handleManualCodeSubmit
  };
};
