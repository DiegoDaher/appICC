//rafc para hacer una plantilla rapida
import { useState } from 'react'
import { OpcionesPedidos } from '../Components';
import { ModalPedidos } from '../Components';
//import Component from './Component'
//import { Outlet } from 'react-router-dom'


const Pedidos =() => {
    const [modalAbierto, setModalAbierto] = useState(false);

    return (
        <div>
            <p className='titulo'>Pedidos </p>
            <div>
                <button className='btn-agregar'  onClick={() => setModalAbierto(true)}>+Agregar</button>
                {modalAbierto && <ModalPedidos onClose={() => setModalAbierto(false)} />}
                
            </div>
            <div className='contenedor_pedidos'>
                <div>
                        <OpcionesPedidos/>
                </div>
            </div>
        </div>
    )
}

export default Pedidos;