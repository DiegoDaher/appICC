import React from 'react'

const CompletadosPedidos = () => {
    const nombres = ["David Jezhuah Ramirez Alvarado"];
    return (
        <div className='pedidos-form'>
                    <h1 className='titulo'>Detalles</h1>
                    <div>
                        <div className=''>
                            {nombres.map((nombreCompleto,index) => {
                                const inicial = nombreCompleto.charAt(0);
                                    return(
                                        <div key={index} className='prueba_tabla'>
                                            <div className='inicial-circulo'>
                                                <p className='letra-circulo'>{inicial}</p>
                                            </div>
                                            <div>
                                                <p className='prueba-name'>{nombreCompleto}</p>                                
                                            </div>
                                        </div>
                                        );
                                    })}
                        </div>
                        <p>fecha de toma:</p>
                        <p>21/02/2025</p>
                        <form>
                            <label>Total</label>
                            <input
                            className="input-field"
                            type="text"
                            name="Total"
                            placeholder="1200.00$"
                            value=""
                            />
                            <label>Descuento</label>
                            <input
                            className="input-field"
                            type="text"
                            name="Descuento"
                            placeholder="15%"
                            value=""
                            />
                            <label>Anticipo</label>
                            <input
                            className="input-field"
                            type="text"
                            name="Anticipo"
                            placeholder="300.00$"
                            value=""
                            />
                            <label>Debe</label>
                            <input
                            className="input-field"
                            type="text"
                            name="Debe"
                            placeholder="0.00$"
                            value=""
                            />
                            <label>Doctor</label>
                            <input
                            className="input-field"
                            type="text"
                            name="Debe"
                            placeholder="Dr Rivera"
                            value=""
                            />
                        </form>
                    </div>
                </div>
    )
}

export default CompletadosPedidos