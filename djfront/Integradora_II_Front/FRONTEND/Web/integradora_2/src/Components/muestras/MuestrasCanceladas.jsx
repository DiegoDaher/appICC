import { useEffect, useState } from 'react';
import CargaBarras from '../elementos/CargaBarras'
import { requireTokenOrRedirect } from '../../utils/auth';
import SearchBar from '../elementos/searchBar';
const MuestrasCanceladas = () => {
    const [filtro, setFiltro] = useState('');
    function useMuestras(statusWanted = true) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError]   = useState(null);
    const token   = requireTokenOrRedirect();
    const apiUrl  = process.env.REACT_APP_API_URL;
    
    
    useEffect(() => {
        if (!token) return;
        const fetchData = async () => {
            try{
            const res = await fetch(`${apiUrl}/muestras`,{
                headers:{ 
                'Content-Type':'application/json', 
                Authorization:`Bearer ${token}`}
            });
            if(!res.ok) throw new Error('Error al obtener muestras');
            const { muestrasList } = await res.json();
            setData(muestrasList.filter(m => m.status === statusWanted));
            }catch(err){
                setError(err.message);
            }finally{
                setLoading(false);
            }
        };
        fetchData();
    },[apiUrl, token, statusWanted]);return {data, loading, error};}

const {data:muestras, loading, error} = useMuestras(false);

const agrupar = ( arr, tam = 3) =>
    arr.reduce((rows, item, idx) =>{
        const rowIdx = Math.floor(idx / tam);
        rows[rowIdx] = [...(rows[rowIdx] || []), item];
        return rows;
    }, []);
    
    if (loading) return (
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
    
    const muestrasFiltradas = muestras.filter((m) => {
        const tipo = m.tipoMuestra?.toLowerCase() || '';
        const nombre = m.nombrePaciente?.toLowerCase() || '';
        const id = m._id?.toLowerCase() || '';
        return (
            tipo.includes(filtro) ||
            nombre.includes(filtro) ||
            id.includes(filtro)
        );
    });
    return (
        <div>
            <SearchBar placeholder="Buscar muestra por ID, tipo o paciente" onSearch={handleSearch} />

            <div className="scroll_pruebas">
            {muestras.length === 0 && 
            <div className="fila3">
                <div className="caja_1">
                    <br /><br /><br /><br /><br /><br />
                    <p className="centrar">No hay pedidos cancelados.</p>
                </div>
            </div>
            }
            {agrupar(muestrasFiltradas).map((fila, i) => (
                <div key={i} className="fila3">
                {fila.map((p) => (
                    <div key={p._id} className="caja_pedidos">
                    <img src="/quimica.png" alt="" className="imgMuestra"/>
                    <p className="centrar">{p._id.slice(-6).toUpperCase()}</p>
                    <p className="texto_pedidos">{p.tipoMuestra}</p>
                    <p className="texto_pedidos">{p.nombrePaciente}</p>
                </div>
                ))}
            </div>
            ))}
            </div>
        </div>
    );
};


export default MuestrasCanceladas