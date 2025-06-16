//rafc para hacer una plantilla rapida
import React from 'react'
//import Component from './Component'
//import { Outlet } from 'react-router-dom'


const Pedidos =() => {
    return (
        <div className='margen'>
            <div className='buscador'>
            <input type="text" placeholder='Buscar muestras' className='buscador' />
            <button className='btn-agregar'> +agregar</button>
            </div>
            <div className='scale-up-ver-center'>
                <div className='caja_1'>
                    <h1 className='titulo'>Pedidos</h1>
                </div>
            </div>
            <div className='scale-up-ver-center'>
                <div className='caja_2'>
                    <h1 className='titulo'>Detalles</h1>
                </div>
            </div>
        </div>
    )
}

export default Pedidos;