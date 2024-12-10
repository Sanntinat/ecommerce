import { Card, CardContent, Typography, CardMedia, CardActionArea, Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext } from 'react';
import { CarritoContext } from '../Header/Carrito/carritoContext';

export function CartaCategoria({ suplementos, titulo }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/productos?categoria=${titulo}`);
  };

  return (
    <Card onClick={handleCardClick} sx={{ width: '350px', height: '220px', backgroundColor: '#fff' }}>
      <CardActionArea>
        <CardContent>
          <CardMedia
            component="img"
            image={suplementos}
            alt={titulo}
            sx={{ maxHeight: '200px', width: '100%'}}/>
          <Typography variant="h5" component="div"
            sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333', marginBottom: '0',}}>
            {titulo}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}


export function CartaProducto({ producto }) {
  const navegar = useNavigate();
  const handleAgregarProducto = () => {
	navegar(`/productos/${producto?.id}/`);
  };

  return (
    <Card 
      sx={{ 
        width: '300px',
        height: 'auto',
        borderRadius: '12px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': { 
          transform: 'scale(1.05)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        },
        display: 'flex', 
        flexDirection: 'column',
      }}
      onClick={handleAgregarProducto} // Usar la función de agregar producto del contexto
    >
      <CardActionArea sx={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component="img"
          image={producto.imagen_url}
          alt={producto.nombre}
          sx={{ objectFit: 'cover', borderTopLeftRadius: '12px', borderTopRightRadius: '12px',}}
        />
        <CardContent sx={{ flex: '1', display: 'flex', flexDirection: 'column', padding: '16px' }}>
        <Typography 
          variant="h6"
          component="div" 
          sx={{ fontSize: '1.2rem', fontWeight: '400', color: '#333', marginBottom: '0.5rem' }} // Ajustes de tamaño y peso
        >
          {producto.nombre}
        </Typography>
        <Typography 
            variant="h6" 
            component="div" 
            sx={{ fontWeight: '600', color: '#2e7d32', marginTop: 'auto' }}
          >
            ${producto.precio.toFixed(2)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default function CartaProductoCarrito({ producto, setCantidadTotal, actualizarCantidad }) {
  const [cantidad, setCantidad] = useState(1);
  const { eliminarProducto } = useContext(CarritoContext);

  useEffect(() => {
    const nuevoTotal = producto.precio * cantidad;
    setCantidadTotal((prev) => prev + nuevoTotal);

    // Cuando se desmonte o cambie la cantidad, restamos el valor anterior
    return () => {
      setCantidadTotal((prev) => prev - nuevoTotal);
    };
  }, [cantidad, producto.precio, setCantidadTotal]);

  const aumentarCantidad = () => {
    setCantidad((prev) => prev + 1);
    actualizarCantidad(producto.id, cantidad + 1); // Actualizamos la cantidad
  };

  const disminuirCantidad = () => {
    if (cantidad > 1) {
      setCantidad((prev) => prev - 1);
      actualizarCantidad(producto.id, cantidad - 1); // Actualizamos la cantidad
    }
  };

  const handleEliminar = () => {
    eliminarProducto(producto.id);
  };

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', width: '80%', height: '80px', padding: '8px', marginBottom: '10px' }}>
      <CardMedia
        component="img"
        image={producto.imagen_url}
        alt={producto.nombre}
        sx={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
      />
      <CardContent sx={{ flex: '1', display: 'flex', flexDirection: 'column', paddingLeft: '8px' }}>
        <Typography variant="h6" component="div" sx={{ color: '#333', marginBottom: '4px', fontSize: '0.7rem' }}>
          {producto.nombre}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '4px' }}>
          <IconButton onClick={disminuirCantidad} size="small">
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2" sx={{ margin: '0 4px', fontSize: '0.9rem' }}>
            {cantidad}
          </Typography>
          <IconButton onClick={aumentarCantidad} size="small">
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
      </CardContent>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <IconButton size="small" onClick={handleEliminar}>
          <DeleteIcon fontSize="small" color='error' />
        </IconButton>
        <Typography variant="body2" component="div" sx={{ fontWeight: '600', color: '#2e7d32', fontSize: '0.9rem', mt: '8px' }}>
          ${(producto.precio * cantidad).toFixed(2)}
        </Typography>
      </Box>
    </Card>
  );
}
