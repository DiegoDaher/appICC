// src/components/pedidos/IdPedidos.jsx
import { useEffect, useState } from "react";
import { requireTokenOrRedirect } from "../../utils/auth";
import CargaBarras from "../elementos/CargaBarras";

const IdPedidos = ({ seleccionado, analisisIdFiltro=null, onSelect = () => {} }) => {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState(null);

    const apiUrl = process.env.REACT_APP_API_URL;
    const token  = requireTokenOrRedirect();
    
    /* fetch pedidos */
    useEffect(() => {
        if (!token) return;
        const fetchPed = async () => {
        try {
            const res = await fetch(`${apiUrl}/pedidos/`, {
                method: "GET",
            headers: { "Content-Type":"application/json", Authorization:`Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Error al obtener pedidos");
            const { data } = await res.json();
            setPedidos(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        };
        fetchPed();
    }, [apiUrl, token]);
    
    if (loading) return <CargaBarras />;
    if (error)   return <p className="error">{error}</p>;
    /* ——— filtra si viene un id de análisis ——— */
    const pedidosFiltrados = pedidos.filter(p => {
        const coincideAnalisis = !analisisIdFiltro || p.analisis?.some(a => a.analisisId === analisisIdFiltro);
        const coincidePaciente = seleccionado && seleccionado._id
            ? p.usuarioId?._id === seleccionado._id
            : false;
        return coincideAnalisis && coincidePaciente;
    });

    return (
        <div className="scroll">
        {pedidosFiltrados.map((p) => {
            const isSel = seleccionado === p._id;
            return (
            <div
                key={p._id}
                className={`prueba_tabla ${isSel ? "seleccionado" : ""}`}
                onClick={() => onSelect(p._id)}
            >
                <div className="inicial-circulo">
                <p className="letra-circulo">{p.usuarioId?.nombre?.charAt(0) || "?"}</p>
                </div>
                <p className="prueba-name">
                {(p._id || p.id || '--')} · {p.analisis?.[0]?.nombre || "--"}
                </p>
                <p className='texto_pedidos'>
                    {/*p.paciente*/}
                    {`${p.usuarioId?.nombre} ${p.usuarioId?.apellidoPaterno} ${p.usuarioId?.apellidoMaterno}`}
                </p>
            </div>
            );
        })}
        {pedidosFiltrados.length===0 && <p>No hay pedidos de ese análisis.</p>}
        </div>
    );
};

export default IdPedidos;
