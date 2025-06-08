import React from 'react';
import Header from '../Components/headerHome';
import Carousel from '../Components/carousel';
import RecuperacionForm from '../Components/recuperacionForm';
import './loginPage.css';
const Recuperacion = () => {
  

  return (
    <div className="App">
      <div class="parent">
          <div class="div1"><Header title="Recuperacion"/></div>
          <div class="div2"><Carousel /></div>
          <div class="div3"><RecuperacionForm/></div>
      </div>
      
      
    </div>
  );
};

export default Recuperacion;