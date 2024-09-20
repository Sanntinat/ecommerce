import React from 'react'
import {  Button, Drawer, Box, Typography, Divider } from '@mui/material';
import { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';

export default function Carrito() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <Button onClick={handleDrawerToggle} sx={{ backgroundColor: '#00a1ed', color: 'white' , m:1 }}>
        <ShoppingCartIcon />
        Carrito (0)
      </Button>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        <Box
          sx={{ width: '20vw' }}
          role="presentation"
          onClick={handleDrawerToggle}
          onKeyDown={handleDrawerToggle}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#333',
              m:2
            }}
          >
          Tu carrito
          </Typography>
          <Divider/>
        </Box>
      </Drawer>
    </>
  )
}
