import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const RecuperacionForm = ({ onSubmit = () => {}  }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null)

    if (!email.trim()) {
      setError('Debes ingresar tu correo');
      return;
    }

    // Avisamos al padre (si lo necesita) creo?
    onSubmit({ email });


  try {
      const res = await fetch(`${apiUrl}/usuarios/forget`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo: email}), 
      });

      const text = await res.text();
      let data;
      try{
        data = JSON.parse(text);
      } catch{
        throw new Error("Respuesta inesperada del servidor:\n"+text);
      }


      if (!res.ok) {
        throw new Error(data.message || 'Error al mandar el codigo');
      }
      await Swal.fire({
          title: 'Código enviado',
          text: 'un codigo acaba de ser enviado a tu correo',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });

        navigate("/");
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
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ingrese su correo"
          />
      </div>
      {error && <p className='error-msg'>{error}</p>}
      <button type="submit">Mandar Codigo</button>
      <a href="/">Iniciar Sesión</a>
    </form>
  </div>
  );
};

export default RecuperacionForm;