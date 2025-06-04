import logo from './logo.svg';
import './App.css';
import Component from './Screens/Component';


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
        {/*/esta*/}
        <Component />
        
      </header>
    </div>
  );
}

export default App;
