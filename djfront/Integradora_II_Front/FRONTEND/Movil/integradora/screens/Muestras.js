import React from 'react';
import { SafeAreaView, View, Text, ActivityIndicator } from 'react-native';
import { SearchBar, FilterBar, TablaMuestras, Header, ModalMuestra } from '../components';
import { useMuestras, useMuestrasFilter, useMuestrasActions } from '../hooks';
import { displayStyles } from '../themes';


const MuestrasScreen = () => {
  // Hook para datos de muestras
  const {
    muestras,
    loading,
    refreshing,
    error,
    deleteMuestra,
    onRefresh,
  } = useMuestras();

  // Hook para filtros
  const {
    searchText,
    setSearchText,
    filter,
    setFilter,
    customFilters,
    filteredData,
    getFilterStatusText,
  } = useMuestrasFilter(muestras);

  // Hook para acciones
  const {
    selectedSample,
    showSampleModal,
    handleView,
    handleCloseModal,
    handleDelete,
  } = useMuestrasActions(deleteMuestra);

  if (error) {
    return (
      <SafeAreaView style={displayStyles.safeArea}>
        <Header title="Muestras" />
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
      <Header title="Muestras" />
      <SearchBar 
        placeholder="Buscar Muestras" 
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
          <Text style={displayStyles.loadingText}>Cargando muestras...</Text>
        </View>
      ) : (
        <>
          {filteredData.length === 0 ? (
            <View style={displayStyles.emptyContainer}>
              <Text style={displayStyles.emptyText}>
                {muestras.length === 0 ? 'No hay muestras disponibles' : 'No se encontraron muestras con los filtros aplicados'}
              </Text>
            </View>
          ) : (
            <TablaMuestras 
              data={filteredData} 
              onView={handleView} 
              onDelete={handleDelete}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          )}
        </>
      )}
      
      {/* Modal para detalles generales de muestra */}
      <ModalMuestra
        visible={showSampleModal}
        sample={selectedSample}
        onClose={handleCloseModal}
      />
    </SafeAreaView>
  );
};

export default MuestrasScreen;
