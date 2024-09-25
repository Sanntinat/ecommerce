import { Divider,Typography, Box, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';

export default function CarritoProductos() {
  return (
    <>
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>

    <Box component="footer" sx={{ mt: 90, pt: 3, width: '100%' }}>
      <Divider/>
      <Grid container spacing={25}>
        <Grid sx={{width:'auto'}}>
          <Typography
            sx={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', p:2}}>
            Total
          </Typography>
        </Grid>
        <Grid sx={{width: 'auto'}}>
          <Typography
            sx={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', p:2 }}>
            $ 100
          </Typography>
        </Grid>
      </Grid>
    </Box>
      <Button sx={{m:1, borderRadius:5, backgroundColor:'#00a1ed', width:'80%'}} variant="contained">
        Finalizar compra
      </Button>
  </Box>
    </>
  )
}
