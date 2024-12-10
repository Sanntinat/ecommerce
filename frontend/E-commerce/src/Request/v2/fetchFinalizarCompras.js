import { usePostData } from "../post";

export function useFinalizarCompras() {
  const { postData, errorPost, loading } = usePostData();

  const finalizarCompras = async (detalles) => {
    const endpoint = "/ventas/";
    const payload = { detalles, usuario: null }; // Se agrega el campo 'usuario' con valor null

    try {
      const response = await postData(endpoint, payload);
      return response; 
    } catch (error) {
      console.error("Error al finalizar compras:", error);
      throw error; 
    }
  };

  return { finalizarCompras, errorPost, loading };
}
