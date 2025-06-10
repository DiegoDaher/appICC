//rfce para hacer una plantilla
import React from 'react'

function Pacientes() {
    return (
        <div className='margen'>
            <div className='buscador'>
            <input type="text" placeholder='Buscar muestras' className='buscador' />
            <button> +agregar</button>
            <br />
                <h1 className='titulo'> Recibo Paciente</h1>
            </div>
            <div className='caja_1'>
            </div>
        </div>
    )
}

export default Pacientes;
