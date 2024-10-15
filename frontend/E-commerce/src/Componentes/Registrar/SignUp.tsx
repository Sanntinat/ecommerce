import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import ForgotPassword from './ForgotPassword';
import { GoogleIcon, FacebookIcon } from './CustomIcons';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import { useNavigate } from 'react-router-dom';
import { fetchRegistro } from '../../request/v2/fetchRegistro'; 


const SignInContainer = styled(Stack)(({ theme }) => ({
  border: '1px solid black', 
  borderRadius: '16px',   
  width: '100%',
  minWidth: '450px',
  padding: theme.spacing(6),
  marginTop: '110px',
  background: '#0092d6',
  minHeight: '100%',
  '&::before': {
    background: 'rgba(256, 256, 256)',
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
  },
}));

export default function SignUp(props: { disableCustomTheme?: boolean }) {
  const navigate = useNavigate(); 
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Por favor ingrese un e-mail válido.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('La contraseña debe tener al menos 6 caracteres.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 

    if (validateInputs()) {
      const email = (document.getElementById('email') as HTMLInputElement).value;
      const password = (document.getElementById('password') as HTMLInputElement).value;

      const result = await fetchRegistro(email, password, navigate);
      if (result) {
        
        console.error(result);
      }
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Registrarse
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit} 
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography htmlFor="email">Email</Typography>
              </Box>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
                sx={{ ariaLabel: 'email' }}
              />
            </FormControl>
            <FormControl>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography htmlFor="password">Contraseña</Typography>
              </Box>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Deseo recibir novedades por email"
            />
            <ForgotPassword open={open} handleClose={handleClose} />
            <Button type="submit" fullWidth variant="contained">
              Registrarse
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              ¿Ya tienes una cuenta?{' '}
              <span>
                <Link
                  href="/login"
                  variant="body2"
                  sx={{ alignSelf: 'center' }}
                >
                  Iniciar sesión
                </Link>
              </span>
            </Typography>
          </Box>
          <Divider>o</Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Regístrese con Google')}
              startIcon={<GoogleIcon />}
            >
              Regístrese con Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Regístrese con Facebook')}
              startIcon={<FacebookIcon />}
            >
              Regístrese con Facebook
            </Button>
          </Box>
        
      </SignInContainer>
    </AppTheme>
  );
}
