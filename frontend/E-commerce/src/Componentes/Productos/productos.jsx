import { useEffect, useState } from 'react';
import Filtros from './filtros';
import { styled, Box, Drawer, Typography, IconButton, Stack, Chip, Divider, CircularProgress  } from '@mui/material';
import { Tune } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import { handleDeleteTag, handleDeleteOption} from './handle';
import ListaProductos from './listaProductos';
import Paginacion from './paginacion';
import Ordenar from './ordenar';
import { useFetchDataOnDemand } from '../../Request/fetch';

const drawerWidth = 340;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  }),
);

export default function Productos() {
  const [open, setOpen] = useState(false);
  // const [productos, setProductos] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [paginaSiguiente, setPaginaSiguiente] = useState("");
  const [paginacion, setPaginacion] = useState(1);
  const [ ordenar, setOrdenar ] = useState('');
  const [selectedTags, setSelectedTags] = useState({
    minimo: '',
    maximo: '',
  });

  const handleDrawer = () => {
    {open ? setOpen(false) : setOpen(true)}
  };

  useEffect(() => {
    if (selectedOption !== '') {
      setSelectedTags({
        minimo: '',
        maximo: '',
      });
    }
  }, [selectedOption]); 

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const categoriaSeleccionada = query.get('categoria');

  useEffect(() => {
    setPaginacion(1);
    setOrdenar('');
    setPaginaSiguiente("");
  }, [categoriaSeleccionada]);
  
  let url = `/productos/ordenar/?`
  if (categoriaSeleccionada) url += `&nombre=${categoriaSeleccionada}`
  if (paginacion) url += `&page=${paginacion}`
  if (ordenar) url += `&orden=${ordenar}`
  
  const { data: productos, loading: isLoading, error, fetchData} = useFetchDataOnDemand(url)

  useEffect(() => {
    fetchData();
      setPaginaSiguiente(productos?.next ? productos?.next : "");
  }, [url]);

  return (
    <>
        {isLoading && <CircularProgress sx={{ mt: 10 }} />}
        {error && <Typography variant="h6" sx={{ mt: 10 }}>Error</Typography>}
        {productos?.results?.length === 0 && <Typography variant="h6" sx={{ mt: 10 }}>No se encontraron productos</Typography>}
        {productos?.results?.length > 0 &&
        <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 10, width: '100%', minWidth:'100vw' }}>
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
        <Stack direction="row" spacing={1}>
          {selectedOption !== '' && 
          <>
            <Chip label={selectedOption} variant="outlined" sx={{backgroundColor:'#00a1ed', color: 'white'}} onDelete={() => handleDeleteOption(setSelectedOption)} />
            {selectedTags.minimo !== '' && selectedTags.maximo !== '' &&
            <Chip label={'$'+selectedTags.minimo +' - $'+ selectedTags.maximo} variant="outlined" sx={{backgroundColor:'#00a1ed', color: 'white'}} onDelete={() => handleDeleteTag(setSelectedTags)} />}
          </>
          }
        </Stack>
        <Ordenar
        setOrdenar={setOrdenar}
        ordenar={ordenar}
        />
      </Box>
      <Divider sx={{ width: '100%' }} />
      <Box sx={{ display: 'flex', width:'100%'}}>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              top: '200px',
              overflowY: 'auto',
              border: 'none',
              ml: 5,
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <Filtros 
            categoriaSeleccionada={categoriaSeleccionada} 
            selectedOption={selectedOption} 
            setSelectedOption={setSelectedOption}
            setSelectedTags={setSelectedTags}
          />
        </Drawer>

        <Main open={open} sx={{p:0}}>
          <Box sx={{display: 'flex', justifyContent: 'center'}}>

          <ListaProductos productos={productos}/>
          </Box>
          <Paginacion 
          setPaginacion={setPaginacion}
          paginacion={paginacion}
          paginaSiguiente={paginaSiguiente}
          />
        </Main>
      </Box>
      </>
    }
    </>
  );
}