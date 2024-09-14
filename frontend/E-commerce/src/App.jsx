import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Componentes/Header/header'
import Principal from './Componentes/Principal/principal'

function App() {

  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" Component={Principal} />
        </Routes>
      </Router>
    </>
  )
}

export default App
