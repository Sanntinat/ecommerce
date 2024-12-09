import {Box, Button } from '@mui/material'
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import GestionarProductos from './gestionarProductos';
import GestionarVentas from './gestionarVentas';
import { useFetchSearch, useFetchDataOnDemand, useFetch }  from '../../Request/fetch';


export default function Gestionar() {

  const [selectedSection, setSelectedSection] = useState("productos");
  const [paginacion, setPaginacion] = useState(1);
  const parseData = (data) => data;
  const [valorBuscador, setValorBuscador] = useState('');
  const [ data, loading, error, searchData ] = useFetchSearch(`/productos/?&page=${paginacion}`, 200, parseData);
  const [paginacion2, setPaginacion2] = useState(1);
  const { data: ventas, loading: isLoading, error:errorVenta, fetchData } = useFetchDataOnDemand(`/miscompras/?&page=${paginacion2}`);
  const { data: ventasDetalle, loading: isLoadingDetalle, errorDetalle } = useFetch(`/ventadetalles/`);

  return (
    <Box sx={{ mt: 10}}>
    <Grid 
      container 
      spacing={1} 
      justifyContent="center" 
      alignItems="center" 
      sx={{ marginBottom: 2 }}
    >
      <Button
        variant={selectedSection === "productos" ? "contained" : "outlined"}
        onClick={() => setSelectedSection("productos")}
      >
        Productos
      </Button>
      <Button
        variant={selectedSection === "ventas" ? "contained" : "outlined"}
        onClick={() => setSelectedSection("ventas")}
      >
        Ventas
      </Button>
    </Grid>
    {selectedSection === "productos" && (
      <GestionarProductos 
      data={data}
      loading={loading}
      error={error}
      searchData={searchData}
      paginacion={paginacion}
      setPaginacion={setPaginacion}
      parseData={parseData}
      valorBuscador={valorBuscador}
      setValorBuscador={setValorBuscador}
      />
    )}
    {selectedSection === "ventas" && (
      <GestionarVentas
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
    )}
    </Box>
  )
}
