import { useState, useEffect } from "react";

const useGymAPI = (correo) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ usuario, cambiarUsuario ] = useState(false);
  const [productos , cambiarProductos ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/gym/");
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        const result = await response.json();
        setData(result);
        const usuarioExiste = data.some(user => user.correo === correo);
        cambiarUsuario(usuarioExiste);
        const tags = data.flatMap(item => item.rutina);
        if (tags.length > 0) {
          const productosResponse =  await fetch(`http://127.0.0.1:8000/ProductosPorTag?tags_ids=${tags.join(",")}/`);
          const productoData = await productosResponse.json();
          cambiarProductos(productoData);
         }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [correo]);

  if (loading) return { data: [], loading: true, error: null, usuario: false };
  if (error) return { data: [], loading: false, error, usuario: false };

  return { productos, loading, error, usuario };
};

export default useGymAPI;
