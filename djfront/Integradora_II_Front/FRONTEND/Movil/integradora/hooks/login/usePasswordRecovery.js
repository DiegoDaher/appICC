import { useState } from 'react';
import { API_URL } from '@env';


const usePasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

// Validar que el email no esté vacío y tenga formato válido
  const isEmailValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email.trim() !== '' && emailRegex.test(email.trim());
  };


// Enviar solicitud de recuperación de contraseña
  const sendRecoveryRequest = async () => {
    if (!isEmailValid()) {
      setErrorMessage('Por favor, ingresa tu correo electrónico');
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage('');
      setSuccessMessage('');

      const response = await fetch(`${API_URL}/usuarios/forget`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ correo: email }),
      });

      const responseText = await response.text();
      
      if (response.ok) {
        let responseData;
        try {
          responseData = JSON.parse(responseText);
        } catch {
          responseData = { message: responseText };
        }

        setSuccessMessage(
          responseData.message || 'Se ha enviado un código de recuperación a tu correo electrónico'
        );
        
        // Limpiar el campo después del éxito
        setEmail('');
      } else if (response.status === 404) {
        setErrorMessage('No se encontró una cuenta con este correo electrónico');
      } else {
        setErrorMessage('No se pudo enviar el código de recuperación. Intenta de nuevo.');
      }
    } catch (error) {
      console.error('Recovery error:', error);
      
      if (error.name === 'TypeError' && error.message.includes('Network request failed')) {
        setErrorMessage('No se pudo conectar con el servidor. Verifica tu conexión a internet.');
      } else {
        setErrorMessage('Algo salió mal. Por favor, intenta de nuevo.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    isEmailValid,
    sendRecoveryRequest,
    isLoading,
    errorMessage,
    successMessage,
    clearMessages: () => {
      setErrorMessage('');
      setSuccessMessage('');
    }
  };
};

export default usePasswordRecovery;
