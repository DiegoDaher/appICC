import { useState } from 'react'
import Swal from 'sweetalert2'
import { requireTokenOrRedirect } from '../../utils/auth'

const ModalAnalisis = ({onClose, onAnalisisCreated}) => {
    const [formData, setFormData]= useState({
        nombre: '',
        tipoPrueba:'',
        costo: '',
        diasEspera: '',
        descripcion: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormData({...formData, [name]:value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log('Datos del formulario:', formData);
        console.log('Validación:', {
            nombre: !!formData.nombre,
            costo: !!formData.costo,
            diasEspera: !!formData.diasEspera,
            descripcion: !!formData.descripcion
        });
        
        if (!formData.nombre || !formData.costo || !formData.diasEspera || !formData.descripcion) {
            setError('Por favor, completa todos los campos requeridos');
            return;
        }
        
        setError('');
        setLoading(true);
        
        try {
            const token = requireTokenOrRedirect();
            
            const response = await fetch(`${apiUrl}/analisis`, {
                method: 'POST',
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
                throw new Error('Error al crear el análisis');
            }

            const result = await response.json();
            console.log('Análisis creado:', result);
            
            // Llamar a la función para actualizar la lista
            if (onAnalisisCreated && typeof onAnalisisCreated === 'function') {
                onAnalisisCreated(result);
            }
            
            await Swal.fire({
                title: "¡ Enviado Correctamente !",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });
            
            onClose();
            
        } catch (error) {
            console.error('Error:', error);
            setError(error.message || 'Error al crear el análisis');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='modal-overlay'>
            <div className='scale-in-hor-center'>
                <div className='modal-content'>
                    <h2>Registrar Analisis</h2>
                    <button className='close-btn' onClick={onClose}>X</button>
                    <form onSubmit={handleSubmit}>
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
                            type="text"
                            name="costo"
                            className="input-field"
                            placeholder="costo del analisis $MXN"
                            value={formData.costo}
                            onChange={handleChange}
                        />
                        <label>Dias de espera</label>
                        <input
                            type="text"
                            name="diasEspera"
                            className="input-field"
                            placeholder="dias de espera para el analisis"
                            value={formData.diasEspera}
                            onChange={handleChange}
                        />
                        <label>Descripcion</label>
                        <input
                            type="text"
                            name="descripcion"
                            className="input-field textarea"
                            placeholder="muestras del paciente para estudio"
                            value={formData.descripcion}
                            onChange={handleChange}
                        />
                        <button type='submit' disabled={loading}>
                            {loading ? 'Enviando...' : 'Enviar'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ModalAnalisis