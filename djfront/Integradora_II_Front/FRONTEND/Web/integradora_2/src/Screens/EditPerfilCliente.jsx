import React, { useState, useEffect } from 'react';

const ProfileEditForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    correo: '',
    nuevaContrasena: '',
  });
  const [initialData, setInitialData] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    // Simula obtener los datos del backend
    const fetchData = async () => {
      const data = {
        nombre: 'Mario Alberto Lira Zamora',
        apellidoPaterno: 'Lira',
        apellidoMaterno: 'Zamora',
        correo: 'mario_3141230104@utd.edu.mx',
        nuevaContrasena: '',
      };
      setFormData(data);
      setInitialData(data);
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (JSON.stringify(formData) === JSON.stringify(initialData)) {
      setError('No se ha realizado ningún cambio');
    } else {
      setError('');
      // Aquí podrías enviar los datos actualizados al backend
      console.log('Datos actualizados:', formData);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <img src="/logo-iic.png" alt="Logo IIC" className="logo left" />
        <img src="/logo-ujed.png" alt="Logo UJED" className="logo right" />
      </div>
      <form className="form" onSubmit={handleSubmit}>
        {error && <p className="error-msg">{error}</p>}

        <label>Nombre</label>
        <input
          className="input-lg"
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />

        <label>Apellido Paterno</label>
        <input
          className="input-lg"
          type="text"
          name="apellidoPaterno"
          value={formData.apellidoPaterno}
          onChange={handleChange}
        />

        <label >Apellido Materno</label>
        <input
          className="input-lg"
          type="text"
          name="apellidoMaterno"
          value={formData.apellidoMaterno}
          onChange={handleChange}
        />

        <label>Correo</label>
        <input
          className="input-lg"
          type="email"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
        />

        <label>Actualizar contraseña</label>
        <input
          className="input-lg"
          type="password"
          name="nuevaContrasena"
          placeholder="Nueva contraseña"
          value={formData.nuevaContrasena}
          onChange={handleChange}
        />

        <div className="buttons">
          <button type="submit" className="btn update">Actualizar</button>
          <button type="button" className="btn cancel">Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditForm;