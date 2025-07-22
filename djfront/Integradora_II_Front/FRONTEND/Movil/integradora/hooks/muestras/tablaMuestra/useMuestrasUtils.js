import { useCallback } from 'react';

export const useMuestrasUtils = () => {
  const getImageSource = useCallback((tipoMuestra) => {
    if (!tipoMuestra) {
      // eslint-disable-next-line
      return require('../../../assets/biometriahematica.png'); // imagen por defecto
    }
    
    const tipo = tipoMuestra.toLowerCase().replace(/\s+/g, '');
    
    if (tipo.includes('quimicasanguinea') || tipo.includes('quimica')) {
      // eslint-disable-next-line
      return require('../../../assets/quimicasanguinea.png');
    } else if (tipo.includes('biometriahematica') || tipo.includes('biometria')) {
      // eslint-disable-next-line
      return require('../../../assets/biometriahematica.png');
    } else {
      // eslint-disable-next-line
      return require('../../../assets/biometriahematica.png'); // imagen por defecto
    }
  }, []);

  const getStatusColor = useCallback((status) => {
    return status ? '#28A745' : '#FFC107'; // Verde para completado, amarillo para en proceso
  }, []);

  const getStatusText = useCallback((status) => {
    return status ? 'Completado' : 'En Proceso';
  }, []);

  const formatDate = useCallback((dateString) => {
    if (!dateString) return 'Sin fecha';
    
    try {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString().slice(-2);
      return `${day}/${month}/${year}`;
    } catch {
      return 'Fecha inválida';
    }
  }, []);

  return {
    getImageSource,
    getStatusColor,
    getStatusText,
    formatDate
  };
};
