import React from 'react';

const InfoMuestras = ({ muestra, onClose }) => {
    if (!muestra) return null;

    return (
        <div className='modal-overlay'>
            <div className='scale-in-hor-center'>
                <div className='modal-content'>
                    <button className="close-btn" onClick={onClose}>X</button>
                    <div className='caja_1'>
                        <h2>Información de la muestra</h2>
                        <p><strong>ID:</strong> {muestra._id}</p>
                        <p><strong>Tipo de muestra:</strong> {muestra.tipoMuestra || "--"}</p>
                        <p><strong>Paciente:</strong> {muestra.nombrePaciente || "--"}</p>
                        <p><strong>Estado:</strong> {muestra.status ? "Activa" : "Inactiva"}</p>
                        {muestra.fecha && (
                            <p><strong>Fecha:</strong> {new Date(muestra.fecha).toLocaleDateString()}</p>
                        )}
                        {/* Agrega más campos si los tienes */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoMuestras;
