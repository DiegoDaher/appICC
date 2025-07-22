import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

export const useQuimicaSanguinea = (visible, sample, onClose) => {
  const [resultados, setResultados] = useState({
    glucosa: '',
    glucosaPost: '',
    acidoUrico: '',
    urea: '',
    creatinina: '',
    colesterol: '',
    LDR: '',
    gGT: '',
    trigliceridos: '',
    observaciones: ''
  });

  const [loading, setLoading] = useState(false);

  // Cargar datos existentes cuando se abre el modal
  useEffect(() => {
    console.log('🧪 Cargando datos de química sanguínea...');
    if (visible && sample?.quimicaSanguinea) {
      const quimicaData = sample.quimicaSanguinea;
      setResultados({
        glucosa: quimicaData.glucosa?.toString() || '',
        glucosaPost: quimicaData.glucosaPost?.toString() || '',
        acidoUrico: quimicaData.acidoUrico?.toString() || '',
        urea: quimicaData.urea?.toString() || '',
        creatinina: quimicaData.creatinina?.toString() || '',
        colesterol: quimicaData.colesterol?.toString() || '',
        LDR: quimicaData.LDR?.toString() || '',
        gGT: quimicaData.gGT?.toString() || '',
        trigliceridos: quimicaData.trigliceridos?.toString() || '',
        observaciones: quimicaData.observaciones || ''
      });
      console.log('✅ Datos de química sanguínea cargados');
    } else if (visible) {
      // Reset form if no existing data
      setResultados({
        glucosa: '',
        glucosaPost: '',
        acidoUrico: '',
        urea: '',
        creatinina: '',
        colesterol: '',
        LDR: '',
        gGT: '',
        trigliceridos: '',
        observaciones: ''
      });
      console.log('🆕 Formulario de química sanguínea resetado');
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
      { key: 'glucosa', name: 'Glucosa' },
      { key: 'glucosaPost', name: 'Glucosa Post' },
      { key: 'acidoUrico', name: 'Ácido Úrico' },
      { key: 'urea', name: 'Urea' },
      { key: 'creatinina', name: 'Creatinina' },
      { key: 'colesterol', name: 'Colesterol Total' },
      { key: 'LDR', name: 'LDR' },
      { key: 'gGT', name: 'GGT' },
      { key: 'trigliceridos', name: 'Triglicéridos' }
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

    console.log('✅ Validación exitosa - Todos los campos requeridos completados');
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
    console.log('🚀 Guardando resultados de química sanguínea...');
    
    try {
      const token = await AsyncStorage.getItem('userToken');
      
      if (!token) {
        Alert.alert('Error', 'No se encontró el token de autenticación');
        setLoading(false);
        return;
      }

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
        const responseData = await response.json();
        console.log('✅ Resultados de química sanguínea guardados exitosamente:', responseData);
        Alert.alert('Éxito', 'Los resultados se han guardado correctamente');
        onClose();
      } else {
        const errorData = await response.json();
        console.error(' Error al guardar resultados de química sanguínea:', errorData);
        Alert.alert('Error', 'No se pudieron guardar los resultados');
      }
    } catch (error) {
      console.error(' Error de conexión al guardar química sanguínea:', error);
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
