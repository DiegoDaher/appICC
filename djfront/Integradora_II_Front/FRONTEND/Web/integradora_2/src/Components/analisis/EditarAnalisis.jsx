import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { requireTokenOrRedirect } from '../../utils/auth';
import Swal from 'sweetalert2';

const EditarAnalisisForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const analisisData = location.state?.analisisSeleccionado;
  const [formData, setFormData] = useState({
    nombre: '',
    costo: '',
    diasEspera: '',
    descripcion: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  /*_________obtener token_________*/
  useEffect(() => {
    const tk = requireTokenOrRedirect();
    setToken(tk);
  }, []);

  useEffect(() => {
    /*_________precargar datos del análisis seleccionado_________*/
    if (analisisData) {
      setFormData({
        nombre: analisisData.nombre || '',
        costo: analisisData.costo || '',
        diasEspera: analisisData.diasEspera || '',
        descripcion: analisisData.descripcion || '',
      });
    } else {
      /*_________si no hay datos, redirigir a la página de análisis_________*/
      navigate('/Analisis');
    }
  }, [analisisData, navigate]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  /*_________enviar informacion_________ */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.costo || !formData.diasEspera) {
      setError('Por favor, completa todos los campos requeridos');
      return;
    }
    if (!analisisData?._id) {
      setError('No se encontró el ID del análisis');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/analisis/${analisisData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError('Sesión expirada, redirigiendo...');
          setTimeout(() => (window.location.href = '/'), 1500);
          return;
        }
        throw new Error('Error al actualizar el análisis');
      }
      const result = await response.json();
      console.log('Análisis actualizado:', result);
      await Swal.fire({
        title: "¡Actualizado Correctamente!",
        text: "El análisis ha sido actualizado exitosamente",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });
      /*_________Redirigir a la página de análisis_________*/
      navigate('/Analisis');
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Error al actualizar el análisis');
    } finally {
      setLoading(false);
    }
  };
  const handleCancel = () => {
    setFormData({
      nombre: '',
      costo: '',
      diasEspera: '',
      descripcion: '',
    });
    setError('');
  };

  return (
    <div className="container">
      <div className='scale-in-hor-center'>
        <div className="header">
          <h2 className="title">Editar Análisis</h2>
          <button className="btn cancel" onClick={handleCancel}>Cancelar</button>
          <Link to='/Analisis'>
            <button className='btn'>Regresar</button>
          </Link>  
        </div>
        <form className="form" onSubmit={handleSubmit}>
          {error && <p className="error-msg">{error}</p>}
          <label>Nombre</label>
          <input
            className="input-field"
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />

          <label>Costo</label>
          <input
            className="input-field"
            type="number"
            name="costo"
            value={formData.costo}
            onChange={handleChange}
            step="0.01"
          />

          <label>Días de espera</label>
          <input
            className="input-field"
            type="number"
            name="diasEspera"
            value={formData.diasEspera}
            onChange={handleChange}
          />

          <label>Descripción</label>
          <textarea
            className="input-field textarea"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
          />

          <div className="buttons">
            <button type="submit" className="btn submit" disabled={loading}>
              {loading ? 'Actualizando...' : 'Actualizar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarAnalisisForm;