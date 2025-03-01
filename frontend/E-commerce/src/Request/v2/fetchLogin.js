const apiUrl = import.meta.env.VITE_BASE_URL;

export const fetchLogin = async (username, password, login, navigate) => {
  try {
    const response = await fetch(apiUrl+'/getToken/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      login(token); 
      navigate('/'); 
    } else {
      return 'Error de autenticación';
    }
  } catch (error) {
    return 'Error al realizar la solicitud';
  }
};

  
  
  
  
  