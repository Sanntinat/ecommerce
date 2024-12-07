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
    	setIndiceActivo((prev) => (prev + 1) % grupos.length);
  	};
	const handleBack = () => {
    	setIndiceActivo((prev) => (prev - 1 + grupos.length) % grupos.length);
	};

	useEffect(() => {
		if(data){
			console.log(data);
			cambiarProductos(data);
		}
	}, [data]);

	const mostrar = 5;
	const grupos = productos.reduce((result, producto, index) => {
		const grupoIndex = Math.floor(index / mostrar);
		if (!result[grupoIndex]) result[grupoIndex] = [];
		result[grupoIndex].push(producto);
		return result;
	}, []);

	return (
		<>
			<Box sx={{ position: 'relative', overflow: 'hidden' }}>
				<Button 
       	 		onClick={handleBack}
        		sx={{
          			position: 'absolute',
          			top: '50%',
					left: 16,
          			zIndex: 1,
          			transform: 'translateY(-155%)',
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
        			{grupos.map((grupo, index) => (
						<Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', gap : 2, padding: 2 }}>
							{grupo.map((producto) => (
								<Box key={producto.id} sx={{ textAlign: 'center', flex: '1 1 calc(20% - 16px)', maxWidth: '20%', }}>
            				    	<img src={producto.imagen_url} alt={producto.nombre} style={{ 
										width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }} />
									<Typography	variant="body1" sx={{ 
										color: 'white', 
										display: '-webkit-box', 
										WebkitBoxOrient: 'vertical', 
										overflow: 'hidden', 
										textOverflow: 'ellipsis', 
										WebkitLineClamp: 2, }}>
											{producto.nombre}
									</Typography>
									<Typography	variant="body1" sx={{ 
										color: '#00D5FF', 
										display: '-webkit-box', 
										WebkitBoxOrient: 'vertical', 
										overflow: 'hidden', 
										textOverflow: 'ellipsis', 
										WebkitLineClamp: 2, }}>
											$ {producto.precio} 
									</Typography>

	              				</Box>
							))}
						</Box>
					))}
				 </AutoPlaySwipeableViews>
				 <Button
			        onClick={handleNext}
			        sx={{
			        position: 'absolute',
			        top: '50%',
			        right: 20,
          			zIndex: 18,
			        transform: 'translateY(-155%)',
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

