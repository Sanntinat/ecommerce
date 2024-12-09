import { Box, Typography, Button, TextField, Autocomplete } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../../Request/fetch';
import { useState } from 'react';
import Formulario from './formulario';
import { usePostData } from '../../../Request/post';
import { formato } from './formato';

export default function CrearProducto() {
  const navigate = useNavigate();
  const { data: tags, loading: loadingTags } = useFetch('/tags/');
  const [createdProduct, setCreatedProduct] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setCreatedProduct((prev) => ({
        ...prev,
        imagen_url: imageUrl,
      }));
    }
  };

  const handleInputChange = (field, value) => {
    setCreatedProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const { postData, errorPost, loadingPost } = usePostData();
  const handleButtonClick = () => {
    postData(`/productos/`, formato(createdProduct))
      .then((data) => {
        navigate(`/admin/?creado=true`);
      })

  };

  return (
    <Box sx={{ mt: 5, p: 4, bgcolor: '#f9fafa', borderRadius: 2 }}>
      <Typography
        variant="h1"
        sx={{
          fontSize: '3rem',
          fontWeight: '600',
          color: '#333',
          textAlign: 'center',
          mb: 3,
        }}
      >
        Crear producto
      </Typography>
      <Grid container spacing={4}>
        {/* Imagen a la izquierda */}
        <Grid xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>

        <Box
            component="img"
            src={selectedImage || 'https://via.placeholder.com/500/FFFFFF/FFFFFF'}
            alt="Imagen del producto"
            sx={{
              width: '100%',
              maxWidth: 500,
              borderRadius: 2,
              boxShadow: 3,
              objectFit: 'cover',
            }}
          />
          {/* Botón para cargar la imagen */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            onClick={() => document.getElementById('file-input').click()}
          >
            <Button
              variant="contained"
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                textTransform: 'none',
                fontSize: '1rem',
              }}
            >
              Cargar Imagen
            </Button>
          </Box>
          {/* Input oculto para subir la imagen */}
          <input
            id="file-input"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
  

        </Grid>

        {/* Inputs a la derecha */}
        <Grid xs={12} md={6}>
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Formulario editedProduct={createdProduct} setEditedProduct={setCreatedProduct} handleInputChange={handleInputChange} />
          </Box>

          {/* Botones debajo de los inputs */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
            <Button variant="contained" color="primary" onClick={handleButtonClick}>
              Guardar Cambios
            </Button>
            <Button variant="contained" color="error" onClick={() => navigate(`/admin/`)}>
              Cancelar
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
