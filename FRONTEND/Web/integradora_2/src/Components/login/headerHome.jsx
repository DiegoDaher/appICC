import React from 'react';

const headerHome = ({title}) => {
  return (
    <header>
      <img src="/logo-iic.png" alt="IIC Logo" />
      <h1>{title}</h1>
      <img src="/logo-ujed.png" alt="UJED Logo" />
    </header>
  );
};

export default headerHome;