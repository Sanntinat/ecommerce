import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';

export default function Carta({ suplementos, titulo }) {
  return (
  
  <Card sx={{ width: '350px', height: '220px' ,backgroundColor: '#fff'}}>
    <CardActionArea>
    <CardContent>
      <CardMedia
          component="img"
          image={suplementos}
          alt={titulo}
          sx={{ 
            maxHeight: '200px',
            width: '100%',
          }}
        />
      <Typography variant="h5" component="div"
              sx={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '0',
              }}
            >
        {titulo}
      </Typography>
    </CardContent>
    </CardActionArea>
  </Card>
  );
}