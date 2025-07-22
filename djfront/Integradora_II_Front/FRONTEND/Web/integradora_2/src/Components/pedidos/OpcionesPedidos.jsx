import React, { useState } from 'react'
//import EnProcesoPedidos from './EnProcesoPedidos';
import ListaPedidos from './ListaPedidos';
import PedidosCancelados from './PedidosCancelados';


const OpcionesPedidos = ({ buttonLabels = [ 'Completadas', 'Canceladas'] }) => {
    const [activeButton, setActiveButton] = useState(buttonLabels[0]);

    const handleButtonClick = (label) => {
        setActiveButton(label);
    };

    return (
        <div>
            <div className="filter-bar">
                <div className="filter-buttons">
                    {buttonLabels.map((label, index) => (
                    
                    <button
                        key={index}
                        className={`filter-button ${activeButton === label ? 'active' : ''}`}
                        onClick={() => handleButtonClick(label)}>
                        {label}
                    </button>
                    ))}
                </div>
            </div>
                <div>
                    {activeButton === buttonLabels[0] ? (
                        <div>
                            <div className='margen'>
                                <div className='scale-up-ver-center'>
                                    <ListaPedidos/>
                                </div>
                            </div>
                        </div>
                    ) : activeButton === buttonLabels[1] ? (
                        <PedidosCancelados />
                    ) : null}
                </div>
        </div>
    );
};

export default OpcionesPedidos
/*
activeButton === buttonLabels[0] ? (
                        <div className='margen'>
                            <div className='scale-up-ver-center'>
                                <EnProcesoPedidos/>
                            </div>
                        </div>
                    ) : 
*/