import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const NuevoAnalisisForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    costo: '',
    diasEspera: '',
    descripcion: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    /*_________Simula el dato inicial de la informacion_________*/
    const initialData = {
      nombre: 'Análisis de Sangre',
      costo: '500.00',
      diasEspera: '2',
      descripcion: '',
    };
    setFormData(initialData);
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.costo || !formData.diasEspera) {
      setError('Por favor, completa todos los campos requeridos');
    } else {
      setError('');
      console.log('Datos enviados:', formData);
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
          <h2 className="title">Nuevo Análisis</h2>
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
            <button type="submit" className="btn submit">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NuevoAnalisisForm;