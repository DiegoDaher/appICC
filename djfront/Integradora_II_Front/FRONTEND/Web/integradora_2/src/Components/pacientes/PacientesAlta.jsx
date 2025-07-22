import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { requireTokenOrRedirect } from "../../utils/auth";
import CargaBarras from '../elementos/CargaBarras';
import SearchBar from '../elementos/searchBar';

const PacientesAlta = ({seleccionado,onSelect = () => {}}) => {
    const [pacientes, setPacientes] = useState([]);
    const [, setRawResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;
    const [token, setToken] = useState(null);
    const [busqueda, setBusqueda] = useState('');
    //const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);

    /*________________obtener token________________*/
    useEffect(() => {
        const tk = requireTokenOrRedirect();
        setToken(tk);
    }, []);
    /*__________________Peticion a pacientes__________________*/
    useEffect(() => {
        if (!token) return;
        const fetchPacientes = async () => {
            setLoading(true);
            setError(null);
            try {
                console.log("API URL:", apiUrl);
                console.log("TOKEN:", token);
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                };
                const response = await fetch(`${apiUrl}/usuarios`, {
                    method: 'GET',
                    headers
                });
                const text = await response.text();
                setRawResponse(text);
                //console.log("Raw response:", text); //esto muestra el arreglo de pacientes
                if (response.status === 401) {
                    <div>

                    </div>
                        setError('Sesion expirada, redirigiendo...');
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 1500);
                    return;
                }
                if (!response.ok) {
                    throw new Error('Error al obtener pacientes');
                }
                const datat = JSON.parse(text);
                setPacientes(Array.isArray(datat) ?datat : (datat.usuarios || []));
            } catch (error) {
                setError('Error al obtener pacientes');
            } finally {
                setLoading(false);
            }
        };
        fetchPacientes();
    }, [apiUrl, token]);

    function handleAlert(pacienteId) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        /*___________Aqui empieza el estilo de swal_____________ */
        swalWithBootstrapButtons.fire({
            title: "Estas Seguro de darlo de baja?",
            text: "No podras Revertirlo una vez lo des de baja!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, dar de baja!",
            cancelButtonText: "No, cancelar!",
            reverseButtons: true
        }).then(async (result) => {
            if (!token) return;
            if (result.isConfirmed) {
                setLoading(true);
                setError(null);
                try {
                    /*___________madre de validacion de token_____________ */
                    console.log("API URL:", apiUrl);
                    console.log("TOKEN:", token);
                    const headers = {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    };
                    const response = await fetch(`${apiUrl}/usuarios/${pacienteId}`, {
                        method: 'DELETE',
                        headers,
                        body: JSON.stringify({ status: false }),
                    });
                    if (!response.ok) {
                        throw new Error('Error al dar de baja al paciente');
                    }
                    // Actualiza la lista localmente quitando el paciente dado de baja
                    setPacientes(prev => prev.filter(p => p._id !== pacienteId));
                    swalWithBootstrapButtons.fire({
                        title: "Baja exitosa!",
                        text: "El paciente ha sido dado de baja correctamente",
                        icon: "success",
                        timer : 1300,
                        showConfirmButton: false
                    });
                    return;
                } catch (error) {
                    swalWithBootstrapButtons.fire({
                        title: "Error!",
                        text: "No se pudo dar de baja al paciente",
                        icon: "error",
                        timer : 1300,
                        showConfirmButton: false
                    });
                    return;
                }
            } else if(result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "!Cancelado!",
                    text: "Regresando a la pagina",
                    icon: "success",
                    timer : 1000,
                    showConfirmButton: false
                });
                return;
            }
        })
    }

    const pacientesFiltrados = pacientes.filter(
        p => (p.nombre.toLowerCase().includes(busqueda) ) && (p.status === true || p.status === 'true') && p.rol === 'patient',
        
    );
    // Log para verificar el filtrado
    if (loading) return (
        <div className='scale-up-ver-center'>    
            <div className='caja_1'>
                <div className='centrar'>
                    <br />
                    <br />
                    <CargaBarras />
                </div>
            </div>
        </div>
        );
    if (error) return <div>{error}</div>;
    const handleBusqueda = (valor) => {
    setBusqueda(valor.toLowerCase()); // para evitar errores de mayúsculas
    };




    return (
        <div>
            < SearchBar onSearch={handleBusqueda} />
            <div className='caja_1'>
                <div className='scroll'>
                    {pacientesFiltrados.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '20px', color: '#666', fontStyle: 'italic', fontSize: '14px' }}>
                            <p>No hay pacientes activos.</p>
                        </div>
                    ) : (
                        pacientesFiltrados.map((p, index) => {
                            const nombreCompleto = `${p.nombre} ${p.apellidoPaterno} ${p.apellidoMaterno}`;
                            const inicial = p.nombre.charAt(0);
                            const isSelected = seleccionado === p._id;
                            console.log("Paciente selecionado:", isSelected);
                            return(
                                <div 
                                key={p._id || index} 
                                className={`prueba_tabla ${isSelected ? 'seleccionado' : ''}`} 
                                onClick={() => typeof onSelect==='function'&& onSelect(p._id)} >
                                    <div className='inicial-circulo'>
                                        <p className='letra-circulo'>{inicial}</p>
                                    </div>
                                    <div>
                                        <div className='acomodar-iconos'>
                                            <img src="/basura.png" alt="borrar" className='icono-borrar' onClick={(e) =>{e.stopPropagation(); handleAlert(p._id)} }/>
                                        </div>
                                        <p className='prueba-name'>{nombreCompleto}</p>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>
            </div>
        </div>
    )
}

export default PacientesAlta