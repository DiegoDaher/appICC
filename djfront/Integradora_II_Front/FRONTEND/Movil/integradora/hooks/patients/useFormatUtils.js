import { useCallback } from 'react';

export const useFormatUtils = () => {
  const formatDate = useCallback((dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }, []);

  const formatTipoMuestra = useCallback((tipo) => {
    if (!tipo) return 'N/A';
    if (tipo.toLowerCase().includes('quimicasanguinea')) return 'Química Sanguínea';
    if (tipo.toLowerCase().includes('biometriahematica')) return 'Biometría Hemática';
    return tipo;
  }, []);

  const getImageSource = useCallback((tipoMuestra) => {
    if (!tipoMuestra) {
      // eslint-disable-next-line
      return require('../../assets/biometriahematica.png');
    }
    const tipo = tipoMuestra.toLowerCase().replace(/\s+/g, '');
    if (tipo.includes('quimicasanguinea') || tipo.includes('quimica')) {
      // eslint-disable-next-line
      return require('../../assets/quimicasanguinea.png');
    } else if (tipo.includes('biometriahematica') || tipo.includes('biometria')) {
      // eslint-disable-next-line
      return require('../../assets/biometriahematica.png');
    } else {
      // eslint-disable-next-line
      return require('../../assets/biometriahematica.png');
    }
  }, []);

  return {
    formatDate,
    formatTipoMuestra,
    getImageSource
  };
};
