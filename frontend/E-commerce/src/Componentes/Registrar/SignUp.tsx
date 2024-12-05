import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import ForgotPassword from './ForgotPassword';
import AppTheme from '../shared-theme/AppTheme';
import { useNavigate } from 'react-router-dom';
import { fetchRegistro } from '../../Request/v2/fetchRegistro'; 
import fondologin from '../../assets/fondologin.jpg';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
});

const SignInContainer = styled(Stack)(({ theme }) => ({
  border: '1px solid black',
  borderRadius: '16px',
  width: '100%',
  maxWidth: '550px',
  padding: theme.spacing(6),
  marginTop: '145px',
  background: '#0092d6',
  minHeight: '500px',
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

export default function SignUp(props: { disableCustomTheme?: boolean }) {
  const navigate = useNavigate(); 
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [repeatPasswordError, setRepeatPasswordError] = React.useState(false);
  const [repeatPasswordErrorMessage, setRepeatPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const repeatPassword = document.getElementById('rpassword') as HTMLInputElement;
    const nombre = document.getElementById('name') as HTMLInputElement;
    const apellido = document.getElementById('surname') as HTMLInputElement;
    const dni = document.getElementById('dni') as HTMLInputElement;

    let isValid = true;

    // Validación del email
    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Por favor ingrese un e-mail válido.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    // Validación de la contraseña
    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('La contraseña debe tener al menos 6 caracteres.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    // Validación de la repetición de la contraseña
    if (repeatPassword.value !== password.value) {
      setRepeatPasswordError(true);
      setRepeatPasswordErrorMessage('Las contraseñas no coinciden.');
      isValid = false;
    } else {
      setRepeatPasswordError(false);
      setRepeatPasswordErrorMessage('');
    }

    // Validación del nombre
    if (!nombre.value || nombre.value.length > 50) {
      isValid = false;
    }

    // Validación del apellido
    if (!apellido.value || apellido.value.length > 50) {
      isValid = false;
    }

    // Validación del DNI (longitud y formato numérico)
    if (!dni.value || dni.value.length !== 8) {
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 

    if (validateInputs()) {
      const email = (document.getElementById('email') as HTMLInputElement).value;
      const password = (document.getElementById('password') as HTMLInputElement).value;
      const nombre = (document.getElementById('name') as HTMLInputElement).value;
      const apellido = (document.getElementById('surname') as HTMLInputElement).value;
      const dni = (document.getElementById('dni') as HTMLInputElement).value;

      // Enviar los datos al servidor
      const result = await fetchRegistro(email, password, nombre, apellido, dni, navigate);
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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Typography htmlFor="email">Email</Typography>
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
                  variant="outlined"
                  color={emailError ? 'error' : 'primary'}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Typography htmlFor="password">Contraseña</Typography>
                <TextField
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  variant="outlined"
                  color={passwordError ? 'error' : 'primary'}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Typography htmlFor="password">Repetir contraseña</Typography>
                <TextField
                  error={repeatPasswordError}
                  helperText={repeatPasswordErrorMessage}
                  name="rpassword"
                  placeholder="••••••"
                  type="password"
                  id="rpassword"
                  autoComplete="current-password"
                  required
                  variant="outlined"
                  color={repeatPasswordError ? 'error' : 'primary'}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Typography htmlFor="name">Nombre</Typography>
                <TextField
                  error={false}
                  id="name"
                  placeholder="nombre"
                  required
                  variant="outlined"
                  color="primary"
                  inputProps={{ maxLength: 50 }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Typography htmlFor="surname">Apellido</Typography>
                <TextField
                  error={false}
                  id="surname"
                  placeholder="apellido"
                  required
                  variant="outlined"
                  color="primary"
                  inputProps={{ maxLength: 50 }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Typography htmlFor="dni">DNI</Typography>
                <TextField
                  error={false}
                  id="dni"
                  placeholder="12345678"
                  type="number"
                  required
                  variant="outlined"
                  color="primary"
                  inputProps={{ maxLength: 8 }}
                />
              </FormControl>
            </Grid>
          </Grid>

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
      </SignInContainer>
    </AppTheme>
  );
}
