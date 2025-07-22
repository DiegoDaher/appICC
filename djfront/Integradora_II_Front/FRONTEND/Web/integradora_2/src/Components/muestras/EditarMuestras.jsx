import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const EditarMuestras = ({ muestra, onClose }) => {
    const [formData, setFormData] = useState({
        pedido: '',
        tipoMuestra: '',
        paciente: '',
        resultados: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (muestra) {
        setFormData({
            pedido: muestra.pedido || '',
            tipoMuestra: muestra.tipoMuestra || '',
            paciente: muestra.paciente || '',
            resultados: muestra.resultados || ''
        });
        }
    }, [muestra]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
        setFormData({ ...formData, [name]: files[0] });
        } else {
        setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.pedido || !formData.tipoMuestra || !formData.paciente) {
        setError('Por favor, completa todos los campos requeridos');
        } else {
        setError('');
        // Aquí puedes hacer la petición PUT/PATCH a tu backend
        console.log('Datos editados:', formData);
        await Swal.fire({
            title: "¡Editado correctamente!",
            icon: "success",
            timer: 1500,
            showConfirmButton: false
        });
        onClose();
        }
    };

    return (
        <div className='modal-overlay'>
        <div className='scale-in-hor-center'>
            <div className='modal-content'>
            <h2>Editar Muestra</h2>
            <button className="close-btn" onClick={onClose} >X</button>
            <form onSubmit={handleSubmit}>
                {error && <p className='error-msg'>{error}</p>}
                <label>Pedido</label>
                <input
                type="text"
                name="pedido"
                className="input-field"
                value={formData.pedido}
                onChange={handleChange}
                />

                <label>
                Tipo Muestra:{' '}
                <select name='tipoMuestra' value={formData.tipoMuestra} onChange={handleChange}>
                    <option value="">Selecciona una opción</option>
                    <option value="BiometriaHepatica">Biometria hepatica</option>
                    <option value="PruebaSangre">Prueba Sangre</option>
                </select>
                </label>

                <label>Paciente (nombre)</label>
                <input
                className="input-field"
                type="text"
                name="paciente"
                value={formData.paciente}
                onChange={handleChange}
                />
                <div className="form-actions">
                <button type="submit" className="btn">Guardar Cambios</button>
                </div>
            </form>
            </div>
        </div>
        </div>
    );
};

    export default EditarMuestras;