import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LoginForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  
  const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);
  

  /* —— validación rápida —— */
  if (!username.trim() || !password.trim()) {
    setError("Debes ingresar usuario y contraseña");
    return;
  }

  try {
    const res = await fetch(`${apiUrl}/usuarios/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo: username, contraseña: password }),
    });

    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error("Respuesta inesperada del servidor:\n" + text);
    }

    /* —— manejo de error —— */
    if (!res.ok) {
      // si el backend manda 401 o 400 con mensaje personalizado
      throw new Error(data.message || "Credenciales incorrectas");
    }
    if (!data.token) {
      // si devuelve 200 pero sin token → error lógico
      throw new Error("contraseña incorrecta vuelva a ingresarla");
    }

    /* —— éxito —— */
    localStorage.setItem("token", data.token);
    if (onSubmit) onSubmit({ success: true, token: data.token });

    await Swal.fire({
      title: "Inicio de sesión exitoso",
      icon: "success",
      timer: 1200,
      showConfirmButton: false,
    });
    navigate("/Dashboard", {replace: true});
  } catch (err) {
    setError(err.message);
  }
};

  return (
    <div className="card">
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
        {error && <p className='error-msg'>{error}</p>}
        <button type="submit">Iniciar sesión</button>
        <a href="/Recuperacion">Olvide la contraseña</a>
      </form>
    </div>
  );
};

export default LoginForm;