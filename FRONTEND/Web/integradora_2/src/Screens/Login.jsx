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
      <Header />
      <Carousel />
      <LoginForm onSubmit={handleLogin}/>
    </div>
  );
};

export default Login;