import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Componentes/Header/header'
import Principal from './Componentes/Principal/principal'
import Productos from './Componentes/Productos/productos'
import { Box } from '@mui/material'

function App() {
  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Principal />} />
          <Route path="/productos" element={<Productos />} />
        </Routes>
    </Router>
  );
}

export default App
