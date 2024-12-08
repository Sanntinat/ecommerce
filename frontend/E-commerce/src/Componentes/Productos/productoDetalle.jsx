import { useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress, Alert, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetch } from '../../Request/fetch';
import Grid from '@mui/material/Grid2';


export default function productoDetalle() {
	const { id } = useParams();
	console.log(id);
	const { data: producto, loading, error } = useFetch(`/productos/${id}/`);
	const navigate = useNavigate(); 
	const [ productoActual, cambiarProducto ] = useState(null);

	const [cant, cambiarCant ] = useState(1);

	const controladorCantidad = (event) => {
		cambiarCant(event.target.value);
	};

	useEffect(() => {
		if (producto) {
			cambiarProducto(producto);
			console.log(producto);
		}
	}, [producto]);
	
	if(loading){
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
				<CircularProgress />
			</Box>
		);
	}
	if(error) {
		return <Typography color="error"> Error al encontrar el producto</Typography>;
	}
	return (
		<Box sx={{ mt: 5, p:4, bgcolor:'#f9fafa', borderRadius:2 }}>
			{productoActual && (
				<Grid container spacing={4}>
					<Typography variant="h2" sx={{ mt: 3,ml: 10,  fontSize: '3rem', fontWeight: '600', color: '#333', textAlign: 'center'}}>
						{productoActual.nombre}
					</Typography>
					<Grid sx={{ justifyContent: 'left' }}>
						<Box 
							component="img"
							src={productoActual.imagen_url || 'https://via.placeholder.com/150'}
							alt={productoActual.nombre}
						sx={{width: '90%', maxWidth: 600, borderRadius:2, boxShadow: 3, objectFit: 'cover', height: '70%' }}/>

						<Box> componente comentarios ()</Box>
					</Grid>
					<Grid sx={{ justifyContent: 'right', border: '1px solid #ccc', borderRadius: '8px', p: 3 }}>
						<Typography variant="body1" sx= {{ maxWidth: 600, whiteSpace: 'normal', wordWrap: 'break-word', overflow: 'hidden' }}>
							{productoActual.descripcion}
							aca va la descripcion pero ningun producto tiene entonces meto texto de prueba para ir asegurnadomeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee eeeeeeeeeeeeeee ee 
						</Typography>					
						<Typography variant="body1" sx= {{ p: 2, color: '#00D5FF', textAlign: 'left', maxWidth: 600,fontSize: '40px',mt: 3,  whiteSpace: 'normal', wordWrap: 'break-word', overflow: 'hidden' }}>
							$ {productoActual.precio}
						</Typography>
						<Typography sx={{textAlign: 'left', mb: 3, ml: 3, maxHeight:'80%'}}>
							{productoActual.stock > 0 ? 'stock disponible' : 'stock agotado'}
						</Typography>
						{/*falta logica de cantidad*/}
						<Box sx={{display: 'flex', justifyContent: 'flex-start'}}>
							<FormControl fullWidth sx={{maxWidth:200}}>
								<InputLabel id="demo-simple-select-label"> Cantidad </InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={cant}
									label="Cantidad"
									onChange={controladorCantidad}>
									<MenuItem value={1}>una unidad</MenuItem>
									<MenuItem value={2}>dos unidades</MenuItem>
									<MenuItem value={3}>tres unidades</MenuItem>
								</Select>
							</FormControl>
						</Box>
						<Button variant="contained" color="primary" sx={{width: '75%', mt: 10}}>
							Comprar ahora
						</Button>						
						<Button variant="outlined" color="primary" sx={{width: '75%', mt: 3}}>
							Agregar al carrito
                  		</Button>

					</Grid>
				</Grid>
			)}
		</Box>	
	);
};






