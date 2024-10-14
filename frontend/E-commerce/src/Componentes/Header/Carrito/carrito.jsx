import {  Button, Drawer, Box, Typography, Divider, styled, Badge } from '@mui/material';
import { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import CarritoVacio from './carritoVacio';
import CarritoProductos from './carritoProductos';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    backgroundColor: '#808080',
  },
}));

export default function Carrito() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const [productosSeleccionados, setProductosSeleccionados] = useState(
    JSON.parse(localStorage.getItem('productosSeleccionados')) || []
  );

  return (
    <>
      <Button onClick={handleDrawerToggle} sx={{ backgroundColor: '#00a1ed', color: 'white' , m:1}}>
        <StyledBadge badgeContent={
          productosSeleccionados.length > 0 ? productosSeleccionados.length : "0"
          } color="secondary">
          <ShoppingCartIcon />
        </StyledBadge>
        <Box sx={{ pl: '18px' }}>Carrito</Box>
      </Button>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        <Box sx={{ 
          width: '20vw',
          display: 'flex',
        }} role="presentation">
          <Typography
            variant="h1"
            sx={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', m: 2 }}>
            Tu carrito
          </Typography>
          <Button onClick={handleDrawerToggle} sx={{ m: 1, ml: 'auto' }}>
            <CloseIcon />
          </Button>
        </Box>
        <Divider />
        {productosSeleccionados.length > 0 ? 
          <CarritoProductos productosSeleccionados={productosSeleccionados} setProductosSeleccionados={setProductosSeleccionados}/> : 
          <CarritoVacio drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}/>
          }
      </Drawer>
    </>
  )
}
