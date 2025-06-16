import React from 'react'
import { Outlet, Link } from 'react-router-dom'
//import styles from './Component.module.css';

const Component=() => {
    return (
        <div className='contenedor'>
            <div className='tabNavigator'>
                <div>
                    <img className='menu' src="/menu.png" alt='icon-menu' />
                    <Link to="/Dashboard">
                        <li className="bordes"><img src="/dash.png" alt="" /></li>
                        <li>Dashboard</li>
                    </Link>
                    <Link to="/Pacientes">
                        <li className="bordes"><img src="/usuario.png" alt="" /></li>
                        <li>Pacientes</li>
                    </Link>
                    <Link to="/Pedidos">
                        <li className="bordes"><img src="/pedido.png" alt="" /></li>
                        <li>Pedido</li>
                    </Link>
                    <Link to="/Muestras">
                        <li className="bordes"><img src="/muestras.png" alt="" /></li>
                        <li>Muestras</li>
                    </Link>
                    <Link to="/Analisis">
                        <li className="bordes"><img src="/analisis.png" alt="" /></li>
                        <li>analisis</li>
                    </Link>
                        <div className='cerrar-sesion'>
                            <li className="bordes"><img src="/salida.png" alt="" /></li>
                        </div>
                </div>
                <div className='plantilla'>
                    <Outlet />
                    
                </div>  
            </div>
        </div>
    )
}

export default  Component;