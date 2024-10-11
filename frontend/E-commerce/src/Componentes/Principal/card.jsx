import { Card, CardContent, Typography, CardMedia, CardActionArea, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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

  return (
    <Card 
      sx={{ 
        width: '400px',
        height: '450px',
        borderRadius: '8px', 
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s', 
        '&:hover': { transform: 'scale(1.03)' },
        display: 'flex', 
        flexDirection: 'column',
      }}
    >
      <CardActionArea sx={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component="img"
          image={producto.imagen_url}
          alt={producto.nombre}
          sx={{ maxHeight: '200px', width: '100%', objectFit: 'cover' }}
        />
        <CardContent sx={{ flex: '1' }}>
          <Typography variant="h5" component="div" 
            sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333', marginBottom: '0.5rem' }}>
            {producto.nombre}
          </Typography>
          <Typography variant="body2" color="text.secondary" 
            sx={{ marginBottom: '0.5rem', height: '40px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {producto.descripcion}
          </Typography>
          <Typography variant="h6" component="div" 
            sx={{ fontWeight: 'bold', color: '#2e7d32', marginBottom: '0.5rem' }}>
            ${producto.precio.toFixed(2)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Button 
        variant="contained" 
        sx={{ backgroundColor: '#00a1ed', width: '100%', borderRadius: '0 0 8px 8px'}}>
        Agregar al carrito
      </Button>
    </Card>
  );
}