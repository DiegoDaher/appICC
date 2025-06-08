import React, { useState } from 'react';

const LoginForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit({ username, password });
    
  try {
      const response = await fetch('http://localhost:5000/api/login', { // Ajusta la URL según tu backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo: username, contraseña: password }), // Ajusta a los nombres esperados por el backend
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en el login');
      }

      // Almacenar el token (ejemplo con localStorage)
      localStorage.setItem('token', data.token);

      // Llamar a onSubmit si está definido (para notificar al padre)
      if (onSubmit) {
        onSubmit({ success: true, token: data.token });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Usuario</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Ingrese su correo"
        />
      </div>
      <div>
        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingrese su contraseña"
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Iniciar sesión</button>
      <a href="/forgot-password">Olvide la contraseña</a>
    </form>
  );
};

export default LoginForm;