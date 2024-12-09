import React from 'react';
import Box from '@mui/material/Box' 
import Typography from '@mui/material/Typography' 
import Grid from '@mui/material/Grid' 
import { Facebook, Twitter, Instagram } from '@mui/icons-material';
import { GoogleMap, LoadScript, Marker, LoadScriptNext } from '@react-google-maps/api';
import { useLocation } from 'react-router-dom';


const Footer = () => {
	
	const url = useLocation();
	const containerStyle = {
  		width: '90%',
		height: '200px',
		marginLeft: '30px',
		marginTop: '20px',
		marginRight: '0px',
	};
	const center = {
  		lat: -34.603684, // Coordenadas de ejemplo (Buenos Aires, Argentina)
 		lng: -58.381559,
	};

	return (
		url.pathname !== '/admin' && (
	    	<Box sx={{ width: '100%', backgroundColor: '#1976d2', color: 'white', mb: 0}}>
      		<Grid container justifyContent="space-between">
        	<Grid item xs={5}>
     			<LoadScriptNext googleMapsApiKey="AIzaSyDSY2z4DrAMaUtFBEkM9_Mn_DtMAeW9X2A">
	  				<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
         	 			<Marker position={center} />
        			</GoogleMap>
				</LoadScriptNext>
			</Grid>
			<Grid item xs={3} sx={{textAlign: 'left', pt: 3}}>
		 		<Typography variant="h5" sx={{ textAlign: 'left', pl:0 , ml:0 }}>Ubicación</Typography>
			 	<Typography variant="body2">calle falsa 123, Quilmes</Typography>
		 	</Grid>
			<Grid item xs={12} sm={4}>
		 		<Typography variant="h4" sx={{mb: 1, mt:6 }}>Contactanos</Typography>
          		<Typography variant="body2">Tel: (123) 456-7890</Typography>
		  		<Typography variant="body2">Email: powerFit@gmail.com.ar</Typography>
        		<Typography variant="body2">&copy; 2024 PowerFit. Todos los derechos reservados.</Typography>
        	</Grid>
      	</Grid>
      <Box sx={{ textAlign: 'center', marginTop: 2 }}>
      </Box>
  	</Box>
	)
  );
};

export default Footer;

