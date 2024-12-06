import React from 'react';
import { Box, Typography, Grid, Link } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ width: '100%', backgroundColor: '#1976d2', color: 'white', padding: 4 }}>
      <Grid container spacing={4} justifyContent="space-between">
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Ubicación</Typography>
          <Typography variant="body2">calle falsa 123, Quilmes</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Contactanos</Typography>
          <Typography variant="body2">Tel: (123) 456-7890</Typography>
          <Typography variant="body2">Email: powerFit@gmail.com.ar</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Redes Sociales</Typography>
          <Link href="https://facebook.com" color="inherit" sx={{ marginRight: 2 }}>
            <Facebook sx={{ fontSize: 40 }} />
          </Link>
          <Link href="https://twitter.com" color="inherit" sx={{ marginRight: 2 }}>
            <Twitter sx={{ fontSize: 40 }} />
          </Link>
          <Link href="https://instagram.com" color="inherit">
            <Instagram sx={{ fontSize: 40 }} />
          </Link>
        </Grid>
      </Grid>
      <Box sx={{ textAlign: 'center', marginTop: 4 }}>
        <Typography variant="body2">&copy; 2024 PowerFit. Todos los derechos reservados.</Typography>
        <Typography variant="body2">
          <Link href="/politica-de-privacidad" color="inherit">Política de privacidad</Link> | 
          <Link href="/terminos-y-condiciones" color="inherit">Términos y condiciones</Link>  
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;

