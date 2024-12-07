import { useState } from 'react';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetch } from '../../Request/fetch';

export default function productoDetalle() {
	const { id } = useParams(); 
	const { data: producto, loading, error } = useFetch(`/productos/${id}/`);
	const navigate = useNavigate(); //?
	
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
			<Typography variant="h2" sx={{ fontSize: '3rem', fontWeight: '600', color: '#333', textAlign: 'center' mb:3}}>
				{producto.nombre}
			</Typography>
			<Grid container spacing={4}>
				<Grid sx={{ display: 'flex', justifyContent: 'left' }}>
					<Box 
						component="img"
						src={producto.imagen_url || 'https://via.placeholder.com/150'}
						alt={producto.nombre}
						sx={{width: '100%', maxWidth: 500, borderRadius:2, boxShadow: 3, objectFit: 'cover'}}/>
				</Grid>

	)
}


















