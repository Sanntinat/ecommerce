import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './header.css';
import { Link } from 'react-router-dom';
import Cuenta from './cuenta';
import Carrito from './Carrito/carrito';
import { AppBar, Box, Toolbar, Typography, Autocomplete, TextField, InputAdornment, Divider, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function Header() {
  const [valorBuscador, setValorBuscador] = useState('');
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate(`/productos?categoria=${valorBuscador}`);
  };

  useEffect(() => {
    if (valorBuscador) {
      fetch(`http://127.0.0.1:8000/productos/?nombre=${valorBuscador}`)
        .then((response) => response.json())
        .then((data) => {
          setProductos(Array.isArray(data.results) ? data.results.map(producto => producto.nombre) : []);
        });
    }
  }, [valorBuscador]);

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#1C1C1C' }}>
        <Toolbar>
          <Link to="/" style={{ textDecoration: 'none'}}>
            <Typography variant="h6" sx={{ ml: 1 }}>
              <span  id='nombre'>Power</span><span id='nombre2'>Fit</span>
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Autocomplete
            value={valorBuscador}
            onInputChange={(event, newValue) => setValorBuscador(newValue)}
            options={productos}
            noOptionsText=''
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
            disableClearable
            sx={{ 
              width: '60%',
              backgroundColor: 'white',
              borderRadius: '5px',
            }}
          />
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }}}>
            <Cuenta />
            <Carrito/>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}