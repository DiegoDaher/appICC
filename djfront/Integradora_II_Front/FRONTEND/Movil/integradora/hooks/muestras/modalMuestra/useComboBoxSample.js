import { useState, useEffect, useCallback } from 'react';

export const useComboBoxSample = (onSelect, selectedValue) => {
  const [selected, setSelected] = useState('quimica');

  // Opciones disponibles con sus metadatos (sin imágenes, se manejan en el componente)
  const options = [
    {
      key: 'biometria',
      value: 'biometria',
      label: 'Biometría Hemática',
      displayName: 'Biometria Hematica',
      imagePath: 'biometriahematica',
      alternativeNames: ['Biometria Hematica', 'Biometría Hemática']
    },
    {
      key: 'quimica',
      value: 'quimica', 
      label: 'Química Sanguínea',
      displayName: 'Quimica Sanguinea',
      imagePath: 'quimicasanguinea',
      alternativeNames: ['Quimica Sanguinea', 'Química Sanguínea']
    }
  ];

  // Función para convertir el nombre del análisis al valor interno
  const convertirNombreAValor = useCallback((nombreAnalisis) => {
    if (!nombreAnalisis) {
      console.log('🔄 ComboBox: No hay nombre de análisis, usando valor por defecto');
      return 'quimica';
    }

    console.log('🔄 ComboBox: Convirtiendo nombre:', nombreAnalisis);

    // Buscar en las opciones disponibles
    for (const option of options) {
      if (option.alternativeNames.includes(nombreAnalisis)) {
        return option.value;
      }
    }

    console.log('⚠️ ComboBox: Nombre no reconocido, usando valor por defecto');
    return 'quimica'; // Por defecto
  }, []);

  // Función para convertir el valor interno al nombre del análisis
  const convertirValorANombre = useCallback((valor) => {
    const option = options.find(opt => opt.value === valor);
    if (option) {
      console.log(`🔄 ComboBox: "${valor}" -> "${option.displayName}"`);
      return option.displayName;
    }
    
    console.log('⚠️ ComboBox: Valor no reconocido:', valor);
    return 'Quimica Sanguinea'; // Por defecto
  }, []);

  // Efecto para actualizar el valor seleccionado cuando cambia selectedValue
  useEffect(() => {
    if (selectedValue) {
      const valorConvertido = convertirNombreAValor(selectedValue);
      setSelected(valorConvertido);
      console.log('🔄 ComboBox: Valor externo recibido:', selectedValue, '->', valorConvertido);
    }
  }, [selectedValue, convertirNombreAValor]);

  // Función para manejar la selección
  const handleSelect = useCallback((option) => {
    console.log('👆 ComboBox: Opción seleccionada:', option);
    setSelected(option);
    
    const nombreAnalisis = convertirValorANombre(option);
    onSelect(nombreAnalisis);
    
    console.log('📤 ComboBox: Enviando al padre:', nombreAnalisis);
  }, [onSelect, convertirValorANombre]);

  // Función para obtener la configuración de una opción
  const getOptionConfig = useCallback((optionValue) => {
    return options.find(opt => opt.value === optionValue);
  }, []);

  // Función para verificar si una opción está seleccionada
  const isSelected = useCallback((optionValue) => {
    return selected === optionValue;
  }, [selected]);

  // Función para obtener estilos de opción
  const getOptionStyles = useCallback((optionValue, selectedStyle, unselectedStyle) => {
    return isSelected(optionValue) ? selectedStyle : unselectedStyle;
  }, [isSelected]);

  // Función para obtener estilos de texto
  const getTextStyles = useCallback((optionValue, selectedTextStyle, unselectedTextStyle) => {
    return isSelected(optionValue) ? selectedTextStyle : unselectedTextStyle;
  }, [isSelected]);

  console.log('🎯 ComboBox: Estado actual:', {
    selected,
    selectedValue,
    availableOptions: options.map(opt => opt.value)
  });

  return {
    selected,
    options,
    handleSelect,
    getOptionConfig,
    isSelected,
    getOptionStyles,
    getTextStyles,
    convertirNombreAValor,
    convertirValorANombre
  };
};
