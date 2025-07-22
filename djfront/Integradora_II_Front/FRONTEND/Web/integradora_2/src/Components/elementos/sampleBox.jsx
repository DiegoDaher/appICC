import React from 'react'; 
import { Link } from 'react-router-dom';

// Componente individual para cada muestra
const SampleBox = ({ id, type, technician }) => {
  const getIcon = () => {
    switch (type.toLowerCase()) {
      case 'biometria hematica':
        return '/bioHem.png'; // O usa require o import si no están en public
      case 'quimica sanguinea':
        return '/quimica.png';
      default:
        return '/bioHem.png';
    }
  };

  return (
    <div className="sample-box">
      <img src={getIcon()} alt={`${type} icon`} className="sample-icon" />

      <div className="sample-info">
        <h3>ID: {id}</h3>
        <p>Tipo: {type}</p>
        <p>Técnico: {technician}</p>
      </div>

      <div className="sample-actions">  
        <Link to={`/Detalles/${id}`}>
          <button className="action-btn">
            <img src="/editar.png" alt="Editar" />
          </button>
        </Link>
        <button className="action-btn" onClick={() => alert('Actualizar muestra')}>
          <img src="/refresh.png" alt="Actualizar" />
        </button>
        <button className="action-btn" onClick={() => alert('Ver detalles')}>
          <img src="/view.png" alt="Ver" />
        </button>
        <button className="action-btn" onClick={() => alert('Eliminar muestra')}>
          <img src="/basura.png" alt="Eliminar" />
        </button>
      </div>
    </div>
  );
};

// Componente que lista todas las muestras
const SampleBoxes = ({ samples }) => {
  if (!samples || samples.length === 0) {
    return <p>No hay muestras disponibles.</p>;
  }

  return (
    <div className="sample-boxes">
      {samples.map((sample, index) => (
        <SampleBox
          key={index}
          id={sample.id}
          type={sample.type}
          technician={sample.technician}
        />
      ))}
    </div>
  );
};

export default SampleBoxes;
