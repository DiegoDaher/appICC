import { DashboardStyles } from '../../themes';

export const useLdrStatus = () => {
  const getLdrStatus = (ldr) => {
    if (!ldr && ldr !== 0) {
      return { 
        estado: 'Sin datos', 
        style: DashboardStyles.seguro,
        nivel: 'desconocido',
        description: 'No se pueden obtener datos del sensor'
      };
    }

    // Nuevos rangos según especificación:
    // - Inferior a 800: Seguro
    // - 800-900: Advertencia  
    // - Mayor a 900: Peligro
    
    if (ldr < 800) {
      return { 
        estado: 'Seguro', 
        style: DashboardStyles.seguro,
        nivel: 'seguro',
        description: 'Nivel de luminosidad seguro para las muestras'
      };
    }
    
    if (ldr >= 800 && ldr <= 900) {
      return { 
        estado: 'Advertencia', 
        style: DashboardStyles.advertencia,
        nivel: 'advertencia',
        description: 'Nivel de luminosidad en advertencia - Monitorear muestras'
      };
    }
    
    // ldr > 900
    return { 
      estado: 'Peligro', 
      style: DashboardStyles.peligro,
      nivel: 'peligro',
      description: 'Nivel de luminosidad peligroso - Las muestras están en riesgo'
    };
  };

  const getLdrColor = (ldr) => {
    const status = getLdrStatus(ldr);
    switch (status.nivel) {
      case 'seguro':
        return '#28A745'; // Verde
      case 'advertencia':
        return '#FFC107'; // Amarillo
      case 'peligro':
        return '#DC3545'; // Rojo
      default:
        return '#6C757D'; // Gris para sin datos
    }
  };

  const getLdrIcon = (ldr) => {
    const status = getLdrStatus(ldr);
    switch (status.nivel) {
      case 'seguro':
        return 'shield-check-outline';
      case 'advertencia':
        return 'alert-triangle-outline';
      case 'peligro':
        return 'alert-circle-outline';
      default:
        return 'help-circle-outline';
    }
  };

  return {
    getLdrStatus,
    getLdrColor,
    getLdrIcon,
  };
};
