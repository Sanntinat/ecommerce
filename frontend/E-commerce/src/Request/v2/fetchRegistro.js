export const fetchRegistro = async (email, password, navigate) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      navigate('/login'); 
    } else {
      const errorText = await response.text(); 
      console.error('Error:', errorText); 
      return `Error al realizar la solicitud: ${errorText}`; 
    }
  } catch (error) {
    console.error('Error de red:', error); 
    return 'Error al realizar la solicitud';
  }
};

  
  
  
  
  