import React from 'react';

const SampleModal = ({ sample, onClose }) => {
  if (!sample) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>Cerrar</button>
        <img src="/bioHem.png" alt="Sample Icon" className="modal-icon" />
        <div className="modal-details">
          <p><strong>Id</strong><br />{sample.id}</p>
          <p><strong>Fecha cuando se tomó la muestra</strong><br />{sample.date}</p>
          <p><strong>Tipo de muestra</strong><br />{sample.sampleType}</p>
          <p><strong>Procedimiento</strong><br />{sample.procedure}</p>
          <p><strong>Resultados</strong></p>
          {sample.results && sample.results.map((result, index) => (
            <p key={index}><a href={result.url} download>{result.name}</a></p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SampleModal;