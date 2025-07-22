import { useState } from 'react';

//Hook simple para manejar el estado del formulario de login/
const useLoginForm = () => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  //Limpiar todos los campos del formulario
  const clearForm = () => {
    setCorreo('');
    setContraseña('');
  };

  
// Validar que los campos no estén vacíos

  const isFormValid = () => {
    return correo.trim() !== '' && contraseña.trim() !== '';
  };

  return {
    // Estados
    correo,
    contraseña,
    
    // Funciones para cambiar estado
    setCorreo,
    setContraseña,
    
    // Utilidades
    clearForm,
    isFormValid
  };
};

export default useLoginForm;
