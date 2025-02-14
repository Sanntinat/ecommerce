import { usePostData } from "../post";

export function useFinalizarCompras() {
  const { postData, errorPost, loading } = usePostData();

  const verificarBeneficio = async (email) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/integracion1");
      if (!response.ok) throw new Error("Error al consultar integración");
      const data = await response.json();

      console.log(data);  // Verificar los datos obtenidos
      return data.some(user => user.correo === email);  // Corrección aquí
    } catch (error) {
      console.error("Error al verificar beneficio:", error);
      return false;
    }
  };

  const finalizarCompras = async (detalles, email) => {
    const tieneBeneficio = await verificarBeneficio(email); 
    const endpoint = "/ventas/";
    const payload = {
      detalles,
      usuario: null,
      tiene_beneficio: tieneBeneficio // Asegúrate de enviar 'tiene_beneficio' y no 'tieneBeneficio'
    };

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
