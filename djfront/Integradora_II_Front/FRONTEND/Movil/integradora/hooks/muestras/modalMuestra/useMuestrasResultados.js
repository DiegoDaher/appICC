import { useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

export const useMuestrasResultados = () => {
  const [loading, setLoading] = useState(false);

  // Función para guardar resultados de química sanguínea
  const guardarQuimicaSanguinea = async (muestraId, resultados) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      
      if (!token) {
        Alert.alert('Error', 'No se encontró el token de autenticación');
        return false;
      }

      console.log('💾 Guardando resultados de química sanguínea para muestra:', muestraId);

      // Convertir strings a números donde sea necesario
      const formattedResults = {
        quimicaSanguinea: {
          glucosa: resultados.glucosa ? parseFloat(resultados.glucosa) : null,
          glucosaPost: resultados.glucosaPost ? parseFloat(resultados.glucosaPost) : null,
          acidoUrico: resultados.acidoUrico ? parseFloat(resultados.acidoUrico) : null,
          urea: resultados.urea ? parseFloat(resultados.urea) : null,
          creatinina: resultados.creatinina ? parseFloat(resultados.creatinina) : null,
          colesterol: resultados.colesterol ? parseFloat(resultados.colesterol) : null,
          LDR: resultados.LDR ? parseFloat(resultados.LDR) : null,
          gGT: resultados.gGT ? parseFloat(resultados.gGT) : null,
          trigliceridos: resultados.trigliceridos ? parseFloat(resultados.trigliceridos) : null,
          observaciones: resultados.observaciones || ''
        }
      };

      console.log('📊 Datos formateados a enviar:', formattedResults);

      const response = await fetch(`${API_URL}/muestras/resultados/${muestraId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formattedResults),
      });

      if (response.ok) {
        Alert.alert('Éxito', 'Los resultados se han guardado correctamente');
        return true;
      } else {
        const errorData = await response.json();
        console.error(' Error al guardar resultados:', errorData);
        Alert.alert('Error', 'No se pudieron guardar los resultados');
        return false;
      }
    } catch (error) {
      console.error(' Error al guardar resultados:', error);
      Alert.alert('Error', 'Error de conexión al guardar los resultados');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Función para guardar resultados de biometría hemática
  const guardarBiometriaHematica = async (muestraId, resultados) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      
      if (!token) {
        Alert.alert('Error', 'No se encontró el token de autenticación');
        return false;
      }

      console.log('💾 Guardando resultados de biometría hemática para muestra:', muestraId);

      // Formatear los resultados según la estructura esperada por el API
      const formattedResults = {
        biometriaHematica: {
          formulaRoja: {
            hemoglobina: resultados.hemoglobina ? parseFloat(resultados.hemoglobina) : null,
            hematocrito: resultados.hematocrito ? parseFloat(resultados.hematocrito) : null,
            eritrocitos: resultados.eritrocitos ? parseFloat(resultados.eritrocitos) : null,
            conMediaHb: resultados.conMediaHb ? parseFloat(resultados.conMediaHb) : null,
            volGlobularMedia: resultados.volGlobularMedia ? parseFloat(resultados.volGlobularMedia) : null,
            HBCorpuscularMedia: resultados.HBCorpuscularMedia ? parseFloat(resultados.HBCorpuscularMedia) : null,
            plaqutas: resultados.plaquetas ? parseFloat(resultados.plaquetas) : null, // Nota: API usa "plaqutas" sin 'e'
          },
          formulaBlanca: {
            cuentaLeucocitaria: resultados.cuentaLeucocitaria ? parseFloat(resultados.cuentaLeucocitaria) : null,
            linfocitos: resultados.linfocitos ? parseFloat(resultados.linfocitos) : null,
            monocitos: resultados.monocitos ? parseFloat(resultados.monocitos) : null,
            segmentados: resultados.segmentados ? parseFloat(resultados.segmentados) : null,
            enBanda: resultados.enBanda ? parseFloat(resultados.enBanda) : null,
            neutrofilosT: resultados.neutrofilosT ? parseFloat(resultados.neutrofilosT) : null,
            eosinofilos: resultados.eosinofilos ? parseFloat(resultados.eosinofilos) : null,
            basofilos: resultados.basofilos ? parseFloat(resultados.basofilos) : null,
          },
          observaciones: resultados.observaciones || ''
        }
      };

      console.log('📊 Datos formateados a enviar:', formattedResults);

      const response = await fetch(`${API_URL}/muestras/resultados/${muestraId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formattedResults),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('✅ Resultados de biometría hemática guardados exitosamente:', responseData);
        Alert.alert('Éxito', 'Los resultados se han guardado correctamente');
        return true;
      } else {
        const errorData = await response.json();
        console.error(' Error al guardar resultados:', errorData);
        Alert.alert('Error', 'No se pudieron guardar los resultados');
        return false;
      }
    } catch (error) {
      console.error(' Error al guardar resultados:', error);
      Alert.alert('Error', 'Error de conexión al guardar los resultados');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener resultados existentes de una muestra
  const obtenerResultados = async (muestraId) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      
      if (!token) {
        console.error('No se encontró token de autenticación');
        return null;
      }

      console.log('📋 Obteniendo resultados para muestra:', muestraId);

      const response = await fetch(`${API_URL}/muestras/${muestraId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Resultados obtenidos:', data);
        return data;
      } else {
        console.error(' Error al obtener resultados:', response.status);
        return null;
      }
    } catch (error) {
      console.error(' Error al obtener resultados:', error);
      return null;
    }
  };

  return {
    loading,
    guardarQuimicaSanguinea,
    guardarBiometriaHematica,
    obtenerResultados,
  };
};
