// src/components/muestras/FormResultadosBH.jsx
import { useState } from "react";
import Swal from "sweetalert2";
import { requireTokenOrRedirect } from "../../utils/auth";
import CargaBarras from "../elementos/CargaBarras";

const FormResultadosBH = ({ muestraId, onSuccess }) => {
    
    
    /* —— valores por defecto —— */
    const [roja, setRoja]     = useState({
        hemoglobina: "", hematocrito: "", eritrocitos: "",
        conMediaHb: "", volGlobularMedia: "", HBCorpuscularMedia: "", plaqutas: "",
    });
    const [blanca, setBlanca] = useState({
        cuentaLeucocitaria: "", linfocitos: "", monocitos: "",
        segmentados: "", enBanda: "", neutrofilosT: "", eosinofilos: "", basofilos: "",
    });
    const [error, setError] = useState(null);

    const apiUrl = process.env.REACT_APP_API_URL;
    const token  = requireTokenOrRedirect();

    /* —— helpers —— */
    const handleChange = (grupo, campo) => (e) => {
        const setFn = grupo === "roja" ? setRoja : setBlanca;
        setFn((prev) => ({ ...prev, [campo]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const body = {
        biometriaHematica: {
            formulaRoja   : { ...roja,  hemoglobina:+roja.hemoglobina,   hematocrito:+roja.hematocrito, eritrocitos:+roja.eritrocitos, conMediaHb:+roja.conMediaHb, volGlobularMedia:+roja.volGlobularMedia, HBCorpuscularMedia:+roja.HBCorpuscularMedia, plaqutas:+roja.plaqutas },
            formulaBlanca : { ...blanca, cuentaLeucocitaria:+blanca.cuentaLeucocitaria, linfocitos:+blanca.linfocitos, monocitos:+blanca.monocitos, segmentados:+blanca.segmentados, enBanda:+blanca.enBanda, neutrofilosT:+blanca.neutrofilosT, eosinofilos:+blanca.eosinofilos, basofilos:+blanca.basofilos },
        },
        };

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

        await Swal.fire({ title: "Resultados guardados", icon: "success", timer: 1500, showConfirmButton: false });
        if (onSuccess) onSuccess();
        } catch (err) {
        setError(err.message);
        }
    };

    /* —— interfaz —— */
    const input = (grupo, campo, label) => (
        <div className="form-field small">
        <label>{label}</label>
        <input type="number" step="any" value={grupo === "roja" ? roja[campo] : blanca[campo]} onChange={handleChange(grupo, campo)} />
        </div>
    );

    if (!muestraId) return (
    <div className='scale-up-ver-center'>
        <div>
        <br />
        <CargaBarras className='plantilla' />
        </div>
    </div>
    );


    return (
        <div className="card">
        <h3>Resultados · Biometría hemática</h3>
        <form onSubmit={handleSubmit} className="grid-form">
            <h4>Fórmula roja</h4>
            {input("roja", "hemoglobina", "Hemoglobina")}
            {input("roja", "hematocrito", "Hematocrito")}
            {input("roja", "eritrocitos", "Eritrocitos")}
            {input("roja", "conMediaHb", "CHCM")}
            {input("roja", "volGlobularMedia", "VCM")}
            {input("roja", "HBCorpuscularMedia", "HBCM")}
            {input("roja", "plaqutas", "Plaquetas")}

            <h4>Fórmula blanca</h4>
            {input("blanca", "cuentaLeucocitaria", "Leucocitos totales")}
            {input("blanca", "linfocitos", "Linfocitos %")}
            {input("blanca", "monocitos", "Monocitos %")}
            {input("blanca", "segmentados", "Segmentados %")}
            {input("blanca", "enBanda", "En banda %")}
            {input("blanca", "neutrofilosT", "Neutrófilos totales")}
            {input("blanca", "eosinofilos", "Eosinófilos %")}
            {input("blanca", "basofilos", "Basófilos %")}

            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit">Guardar</button>
        </form>
        </div>
    );
};

export default FormResultadosBH;
