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
import './header.css'
import { Search, SearchIconWrapper, StyledTextField } from './BuscadorEstilos';
import Autocomplete from '@mui/material/Autocomplete';

export default function Header() {
  const [valorBuscador, setValorBuscador] = useState('');
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    if (valorBuscador) {
      fetch(`http://127.0.0.1:8000/productos/?nombre=${valorBuscador}`)
        .then((response) => response.json())
        .then((data) => {
          setProductos(Array.isArray(data) ? data : []);
        })
    }
  }, [valorBuscador]);
  return (
    <>
      <AppBar position="fixed" sx={{backgroundColor: '#343a40'}}>
        <Toolbar>
          <Typography variant="h6" component="a" sx={{ ml: 1 }} id='nombre'>
            <FitnessCenterIcon />
            PowerFit
          </Typography>
          
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
             
              <Autocomplete
                freeSolo
                options={productos.map((option) => option.nombre)}
                value={valorBuscador}
                onInputChange={(event, newValue) => setValorBuscador(newValue)}
                renderInput={(params) => (
                <StyledTextField {...params}/> )}
              />
            </Search>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button sx={{ backgroundColor: 'white', color: 'black' }}>
              <ShoppingCartIcon />
              Carrito (0)
            </Button>
            <Button sx={{ color: 'white' }}>
              <AccountCircle />
              Mi cuenta
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>  
  );
}
