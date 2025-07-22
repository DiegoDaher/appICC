import React, { useEffect, useState } from 'react';
import { SearchBar } from '../Components';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { requireTokenOrRedirect } from '../utils/auth';
import CargaBarras from '../Components/elementos/CargaBarras';

const PerfilPaciente = () => {
    const [usuario, setUsuario] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const tk = requireTokenOrRedirect();
        setToken(tk);
    }, []);

    useEffect(() => {
        if (!token) return;

        const fetchUsuario = async () => {
            try {
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                };
                const response = await fetch(`${apiUrl}/usuarios/login/`, {
                    method: 'GET',
                    headers,
                });

                const text = await response.text();

                if (response.status === 401) {
                    setError('Sesión expirada, redirigiendo...');
                    setTimeout(() => window.location.href = '/', 1500);
                    return;
                }

                if (!response.ok) {
                    throw new Error('Error al obtener usuario');
                }
                const data = JSON.parse(text);  
                setUsuario(data);
            } catch (error) {
                console.error(error);
                setError('Error al obtener datos del usuario');
            } finally {
                setLoading(false);
            }
        };

        fetchUsuario();
    }, [apiUrl, token]);

    function handleAlert() {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "¿Estás seguro de borrarlo?",
            text: "¡No podrás revertirlo una vez lo borres!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, borrarlo",
            cancelButtonText: "No, cancelar",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire({
                    title: "¡Borrado exitosamente!",
                    text: "Tu pedido ha sido borrado correctamente",
                    icon: "success",
                    timer: 1300,
                    showConfirmButton: false
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "¡Cancelado!",
                    text: "Regresando a la página",
                    icon: "success",
                    timer: 1000,
                    showConfirmButton: false
                });
            }
        });
    }

    if (loading) return( 
        <div className='contenedor_pedidos'>
            <p>Cargando perfil...</p>
            <div className='centrar'>
            <CargaBarras/>
            </div>
        </div>
    );
    if (error) return <p>{error}</p>;
    if (!usuario) return <p>No se encontró la información del usuario.</p>;
    

    return (
        <div>
            <div>
                <h1>Perfil</h1>
                <p><strong>Nombre:</strong> {usuario.nombre}</p>
                <p><strong>Correo:</strong> {usuario.correo}</p>

                <Link to='/' className='btn-agregar'>
                    <img src="/salida.png" alt="" />
                    <p>Cerrar sesión</p>
                </Link>

                <SearchBar />
                <div>
                    <Link to='/Dashboard'>
                        <button className='btn'>Regresar</button>
                    </Link>
                    <Link to='/EditarInfoPaciente'>
                        <button className='btn'>Editar</button>
                    </Link>
                </div>

                <div>
                    <h2>Pedidos del paciente</h2>
                    <div className='scroll_pruebas'>
                        {usuario.pedidos?.length > 0 ? usuario.pedidos.map((pedido, i) => (
                            
                            <div key={i} className='margen'>
                                <div className='titulo'>
                                    <img src="/quimica.png" alt="química" className='imgMuestra' />
                                </div>
                                <h1 className='centrar'>{pedido.id || '--'}</h1>
                                <p className='texto'>{pedido.descripcion || '--'}</p>
                                <p className='texto'>{usuario.nombre}</p>
                                <div className='margen'>
                                    <Link to='/RecibosPedidos'>
                                        <img src="/editar.png" alt="editar" className='iconos' />
                                    </Link>
                                    <Link to='/'>
                                        <img src="/detalles.png" alt="detalles" className='iconos' />
                                    </Link>
                                    <img src="/basura.png" alt="borrar" className='iconos' onClick={handleAlert} />
                                </div>
                            </div>
                        )) : (
                            <p>No hay pedidos registrados.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerfilPaciente;
