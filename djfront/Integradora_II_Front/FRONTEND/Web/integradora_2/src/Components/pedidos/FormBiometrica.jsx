import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { requireTokenOrRedirect } from "../../utils/auth";

const FormBiometrica = ({ fixedUserId }) => {
    /* ——— state ——— */
    const [usuarioId, setUsuarioId]= useState(fixedUserId ?? "");
    const [notas, setNotas]= useState('');
    const [anticipo, setAnticipo]= useState('');
    const [porcentaje, setPorcentaje]= useState(0);
    const [error, setError]= useState(null);

    /* ——— constantes fijas del análisis ——— */
    const ANALISIS_ID   = "686734c0dbf9fa679be0958c"; 
    const ANALISIS_INFO = {
        analisisId : ANALISIS_ID,
        nombre     : "Biometría hemática",
        precio     : 350,
        descripcion: "Análisis de sangre completo",
    };

    const apiUrl   = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const token    = requireTokenOrRedirect();

    /* ——— submit ——— */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        /* validación mínima */
        if (!usuarioId.trim())   { setError("Falta elegir el paciente");  return; }
        if (!anticipo || anticipo < 0) { setError("Anticipo inválido");  return; }

        const body = {
        usuarioId,
        analisis: [ ANALISIS_INFO ],
        porcentajeDescuento: porcentaje,
        notas,
        anticipo: { monto: Number(anticipo) },
        };

        try{
        const res = await fetch(`${apiUrl}/pedidos`,{
            method : "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization : `Bearer ${token}`,
            },
            body : JSON.stringify(body),
        });

        if(!res.ok){
            const dataErr = await res.json().catch(() => ({}));
            throw new Error(dataErr.message || "No se pudo crear el pedido");
        }

        await Swal.fire({
            title: "Pedido registrado",
            icon : "success",
            timer: 1500,
            showConfirmButton: false,
        });
        navigate("/Pedidos");   
        }catch(err){
        setError(err.message);
        }
    };

    return (
        <div className="card">
        <h2>Nuevo pedido · Biometría hemática</h2>
        <form onSubmit={handleSubmit}>
            {!fixedUserId && (          // ← oculta input si llega prefijado
            <div className="form-field">
                <label>ID Paciente (usuarioId)</label>
                <input
                type="text"
                value={usuarioId}
                onChange={(e) => setUsuarioId(e.target.value)}
                placeholder="68635e1f2122030410801823"
                />
            </div>
            )}

            {/* ——— NOTAS ——— */}
            <div className="form-field">
            <label>Notas</label>
            <textarea
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
                placeholder="Ej. paciente en ayunas"
            />
            </div>

            {/* ——— DESCUENTO ——— */}
            <div className="form-field">
            <label>Descuento %</label>
            <input
                type="number"
                step="1"
                min="0"
                max="100"
                value={porcentaje}
                onChange={(e) => setPorcentaje(e.target.value)}
            />
            </div>

            {/* ——— ANTICIPO ——— */}
            <div className="form-field">
            <label>Anticipo (MXN)</label>
            <input
                type="number"
                step="0.01"
                min="0"
                value={anticipo}
                onChange={(e) => setAnticipo(e.target.value)}
                placeholder="350"
            />
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button type="submit">Guardar pedido</button>
        </form>
        </div>
    );
};

export default FormBiometrica;
