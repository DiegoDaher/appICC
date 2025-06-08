import React from 'react';
import Header from '../Components/headerHome';
import Carousel from '../Components/carousel';
import LoginForm from '../Components/loginform';
import './loginPage.css';
const Login = () => {
  const handleLogin = (result) => {
    if (result.success) {
      console.log('Login exitoso, token:', result.token);
      // Redirigir o actualizar estado aquí
    }
  };
  return (
    <div className="App">
      <div class="parent">
          <div class="div1"><Header title="Bienvenido"/></div>
          <div class="div2"><Carousel /></div>
          <div class="div3"><LoginForm onSubmit={handleLogin}/></div>
      </div>
      
      
    </div>
  );
};

export default Login;