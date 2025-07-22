import { useEffect, useState } from "react";
import CargaBarras from "../elementos/CargaBarras";
import { requireTokenOrRedirect } from "../../utils/auth";

const DetallesPedidos = ({ pedido, onClose }) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token  = requireTokenOrRedirect();

    const [loading, setLoading]   = useState(true);
    const [error,   setError]     = useState(null);
    const [detalles, setDetalles] = useState(null);

    /* ----------------- GET /pedidos/{id} ----------------- */
    useEffect(() => {
        if (!token || !pedido?._id) return;
        (async () => {
        try {
            const res   = await fetch(`${apiUrl}/pedidos/${pedido._id}`, {
            headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("No se pudo obtener el pedido");
            const json  = await res.json();
            setDetalles(json.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        })();
    }, [apiUrl, token, pedido]);

    if (loading)
        return (
        <div className="modal-overlay">
            <div className="modal-content">
            <button className="close-btn" onClick={onClose}>X</button>
            <CargaBarras />
            </div>
        </div>
        );

    if (error)
        return (
        <div className="modal-overlay">
            <div className="modal-content">
            <button className="close-btn" onClick={onClose}>X</button>
            <p className="error-msg">{error}</p>
            </div>
        </div>
        );

    /* helper pesos */
    const currency = (v) =>
        new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(v);
    if (!detalles) return null; 
    /* tomamos el primer análisis (si hay más puedes iterar) */
    const analisis0 = detalles.analisis?.[0] || {};
    const {
    estado,
    notas,
    fechaCreacion,
    subtotal,
    porcentajeDescuento,
    total,
    anticipo,
    } = detalles;  

    return (
        <div className="modal-overlay">
        <div className="modal-content">

            <div className="caja_2">
            <button className="close-btn" onClick={onClose}>×</button>
                <p className="detall-tex">
                <strong>Fecha de creación:</strong>{" "}
                {new Date(fechaCreacion).toLocaleString()}
                </p>
                <h1 className="titulo">Detalles</h1>

                <p className="detall-tex">{analisis0.nombre || "—"}</p>

                <h2 className="prueba-name">Precio</h2>
                <p className="detall-tex">
                {analisis0.precio != null ? currency(analisis0.precio) : "—"}
                </p>

                <h2 className="prueba-name">Anticipo</h2>
                <p className="detall-tex">
                {currency(anticipo?.monto || 0)} ({anticipo?.estado})
                </p>

                <h2 className="prueba-name">Subtotal</h2>
                <p className="detall-tex">{currency(subtotal)}</p>

                <h2 className="prueba-name">Descuento</h2>
                <p className="detall-tex">{porcentajeDescuento}%</p>

                <h2 className="prueba-name">Total</h2>
                <p className="detall-tex">{currency(total)}</p>

                <h2 className="prueba-name">Estado</h2>
                <p className="detall-tex">{estado}</p>

                <h2 className="prueba-name">Descripción</h2>
                <p className="descr-tex">
                {analisis0.descripcion || notas || "—"}
                </p>

                
            </div>
        </div>
    </div>
    );
};

export default DetallesPedidos;
/*
        <div className="modal-overlay">
        <div className="modal-content">
            <button className="close-btn" onClick={onClose}>×</button>


            <div className="caja_2">
            <h1 className="titulo">Detalles</h1>

            <p className="detall-tex">{analisis0.nombre || "—"}</p>

            <h2 className="prueba-name">Precio</h2>
            <p className="detall-tex">
                {analisis0.precio != null ? currency(analisis0.precio) : "—"}
            </p>

            <h2 className="prueba-name">Anticipo</h2>
            <p className="detall-tex">
                {currency(detalles.anticipo?.monto || 0)} ({detalles.anticipo?.estado})
            </p>

            <h2 className="prueba-name">Subtotal</h2>
            <p className="detall-tex">{currency(detalles.subtotal)}</p>

            <h2 className="prueba-name">Descuento</h2>
            <p className="detall-tex">{detalles.porcentajeDescuento}%</p>

            <h2 className="prueba-name">Total</h2>
            <p className="detall-tex">{currency(detalles.total)}</p>

            <h2 className="prueba-name">Estado</h2>
            <p className="detall-tex">{detalles.estado}</p>

            <h2 className="prueba-name">Descripción</h2>
            <p className="descr-tex">
                {analisis0.descripcion || detalles.notas || "—"}
            </p>

            <p>Estado del pedido:{estado}</p>
            <p>Notas: {notas || "—"}</p>
            <p>Fecha de creación: {new Date(fechaCreacion).toLocaleString()}</p>
            </div>
        </div>
        </div>*/