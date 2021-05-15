
import React, {Component} from 'react'
import Buscador from './componentes/Buscador';
import Resultado from './componentes/Resultado';
// import logo from './logo.svg';

import './App.css';
import { render } from '@testing-library/react';


class App extends Component{

  state= {
    termino: '',
    imagenes : [],
    pagina: ''
  }

  scroll = () => {
    const element =document.querySelector('.jumbotron');
    element.scrollIntoView('smooth', 'start');
  }

  paginaAnterior = () => {
    // leer el state a la pagina actual
    let pagina= this.state.pagina;
    // leer si la pagina es 1 ya mo ir hacia atras
    if(pagina === 1) return null;

    // Resta uno  a la pagina actual
    pagina -= 1;
    // agregar el cambio al state
    this.setState({
      pagina
    }, ()=> {
      this.consultarApi();
      this.scroll();
    });
    // console.log(pagina );
   
  }

  paginaSiguiente = () => {
    // leer el state a la pagina actual
    let pagina= this.state.pagina;
    // Sumar uno  a la pagina actual
    pagina += 1;
    // agregar el cambio al state
    this.setState({
      pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    });
    // console.log(pagina );
  }

consultarApi= () => {
  const termino = this.state.termino;
  const pagina = this.state.pagina;
const url= `https://pixabay.com/api/?key=20291062-49d7b8be82738c33799455dfd&q=${termino}&per_page=30&page=${pagina}`;

console.log(url);

fetch(url)
   .then(respuesta => respuesta.json() )
   .then(resultado => this.setState({ imagenes : resultado.hits}) )

}

  datosBusqueda=(termino) => {
    this.setState({
      termino : termino,
      pagina: 1
    
    }, () => { 
      this.consultarApi();
      this.scroll();
        })
      }

render(){
  return(
<div className=" app cointainer">
         <div className="jumbotron"> 
               <p className="lead text-center">Busca una imagen  </p>
              <Buscador
               datosBusqueda={this.datosBusqueda}
              />
         </div>
      <div className="row justify-content-center">
        <Resultado
       imagenes = {this.state.imagenes}   
       paginaAnterior={this.paginaAnterior}
       paginaSiguiente={this.paginaSiguiente}
        />
       </div>
   
</div>
  );
}
}





// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           El futuro es hoy
//           <h1> El principio de un nuevo camino comienza con una compañia unica Dios </h1>
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
