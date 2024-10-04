import { useEffect, useState } from 'react';
import Filtros from './filtros';
import { styled, Box, Drawer, Typography, IconButton, Stack, Chip, Divider, Button, ButtonGroup } from '@mui/material';
import { Tune } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import { handleDeleteTag, handleDeleteOption} from './handle';
import ListaProductos from './listaProductos';
import Paginacion from './paginacion';
import Ordenar from './ordenar';

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
  const [productos, setProductos] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [cantidad, setCantidad] = useState(1);
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
    if ( paginacion <= cantidad ) {
    fetch(`http://127.0.0.1:8000/productos/ordenar/?nombre=${categoriaSeleccionada}&page=${paginacion}&orden=${ordenar}`)
      .then(response => response.json())
      .then(data => {
        setCantidad(Math.ceil(data.count / 20));
        setProductos(data.results);
      })
      .catch(error => console.log(error));
    }
  }, [categoriaSeleccionada, paginacion, ordenar]);
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 10, width: '100%' }}>
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
          <ListaProductos productos={productos}/>
          <Paginacion 
          categoriaSeleccionada={categoriaSeleccionada} 
          setProductos={setProductos} 
          setPaginacion={setPaginacion}
          paginacion={paginacion}
          cantidad={cantidad}
          />
        </Main>
      </Box>
    </>
  );
}