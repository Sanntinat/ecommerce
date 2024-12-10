import { useState, useEffect, useContext } from 'react';
import { Box, Typography, Button, CircularProgress, Alert, Chip, Stack } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetch } from '../../Request/fetch';
import Grid from '@mui/material/Grid2';
import { CarritoContext } from '../Header/Carrito/carritoContext';
import Carrito from '../Header/Carrito/carrito';

export default function ProductoDetalle() {
	const {data : categorias ,loading: laodingCat } = useFetch('/categorias/');
	const { id } = useParams();
	console.log(id);
	const { data: producto, loading, error } = useFetch(`/productos/${id}/v2/`);
	const navigate = useNavigate(); 
	const [ productoActual, cambiarProducto ] = useState(null);
	const [ categoriass, cambiarCat ] = useState(null);
	const [cant, cambiarCant ] = useState(1);
	const suma = () => cambiarCant(cant + 1);
	const resta = () => cambiarCant(Math.max(cant -1, 1));
	const { productosSeleccionados, agregarProducto } = useContext(CarritoContext);

	const handleAgregarProducto = () => {
		const productoYaSeleccionado = productosSeleccionados.some(
			(p) => p.id === producto.id
		);
		if (!productoYaSeleccionado) {
			agregarProducto(producto);
		}
	};

	useEffect(() => {
		if (producto) {
			cambiarProducto(producto);
			console.log(producto);
		}
	}, [producto]);

	useEffect(() => {
		if (categorias) {
			console.log(categorias);
			cambiarCat(categorias);
		}
	}, [categorias,productoActual]);

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
		<Box sx={{ mt: 5, p:4, bgcolor:'#f9fafa', borderRadius:2, width:'100vw'}}>
			{productoActual && (
				<>
				<Typography variant="h3" sx={{ mt: 3,ml: 10,mb:5,  fontSize: '3rem', fontWeight: '600', color: '#333', textAlign: 'center'}}>
					{productoActual.nombre}
				</Typography>
				<Grid container spacing={4} >
						<Grid item xs={12} md={7} sx={{ display: 'flex', justifyContent: 'center' }}>
						<Box 
							component="img"
							src={productoActual.imagen_url || 'https://via.placeholder.com/150'}
							alt={productoActual.nombre}
						sx={{ maxWidth: 600, borderRadius:2, boxShadow: 3, objectFit: 'cover' }}/>
					</Grid>
					<Grid item xs={12} md={5} sx={{ display: 'flex',alignItems: 'flex-start', justifyContent: 'flex-start',flexDirection: 'column',border: '1px solid #ccc', borderRadius: '8px', p: 3 }}>
						<Typography variant="body1" sx= {{ maxWidth: 600, whiteSpace: 'normal', wordWrap: 'break-word', overflow: 'hidden' }}>
							{productoActual.descripcion}
							aca va la descripcion pero ningun producto tiene entonces meto texto de prueba
						</Typography>
						{productoActual && categoriass && (
							<Box sx={{mt:5}}>
								<Stack direction="row" spacing={1}>
									{productoActual?.tags?.map((tag) => {
										return (
											<Chip key={tag.id} color='primary' label={tag.idCategoria.nombre+ ' >> ' + tag.nombre}/>
										);
									})}
								</Stack>
						</Box>
						)}
					
						<Typography variant="body1" sx= {{ p: 2, color: 'green', textAlign: 'left', maxWidth: 600,fontSize: '40px',  whiteSpace: 'normal', wordWrap: 'break-word', overflow: 'hidden' }}>
							$ {productoActual.precio}
						</Typography>
						<Typography sx={{textAlign: 'left', mb: 3, maxHeight:'80%'}}>
							{productoActual.stock > 0 ? 'stock : disponible' : 'stock : agotado'}
						</Typography>
						<Button variant="contained" color="primary" sx={{width: '75%', mt: 10, ml:8}} onClick={handleAgregarProducto}>
							Agregar al carrito
						</Button>						

					</Grid>
				</Grid>
			</>
			)}
			</Box>	
	);
};


