import React from 'react';   
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './Componentes/Header/header';
import Principal from './Componentes/Principal/principal';
import Productos from './Componentes/Productos/productos';
import Gestionar from './Componentes/GestionarProductos/gestionar';
import Signin from './Componentes/Login/SignIn';
import HeaderLogin from './Componentes/HeaderLogin/header';
import { AuthProvider, useAuth } from './Componentes/Login/authContext';  
import { CarritoProvider } from './Componentes/Header/Carrito/carritoContext';
import SignUp from './Componentes/Registrar/SignUp'
<<<<<<< HEAD
import EditarProducto from './Componentes/GestionarProductos/CrudProductos/editarProducto';
import CrearProducto from './Componentes/GestionarProductos/CrudProductos/crearProducto';
=======
import MisCompras from './Componentes/MisCompras/MisCompras'
import EditarProducto from './Componentes/GestionarProductos/ModalProductos/editarProducto';
import CrearProducto from './Componentes/GestionarProductos/ModalProductos/crearProducto';
>>>>>>> 0a5eef46c3020f43b8a8d42b88a6987f18f1f22e
import ProtectedRoute from './Componentes/Login/ProtectedRoute';
import ProtectedRouteAuthenticated from './Componentes/Login/ProtectedNoAdmin';
import Footer from './Componentes/Principal/footer'


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
        <Route path="/compras" element={<ProtectedRouteAuthenticated> 
          <MisCompras />
          </ProtectedRouteAuthenticated >} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Gestionar />
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
	  {!loginRoutes.includes(location.pathname) && <Footer />}  
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
