import { useCallback } from 'react';

export const useFilterBar = (activeFilter, setFilter) => {
  const handleFilterPress = useCallback((filter) => {
    // Si el filtro ya está activo, lo desactivamos (setFilter a null)
    // Si no está activo, lo activamos
    if (activeFilter === filter) {
      setFilter(null); // Desactivar filtro
    } else {
      setFilter(filter); // Activar filtro
    }
  }, [activeFilter, setFilter]);

  const isFilterActive = useCallback((filter) => {
    return filter === activeFilter;
  }, [activeFilter]);

  return {
    handleFilterPress,
    isFilterActive,
  };
};
