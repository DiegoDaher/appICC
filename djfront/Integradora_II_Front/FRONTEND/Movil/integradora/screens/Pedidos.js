import React from 'react';
import { SafeAreaView, View, Text, ActivityIndicator } from 'react-native';
import { SearchBar, FilterBar, TablaPedidos, Header } from '../components';
import { usePedidos, usePedidosFilter, usePedidosActions } from '../hooks';
import { displayStyles } from '../themes';

const OrdersScreen = () => {
  // Hook para datos de pedidos
  const {
    pedidos,
    loading,
    refreshing,
    error,
    deletePedido,
    updatePedidoEstado,
    onRefresh,
  } = usePedidos();

  // Hook para filtros
  const {
    searchText,
    setSearchText,
    filter,
    setFilter,
    customFilters,
    filteredData,
    getFilterStatusText,
  } = usePedidosFilter(pedidos);

  // Hook para acciones
  const {
    selectedOrder,
    handleView,
    handleCloseModal,
    handleDelete,
    handleCompletarPedido,
    handleCancelarPedido,
    handleNuevaMuestra,
  } = usePedidosActions(deletePedido, updatePedidoEstado);

  if (error) {
    return (
      <SafeAreaView style={displayStyles.safeArea}>
        <Header title="Pedidos" />
        <View style={displayStyles.errorContainer}>
          <Text style={displayStyles.errorText}>
            {error}
          </Text>
          <Text style={displayStyles.errorSubtext}>
            Toca para intentar nuevamente
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={displayStyles.safeArea}>
      <Header title="Pedidos" />
      <SearchBar 
        placeholder="Buscar Pedidos" 
        searchText={searchText} 
        onChangeSearch={setSearchText} 
      />
      <FilterBar 
        activeFilter={filter} 
        setFilter={setFilter} 
        filters={customFilters} 
      />
      
      {/* Indicador de estado de filtros */}
      <View style={displayStyles.filterStatusContainer}>
        <Text style={displayStyles.filterStatusText}>
          {getFilterStatusText()}
        </Text>
      </View>

      {loading ? (
        <View style={displayStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#DA0C15" />
          <Text style={displayStyles.loadingText}>Cargando pedidos...</Text>
        </View>
      ) : (
        <>
          {filteredData.length === 0 ? (
            <View style={displayStyles.emptyContainer}>
              <Text style={displayStyles.emptyText}>
                {pedidos.length === 0 ? 'No hay pedidos disponibles' : 'No se encontraron pedidos con los filtros aplicados'}
              </Text>
            </View>
          ) : (
            <TablaPedidos 
              data={filteredData} 
              onView={handleView} 
              onDelete={handleDelete}
              refreshing={refreshing}
              onRefresh={onRefresh}
              selectedOrder={selectedOrder}
              onCloseModal={handleCloseModal}
              onCompletarPedido={handleCompletarPedido}
              onCancelarPedido={handleCancelarPedido}
              onNuevaMuestra={handleNuevaMuestra}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default OrdersScreen;
