import { useState, useCallback } from 'react';

export const useScannerModals = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [sampleModalVisible, setSampleModalVisible] = useState(false);

  const openCodeModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  const closeCodeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const openSampleModal = useCallback(() => {
    setSampleModalVisible(true);
  }, []);

  const closeSampleModal = useCallback(() => {
    setSampleModalVisible(false);
  }, []);

  return {
    modalVisible,
    sampleModalVisible,
    openCodeModal,
    closeCodeModal,
    openSampleModal,
    closeSampleModal
  };
};
