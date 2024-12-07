import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Login/authContext';
import { useFetchUser } from '../../Request/v2/fetchUser';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { nombre, apellido, admin, email, dni, loading: userLoading, error } = useFetchUser(isAuthenticated);
  
  console.log(nombre, apellido, admin, email)

  // Estado intermedio para asegurar que los datos están cargados
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Verifica si tanto la autenticación como los datos del usuario están listos
    if (!authLoading && !userLoading && !error) {
      setIsReady(true);
    }
  }, [authLoading, userLoading, error]);

  if (authLoading || userLoading || !isReady) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user data</div>;
  }

  if (!isAuthenticated || !admin) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
