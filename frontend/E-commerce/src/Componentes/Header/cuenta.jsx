import { useState } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Menu, MenuItem, Button } from '@mui/material';
import { Link } from 'react-router-dom'; 
import { useAuth } from '../Login/authContext'; 
import { ModalCambiarContraseña } from './Modal/modalCambiarContraseña';

export default function Cuenta() {
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { isAuthenticated, logout } = useAuth(); 

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout(); 
    handleClose();
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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
        {isAuthenticated && (
        <MenuItem onClick={handleOpenModal} sx={{ display: 'flex', alignItems: 'center' }}>
          <LockOpenIcon sx={{ marginRight: 1 }} /> Cambiar contraseña
        </MenuItem>
        )}
        {isAuthenticated ? (
          <MenuItem onClick={handleLogout} sx={{ display: 'flex', alignItems: 'center' }}>
            <ExitToAppIcon sx={{ marginRight: 1 }} /> Cerrar Sesión
          </MenuItem>
        ) : (
          <MenuItem onClick={handleClose} sx={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
              <PersonIcon sx={{ marginRight: 1 }} /> Iniciar Sesión
            </Link>
          </MenuItem>
        )}
      </Menu>
      <ModalCambiarContraseña open={openModal} onClose={handleCloseModal} />
    </>
  );
}

