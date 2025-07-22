import { useState, useCallback, useMemo } from 'react';

export const useModalMuestra = (sample) => {
  const [showQuimModal, setShowQuimModal] = useState(false);
  const [showBiomModal, setShowBiomModal] = useState(false);

  // Función para formatear fechas
  const formatDate = useCallback((dateString) => {
    if (!dateString) return 'N/A';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error(' Error al formatear fecha:', error);
      return 'Fecha inválida';
    }
  }, []);

  // Función para obtener color de estado
  const getStatusColor = useCallback((status) => {
    return status ? '#28A745' : '#FFC107';
  }, []);

  // Función para obtener texto de estado
  const getStatusText = useCallback((status) => {
    return status ? 'Completado' : 'En Proceso';
  }, []);

  // Determinar tipo de muestra y validaciones
  const sampleInfo = useMemo(() => {
    if (!sample) {
      console.log('🔍 ModalMuestra: No hay muestra disponible');
      return {
        isValid: false,
        tipo: null,
        isQuimica: false,
        isBiometria: false,
        displayId: 'N/A'
      };
    }

    const tipo = sample.tipoMuestra?.toLowerCase().replace(/\s+/g, '') || '';
    const isQuimica = tipo.includes('quimicasanguinea') || tipo.includes('quimica');
    const isBiometria = tipo.includes('biometriahematica') || tipo.includes('biometria');
    const displayId = sample._id ? sample._id.slice(-8) : 'N/A';

    console.log('🔍 ModalMuestra: Analizando muestra:', {
      id: displayId,
      tipo: sample.tipoMuestra,
      tipoNormalizado: tipo,
      isQuimica,
      isBiometria,
      status: sample.status
    });

    return {
      isValid: true,
      tipo,
      isQuimica,
      isBiometria,
      displayId,
      canRegisterResults: !sample.status && (isQuimica || isBiometria)
    };
  }, [sample]);

  // Función para manejar registro de resultados
  const handleRegistrarResultado = useCallback(() => {
    if (!sampleInfo.isValid || !sample?.tipoMuestra) {
      console.warn('⚠️ ModalMuestra: No se puede determinar el tipo de muestra');
      return;
    }

    if (sampleInfo.isQuimica) {
      console.log('🧪 ModalMuestra: Abriendo modal de Química Sanguínea para:', sampleInfo.displayId);
      setShowQuimModal(true);
    } else if (sampleInfo.isBiometria) {
      console.log('🩸 ModalMuestra: Abriendo modal de Biometría Hemática para:', sampleInfo.displayId);
      setShowBiomModal(true);
    } else {
      console.warn('⚠️ ModalMuestra: Tipo de muestra no reconocido:', sample.tipoMuestra);
    }
  }, [sampleInfo, sample]);

  // Funciones para cerrar modales
  const handleCloseQuimModal = useCallback(() => {
    console.log('🔒 ModalMuestra: Cerrando modal de Química Sanguínea');
    setShowQuimModal(false);
  }, []);

  const handleCloseBiomModal = useCallback(() => {
    console.log('🔒 ModalMuestra: Cerrando modal de Biometría Hemática');
    setShowBiomModal(false);
  }, []);

  // Preparar datos de la muestra para mostrar
  const sampleData = useMemo(() => {
    if (!sample) return null;

    return {
      id: sampleInfo.displayId,
      nombrePaciente: sample.nombrePaciente || 'N/A',
      tipoMuestra: sample.tipoMuestra || 'N/A',
      status: sample.status,
      statusColor: getStatusColor(sample.status),
      statusText: getStatusText(sample.status),
      createDate: formatDate(sample.createDate),
      observaciones: sample.observaciones,
      pedidoId: sample.pedidoId,
      qrValue: sample._id,
      hasObservaciones: Boolean(sample.observaciones),
      hasPedidoId: Boolean(sample.pedidoId),
      hasQrCode: Boolean(sample._id)
    };
  }, [sample, sampleInfo.displayId, getStatusColor, getStatusText, formatDate]);

  // Estado de modales para logging
  const modalStates = useMemo(() => {
    return {
      showQuimModal,
      showBiomModal,
      hasActiveModal: showQuimModal || showBiomModal
    };
  }, [showQuimModal, showBiomModal]);

  return {
    // Estados de modales
    showQuimModal,
    showBiomModal,
    modalStates,
    
    // Información de la muestra
    sampleInfo,
    sampleData,
    
    // Funciones de manejo
    handleRegistrarResultado,
    handleCloseQuimModal,
    handleCloseBiomModal,
    
    // Funciones de utilidad
    formatDate,
    getStatusColor,
    getStatusText
  };
};
