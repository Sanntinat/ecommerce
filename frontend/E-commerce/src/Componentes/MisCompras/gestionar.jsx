import {Box} from '@mui/material'
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import GestionarCompras from './gestionarCompras';
import { useFetchDataOnDemand, useFetch }  from '../../Request/fetch';


export default function MisCompras() {

  const [paginacion2, setPaginacion2] = useState(1);
  const { data: ventas, loading: isLoading, error:errorVenta, fetchData } = useFetchDataOnDemand(`/miscompras/?&page=${paginacion2}`);
  const { data: ventasDetalle, loading: isLoadingDetalle, errorDetalle } = useFetch(`/ventadetalles/`);

  return (
<<<<<<< HEAD
    <Box sx={{ mt: 3}}>
=======
    <Box sx={{width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
>>>>>>> 36d0e4fa0d0e76f6276e7697c3cdfed8a0797082
    <Grid 
      container 
      spacing={1} 
      justifyContent="center" 
      alignItems="center" 
      sx={{ marginBottom: 2 }}
    >
    </Grid>
  
      <GestionarCompras
      ventas={ventas}
      isLoading={isLoading}
      error={errorVenta}
      ventasDetalle={ventasDetalle}
      isLoadingDetalle={isLoadingDetalle}
      errorDetalle={errorDetalle}
      fetchData={fetchData}
      paginacion={paginacion2}
      setPaginacion={setPaginacion2}
      />
    
    </Box>
  )
}
