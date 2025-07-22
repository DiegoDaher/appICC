import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import ReciboPedidos from './ReciboPedidos';
import { requireTokenOrRedirect } from '../../utils/auth';
import CargaBarras from '../elementos/CargaBarras';
import DetallesPedidos from './DetallesPedidos';
import SearchBar from '../elementos/searchBar';

const ListaPedidos = () => {
    const [pedidos, setPedidos] = useState([])
    const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)
    const [modalAbierto, setModalAbierto] = useState(null)
    const [modalDetallesAbierto, setModalDetallesAbierto] = useState(null)
    const [token, setToken] = useState(null)
    const apiUrl = process.env.REACT_APP_API_URL
    const [filtro, setFiltro] = useState('');


    /*________________obtener token________________*/
    useEffect(() => {
        const tk = requireTokenOrRedirect();
        setToken(tk);
    }, []);

    /*__________________Peticion a pedidos__________________*/
    useEffect(() => {
        if (!token) return;
        const fecthPedidos = async () => {
            setLoading(true);
            setError(null);
            try{
                const res = await fetch(`${apiUrl}/pedidos/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (res.status === 401) {
                setError('Sesión expirada redirigiendo…');
                setTimeout(() => (window.location.href = '/'), 1500);
                return;
                }
                if (!res.ok) throw new Error('Error al obtener pedidos');
                const { data } = await res.json();
                setPedidos(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(err.message || 'Error al obtener pedidos');
            } finally {
                setLoading(false);
            }
        };
        fecthPedidos();
    }, [apiUrl,token]);

    /*_____________________Borrar pedido __________________*/
    //sweet alert
    function handleAlert(id) {
        const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
        });
            swalWithBootstrapButtons.fire({
            title: "¿Estas deguro de borrarlo?",
            text: "!No podras revertirlo una vez lo borres¡",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "!Si, borralo¡",
            cancelButtonText: "!No, cancelar¡",
            reverseButtons: true
        }).then(async (result) => {
            if (!result.isConfirmed || !token) return;
            try {
                setLoading(true);
                const headers ={
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                };
                const res = await fetch(`${apiUrl}/pedidos/${id}`,{
                    method:'DELETE',
                    headers,
                    body: JSON.stringify({ status:false }),
                });
                if (!res.ok) throw new Error();
                setPedidos((prev) => prev.filter((p) => p._id !== id));
                /*___________Aqui empieza el estilo de swal_____________ */
                swalWithBootstrapButtons.fire({
                title: "!Borrado Exitosamente¡",
                text: "Tu pedido ha sido borrado correctamente",
                icon: "success",
                timer : 1300,
                showConfirmButton: false
                });
            } catch {
                swalWithBootstrapButtons.fire({
                    title: "!Cancelado!",
                    text: "Regresando a la pagina",
                    icon: "success",
                    timer : 1000,
                    showConfirmButton: false
                });
            }finally {
                setLoading(false);
            }
        });
    }

    /* ──────────────────── coso para acomodar 3 por fila──────────────────── */
    const agrupar = (arr, tam = 3) =>
        arr.reduce((rows, item, idx) => {
            const rowIdx = Math.floor(idx / tam);
            rows[rowIdx] = [...(rows[rowIdx] || []), item];
            return rows;
        }, []); //ya se para que es esto, para que siga jalando si algo falla
    /* ──────────────────── vista de cargando ──────────────────── */
    if (loading)
    return (
        <div className='scale-up-ver-center'>
            <div className='centrar'>
                <br />
                <CargaBarras  className='plantilla'/>
            </div>
        </div>
    );
    if (error) return <div className='error'>{error}</div>;

    const handleSearch = (texto) => {
        setFiltro(texto.toLowerCase());
    };
    
    const pedidosFiltrados = pedidos.filter((p) => {
    const nombreCompleto = `${p.usuarioId?.nombre ?? ''} ${p.usuarioId?.apellidoPaterno ?? ''} ${p.usuarioId?.apellidoMaterno ?? ''}`.toLowerCase();
    const analisis = p.analisis?.[0]?.nombre?.toLowerCase() || '';
    const id = p._id?.toLowerCase() || '';

    return (
        nombreCompleto.includes(filtro) ||
        analisis.includes(filtro) ||
        id.includes(filtro)
        );
    });

    const getPedidos = (pedidos) => {
        if (pedidos ===  "cancelado") return {estado :"cancelado", clase: 'color-status-pendiente'}
        if (pedidos ===  "pendiente") return {estado :"pendiente", clase: 'color-status-pendiente'}
        return {estado : 'pagado', clase: 'color-status-pagado'}
    }




    const status = getPedidos(pedidos.estado)
    return (
        <div>
            <SearchBar placeholder="Buscar pedido por ID, análisis o nombre" onSearch={handleSearch}/>
            <div className='scroll_pruebas'>
                {agrupar(pedidosFiltrados).map((fila, i) => ( 
                    <div key={i} className='fila3'> {/*Primer .map(): recorre cada fila de pedidos (es decir, cada array de 3 pedidos) i es el índice de la fila. */}
                    {fila.map((p, j) => (

                        <div key={j} className='caja_pedidos'>{/*Segundo .map(): recorre cada pedido individual dentro de esa fila ,j es el índice dentro de la fila. */}
                            <div className='titulo'>{/*key={i} y key={j} son importantes en React para que sepa cómo actualizar el DOM eficientemente. */}
                                <img src="/quimica.png" alt="química" className='imgMuestra' />
                            </div>
                            <p className='centrar'>{(p._id || p.id || '--').toString().slice(-6).toUpperCase()}</p>{/*p.id.slice(-6).toUpperCase()*/}
                            <p className='texto_pedidos'>
                                {p.analisis?.[0]?.nombre || '--'}
                            </p>
                            {/*esta madre no supe hacerla se la pedi a chat segun el id que tienes agarra el dato y te lo muestra ya que es lista*/}
                            <p className='texto_pedidos'>
                                {/*p.paciente*/}
                                {`${p.usuarioId?.nombre} ${p.usuarioId?.apellidoPaterno} ${p.usuarioId?.apellidoMaterno}`}
                            </p>
                            <p className={status.clase}>
                                Estado:{p.estado}
                            </p>
                            <div className='margen'>
                                <img src="/editar.png" alt="editar" className='iconos'  onClick={() => { setPedidoSeleccionado(p);setModalAbierto(true)}} />
                            
                                <img src="/detalles.png" alt="detalles" className='iconos' onClick={() =>{setPedidoSeleccionado(p);setModalDetallesAbierto(true)}}/>
                            
                                <img src="/basura.png" alt="borrar" className='iconos' onClick={() => handleAlert(p._id)}/>
                            </div>
                        </div>
                    ))}
                    </div>
                ))}
                {/*modalAbierto && <ReciboPedidos onClose={() => setModalAbierto(false)} />*/}
                {modalDetallesAbierto && <DetallesPedidos pedido={pedidoSeleccionado} onClose={() => setModalDetallesAbierto(false)} />}

                {modalAbierto && pedidoSeleccionado && (
                <ReciboPedidos pedido={pedidoSeleccionado}
                    onClose={() => {setModalAbierto(false);setPedidoSeleccionado(null);}}
                    onUpdated={(pedidoActualizado) =>setPedidos((prev) => prev.map((x) => x._id === pedidoActualizado._id ? pedidoActualizado : x))}/>
                )}
            </div>
        </div>
    );
};

export default ListaPedidos
