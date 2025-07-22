import React, { useState } from 'react';
import './AnalysisScreen.css';
import SearchBar from '../Components/elementos/searchBar';

const AnalysisScreen = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [samples, /*setSamples*/] = useState([
    { type: 'Análisis de sangre', createDate: '25/08/2025' },
    { type: 'Análisis de sangre', createDate: '25/05/2025' },
    { type: 'Análisis de sangre', createDate: '25/04/2024' },
    { type: 'Análisis de sangre', createDate: '25/05/2023' },
  ]);

  const userData = {
    name: 'Mario Alberto Lira Zamora',
    birthDate: '09/12/2004',
    email: 'mario.3141230104@utd.edu.mx',
  };

  const options = [
    { value: 'editProfile', label: 'Editar perfil' },
    { value: 'logout', label: 'Cerrar sesión' },
  ];

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    if (e.target.value === 'logout') {
      // Lógica para cerrar sesión
      console.log('Sesión cerrada');
    }
  };

  return (
    <div className="analysis-screen">
      <div className="header">
        <SearchBar />
        <select className="options-combo" value={selectedOption} onChange={handleOptionChange} name="opciones">
          <option value="">Opciones</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      <div className="user-info">
        <div className="userName-box">{userData.name}</div>
        <div className="fechaNacimiento-box">{userData.birthDate}</div>
        <div className="correoElectronico-box">{userData.email}</div>
        <button className="edit-btn">Editar</button>
      </div>
      <div className="muestras">
        {samples.length > 0 ? (
          <table className="samples-table">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Fecha de Creación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {samples.map((sample, index) => (
                <tr key={index}>
                  <td>{sample.type}</td>
                  <td>{sample.createDate}</td>
                  <td>
                    <button className="action-btn"><img src="./icons/edit.png" alt="Edit" /></button>
                    <button className="action-btn"><img src="./icons/download.png" alt="Download" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-samples">No muestras disponibles</div>
        )}
      </div>
    </div>
  );
};

export default AnalysisScreen;