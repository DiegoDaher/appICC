import React, { useState } from 'react'
import ListaMuestras from './ListaMuestras';
import MuestrasCanceladas from './MuestrasCanceladas';

const OpcionesMuestras = ({ buttonLabels = [ 'Completadas', 'Canceladas'] }) => {
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
                                    <ListaMuestras />
                                </div>
                            </div>
                        </div>
                    ) : activeButton === buttonLabels[1] ? (
                        <MuestrasCanceladas  />
                    ) : null}
                </div>
        </div>
    );
}

export default OpcionesMuestras