import { useState, useMemo } from 'react';
import { filterData } from '../../utils/filterUtils';

export const usePedidosFilter = (pedidos) => {
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState(null);

  // Filtros disponibles
  const customFilters = ['En proceso', 'Completado', 'Cancelado'];

  // Función para obtener datos filtrados
  const getFilteredData = useMemo(() => {
    let filtered = pedidos;
    
    console.log('🔍 Pedidos totales:', pedidos.length);
    console.log('🔍 Filtro activo:', filter);
    console.log('🔍 Texto de búsqueda:', searchText);
    
    // Filtrar por estado solo si hay un filtro activo
    if (filter === 'En proceso') {
      filtered = filtered.filter(item => item.estado === 'pendiente');
    } else if (filter === 'Completado') {
      filtered = filtered.filter(item => item.estado === 'pagado');
    } else if (filter === 'Cancelado') {
      filtered = filtered.filter(item => item.estado === 'cancelado');
    }
    // Si filter es null, no se aplica filtro por estado (muestra todos)
    
    console.log('🔍 Pedidos después del filtro por estado:', filtered.length);
    
    // Filtrar por texto de búsqueda
    if (searchText) {
      filtered = filterData(filtered, searchText);
    }
    
    console.log('🔍 Pedidos después del filtro por texto:', filtered.length);
    
    return filtered;
  }, [pedidos, filter, searchText]);

  // Función para limpiar filtros
  const clearFilters = () => {
    setSearchText('');
    setFilter(null);
  };

  // Función para obtener el conteo por estado
  const getStatusCounts = useMemo(() => {
    const counts = {
      total: pedidos.length,
      pendiente: pedidos.filter(p => p.estado === 'pendiente').length,
      pagado: pedidos.filter(p => p.estado === 'pagado').length,
      cancelado: pedidos.filter(p => p.estado === 'cancelado').length,
    };
    
    return counts;
  }, [pedidos]);

  // Función para obtener el texto de estado del filtro
  const getFilterStatusText = () => {
    if (!filter) {
      return `Mostrando todos los pedidos (${pedidos.length} total)`;
    }
    
    return `Mostrando pedidos "${filter}" (${getFilteredData.length} de ${pedidos.length})`;
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
