import { Accordion, AccordionSummary, AccordionDetails, FormControlLabel, TextField, Radio, RadioGroup, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import PropTypes from 'prop-types';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function Filtros({
  precios, setPrecios,
  categoria, setCategoria
}) {
  const [expanded, setExpanded] = useState(true);

  const handleChange = () => {setExpanded(!expanded)};

  
  return (
    <>
      <CustomAccordion label="Categoria" expanded={expanded} onChange={handleChange} sx={{ mb: 2 }}>
        <SelectorCategoria
          categoria={categoria}
          setCategoria={setCategoria}
        />
      </CustomAccordion>
        
      <CustomAccordion label="Precio">
        <SelectorPrecio
          precios={precios}
          setPrecios={setPrecios}
        />
      </CustomAccordion>
      {/* <Alert variant="outlined" severity="warning">
        Selecciona una categoria para filtrar
      </Alert> */}
    </>
  )
}

Filtros.propTypes = {
  categoriaSeleccionada: PropTypes.string, 

};

function CustomAccordion({children, label, sx = {}, props = {}}) {
  return (
    <Accordion sx={{ boxShadow: 'none', '&::before': { display: 'none' }, ...sx }} {...props}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >{label}</AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  )
}

function SelectorCategoria({categoria, setCategoria}) {

  return (
    <RadioGroup
      aria-labelledby="demo-radio-buttons-group-label"
      name="radio-buttons-group"
      value={categoria}
      onChange={(event, value) => setCategoria(value)} 
    >
      <FormControlLabel value="Gimnasio" control={<Radio />} label="Gimnasio" />
      <FormControlLabel value="Suplementos" control={<Radio />} label="Suplementos" />
      <FormControlLabel value="Kinesiologia" control={<Radio />} label="Kinesiologia" />
    </RadioGroup>
  )
}

function SelectorPrecio({ precios, setPrecios }) {

  const [minimo, setMinimo] = useState(precios.min);
  const [maximo, setMaximo] = useState(precios.max);

  const handleMin = (event) => setMinimo(event.target.value);
  const handleMax = (event) => setMaximo(event.target.value);

  const handleSubmit = () => {
    console.log(minimo, maximo);
    setPrecios({
      min: minimo,
      max: maximo
    });
  };

  return (
    <Grid container spacing={1} sx={{ width: '100%' }} justifyContent="center" alignItems="center">
      <Grid sx={{ width: '30%' }}>
        <TextField
          id="outlined-multiline-flexible"
          label="minimo"
          value={minimo}
          onChange={handleMin}
          multiline
          maxRows={4}
          size="small"
          sx={{ width: '100%' }}
        />
      </Grid>
      <Grid>
        <HorizontalRuleIcon />
      </Grid>
      <Grid sx={{ width: '30%' }}>
        <TextField
          id="outlined-multiline-flexible"
          label="maximo"
          value={maximo}
          onChange={handleMax}
          multiline
          maxRows={4}
          size="small"
          sx={{ width: '100%' }}
        />
      </Grid>
      <IconButton onClick={handleSubmit}>
        <ArrowForwardIosIcon fontSize="small" />
      </IconButton>
    </Grid>
  );
}