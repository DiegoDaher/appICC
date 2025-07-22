// src/components/muestras/FormResultadosQS.jsx
import { useState } from "react";
import Swal from "sweetalert2";
import { requireTokenOrRedirect } from "../../utils/auth";
import CargaBarras from "../elementos/CargaBarras";

const FormResultadosQS = ({ muestraId, onSuccess }) => {
    /* —— campos —— */
    const [qs, setQs] = useState({
        glucosa: "", glucosaPost: "", acidoUrico: "",
        urea: "", creatinina: "", colesterol: "",
        LDR: "", gGT: "",
    });
    const [error, setError] = useState(null);

    const apiUrl = process.env.REACT_APP_API_URL;
    const token  = requireTokenOrRedirect();

    /* —— helpers —— */
    const handleChange = (campo) => (e) =>
        setQs((prev) => ({ ...prev, [campo]: e.target.value }));

    const input = (campo, label) => (
        <div className="form-field small">
        <label>{label}</label>
        <input
            type="number"
            step="any"
            value={qs[campo]}
            onChange={handleChange(campo)}
        />
        </div>
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const body = {
        quimicaSanguinea: {
            glucosa      : +qs.glucosa,
            glucosaPost  : +qs.glucosaPost,
            acidoUrico   : +qs.acidoUrico,
            urea         : +qs.urea,
            creatinina   : +qs.creatinina,
            colesterol   : +qs.colesterol,
            LDR          : +qs.LDR,
            gGT          : +qs.gGT,
        },
        };

        if (!muestraId) return <p>Cargando…</p>;


        try {
        const res = await fetch(`${apiUrl}/muestras/resultados/${muestraId}`, {
            method : "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization : `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            const d = await res.json().catch(() => ({}));
            throw new Error(d.message || "No se pudo guardar resultados");
        }

        await Swal.fire({
            title: "Resultados guardados",
            icon : "success",
            timer: 1500,
            showConfirmButton: false,
        });
        if (onSuccess) onSuccess();
        } catch (err) {
        setError(err.message);
        }
    };

    if (!muestraId) return (
    <div className='scale-up-ver-center'>
        <div>
        <br />
        <CargaBarras className='plantilla' />
        </div>
    </div>
    );


    /* —— UI —— */
    return (
        <div className="card">
        <h3>Resultados · Química sanguínea</h3>
        <form onSubmit={handleSubmit} className="grid-form form">
            {input("glucosa", "Glucosa (mg/dL)")}
            {input("glucosaPost", "Glucosa post‑prandial")}
            {input("acidoUrico", "Ácido úrico")}
            {input("urea", "Urea")}
            {input("creatinina", "Creatinina")}
            {input("colesterol", "Colesterol")}
            {input("LDR", "LDR")}
            {input("gGT", "γ‑GT")}

            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit">Guardar</button>
        </form>
        </div>
    );
};

export default FormResultadosQS;
