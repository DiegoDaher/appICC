import React, { useEffect, useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { requireTokenOrRedirect } from '../utils/auth';

const Component=() => {
    const [showMenu,setShowMenu] = useState(true);
    const [, setUsuario] = useState(null)
    const [rol, setRol] = useState(null)
    const location = useLocation();
    const navigate = useNavigate(); 
    const apiUrl = process.env.REACT_APP_API_URL;
    
    const isActive = (path) => location.pathname === path;
    
    function handleAlert() {
    const swal = Swal.mixin({
        customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
        },
        buttonsStyling: false,
    });

    swal
        .fire({
        title: '¿Estás seguro de salir?',
        text: 'Tendrás que iniciar sesión de nuevo.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, salir',
        cancelButtonText: 'No, quedarme',
        reverseButtons: true,
        })
        .then(async (result) => {
        if (!result.isConfirmed) return;

        await handleLogout();                 // 1) petición al backend
        swal.fire({
            title: '¡Hasta luego!',
            text: 'Redirigiendo al inicio de sesión…',
            icon: 'success',
            timer: 1000,
            showConfirmButton: false,
        });
        navigate('/', { replace: true });     // 2) redirige
        });
    }
    /* ——— LOGOUT ——— */
    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;
        
        try {
            await fetch(`${apiUrl}/usuarios/logout`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (err) {
            console.error('Error al cerrar sesión', err);
            // aquí podrías mostrar un toast, pero no bloquees el logout local
        } finally {
            localStorage.removeItem('token');  // limpia token en cualquier caso
        }
    };
    

    const HandleMenuDinamico = () => {
        setShowMenu(!showMenu)
    } ;

    useEffect(() => {
        const token = requireTokenOrRedirect();
        const fetchUser = async () => {
            try {
                const res = await fetch(`${apiUrl}/usuarios/login`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    setUsuario(data);
                    setRol(data.rol);
                } else {
                    console.error('No se pudo obtener el usuario');
                }
            } catch (err) {
                console.error('Error al obtener usuario:', err);
            }
        };

        fetchUser();
    }, [apiUrl]);

    /*________________________Render de roles_____________________  */
    /*const renderLinksPorRol = () => {
        if (!rol) return null;

        const linksBase = [];

        if (rol === 'admin') {
            linksBase.push(
                { path: '/Perfil', label: 'Perfil', icon: '/usuario.png' },
                { path: '/Dashboard', label: 'Dashboard', icon: '/dash.png' },
                { path: '/Pacientes', label: 'Pacientes', icon: '/usuario.png' },
                { path: '/Pedidos', label: 'Pedido', icon: '/pedido.png' },
                { path: '/Muestras', label: 'Muestras', icon: '/muestras.png' },
                { path: '/Analisis', label: 'Análisis', icon: '/analisis.png' }
            );
        }

        if (rol === 'accounting') {
            linksBase.push(
                { path: '/Pedidos', label: 'Pedidos', icon: '/pedido.png' },
                { path: '/Muestras', label: 'Muestras', icon: '/muestras.png' },
                { path: '/Analisis', label: 'Análisis', icon: '/analisis.png' }
            );
        }

        if (rol === 'laboratory') {
            linksBase.push(
                { path: '/Muestras', label: 'Muestras', icon: '/muestras.png' },
                { path: '/Analisis', label: 'Análisis', icon: '/analisis.png' }
            );
        }

        if (rol === 'patient') {
            linksBase.push(
                { path: '/Perfil', label: 'Perfil', icon: '/usuario.png' },
                { path: '/EditarInfoPaciente', label: 'Editar info', icon: '/usuario.png' }
            );
        }

        return linksBase.map(({ path, label, icon }) => (
            <Link to={path} key={path} className="nav-link">
                <li className={`bordes ${isActive(path) ? 'active' : ''}`}>
                    <img className="iconos" src={icon} alt={label} />
                    {showMenu && <span className="bordes">{label}</span>}
                </li>
            </Link>
        ));
    };
    */
    const renderLinksPorRol = () => {
        if (!rol) return null;

        const links = [];

        // Común para todos: perfil de usuario
        if (rol === 'patient') {
            return (
                <div className="nav-link">
                    <li className={`bordes ${isActive('/') ? 'active' : ''}`}>
                        <div className='inicial-circulo'>
                            <img src="/dash.png" alt="perfil" className="iconos" />
                        </div>
                        <div className="dropdown">
                            {showMenu && <span className="bordes">Perfil</span>}
                            <div className="dropdown-content">
                                <Link to={'/Perfil'} className="paciente-link">
                                    <p>Ver Pedidos</p>
                                </Link>
                                <Link to={'/EditarInfoPaciente'} className="paciente-link">
                                    <p>Editar info</p>
                                </Link>
                            </div>
                        </div>
                    </li>
                </div>
            );
        }

        if (rol === 'admin') {
            links.push(
                { path: '/Perfil', label: 'perfil', icon: '/dash.png' },
                { path: '/Dashboard', label: 'Dashboard', icon: '/dash.png' },
                { path: '/Pacientes', label: 'Pacientes', icon: '/usuario.png' },
                { path: '/Pedidos', label: 'Pedido', icon: '/pedido.png' },
                { path: '/Muestras', label: 'Muestras', icon: '/muestras.png' },
                { path: '/Analisis', label: 'Análisis', icon: '/analisis.png' }
            );
        }

        if (rol === 'accounting') {
            links.push(
                { path: '/Pedidos', label: 'Pedidos', icon: '/pedido.png' },
                { path: '/Muestras', label: 'Muestras', icon: '/muestras.png' },
                { path: '/Analisis', label: 'Análisis', icon: '/analisis.png' }
            );
        }

        if (rol === 'laboratory') {
            links.push(
                { path: '/Muestras', label: 'Muestras', icon: '/muestras.png' },
                { path: '/Analisis', label: 'Análisis', icon: '/analisis.png' }
            );
        }

        return links.map(({ path, label, icon }) => (
            <Link to={path} key={path} className="nav-link">
                <li className={`bordes ${isActive(path) ? 'active' : ''}`}>
                    <img className="iconos" src={icon} alt={label} />
                    {showMenu && <span className="bordes">{label}</span>}
                </li>
            </Link>
        ));
    };



    return (
        <section className='contenedor'>
            <div className='tabNavigator'>
                <div className={`sidebar ${showMenu ? 'sidebar-open' : 'sidebar-closed'}`}>
                    <img className='menu' src="/logo-iic.png" alt='icon-menu' onClick={HandleMenuDinamico} />
                    <nav className="nav">
                        {renderLinksPorRol()}

                        <Link className="nav-link" onClick={handleAlert}>
                            <li className="bordes">
                                <img className="iconos" src="/salida.png" alt="Salir" />
                                {showMenu && <span className="bordes">Salir</span>}
                            </li>
                        </Link>
                    </nav>
                </div>

                <section className={`plantilla ${showMenu ? 'content-expanded' : 'content-collapsed'}`}>
                    <Outlet />
                </section>
            </div>
        </section>
    )
}

export default Component;
/*
*/

/*
   <section className='contenedor'>
       {location.pathname === '/'}
       <div className='tabNavigator'>
           <div className={`sidebar ${showMenu ? 'sidebar-open' : 'sidebar-closed'}`}>
               <img className='menu' src="/logo-iic.png" alt='icon-menu' onClick={HandleMenuDinamico}/>
               <nav className="nav">
                   
                   <div className="nav-link">
                       <li className={`bordes ${isActive('/') ? 'active' : ''}`}>
                           <div className='inicial-circulo'>
                               <img
                               src='/dash.png'
                               alt='imgperfil'
                               className='iconos'
                               />
                           </div>
                           <div className='dropdown'>
                               <div className='dropdown'>
                               {showMenu && <span className='bordes'> Perfil</span>}
                               </div>
                               <div className='dropdown-content'>
                                   <Link to={'/Perfil'} className="paciente-link">
                                   <p>Ver Pedidos</p>
                                   </Link>
                                   <Link to={'/EditarInfoPaciente'} className="paciente-link">
                                   <p>Editar info</p>
                                   </Link>
                               </div>  
                           </div>
                       </li>
                   </div>
                   
                   <Link to="/Dashboard" className="nav-link">
                       <li className={`bordes ${isActive('/Dashboard') ? 'active' : ''}`}>
                           <img className='iconos' src="/dash.png" alt="" />
                           {showMenu && <span className='bordes'> Dashboard</span>}
                       </li>
                   </Link>
                   <Link to="/Pacientes" className="nav-link">
                       <li className={`bordes ${isActive('/Pacientes') ? 'active' : ''}`}>
                           <img className='iconos' src="/usuario.png" alt="" />
                           {showMenu &&<span className='bordes'>Pacientes</span>}
                       </li>
                   </Link>
                   <Link to="/Pedidos" className="nav-link">
                       <li className={`bordes ${isActive('/Pedidos') ? 'active' : ''}`}>
                           <img className='iconos' src="/pedido.png" alt="" />
                           {showMenu && <span className='bordes'>Pedido</span>}
                       </li>
                   </Link>
                   <Link to="/Muestras" className="nav-link">
                       <li className={`bordes ${isActive('/Muestras') ? 'active' : ''}`}>
                           <img className='iconos' src="/muestras.png" alt="" />
                           {showMenu && <span className='bordes'>Muestras</span>}
                       </li>
                   </Link>
                   <Link to="/Analisis" className="nav-link">
                       <li className={`bordes ${isActive('/Analisis') ? 'active' : ''}`}>
                           <img className='iconos' src="/analisis.png" alt="" />
                           {showMenu && <span className='bordes'>Análisis</span>}
                       </li>
                   </Link>
                   <Link className="nav-link" onClick={handleAlert}>
                       <li className="bordes" onClick={handleAlert}>
                           <img className="iconos" src="/salida.png" alt="Salir" />
                           {showMenu && <span className="bordes">Salir</span>}
                       </li>
                   </Link>
               </nav>
           </div>
               
           <section className={`plantilla ${showMenu ? 'content-expanded' : 'content-collapsed'}`}>
               <Outlet />
           </section>
       </div>
   </section>

*/