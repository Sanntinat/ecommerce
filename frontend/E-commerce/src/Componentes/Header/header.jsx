import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './header.css';
import { Link } from 'react-router-dom';
import Cuenta from './cuenta';
import Carrito from './Carrito/carrito';
import { AppBar, Box, Toolbar, Typography, Autocomplete, TextField, InputAdornment, Divider, IconButton, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useFetchSearch } from '../../Request/fetch';

export default function Header() {

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#1C1C1C' }}>
        <Toolbar>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography variant="h6" sx={{ ml: 1 }}>
              <span id='nombre'>Power</span><span id='nombre2'>Fit</span>
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <BuscadorProductos/>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Cuenta />
            <Carrito />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

function BuscadorProductos() {
  const navigate = useNavigate();
  const handleSearchClick = () => {
    navigate(`/productos?nombre=${valorBuscador}`);
  };

  
  const parseData = (data) => data.results;
  const [data, loading, /* */, searchData] = useFetchSearch('/productos/?nombre=', 300, parseData);
  
  const [valorBuscador, setValorBuscador] = useState('');
  const handleChange = (event, newValue) => {
    setValorBuscador(newValue);
    if (valorBuscador) {
      searchData(valorBuscador);
    }
  }

  return (
    <Autocomplete
    inputValue={valorBuscador}
    onInputChange={handleChange}
    options={data}
    getOptionLabel={(option) => option.nombre || ''}
    noOptionsText={loading ? <CircularProgress size={25} /> : (!valorBuscador ? '' : 'Sin resultados')}
    renderInput={(params) => (
      <TextField
        sx={{
          '& .MuiInputBase-root': {
            paddingTop: '3px',
            paddingBottom: '3px',
            paddingLeft: '1',
            paddingRight: '0px !important',
          },
        }}
        {...params}
        placeholder="Buscar..."
        slotProps={{
          input: {
            ...params.InputProps,
            type: 'search',
            endAdornment: (
              <InputAdornment position="end">
                <Divider orientation="vertical" flexItem sx={{ height: 30 }} />
                <IconButton onClick={handleSearchClick}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    )}
    
    sx={{
      width: '60%',
      backgroundColor: 'white',
      borderRadius: '5px',
    }}
  />
  )
}