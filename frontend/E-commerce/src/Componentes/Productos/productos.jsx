import { useEffect, useState } from 'react';
import Filtros from './filtros';
import { Box, Typography, IconButton, Stack, Chip, Divider, CircularProgress  } from '@mui/material';
import { Tune } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import ListaProductos from './listaProductos';
import Paginacion from './paginacion';
import Ordenar from './ordenar';
import { CustomDrawer, Main } from './mainConDrawer';

import { useFetchProductos } from '../../Request/v2/fetchProductos';


export default function Productos() {
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const precios = {
    min: searchParams.get('min') || '',
    max: searchParams.get('max') || ''
  }
  // const tags = searchParams.get('tags') || '';
  const nombre = searchParams.get('nombre') || '';
  const categoria = searchParams.get('categoria') || '';
  const orden = searchParams.get('orden') || '';
  const page = parseInt(searchParams.get('page')) || 1;
  
  const { data: productos, loading: isLoading, error, fetchData} = useFetchProductos()
  const handleChangeParams = (key, value, restart=true, replace=true) => {
    const extra = restart ? { page: 1 } : {};
    setSearchParams({ ...Object.fromEntries(searchParams), [key]: value, ...extra }, { replace: replace });
    // fetchData(nombre, categoria, null, precioMinimo, precioMaximo, orden, page);
    console.log({...Object.fromEntries(searchParams), [key]: value, ...extra});
  }
  const setPrecios = (precios) => {
    setSearchParams({ ...Object.fromEntries(searchParams), page:1, ...precios }, { replace: true });
    // fetchData(nombre, categoria, null, precioMinimo, precioMaximo, orden, page);
    console.log({...Object.fromEntries(searchParams), page:1, ...precios});
  }

  // const setTags = (value) => handleChangeParams('tags', value);
  const setNombre = (value) => handleChangeParams('nombre', value);
  const setCategoria = (value) => handleChangeParams('categoria', value);
  const setOrden = (value) => handleChangeParams('orden', value);
  const setPage = (value) => handleChangeParams('page', value, false, false);


  useEffect(() => {
    fetchData(nombre, categoria, null, precios.min, precios.max, orden, page);
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  

  const [paginaSiguiente, setPaginaSiguiente] = useState("");


  useEffect(() => {
      setPaginaSiguiente(productos?.next ? productos?.next : "");
  }, [productos]);

  return (
    <>
      <ProductosHeader
        open={open} setOpen={setOpen}
        categoria={categoria} setCategoria={setCategoria}
        precios = {precios} setPrecios={setPrecios}
        nombre={nombre} setNombre={setNombre}
        ordenar={orden} setOrdenar={setOrden}
      />
  
      <Divider sx={{ width: '100%' }} />
        {isLoading && <CircularProgress sx={{ mt: 10 }} />}
        {error && <Typography variant="h6" sx={{ mt: 10 }}>Error</Typography>}
        {productos?.results?.length === 0 && <Typography variant="h6" sx={{ mt: 10 }}>No se encontraron productos</Typography>}
        {productos?.results?.length > 0 &&
        <>

      {/* //! CONTENIDO  */}
      <Box sx={{ display: 'flex', width:'100%'}}>
        <CustomDrawer open={open} >
          <Filtros 
            categoriaSeleccionada={categoria} 
            precios={precios} setPrecios={setPrecios}
            categoria={categoria} setCategoria={setCategoria}
            nombre={nombre} setNombre={setNombre}
          />
        </CustomDrawer>

        <Main open={open} sx={{p:0}}>
          <Paginacion 
            paginacion={page}
            setPaginacion={setPage}
            paginaSiguiente={paginaSiguiente}
          />
          <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <ListaProductos productos={productos}/>
          </Box>
          <Paginacion 
            paginacion={page}
            setPaginacion={setPage}
            paginaSiguiente={paginaSiguiente}
          />
        </Main>
      </Box>
      </>
    }
    </>
  );
}

function ProductosHeader({
  open, setOpen,
  precios, setPrecios,
  categoria, setCategoria,
  // tags, setTags,
  ordenar, setOrdenar,
  nombre, setNombre
}){
  
  const handleDrawer = () => {setOpen(!open)};

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      mt: 10, 
      width: '100%', 
      minWidth:'90vw' 
    }}>
      <IconButton
        sx={{ ml: 3 }}
        aria-label="drawer"
        onClick={handleDrawer}
        edge="start"
      >
        <Tune />
        <Typography variant="h6" noWrap component="div">
          {open ? 'Ocultar filtros' : 'Ver filtros'}
        </Typography>
      </IconButton>
      {/* //TODO Cambiar logica de chips */}
      <ChipsFiltros
        nombre={nombre} setNombre={setNombre}
        precios={precios} setPrecios={setPrecios}
        categoria={categoria} setCategoria={setCategoria}
        // tags={tags} setTags={setTags}
      />
      <Ordenar
      setOrdenar={setOrdenar}
      ordenar={ordenar}
      />
    </Box>
  )
}

function ChipsFiltros({
  nombre, setNombre,
  precios, setPrecios,
  // tags, setTags,
  categoria, setCategoria,
}){
  const isEmpty = (value) => value == '' || value == 0 || value == null;
  const minimo = precios.min;
  const maximo = precios.max;
  const setMinimo = (value) => setPrecios({min: value, max: maximo});
  const setMaximo = (value) => setPrecios({min: minimo, max: value});

  return (
    <Stack direction="row" spacing={1}>
      {!isEmpty(nombre) && <Chip label={nombre} onDelete={() => setNombre('')} />}
      {!isEmpty(minimo) && <Chip label={'Desde $'+minimo} onDelete={() => setMinimo(0)} />}
      {!isEmpty(maximo) && <Chip label={'Hasta $'+maximo} onDelete={() => setMaximo(0)} />}
      {!isEmpty(categoria) && <Chip label={categoria} onDelete={() => setCategoria('')} />}
    </Stack>
  )
}