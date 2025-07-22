import { useState, useMemo } from 'react';
import { filterData } from '../../../utils/filterUtils';

export const useMuestrasFilter = (muestras) => {
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState(null);

  // Filtros disponibles
  const customFilters = ['En proceso', 'Completado'];

  // Función para obtener datos filtrados
  const getFilteredData = useMemo(() => {
    if (!muestras || !Array.isArray(muestras)) {
      return [];
    }

    let filtered = muestras;
    
    console.log('🔍 Muestras totales:', muestras.length);
    console.log('🔍 Filtro activo:', filter);
    console.log('🔍 Texto de búsqueda:', searchText);
    
    // Filtrar por status solo si hay un filtro activo
    if (filter === 'En proceso') {
      filtered = filtered.filter(item => !item.status);
    } else if (filter === 'Completado') {
      filtered = filtered.filter(item => item.status);
    }
    // Si filter es null, no se aplica filtro por status (muestra todas)
    
    console.log('🔍 Muestras después del filtro por status:', filtered.length);
    
    // Filtrar por texto de búsqueda
    if (searchText) {
      filtered = filterData(filtered, searchText);
    }
    
    console.log('🔍 Muestras después del filtro por texto:', filtered.length);
    
    return filtered;
  }, [muestras, filter, searchText]);

  // Función para limpiar filtros
  const clearFilters = () => {
    setSearchText('');
    setFilter(null);
  };

  // Función para obtener el conteo por status
  const getStatusCounts = useMemo(() => {
    if (!muestras || !Array.isArray(muestras)) {
      return {
        total: 0,
        enProceso: 0,
        completado: 0,
      };
    }

    const counts = {
      total: muestras.length,
      enProceso: muestras.filter(m => !m.status).length,
      completado: muestras.filter(m => m.status).length,
    };
    
    return counts;
  }, [muestras]);

  // Función para obtener el texto de estado del filtro
  const getFilterStatusText = () => {
    if (!muestras || !Array.isArray(muestras)) {
      return 'Sin datos de muestras';
    }

    if (!filter) {
      return `Mostrando todas las muestras (${muestras.length} total)`;
    }
    
    return `Mostrando muestras "${filter}" (${getFilteredData.length} de ${muestras.length})`;
  };

  return {
    searchText,
    setSearchText,
    filter,
    setFilter,
    customFilters,
    filteredData: getFilteredData,
    clearFilters,
    getStatusCounts,
    getFilterStatusText,
  };
};
