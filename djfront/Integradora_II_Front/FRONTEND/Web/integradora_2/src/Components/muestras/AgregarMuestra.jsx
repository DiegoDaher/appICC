import React, { useState } from 'react';

const AgregarMuestra = ({ onClose }) => {
  const [selectedTest, setSelectedTest] = useState('');
  const [formData, setFormData] = useState({
    pedido: '',
    tipoMuestra: '',
    paciente: '',
    resultados: ''
  });

  const handleTestChange = (test) => {
    setSelectedTest(test);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { selectedTest, ...formData });
    // Aquí puedes agregar la lógica para enviar los datos
    onClose(); // Cerrar modal después de enviar
  };

  return (
    <div>
      <div>
        <h2>Registrar Nueva Muestra</h2>
        <div className="form-section">
          <h3>Tipo de Prueba</h3>
          <div className="test-options">
            <div
              className={`test-option ${selectedTest === 'Quimica Sanguinea' ? 'selected' : ''}`}
              onClick={() => handleTestChange('Quimica Sanguinea')}
            >
              <img src="/prueba-de-sangre.png" alt="Quimica Sanguinea" className='imagen-prueba' />
              <span>Quimica Sanguinea</span>
            </div>
            <div
              className={`test-option ${selectedTest === 'Biometria Hematica' ? 'selected' : ''}`}
              onClick={() => handleTestChange('Biometria Hematica')}
            >
              <img src='/quimica.png' alt="Biometria Hematica" className='imagen-prueba'/>
              <span>Biometria Hematica</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Pedido</label>
          <input
            type="text"
            name="pedido"
            className="input-field"
            value={formData.pedido}
            onChange={handleInputChange}
            placeholder="P1285"
          />
          
          <label>Tipo de muestra</label>
          <input
            type="text"
            name="tipoMuestra"
            className="input-field"
            value={formData.tipoMuestra}
            onChange={handleInputChange}
            placeholder="Sangre"
          />
          
          <label>Paciente (id)</label>
          <input
            className="input-field"
            type="text"
            name="paciente"
            value={formData.paciente}
            onChange={handleInputChange}
            placeholder="Ej. P123"
          />
          
          <label>Resultados</label>
          <input
            className="input-field"
            type="file"
            name="resultados"
            onChange={handleInputChange}
          />
          
          <div className="form-actions">
            <button type="submit" className="btn">Registrar</button>
            <button type="button" className="btn" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgregarMuestra;
