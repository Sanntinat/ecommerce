import AppBar from '@mui/material/AppBar';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import './header.css';
import Autocomplete from '@mui/material/Autocomplete';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { IconButton } from '@mui/material';
import Divider from '@mui/material/Divider';

export default function Header() {
  const [valorBuscador, setValorBuscador] = useState('');
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    if (valorBuscador) {
      fetch(`http://127.0.0.1:8000/productos/?nombre=${valorBuscador}`)
        .then((response) => response.json())
        .then((data) => {
          setProductos(Array.isArray(data.results) ? data.results.map(producto => producto.nombre) : []);
          console.log(productos);
        });
    }
  }, [valorBuscador]);

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#1C1C1C' }}>
        <Toolbar>
          <Typography variant="h6" component="a" sx={{ ml: 1 }} id='nombre'>
            <FitnessCenterIcon />
            PowerFit
          </Typography>
          
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Autocomplete
              value={valorBuscador}
              onInputChange={(event, newValue) => setValorBuscador(newValue)}
              options={productos}
              renderInput={(params) => (
                <TextField
                  sx={{ '& .MuiInputBase-root': { padding: '6px 12px'}}}
                  {...params}
                  placeholder="Buscar..."
                  slotProps={{
                    input: {
                      ...params.InputProps,
                      type: 'search',
                      endAdornment: (
                        <InputAdornment position="end">
                          <Divider orientation="vertical" flexItem sx={{ height: 24}} />
                          <Link to="/Productos" style={{ textDecoration: 'none'}}>
                            <IconButton edge="end">
                              <SearchIcon/>
                            </IconButton>
                          </Link>
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
            <Button sx={{ color: '#00a1ed' }}>
              <AccountCircle />
              Mi cuenta
            </Button>
            <Button sx={{ backgroundColor: '#00a1ed', color: 'white' , m:1 }}>
              <ShoppingCartIcon />
              Carrito (0)
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}