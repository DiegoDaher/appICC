import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { requireTokenOrRedirect } from '../../utils/auth'; // <-- asegúrate que esta ruta esté bien
const apiUrl = process.env.REACT_APP_API_URL;

const RegistrarPaciente = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        fechaNacimiento: '',
        correo: '',
        rol: 'patient', // valor por defecto
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación básica
        const camposFaltantes = Object.entries(formData).filter(([k, v]) => !v).map(([k]) => k);
        if (camposFaltantes.length > 0) {
            setError('Por favor completa todos los campos.');
            return;
        }

        setError('');
        const token = requireTokenOrRedirect();
        if (!token) return;

        try {
            const response = await fetch(`${apiUrl}/usuarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...formData,
                    status: true
                }),
            });

            const result = await response.json();

            if (response.ok) {
                await Swal.fire({
                    title: '¡Registro exitoso!',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                });
                // Limpia el formulario
                setFormData({
                    nombre: '',
                    apellidoPaterno: '',
                    apellidoMaterno: '',
                    fechaNacimiento: '',
                    correo: '',
                    rol: 'patient',
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: result.message || 'Hubo un problema al registrar.',
                    icon: 'error',
                });
            }
        } catch (err) {
            console.error('Error en el envío:', err);
            Swal.fire({
                title: 'Error de red',
                text: 'No se pudo conectar con el servidor.',
                icon: 'error',
            });
        }
    };

    const roles = [
        { label: "Administrador", value: "admin" },
        { label: "Secretaria", value: "accounting" },
        { label: "Laboratorio", value: "laboratory" },
        { label: "Paciente", value: "patient" },
    ];

    return (
        <div className="container">
            <h1 className="title">Editar Información</h1>
            <form onSubmit={handleSubmit} className="form">
                {error && <p className="error-msg">{error}</p>}

                <div>
                    <label htmlFor="nombre">Nombre(s):</label>
                    <input
                        className="input-field"
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="apellidoPaterno">Apellido Paterno:</label>
                    <input
                        className="input-field"
                        type="text"
                        name="apellidoPaterno"
                        value={formData.apellidoPaterno}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="apellidoMaterno">Apellido Materno:</label>
                    <input
                        className="input-field"
                        type="text"
                        name="apellidoMaterno"
                        value={formData.apellidoMaterno}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="fechaNacimiento">Fecha de nacimiento:</label>
                    <input
                        className="input-field"
                        type="date"
                        name="fechaNacimiento"
                        value={formData.fechaNacimiento}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="correo">Correo electrónico:</label>
                    <input
                        className="input-field"
                        type="email"
                        name="correo"
                        value={formData.correo}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="rol">Rol:</label>
                    <select
                        className="input-field"
                        name="rol"
                        value={formData.rol}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona un rol</option>
                        {roles.map((r) => (
                            <option key={r.value} value={r.value}>
                                {r.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="button">
                    <button type="submit" className="btn submit">Registrar</button>
                    <Link to="/Perfil">
                        <button type="button" className="btn cancel">Regresar</button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default RegistrarPaciente;
