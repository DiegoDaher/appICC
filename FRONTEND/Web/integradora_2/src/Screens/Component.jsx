import React from 'react'
import { Outlet, Link } from 'react-router-dom'
//import styles from './Component.module.css';

function Component() {
    return (
        <div className='contenedor'>
            <div className='tabNavigator'>
                <div>
                <img className='iconos' src="/menu.png" alt='coso del menu'></img>
                <Link to="/Dashboard">
                    <li className="bordes"></li>
                    <li>Dashboard</li>
                </Link>
                <Link to="/Pacientes">
                    <li className="bordes"></li>
                    <li>Pacientes</li>
                </Link>
                <Link to="/Pedidos">
                    <li className="bordes"></li>
                    <li>Pedido</li>
                </Link>
                <Link to="/Muestras">
                    <li className="bordes"></li>
                    <li>Muestras</li>
                </Link>
                <Link to="/Analisis">
                    <li className="bordes"></li>
                    <li>analisis</li>
                </Link>
                    <div className='cerrar-sesion'></div>
                    
                </div>
                <div className='plantilla'>
                    <Outlet />
                    
                </div>  
            </div>
        </div>
    )
}

export default  Component;