import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { requireTokenOrRedirect } from "../../utils/auth";

const ModalPaciente = ({ onClose }) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [error, setError] = useState('');
    const [, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        correo: '',
        rol: '',
        nombre:'',
        apellidoPaterno:'',
        apellidoMaterno:'',
        fechaNacimiento:'',
    });

    const roles = [
    { label: "Administrador", value: "admin" },
    { label: "Secretaria", value: "accounting" },
    { label: "Laboratorio", value: "laboratory" },
    { label: "Paciente", value: "patient" },
    ];



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            !formData.correo 
            || !formData.rol
            ||!formData.nombre 
            || !formData.apellidoPaterno 
            || !formData.apellidoMaterno 
            || !formData.fechaNacimiento 
        ) {
            setError('Por favor, completa todos los campos requeridos');
            return;
        }
        setError('');
        setLoading(true);
        try {
            const token = requireTokenOrRedirect();
            if (!token) return;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };
                // Antes del fetch
            console.log("Enviando datos:", formData);

            const response = await fetch(`${apiUrl}/usuarios`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    correo: formData.correo,
                    rol: formData.rol,
                    nombre: formData.nombre,
                    apellidoPaterno: formData.apellidoPaterno,
                    apellidoMaterno: formData.apellidoMaterno,
                    fechaNacimiento: formData.fechaNacimiento
                })
            });
            const result = await response.json();
            if (response.ok) {
                await Swal.fire({
                    title: "¡ Enviado Correctamente !",
                    icon: "success",
                    timer : 1500,
                    showConfirmButton: false
                });
                onClose();
            } else {
                setError(result.message || "Hubo un error al registrar al paciente.");
            }
        } catch (error) {
            console.error("Error de red:", error);
            setError("No se pudo conectar al servidor.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className='scale-in-hor-center'>
                <div className="modal-content">
                    <h2>Registrar nuevo paciente</h2>
                    <button className="close-btn" onClick={onClose}>X</button>
                    <form onSubmit={handleSubmit}>
                    {error && <p className='error-msg'>{error}</p>}
                    
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} />
                    
                    <label htmlFor="apellidoPaerno">ApellidoPaterno</label>
                    <input type="text" name="apellidoPaterno" placeholder="Apellido Paterno" value={formData.apellidoPaterno} onChange={handleChange} />
                    
                    <label htmlFor="apellidoMaterno">Apellido Materno</label>
                    <input type="text" name="apellidoMaterno" placeholder="Apellido Materno" value={formData.apellidoMaterno} onChange={handleChange} />
                    
                    <label htmlFor="">
                        <select name="rol" value={formData.rol} onChange={handleChange}>
                        <option value="">Selecciona un rol</option>
                        {roles.map((rol) => (
                            <option key={rol.value} value={rol.value}>
                            {rol.label}
                            </option>
                        ))}
                        </select>
                    </label>

                    {/*
                    
                    <label>
                        Rol:{' '}
                        <select name="rol" value={formData.rol} onChange={handleChange}>
                            <option value="">Selecciona un rol</option>
                            <option value="admin">Administrador</option>
                            <option value="accounting">Secretaria</option>
                            <option value="laboratory">Laboratorio</option>
                            <option value="patient">Paciente</option>
                        </select>
                    </label>
                    */}

                    
                    <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                    <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} />
                    
                    <label htmlFor="Correo">Correo</label>
                    <input type="email" name="correo" placeholder="Correo" value={formData.correo} onChange={handleChange} />

                    <button type="submit" className="btn">Registrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModalPaciente;
