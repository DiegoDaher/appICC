/**
 * Utilitarios para el manejo seguro de respuestas HTTP y JSON parsing
 */

/**
 * Intenta parsear una respuesta HTTP como JSON de manera segura
 * @param {Response} response - La respuesta HTTP de fetch
 * @param {string} defaultErrorMessage - Mensaje de error por defecto si no se puede parsear
 * @returns {Promise<Object>} - Objeto con datos parseados o información de error
 */
export const safeJsonParse = async (response, defaultErrorMessage = 'Error del servidor') => {
  try {
    // Verificar si la respuesta tiene contenido
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.warn('⚠️ La respuesta no es JSON, usando mensaje por defecto');
      return {
        success: false,
        message: `${defaultErrorMessage} (${response.status})`,
        data: null
      };
    }

    const data = await response.json();
    return {
      success: true,
      message: data.message || 'Operación exitosa',
      data: data
    };
  } catch (error) {
    console.warn('⚠️ No se pudo parsear la respuesta como JSON:', error.message);
    return {
      success: false,
      message: `${defaultErrorMessage} (${response.status})`,
      data: null
    };
  }
};

/**
 * Maneja respuestas de eliminación de manera consistente
 * @param {Response} response - La respuesta HTTP de fetch
 * @param {string} successMessage - Mensaje de éxito
 * @param {string} errorMessage - Mensaje de error por defecto
 * @returns {Promise<Object>} - Resultado de la operación
 */
export const handleDeleteResponse = async (response, successMessage = 'Elemento eliminado correctamente', errorMessage = 'Error al eliminar') => {
  if (response.ok) {
    console.log('✅', successMessage);
    return {
      success: true,
      message: successMessage
    };
  } else {
    const result = await safeJsonParse(response, errorMessage);
    console.error('❌ Error en eliminación:', result.message);
    return {
      success: false,
      message: result.message
    };
  }
};

/**
 * Maneja respuestas generales de API de manera consistente
 * @param {Response} response - La respuesta HTTP de fetch
 * @param {string} successMessage - Mensaje de éxito por defecto
 * @param {string} errorMessage - Mensaje de error por defecto
 * @returns {Promise<Object>} - Resultado de la operación con datos
 */
export const handleApiResponse = async (response, successMessage = 'Operación exitosa', errorMessage = 'Error en la operación') => {
  if (response.ok) {
    const result = await safeJsonParse(response, successMessage);
    if (result.success) {
      console.log('✅', result.message);
      return {
        success: true,
        message: result.message,
        data: result.data
      };
    } else {
      // Respuesta exitosa pero sin JSON válido (ej: 204 No Content)
      console.log('✅', successMessage);
      return {
        success: true,
        message: successMessage,
        data: null
      };
    }
  } else {
    const result = await safeJsonParse(response, errorMessage);
    console.error('❌ Error en API:', result.message);
    return {
      success: false,
      message: result.message,
      data: null
    };
  }
};
