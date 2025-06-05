//import logo from './logo.svg';
//import './App.css';
import './styles.css'
//import Component from './Screens/Component';


function App() {
  return (
    <div className='contenedor'>
      <div className='tabNavigator'>
        <div>
          <li><img src="./assets/menu.png" alt='coso del menu'></img></li>
            <a href="../src/Screens/Component.jsx">
                    <li class="bordes"></li>
                    <li>dashboard</li>
            </a>
            <a href="../src/Screens/Component.jsx">
              <li class="bordes"></li>
              <li>pacientes</li>
            </a>
            <a href="../src/Screens/Component.jsx">
              <li class="bordes"></li>
              <li>pedidos</li>
            </a>
            <a href="../src/Screens/Component.jsx">
              <li class="bordes"></li>
              <li>muestras</li>
            </a>
            <a href="../src/Screens/Component.jsx">
              <li class="bordes"></li>
              <li>analisis</li>
            </a>
            <a href="../src/Screens/Component.jsx">
              <li class="bordes"></li>
              <li></li>
              <div className='cerrar-sesion'></div>
            </a>
        </div>
        <div className='plantilla'>
          <p>plantila</p>
        </div>
      </div>
    </div>
  );
}
/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>wolare ya jalo</h1>
        <p>estamadre me va a mostrar un hola</p>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a className='coso' href='../public/plantila.html' target='_blank'>
        coso
        </a>
        <Component />
        
      </header>
    </div>
  );
}
*/
export default App;
