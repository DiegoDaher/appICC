import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

export const useBiometriaHematica = (visible, sample, onClose) => {
  const [resultados, setResultados] = useState({
    hemoglobina: '',
    hematocrito: '',
    eritrocitos: '',
    conMediaHb: '',
    volGlobularMedia: '',
    HBCorpuscularMedia: '',
    plaquetas: '',
    cuentaLeucocitaria: '',
    linfocitos: '',
    monocitos: '',
    segmentados: '',
    enBanda: '',
    neutrofilosT: '',
    eosinofilos: '',
    basofilos: '',
    observaciones: ''
  });

  const [loading, setLoading] = useState(false);

  // Cargar datos existentes cuando se abre el modal
  useEffect(() => {
    console.log('🩸 Cargando datos de biometría hemática...');
    if (visible && sample?.biometriaHematica) {
      const bioData = sample.biometriaHematica;
      const formulaRoja = bioData.formulaRoja || {};
      const formulaBlanca = bioData.formulaBlanca || {};
      
      setResultados({
        // Fórmula Roja
        hemoglobina: formulaRoja.hemoglobina?.toString() || '',
        hematocrito: formulaRoja.hematocrito?.toString() || '',
        eritrocitos: formulaRoja.eritrocitos?.toString() || '',
        conMediaHb: formulaRoja.conMediaHb?.toString() || '',
        volGlobularMedia: formulaRoja.volGlobularMedia?.toString() || '',
        HBCorpuscularMedia: formulaRoja.HBCorpuscularMedia?.toString() || '',
        plaquetas: formulaRoja.plaqutas?.toString() || '', // Nota: el API usa "plaqutas" sin 'e'
        // Fórmula Blanca
        cuentaLeucocitaria: formulaBlanca.cuentaLeucocitaria?.toString() || '',
        linfocitos: formulaBlanca.linfocitos?.toString() || '',
        monocitos: formulaBlanca.monocitos?.toString() || '',
        segmentados: formulaBlanca.segmentados?.toString() || '',
        enBanda: formulaBlanca.enBanda?.toString() || '',
        neutrofilosT: formulaBlanca.neutrofilosT?.toString() || '',
        eosinofilos: formulaBlanca.eosinofilos?.toString() || '',
        basofilos: formulaBlanca.basofilos?.toString() || '',
        observaciones: bioData.observaciones || ''
      });
    } else if (visible) {
      // Reset form if no existing data
      setResultados({
        hemoglobina: '',
        hematocrito: '',
        eritrocitos: '',
        conMediaHb: '',
        volGlobularMedia: '',
        HBCorpuscularMedia: '',
        plaquetas: '',
        cuentaLeucocitaria: '',
        linfocitos: '',
        monocitos: '',
        segmentados: '',
        enBanda: '',
        neutrofilosT: '',
        eosinofilos: '',
        basofilos: '',
        observaciones: ''
      });
      console.log('🆕 Formulario de biometría hemática resetado');
    }
  }, [visible, sample]);

  const handleInputChange = (field, value) => {
    setResultados(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateFields = () => {
    const requiredFields = [
      { key: 'hemoglobina', name: 'Hemoglobina' },
      { key: 'hematocrito', name: 'Hematocrito' },
      { key: 'eritrocitos', name: 'Eritrocitos' },
      { key: 'conMediaHb', name: 'Concentración Media de Hb' },
      { key: 'volGlobularMedia', name: 'Volumen Globular Medio' },
      { key: 'HBCorpuscularMedia', name: 'HB Corpuscular Media' },
      { key: 'plaquetas', name: 'Plaquetas' },
      { key: 'cuentaLeucocitaria', name: 'Cuenta Leucocitaria' },
      { key: 'linfocitos', name: 'Linfocitos' },
      { key: 'monocitos', name: 'Monocitos' },
      { key: 'segmentados', name: 'Segmentados' },
      { key: 'enBanda', name: 'En Banda' },
      { key: 'neutrofilosT', name: 'Neutrófilos Totales' },
      { key: 'eosinofilos', name: 'Eosinófilos' },
      { key: 'basofilos', name: 'Basófilos' }
    ];

    const emptyFields = requiredFields.filter(field => 
      !resultados[field.key] || resultados[field.key].trim() === ''
    );

    if (emptyFields.length > 0) {
      const fieldNames = emptyFields.map(field => field.name).join(', ');
      Alert.alert(
        'Campos Requeridos', 
        `Los siguientes campos son obligatorios: ${fieldNames}`
      );
      console.log(' Validación fallida - Campos vacíos:', emptyFields.map(f => f.key));
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!sample?._id) {
      Alert.alert('Error', 'No se encontró el ID de la muestra');
      return;
    }

    if (!validateFields()) {
      return;
    }

    setLoading(true);
    console.log('🚀 Guardando resultados de biometría hemática...');
    
    try {
      const token = await AsyncStorage.getItem('userToken');
      
      if (!token) {
        Alert.alert('Error', 'No se encontró el token de autenticación');
        setLoading(false);
        return;
      }

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
            plaqutas: resultados.plaquetas ? parseFloat(resultados.plaquetas) : null // Nota: API usa "plaqutas" sin 'e'
          },
          formulaBlanca: {
            cuentaLeucocitaria: resultados.cuentaLeucocitaria ? parseFloat(resultados.cuentaLeucocitaria) : null,
            linfocitos: resultados.linfocitos ? parseFloat(resultados.linfocitos) : null,
            monocitos: resultados.monocitos ? parseFloat(resultados.monocitos) : null,
            segmentados: resultados.segmentados ? parseFloat(resultados.segmentados) : null,
            enBanda: resultados.enBanda ? parseFloat(resultados.enBanda) : null,
            neutrofilosT: resultados.neutrofilosT ? parseFloat(resultados.neutrofilosT) : null,
            eosinofilos: resultados.eosinofilos ? parseFloat(resultados.eosinofilos) : null,
            basofilos: resultados.basofilos ? parseFloat(resultados.basofilos) : null
          },
          observaciones: resultados.observaciones || ''
        }
      };

      console.log('📤 Enviando datos:', formattedResults);

      const response = await fetch(`${API_URL}/muestras/resultados/${sample._id}`, {
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
        onClose();
      } else {
        const errorData = await response.json();
        console.error(' Error al guardar resultados de biometría hemática:', errorData);
        Alert.alert('Error', 'No se pudieron guardar los resultados');
      }
    } catch (error) {
      console.error(' Error de conexión al guardar biometría hemática:', error);
      Alert.alert('Error', 'Error de conexión al guardar los resultados');
    } finally {
      setLoading(false);
      console.log('🏁 Proceso de guardado finalizado');
    }
  };

  return {
    resultados,
    loading,
    handleInputChange,
    handleSubmit,
    validateFields
  };
};
