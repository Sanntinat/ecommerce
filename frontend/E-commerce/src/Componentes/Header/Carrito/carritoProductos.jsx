import { Divider, Typography, Box, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import CartaProductoCarrito from '../../Card/card';
import { useState } from 'react';

export default function CarritoProductos({ productosSeleccionados, setProductosSeleccionados }) {
  const [cantidadTotal, setCantidadTotal] = useState(0);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100vh',
        mt: 3,
        maxWidth: '20vw',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexGrow: 1
        }}
      >
        {productosSeleccionados.map((producto) => (
          <CartaProductoCarrito
            key={producto.id}
            producto={producto}
            setCantidadTotal={setCantidadTotal}
            productosSeleccionados={productosSeleccionados}
            setProductosSeleccionados={setProductosSeleccionados}
          />
        ))}
      </Box>

      <Box component="footer" sx={{ width: '100%', textAlign: 'center' }}>
        <Divider />
        <Grid container spacing={10} justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography sx={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', p: 2 }}>
              Total
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', p: 2 }}>
              ${cantidadTotal}
            </Typography>
          </Grid>
        </Grid>
        <Button sx={{ m: 1, borderRadius: 5, backgroundColor: '#00a1ed', width: '90%' }} variant="contained">
          Finalizar compra
        </Button>
      </Box>
    </Box>
  );
}
