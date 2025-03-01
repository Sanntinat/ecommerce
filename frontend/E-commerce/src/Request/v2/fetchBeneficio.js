const apiUrl = import.meta.env.VITE_BASE_URL;

export const verificarBeneficio = async (email) => {
    try {
      const response = await fetch(apiUrl+"/integracion1");
      if (!response.ok) throw new Error("Error al consultar integración");
      const data = await response.json();
  
      console.log(data); // Verificar los datos obtenidos
      return data.some(user => user.correo === email);
    } catch (error) {
      console.error("Error al verificar beneficio:", error);
      return false;
    }
  };
  