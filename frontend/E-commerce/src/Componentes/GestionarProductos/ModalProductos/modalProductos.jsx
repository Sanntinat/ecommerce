import { Dialog, IconButton, AppBar, Toolbar } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

export default function ModalProductos({open, onClose, setEstadoModal}) {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => onClose()}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Dialog>
  )
}
