import React, { useState } from 'react';

const RecuperacionForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit({ email  });
    
  try {
      const response = await fetch('http://localhost:5000/api/login', { // Ajusta la URL según tu backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo: email}), // Ajusta a los nombres esperados por el backend
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al mandar el codigo');
      }

      
    } catch (err) {
      setError(err.message);
    }
  };

  return (
  <div className="card">
    <form onSubmit={handleSubmit}>
      <div>
        <label>Correo</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ingrese su correo"
          />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Mandar Codigo</button>
    </form>
  </div>
  );
};

export default RecuperacionForm;