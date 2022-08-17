import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Conteiner from './Components/Conteiner';
import Movimentacao from './Components/Movimentacao';
import Relatorio from './Components/Relatorio';


function App() {
  return (
    <BrowserRouter>
     <Routes>
       <Route exact path='/' element={ < Home /> }/>
       <Route exact path='/conteiner' element= { < Conteiner /> }/> 
       <Route exact path='/movimentacao' element= { < Movimentacao /> }/>
       <Route exact path='/relatorio' element= { <Relatorio /> }/>
    </Routes>
    </BrowserRouter>

);
}

export default App;
