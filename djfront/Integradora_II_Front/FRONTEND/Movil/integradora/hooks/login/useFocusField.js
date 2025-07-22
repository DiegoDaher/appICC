import { useState } from 'react';

const useFocusField = () => {
  const [focusedField, setFocusedField] = useState(null);

  const setFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const clearFocus = () => {
    setFocusedField(null);
  };

  const isFocused = (fieldName) => {
    return focusedField === fieldName;
  };

  const getFieldStyle = (fieldName, baseStyle, focusStyle, additionalStyles = {}) => {
    const styles = [baseStyle];
    
    if (isFocused(fieldName)) {
      styles.push(focusStyle);
    }
    
    // Agregar estilos adicionales (como disabled, error, etc.)
    Object.keys(additionalStyles).forEach(key => {
      if (additionalStyles[key]) {
        styles.push(additionalStyles[key]);
      }
    });
    
    return styles;
  };

  return {
    focusedField,
    setFocus,
    clearFocus,
    isFocused,
    getFieldStyle
  };
};

export default useFocusField;
