import { useEffect } from 'react';
import './App.css';
import Header from './components/Header.js'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Routes from './Routes'

function App() {
  
  

  return (
    <div className="App">
      {/* Hola maría
      <button type="button" className="btn btn-primary">caerle bien a maría</button>
      <Header/>
      <div className="row">
        HEADER
      </div>
      <div className="row">
        <div className="col-12 col-md-6">primera caja</div>
        <div className="col-12 col-md-6">segunda caja</div>
      </div>
      <div>
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
      </div> */}
      <Router>
          <Routes/>
      </Router>
    </div>
  );
}

export default App;
