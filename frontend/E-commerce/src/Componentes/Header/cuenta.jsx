import {useState} from 'react'
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LogoutIcon from '@mui/icons-material/Logout';
import { Menu, MenuItem, Button } from '@mui/material';

export default function Cuenta() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button 
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ color: '#00a1ed' }}
        >
        <AccountCircle />
        Mi cuenta
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose} sx={{ display: 'flex', alignItems: 'center' }}>
          <ShoppingBasketIcon sx={{ marginRight: 1 }} /> Mis compras
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ display: 'flex', alignItems: 'center' }}>
          <LockOpenIcon sx={{ marginRight: 1 }} /> Cambiar contraseña
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ display: 'flex', alignItems: 'center' }}>
          <LogoutIcon sx={{ marginRight: 1 }} /> Cerrar sesión
        </MenuItem>
      </Menu>
    </>
  )
}
