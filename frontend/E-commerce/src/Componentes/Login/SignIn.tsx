import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
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
import { fetchLogin } from '../../request/v2/fetchLogin'; 
import { useAuth } from './authContext'; 
import { useNavigate } from 'react-router-dom';
import fondologin from '../../assets/fondologin.jpg';


const SignInContainer = styled(Stack)(({ theme }) => ({
  border: '1px solid black', 
  borderRadius: '16px',   
  marginTop: '110px',
  padding: theme.spacing(6),
  minWidth: '450px',
  width: '100%',
  background: '#0092d6',
  minHeight: '100%',
  '&::before': {
    backgroundImage: `url(${fondologin})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
  },
}));

export default function SignIn(props: { disableCustomTheme?: boolean }) {
  const { login } = useAuth(); 
  const navigate = useNavigate(); 
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 

    if (!validateInputs()) {
      return;
    }

    const data = new FormData(event.currentTarget);
    const email = data.get('email')?.toString() || ''; 
    const password = data.get('password')?.toString() || ''; 

    const errorMessage = await fetchLogin(email, password, login, navigate);
    if (errorMessage) {
      console.error(errorMessage); 
    }
  };

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

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between"
        //sx={{backgroundImage: `url(${fondologin})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}
      >
        <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
        
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Ingresar
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
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
                <Link
                  component="button"
                  type="button"
                  onClick={handleClickOpen}
                  variant="body2"
                  sx={{ alignSelf: 'baseline' }}
                >
                  ¿Olvidó su contraseña?
                </Link>
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
              label="Recordarme"
            />
            <ForgotPassword open={open} handleClose={handleClose} />
            <Button type="submit" fullWidth variant="contained">
              Ingresar
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              ¿No tienes cuenta?{' '}
              <span>
                <Link
                  href="/registrar"
                  variant="body2"
                  sx={{ alignSelf: 'center' }}
                >
                  Registrarse
                </Link>
              </span>
            </Typography>
          </Box>
          <Divider>o</Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Ingrese con Google')}
              startIcon={<GoogleIcon />}
            >
              Ingrese con Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Ingrese con Facebook')}
              startIcon={<FacebookIcon />}
            >
              Ingrese con Facebook
            </Button>
          </Box>
        
      </SignInContainer>
    </AppTheme>
  );
}
