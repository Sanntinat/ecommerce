import PropTypes from 'prop-types';
import { Card, CardContent, Typography, CardMedia, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Carta({ suplementos, titulo }) {
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

Carta.propTypes = {
  suplementos: PropTypes.string.isRequired, // suplementos debe ser una cadena (url de imagen)
  titulo: PropTypes.string.isRequired,     // titulo debe ser una cadena
};