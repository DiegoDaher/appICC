// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './styles.css';
import './Dash.css'
import './plantilla.css'

import Component from './Screens/Component.jsx';
//import Recuperacion from './Screens/Recuperacion.jsx';
import Dashboard from './Screens/Dashboard.jsx';
import Pacientes from './Screens/Pacientes.jsx';
import  Muestras  from './Screens/Muestras.jsx';
//import Login from './Screens/Login.jsx';
import Pedidos from './Screens/Pedidos.jsx';
import Analisis from './Screens/Analisis.jsx';


function App() {
  return (
    <Router>
      <Routes>
        {/* Layout principal
        <Route path="/" element={<Login />}>

          Páginas que usan ese layout
        <Route path="/Login" element={<Login />} />
        <Route path="/Recuperacion" element={<Recuperacion />} />
        
        */}

          
          <Route path="/" element={<Component />} >
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Pacientes" element={<Pacientes />} />
          <Route path="/Pedidos" element={<Pedidos />} />
          <Route path="/Muestras" element={<Muestras />} />
          <Route path='/Analisis' element={<Analisis />} />
          </Route>
        {/*</Route>*/}
      </Routes>
    </Router>
  );
}

export default App;