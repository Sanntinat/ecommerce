import React from 'react';   
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './Componentes/Header/header';
import Principal from './Componentes/Principal/principal';
import Productos from './Componentes/Productos/productos';
import GestionarProductos from './Componentes/GestionarProductos/gestionarProductos';
import Signin from './Componentes/Login/SignIn';
import HeaderLogin from './Componentes/HeaderLogin/header';
import { AuthProvider, useAuth } from './Componentes/Login/authContext';  
import { CarritoProvider } from './Componentes/Header/Carrito/carritoContext';
import SignUp from './Componentes/Registrar/SignUp'
import EditarProducto from './Componentes/GestionarProductos/ModalProductos/editarProducto';
import CrearProducto from './Componentes/GestionarProductos/ModalProductos/crearProducto';
import ProtectedRoute from './Componentes/Login/ProtectedRoute';


function App() {

  const App = () => {
    const location = useLocation();
  }
  const loginRoutes = ['/login', '/registrar'];
  const location = useLocation();
  const { logout } = useAuth();
  React.useEffect(() => {
    if (location.pathname === '/login') {
      logout();
    }
  }, [location, logout]);

  return (
    <>
      {loginRoutes.includes(location.pathname) ? <HeaderLogin /> : <Header />}

      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/registrar" element={<SignUp />} />
        <Route path="/productos" element={<Productos />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <GestionarProductos />
            </ProtectedRoute>
          }
        />
        <Route path="/editar-producto/:id" element={<ProtectedRoute>
          <EditarProducto />
        </ProtectedRoute>} />
        <Route path="/crear-producto" element={ <ProtectedRoute> 
          <CrearProducto />
        </ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default function AppWrapper() {
  return (
    <AuthProvider>
      <CarritoProvider>
        <Router>
          <App />
        </Router>
      </CarritoProvider>
    </AuthProvider>
  );
}