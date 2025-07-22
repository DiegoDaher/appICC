import { useState, useCallback } from 'react';

export const useModalMuestrasAdmin = () => {
  const [selectedSample, setSelectedSample] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleViewSample = useCallback((sample, onView) => {
    setSelectedSample(sample);
    setModalVisible(true);
    // También ejecutar la función onView si existe
    if (onView) {
      onView(sample);
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
    setSelectedSample(null);
  }, []);

  return {
    selectedSample,
    modalVisible,
    handleViewSample,
    handleCloseModal
  };
};
