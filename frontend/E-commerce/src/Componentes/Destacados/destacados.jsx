import { useState, useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Box, Typography, Button } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { useFetch } from '../../Request/fetch.js'
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const CarruselDestacados = () => {
	const { data, loading, error } = useFetch('/productos/destacados/');
	console.log(data);
	const [indiceActivo, setIndiceActivo] = useState(0);
	const [productos, cambiarProductos] = useState([]);
 	const handleStepChange = (step) => {
    	setIndiceActivo(step);
	};
	const handleNext = () => {
    	setIndiceActivo((prev) => (prev + 1) % productos.length);
  	};
	const handleBack = () => {
    	setIndiceActivo((prev) => (prev - 1 + productos.length) % productos.length);
	};

	useEffect(() => {
		if(data){
			console.log(data);
			cambiarProductos(data);
		}
	}, [data]);

	return (
		<>
			<h3 class="MuiTypography-root MuiTypography-h3 MuiTypography-gutterBottom css-hu96ex-MuiTypography-root">Productos destacados</h3>
			<Box sx={{ maxWidth: 800, flexGrow: 1 }}>
				<Button 
       	 		onClick={handleBack}
        		sx={{
          			position: 'absolute',
          			top: '50%',
          			left: 150,
          			zIndex: 1,
          			transform: 'translateY(4410%)',
          			backgroundColor: 'rgba(0,0,0,0.5)',
          			color: 'white',
          			'&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
        			}}
      				>
        			<ArrowBackIos />
      			</Button>
		    	<AutoPlaySwipeableViews
		        axis={'x'}
    		    index={indiceActivo}
     		   	onChangeIndex={handleStepChange}
		        enableMouseEvents
    			>
        			{productos.map((producto, index) => (
    			      <div key={producto.id}>
           				 {Math.abs(indiceActivo - index) <= 2 ? (
				            <Box sx={{ padding: 2, textAlign: 'center' }}>
            				    <img src={producto.imagen_url} alt={producto.nombre} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
       					        <Typography variant="h6">{producto.nombre}</Typography>
                				<Typography variant="body1">{producto.descripcion}</Typography>
              				</Box>
            			 ) : null}
			         </div>
        		    ))}
				 </AutoPlaySwipeableViews>
				 <Button
			        onClick={handleNext}
			        sx={{
			        position: 'absolute',
			        top: '50%',
			        right: 150,
          			zIndex: 1,
			        transform: 'translateY(4410%)',
          			backgroundColor: 'rgba(0,0,0,0.5)',
          			color: 'white',
          			'&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
        			}}
      				>
       				 <ArrowForwardIos />
      			</Button>
			</Box>
		</>
  );
};

export default CarruselDestacados;

