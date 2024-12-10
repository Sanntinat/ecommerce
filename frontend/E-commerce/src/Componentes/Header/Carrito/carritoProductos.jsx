import { Divider, Typography, Box, Button, Alert, Snackbar } from '@mui/material';
import Grid from '@mui/material/Grid2';
import CartaProductoCarrito from '../../Card/card';
import { useState, useContext } from 'react';
import { useAuth } from '../../Login/authContext';
import { useNavigate } from 'react-router-dom';
import { useFinalizarCompras } from '../../../Request/v2/fetchFinalizarCompras';
import ModalExito from './modalExito';

export default function CarritoProductos({ productosSeleccionados, setProductosSeleccionados }) {
  const [modalOpen, setModalOpen] = useState(false);
  const handleCloseModal = () => setModalOpen(false);
  const [cantidadTotal, setCantidadTotal] = useState(0);
  const [cantidades, setCantidades] = useState({});
  const [error, setError] = useState(false); // Estado para controlar el mensaje de error
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { finalizarCompras } = useFinalizarCompras();

  const actualizarCantidad = (productoId, cantidad) => {
    setCantidades((prevCantidades) => ({
      ...prevCantidades,
      [productoId]: cantidad,
    }));
  };

  const handleButtonClick = async () => {
    if (isAuthenticated) {
      const detalles = productosSeleccionados.map((producto) => ({
        producto: producto.id,
        cantidad: cantidades[producto.id] || 1,
      }));
  
      try {
        const response = await finalizarCompras(detalles);
        console.log('Compra finalizada con éxito:', response);
  
        setModalOpen(true); // Abre el modal inmediatamente
  
      } catch (error) {
        console.error('Error al finalizar la compra:', error);
        setError(true);
      }
    } else {
      navigate('/login');
    }
  };

  const handleCloseError = () => {
    setError(false); // Cierra el mensaje de error
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100vh',
        mt: 3,
        width: '100%',
      }}
    >
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
        {productosSeleccionados.map((producto) => (
          <CartaProductoCarrito
            key={producto.id}
            producto={producto}
            setCantidadTotal={setCantidadTotal}
            actualizarCantidad={actualizarCantidad}
          />
        ))}
      </Box>

      <Box component="footer" sx={{ width: '100%', textAlign: 'center' }}>
        <Divider />
        <Grid container spacing={10} justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography sx={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', p: 2 }}>Total</Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', p: 2 }}>
              ${cantidadTotal.toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
        <Button
          sx={{ m: 1, borderRadius: 5, backgroundColor: '#00a1ed', width: '90%' }}
          variant="contained"
          onClick={handleButtonClick}
        >
          Finalizar compra
        </Button>
      </Box>

      {/* Modal de éxito */}
      <ModalExito open={modalOpen} handleClose={handleCloseModal} navigate={navigate} />

      {/* Snackbar de error */}
      <Snackbar
        open={error}
        autoHideDuration={4000} // El mensaje se oculta automáticamente después de 4 segundos
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={handleCloseError} sx={{ width: '100%' }}>
          Ha ocurrido un error al procesar tu compra. Por favor, inténtalo nuevamente.
        </Alert>
      </Snackbar>
    </Box>
  );
}
