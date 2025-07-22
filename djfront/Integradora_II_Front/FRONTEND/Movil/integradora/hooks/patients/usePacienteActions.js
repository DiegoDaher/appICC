import { useCallback } from 'react';

export const usePacienteActions = () => {
  const handleView = useCallback((item) => {
    console.log('👁️ Ver muestra:', item._id || item.id);
    // Aquí se puede agregar lógica adicional para ver la muestra
  }, []);

  const handleDelete = useCallback((item) => {
    console.log('🗑️ Eliminar/Descargar muestra:', item._id || item.id);
    // Aquí se puede agregar lógica adicional para eliminar o descargar
  }, []);

  return {
    handleView,
    handleDelete,
  };
};
