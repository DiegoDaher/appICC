//import DetallesPedidos from './DetallesPedidos'
import { useState } from 'react';
import Swal from 'sweetalert2';
import { requireTokenOrRedirect } from '../../utils/auth';

const ReciboPedidos = ({ pedido, onClose, onUpdated }) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token  = requireTokenOrRedirect();
    const [loading, setLoading] = useState(false);
    const [error,   setError]   = useState('');

    /*_____________clonamos el pedido en el state para poder editarlo y por que es mas comodo heheh_______________*/
    const [formData, setFormData] = useState({
        porcentajeDescuento : pedido.porcentajeDescuento ?? 0,
        notas               : pedido.notas ?? '',
        anticipo            : pedido.anticipo?.monto ?? 0,
        estado              : pedido.estado ?? 'pendiente',
    });

    /*_________________Control de formulario______________________*/
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    /*___________Guardar cambios_____________*/
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) return;

        try {
        setLoading(true);
        const res = await fetch(`${apiUrl}/pedidos/${pedido._id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
            porcentajeDescuento: Number(formData.porcentajeDescuento),
            notas             : formData.notas,
            anticipo          : { monto: Number(formData.anticipo) },
            estado            : formData.estado,
            }),
        });

        const actualizado = await res.json();
        if (!res.ok) throw new Error(actualizado.message || 'Error al guardar');

        Swal.fire({ icon: 'success', title: 'Actualizado', timer: 1200, showConfirmButton: false });
        onUpdated(actualizado); 
        onClose();
        } catch (err) {
        setError(err.message);
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className='modal-overlay'>
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>x</button>
                <h1>Recibos Pedidos </h1>   
                <div>
                    <div className='margen'>
                    <div className='scale-up-ver-center'>
                        
                    </div>
                    <div className='scale-up-ver-center'>
                        <form onSubmit={handleSubmit} className="pedidos-form">
                            {error && <p className="error-msg">{error}</p>}

                            <label>Descuento (%)</label>
                            <input
                                type="number"
                                name="porcentajeDescuento"
                                value={formData.porcentajeDescuento}
                                onChange={handleChange}
                            />

                            <label>Anticipo ($)</label>
                            <input
                                type="number"
                                name="anticipo"
                                value={formData.anticipo}
                                onChange={handleChange}
                            />

                            <label>Notas</label>
                            <textarea
                                name="notas"
                                value={formData.notas}
                                onChange={handleChange}
                            />

                            <label>Estado</label>
                            <select name="estado" value={formData.estado} onChange={handleChange}>
                                <option value="pendiente">pendiente</option>
                                <option value="pagado">pagado</option>
                                <option value="cancelado">cancelado</option>
                            </select>

                            <button type="submit" disabled={loading} className="btn">
                                {loading ? 'Guardando…' : 'Guardar'}
                            </button>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReciboPedidos