//rfce para hacer una plantilla
import React from 'react'

function Pacientes() {
    return (
        <div className='margen'>
            <div className='buscador'>
            <input type="text" placeholder='Buscar Analisis' className='buscador' />
            <button>+Agregar</button>
            </div>
            <div className='caja_1'>
                <div className='prueba_tabla'>
                    <img src="/prueba-de-sangre.png" alt="prueba imagen" className='imagenes' />
                    <p className='prueba-name'>Quimica Sangiunea</p>
                    <img src="/borrar.png" alt="editar" className='iconos' />
                    <img src="/editar.png" alt="borrar" className='iconos' />
                </div>
                <hr />
            </div>
            <div className='caja_2'>
                <h1 className='titulo'>Detalles</h1>
                <div className='prueba_tabla'>
                    <img src="/prueba-de-sangre.png" alt="prueba imagen" className='imagenes' />
                    <p className='prueba-name'>Quimica Sangiunea</p>
                    <p>(qt)</p>
                    <img src="/email.png" alt="editar" className='iconos' />
                    <img src="/descargas.png" alt="borrar" className='iconos' />
                </div>
                
            </div>
        </div>
    )
}

export default Pacientes;
