import banner from '../../assets/banner.jpg';
import entrenamiento from '../../assets/entrenamiento.webp';
import Grid from '@mui/material/Grid2';
import { CartaCategoria } from '../Card/card';
import suplementos from '../../assets/suplementos-gym.jpg';
import gimnasio from '../../assets/gimnasio.jpeg';
import kinesiologia from '../../assets/kinesiologia.jpg';
import CheckIcon from '@mui/icons-material/Check';
import { Typography, Divider, Box, List, ListItem, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CarruselDestacados from './destacados.jsx';
import './principal.css';


export default function Principal() {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/productos?categoria=');
  };
  return (
	  <>
	  <img src={banner} alt="Banner" style={{width:"100%",height:"110%", objectFit: 'cover' }} />		      
	  <Divider sx={{ width: '70%', m: 3 }} />
	  <CarruselDestacados /> 
      <Divider sx={{ width: '70%', m: 3 }} />

      <Box sx={{ width: '100%' }}> 
        <Grid container spacing={2}>
          <Grid size={6}>
            <img src={entrenamiento} alt="entrenamiento" style={{objectFit:'cover',width:'auto'}}/>
          </Grid>
          <Grid size={6}>
            <Box
              flex={1}
              padding={1}
              sx={{ bgcolor: '#f5f5f5', height: '97%' }}
            >
              <Typography
                variant="h3"
                gutterBottom
                sx={{ fontWeight: 'bold', color: '#333', textAlign: 'left' }}>
                Descubre nuestros productos
              </Typography>
              <List>
                <ListItem sx={{ fontSize: '1.5rem', lineHeight: '1.5' }}>
                  <CheckIcon sx={{color:'#00a1ed'}}/> Suplementos de alta calidad para potenciar tu rendimiento.
                </ListItem>
                <ListItem sx={{ fontSize: '1.5rem', lineHeight: '1.5' }}>
                  <CheckIcon sx={{color:'#00a1ed'}}/> Productos específicos para cada objetivo: musculación, pérdida
                  de peso y más.
                </ListItem>
                <ListItem sx={{ fontSize: '1.5rem', lineHeight: '1.5' }}>
                  <CheckIcon sx={{color:'#00a1ed'}}/> Accesorios de gimnasio para un entrenamiento efectivo en casa o
                  en el gym.
                </ListItem>
                <ListItem sx={{ fontSize: '1.5rem', lineHeight: '1.5' }}>
                  <CheckIcon sx={{color:'#00a1ed'}}/> Sabores deliciosos en cada suplemento, ¡disfruta mientras te
                  cuidas!
                </ListItem>
                <ListItem sx={{ fontSize: '1.5rem', lineHeight: '1.5' }}>
                  <CheckIcon sx={{color:'#00a1ed'}}/> Productos diseñados para ayudarte a construir hábitos
                  saludables.
                </ListItem>
                <Button 
                  variant="outlined" 
                  sx={{ width: '200px', padding: '12px 24px', backgroundColor: '#00a1ed', color: '#fff', borderRadius: '8px', m:5}}
                  onClick={handleSearchClick}
                  >
                  Comprar ahora
                </Button>
              </List>
            </Box>
          </Grid>
        </Grid>
        <Box>
          <Divider sx={{ width: '70%', m: '0 auto', mt: 3 }} />
          <Typography
            variant="h1"
            sx={{ fontSize: '3rem', fontWeight: '600', color: '#333', textAlign: 'center', mt: 2 }}
          >
            Categorias
          </Typography>
          <Grid container spacing={12} justifyContent={'center'}>
            <Grid xs={4}>
              <CartaCategoria suplementos={suplementos} titulo="Suplementos" />
            </Grid>
            <Grid xs={4}>
              <CartaCategoria suplementos={kinesiologia} titulo="Kinesiologia" />
            </Grid>
            <Grid xs={4}>
              <CartaCategoria suplementos={gimnasio} titulo="Gimnasio" />
            </Grid>
          </Grid>
        </Box>
      </Box>
	  <Divider sx={{ width: '70%', m: 3 }} />
    </>
  );
}
