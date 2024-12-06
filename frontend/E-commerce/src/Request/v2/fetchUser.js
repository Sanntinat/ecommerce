import { useFetch } from '../fetch';

const apiUrl = '/user/me/';

export const useFetchUser = (isAuthenticated) => {
  // Realiza siempre el fetch, pero devuelve valores predeterminados si no está autenticado
  const { data = {}, loading, error } = useFetch(apiUrl);

  const nombre = isAuthenticated ? data?.nombre || '' : '';
  const apellido = isAuthenticated ? data?.apellido || '' : '';
  const admin = isAuthenticated ? data?.is_staff || false : false;
  const email = isAuthenticated ? data?.email || '' : '';
  const dni = isAuthenticated ? data?.dni || '' : '';

  return { nombre, apellido, admin, email, dni, loading, error };
};
