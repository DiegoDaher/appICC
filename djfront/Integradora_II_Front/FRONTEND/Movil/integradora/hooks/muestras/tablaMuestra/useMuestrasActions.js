import { useState } from 'react';
import { Alert } from 'react-native';
import { fetchWithAuth } from '../../../utils/apiInterceptor';
import { API_URL } from '@env';

export const useMuestrasActions = (deleteMuestra) => {
  const [selectedSample, setSelectedSample] = useState(null);
  const [showSampleModal, setShowSampleModal] = useState(false);

  const handleView = (item) => {
    console.log('👁️ Viewing sample:', item._id);
    setSelectedSample(item);
    setShowSampleModal(true);
  };

  const handleCloseModal = () => {
    setShowSampleModal(false);
    setSelectedSample(null);
  };

  const handleDelete = async (item) => {
    // Determinar el ID correcto - puede ser un string directo o un objeto
    let sampleId;
    let itemData = {};
    
    if (typeof item === 'string') {
      // Si item es un string, es el ID directamente
      sampleId = item.replace(/"/g, ''); // Remover comillas si las tiene
      console.log('🗑️ Iniciando eliminación con ID string:', sampleId);
    } else if (typeof item === 'object' && item !== null) {
      // Si item es un objeto, extraer el ID
      sampleId = item._id || item.id;
      itemData = item;
      console.log('🗑️ Iniciando eliminación con objeto:', { sampleId, item: JSON.stringify(item, null, 2) });
    } else {
      console.error('❌ Tipo de item no válido:', typeof item, item);
      Alert.alert('Error', 'No se pudo identificar la muestra a eliminar');
      return;
    }
    
    if (!sampleId) {
      console.error('❌ No se encontró ID de muestra válido');
      Alert.alert('Error', 'No se pudo identificar la muestra a eliminar');
      return;
    }
    
    // Mostrar alerta de confirmación
    Alert.alert(
      "Confirmar eliminación",
      `¿Estás seguro de que quieres eliminar esta muestra?\n\nPaciente: ${itemData.nombrePaciente || 'N/A'}\nTipo: ${itemData.tipoMuestra || 'N/A'}\nID: ${sampleId?.slice?.(-8) || sampleId}\n\nEsta acción no se puede deshacer.`,
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              console.log(`🚀 Eliminando muestra con ID: ${sampleId}`);
              
              // Usar fetchWithAuth que maneja automáticamente la autenticación
              const response = await fetchWithAuth(`${API_URL}/muestras/${sampleId}`, {
                method: 'DELETE'
              });

              if (response.status === 401) {
                // Error 401 manejado automáticamente por fetchWithAuth
                return;
              }

              if (response.ok) {
                console.log('✅ Muestra eliminada exitosamente');
                
                // Ejecutar callback inmediatamente sin mostrar alerta
                if (deleteMuestra) {
                  console.log(`🔄 Ejecutando callback con ID: ${sampleId}`);
                  await deleteMuestra(sampleId);
                }
              } else {
                // Manejar errores del servidor
                let errorMessage = `Error del servidor (${response.status})`;
                
                // Solo intentar parsear JSON si la respuesta tiene contenido
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                  try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                    console.error('❌ Error del servidor:', errorData);
                  } catch {
                    console.warn('⚠️ No se pudo parsear la respuesta de error como JSON');
                  }
                }
                
                Alert.alert('Error del servidor', errorMessage);
              }
            } catch (error) {
              console.error('❌ Error al eliminar muestra:', error);
              Alert.alert('Error', 'Error de conexión al eliminar la muestra');
            }
          }
        }
      ]
    );
  };

  return {
    selectedSample,
    showSampleModal,
    handleView,
    handleCloseModal,
    handleDelete,
  };
};
