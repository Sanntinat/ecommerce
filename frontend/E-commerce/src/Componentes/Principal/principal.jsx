
import banner from '../../assets/banner.jpg';
import entrenamiento from '../../assets/entrenamiento.webp';
import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Carta from './card';
import suplementos from '../../assets/suplementos-gym.jpg';
import gimnasio from '../../assets/gimnasio.jpeg';
import kinesiologia from '../../assets/kinesiologia.jpg';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

export default function principal() {
  return (
    <>
      <img src={banner} alt="Banner" />
      <Divider sx={{ width:'70%', m:3 }} />
      <Typography variant="h1" sx={{ 
        fontSize: '3rem', 
        fontWeight: '600', 
        color: '#333', 
        textAlign: 'center',
      }}>
        Categorias
      </Typography>

        <Grid container spacing={12}> 
          <Grid item xs={4}> 
            <Carta suplementos={suplementos} titulo="Suplementos"/>
          </Grid>
          <Grid item xs={4}>
            <Carta suplementos={kinesiologia} titulo="Kinesiologia"/>
          </Grid>
          <Grid item xs={4}>
          <Carta suplementos={gimnasio} titulo="Gimnasio"/>
          </Grid>
        </Grid>
        <Divider sx={{ width:'70%', m:3 }} />

        <Box sx={{width:'1980px'}} >
          <Grid container spacing={4}>
            <Grid item> 
            <img src={entrenamiento} alt="entrenamiento"  />
            </Grid>
            <Grid>

              <Box
              flex={1}
              padding={4}
              sx={{  bgcolor: '#f5f5f5', borderRadius: '8px', height:'515px' }}
              >
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                Descubre nuestros productos
              </Typography>
              <List>
                <ListItem sx={{ fontSize: '1.2rem', lineHeight: '1.5' }}>
                  Suplementos de alta calidad para potenciar tu rendimiento.
                </ListItem>
                <ListItem sx={{ fontSize: '1.2rem', lineHeight: '1.5' }}>
                  Productos específicos para cada objetivo: musculación, pérdida de peso y más.
                </ListItem>
                <ListItem sx={{ fontSize: '1.2rem', lineHeight: '1.5' }}>
                  Accesorios de gimnasio para un entrenamiento efectivo en casa o en el gym.
                </ListItem>
                <ListItem sx={{ fontSize: '1.2rem', lineHeight: '1.5' }}>
                  Sabores deliciosos en cada suplemento, ¡disfruta mientras te cuidas!
                </ListItem>
                <ListItem sx={{ fontSize: '1.2rem', lineHeight: '1.5' }}>
                  Productos diseñados para ayudarte a construir hábitos saludables.
                </ListItem>
                <ListItem sx={{ fontSize: '1.2rem', lineHeight: '1.5' }}>
                  Asesoría personalizada para encontrar lo que mejor se adapta a ti.
                </ListItem>
              </List>
              </Box>

            </Grid>
          </Grid>
        </Box>

    </>
  )
}
