import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Componentes/Header/header'
import Principal from './Componentes/Principal/principal'
import Productos from './Componentes/Productos/productos'
import GestionarProductos from './Componentes/GestionarProductos/gestionarProductos'

function App() {
  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Principal />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/admin" element={<GestionarProductos/>} />
        </Routes>
    </Router>
  );
}

export default App
