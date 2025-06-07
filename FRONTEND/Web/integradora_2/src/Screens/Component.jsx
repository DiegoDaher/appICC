import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Component() {
    return (
        <div className='contenedor'>
            <div className='tabNavigator'>
                <div>
                <li><img src="./dashboard.jsx" alt='coso del menu'></img></li>
                    <a href="../src/Screens/Component.jsx">
                            <li class="bordes"></li>
                            <li>dashboard</li>
                    </a>
                    <a href="../src/Screens/Component.jsx">
                <li class="bordes"></li>
                <li>pacientes</li>
                    </a>
                    <a href="../src/Screens/Component.jsx">
                <li class="bordes"></li>
                <li>pedidos</li>
                    </a>
                    <a href="../src/Screens/Component.jsx">
                    <li class="bordes"></li>
                    <li>muestras</li>
                    </a>
                    <a href="../src/Screens/Component.jsx">
                    <li class="bordes"></li>
                    <li>analisis</li>
                    </a>
                    <a href="../src/Screens/Component.jsx">
                    <li class="bordes"></li>
                    <li></li>
                    <div className='cerrar-sesion'></div>
                    </a>
                </div>
                <div className='plantilla'>
                    <Outlet />
                <p>plantilla</p>
                </div>
            </div>
        </div>
    )
}
