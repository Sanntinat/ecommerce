import { useFetch } from '../fetch';

const apiUrl = '/miscompras/';  // Endpoint para obtener las compras del usuario

export const useFetchCompras = (isAuthenticated) => {
  // Realiza siempre el fetch, pero devuelve valores predeterminados si no está autenticado
  const { data = [], loading, error } = useFetch(apiUrl);

  // Solo si está autenticado, se usan los datos de compras
  const compras = isAuthenticated && Array.isArray(data) ? data : [];

  return { compras, loading, error };
};
