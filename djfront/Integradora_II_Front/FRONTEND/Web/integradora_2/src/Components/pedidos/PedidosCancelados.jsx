import { useEffect, useState } from "react";
import CargaBarras from "../elementos/CargaBarras";
import { requireTokenOrRedirect } from "../../utils/auth";
import SearchBar from "../elementos/searchBar";

const PedidosCancelados = () => {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error,   setError]   = useState(null);

    const token  = requireTokenOrRedirect();
    const apiUrl = process.env.REACT_APP_API_URL;
    const [filtro, setFiltro] = useState('');

    useEffect(() => {
        if (!token) return;
        
        (async () => {
        try {
            const res = await fetch(`${apiUrl}/pedidos`, {
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Error al obtener pedidos");

            const { pedidosList = [], data = [] } = await res.json();
            const lista = pedidosList.length ? pedidosList : data;

            const cancelados = lista.filter(
            (p) => p.estado === "cancelado" || p.status === false ||p.status === "false"
            );
            setPedidos(cancelados);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        })();
    }, [apiUrl, token]);

    const agrupar = (arr = [], tam = 3) =>
        Array.isArray(arr)
        ? arr.reduce((rows, itm, i) => {
            const r = Math.floor(i / tam);
            rows[r] = [...(rows[r] || []), itm];
            return rows;
            }, [])
        : [];

    if (loading) return(
        <div className='scale-up-ver-center'>
            <div className='centrar'>
                <br />
                <CargaBarras  className='plantilla'/>
            </div>
        </div>
    );
    if (error)   return <p className="error">{error}</p>;

    const handleSearch = (texto) => {
        setFiltro(texto.toLowerCase());
    };

    const pedidosFiltrados = pedidos.filter((p) => {
        const nombre = `${p.usuarioId?.nombre ?? ''} ${p.usuarioId?.apellidoPaterno ?? ''}`.toLowerCase();
        const id = p._id?.toLowerCase() || '';
        return nombre.includes(filtro) || id.includes(filtro);
    });

    
    return (
        <div>
            <SearchBar placeholder="Buscar pedido cancelado" onSearch={handleSearch} />
            <div className="scroll_pruebas">
            {pedidos.length === 0 && (
                <div className="fila3">
                <div className="caja_1">
                    <br /><br /><br /><br /><br /><br />
                    <p className="centrar">No hay pedidos cancelados.</p>
                </div>
                </div>
            )}
            {agrupar(pedidosFiltrados).map((fila, i) => (
                <div key={i} className="fila3">
                {fila.map((p) => (
                    <div key={p._id} className="caja_pedidos">
                    <div className="titulo">
                        <img src="/quimica.png" alt="icon" className="imgMuestra" />
                    </div>
                    <p className="centrar">{p._id.slice(-6).toUpperCase()}</p>
                    <p className="texto_pedidos">Estado: {p.estado || "cancelado"}</p>
                    <p className="texto_pedidos">
                        {p.usuarioId?.nombre
                        ? `${p.usuarioId.nombre} ${p.usuarioId.apellidoPaterno || ""}`
                        : "--"}
                    </p>
                    </div>
                ))}
                </div>
            ))}
            </div>
        </div>
    );
};

export default PedidosCancelados;
