//rafc para hacer una plantilla rapida
import React from 'react'
import { MuestrasHechas, SampleChart } from '../Components';

const Dashboard=()=> {
    return (
        <div className='margen'>
            <div>
                <div className='div-graficas'>
                    <h2>Temperatura del Laboratorio</h2>
                    <p>25% c</p>
                    <div className='div-grafica'>
                        < MuestrasHechas/>
                    </div>
                </div>
                <div className='div-graficas'>
                    <h2>Humedad del Laboratorio</h2>
                    <p>25% c</p>
                    <div className='div-grafica'>
                        <SampleChart/>
                    </div>
                </div>
            </div>
            <div>
            <div className='div-muestra'>
                <h2 className='centrar'>Pedidos Pendientes</h2>
                <h1 className='centrar'>12</h1>
                </div>
            <div className='div-muestra-2'>
                <h2 className='centrar'>muestras en preocesamiento</h2>
                <h1 className='centrar'>15</h1>
            </div>
            <div className='div-muestra-3'>
                <h2 className='centrar'>contenedor #id</h2>
                <h1 className='centrar'>precaucion</h1>
                </div>
            <div className='div-muestra-4'>
                <h2 className='centrar'>contenedor #id</h2>
                <h1 className='centrar'>muestra protegida</h1>
                </div>
            </div>
        </div>
    )
}   

export default Dashboard;