
import Swal from 'sweetalert2'
import {useEffect, useState}from 'react'
import { requireTokenOrRedirect } from '../../utils/auth';
import CargaBarras from '../elementos/CargaBarras';
import EditarMuestras from './EditarMuestras';
import InfoMuestras from './InfoMuestras';
import SearchBar from '../elementos/searchBar';

const ListaMuestras = () => {
    const [muestraSelecionada, setmuestrasSelecionadas] = useState(null)
    const [ModalDetallesAbierto, setModalDetallesAbierto] = useState(null)
    const [muestras, setMuestras] = useState([])
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)
    const [ModalAbierto, setModalAbierto] = useState(null)
    const [token, setToken] = useState(null)
    const apiUrl = process.env.REACT_APP_API_URL
    const [filtro, setFiltro] = useState('');

    /*____________________Obtener token____________________*/
    useEffect(() => {
        const tk = requireTokenOrRedirect();
        setToken(tk);
    }, []);

    useEffect(() => {
        if (!token) return;
        console.log("TOKEN:", token);
        const fetchMuestras = async () => {
            setLoading(true);
            setError(null);
            try {
            const res = await fetch(`${apiUrl}/muestras`, {
                headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                },
            });

            if (res.status === 401) {
                setError('Sesión expirada, redirigiendo…');
                setTimeout(() => (window.location.href = '/'), 1500);
                return;
            }
            if (!res.ok) throw new Error('Error al obtener muestras');

            const { muestrasList } = await res.json();
            setMuestras(Array.isArray(muestrasList) ? muestrasList : []);
            } catch (err) {
            setError(err.message || 'Error al obtener muestras');
            } finally {
            setLoading(false);
            }
    };

    fetchMuestras();
    }, [apiUrl, token]);

    /*____________________Borrar Muestras____________________*/
    function handleAlert(id) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass:{
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
            swalWithBootstrapButtons.fire({
                title: "¿Estas aseguro de  borarlo?",
                text:"!no podras revertirlo una vez lo borres¡",
                icon : "warning",
                showCancelButton: true,
                confirmButtonText:"!Si, Borrarlo¡",
                cancelButtonText:"!No, cancelar¡",
                reverseButtons: true
        }).then(async (result) => {
            if ( !result.isConfirmed || !token) return;
            try{
                setLoading(true);
                const headers={
                    'Content-type': 'application/json',
                    Authorization: `Beares ${token}`,
                };
                const res = await fetch(`${apiUrl}/muestras/${id}`,{
                    method: 'DELETE',
                    headers,
                    body: JSON.stringify({ status:false }),
                });
                if (!res.ok) throw new Error();
                setMuestras((prev) => prev.filter((p) => p._id !== id));
                swalWithBootstrapButtons.fire({
                title: "!Borrado Exitosamente¡",
                text: "Tu pedido ha sido borrado correctamente",
                icon: "success",
                timer : 1300,
                showConfirmButton: false
                });                    
            }catch {
                swalWithBootstrapButtons.fire({
                    title:"!Cancelado",
                    text: "Regresando a la pagina",
                    icon: "success",
                    timer : 1000,
                    showConfirmButton: false
                });
            } finally {
                setLoading(false);
            }
        });
    }
    /* ──────────────────── coso para acomodar 3 por fila──────────────────── */
    const agrupar = ( arr, tam = 3) =>
        arr.reduce((rows, item, idx) =>{
            const rowIdx = Math.floor(idx / tam);
            rows[rowIdx] = [...(rows[rowIdx] || []), item];
            //rows[rowIdx] = [...EditarMuestras(rows[rowIdx] || []), item];
            return rows;
        }, []);
    /*_________________________ vista de cargando_________________________*/
    if (loading)
    return (
        <div className='scale-up-ver-center'>
            <div className='centrar'>
                <br />
                <CargaBarras  className='plantilla'/>
            </div>
        </div>
    );

        if ( error ) return <div className='error'>{error}</div>

    const handleSearch = (texto) => {
    setFiltro(texto.toLowerCase());
    };
    
    const muestrasFiltradas = muestras.filter((m) => {
        const tipo = m.tipoMuestra?.toLowerCase() || '';
        const nombre = m.nombrePaciente?.toLowerCase() || '';
        const id = m._id?.toLowerCase() || '';
        return (
            (m.status === true) && // Solo muestras con status: true
            (tipo.includes(filtro) ||
            nombre.includes(filtro) ||
            id.includes(filtro))
        );
    });

    
    return (
        <div>
            <SearchBar placeholder="Buscar muestra por ID, tipo o paciente" onSearch={handleSearch} />
            <div className='scroll_pruebas'>
                {agrupar(muestrasFiltradas).map((fila,i) =>(
                    <div key={i} className='fila3'>
                    {fila.map((p,j) =>(
                            <div key={j} className='caja_pedidos'>
                            <div className='titulo'>
                                <img src="/quimica.png" alt="quimica" className='imgMuestra' />
                            </div>
                            <p className='centrar'>{(p._id || p._id || "--").toString().slice(-6).toUpperCase()}</p>
                            <p className='texto'>
                                    {p.tipoMuestra === 'quimicaSanguinea' ? 'Quimica Sanguinea' : 
                                    p.tipoMuestra === 'biometriaHematica' ? 'Biometria Hematica' : 
                                    p.tipoMuestra || '--'}
                            </p>
                            <p className='texto'>
                                {p.nombrePaciente}
                            </p>
                            <p className='texto'>
                                {(p.createDate).slice(0, 10)}
                            </p>
                            <div className='margen'>
                                <img src="/editar.png" alt="editar" className='iconos'  onClick={()=> {setmuestrasSelecionadas(p);setModalAbierto(true)}}/>
                                
                                <img src="/detalles.png" alt="edtalles"  className='iconos' onClick={() =>{setmuestrasSelecionadas(p);setModalDetallesAbierto(true)}}/>
                                
                                <img src="/basura.png" alt="borrar" className='iconos' onClick={() => handleAlert(p._id)}/>                        
                            </div>
                        </div>
                    ))}
                    </div>
                ))}
                {ModalDetallesAbierto && <InfoMuestras muestra={muestraSelecionada} onClose={() => setModalDetallesAbierto(false)}/>}
                
                {ModalAbierto && muestraSelecionada &&(
                    <EditarMuestras muestra={muestraSelecionada} 
                    onClose={() => setModalAbierto(false)}
                    onUpdated={(muestraAcutalizada) => setMuestras((prev) => prev.map((x)=> x._id === muestraSelecionada._id ? muestraAcutalizada._id : x))}
                    />
                )}
            </div>
        </div>
        );
    };
export default ListaMuestras;