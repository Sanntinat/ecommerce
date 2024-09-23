import { Accordion, AccordionSummary, AccordionDetails, FormGroup, FormControlLabel, TextField, Radio, RadioGroup, Alert, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState, useEffect } from 'react';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import PropTypes from 'prop-types';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function Filtros({categoriaSeleccionada, selectedOption, setSelectedOption, selectedTags, setSelectedTags}) {
  const [expanded, setExpanded] = useState(true);
  const [maximo, setMaximo] = useState('');
  const [minimo, setMinimo] = useState('');

  const handleMinimo = (event) => {
    setMinimo(event.target.value);
  };
  const handleMaximo = (event) => {
    setMaximo(event.target.value);
  };

  const handleCategory = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleChange = () => {
    setExpanded(!expanded);
  };

  const handleTag = () => {
    setSelectedTags({
      minimo: minimo,
      maximo: maximo,
    });}

  useEffect(() => {
    if (categoriaSeleccionada !== '' && categoriaSeleccionada !== null) {
      setSelectedOption(categoriaSeleccionada);
    }
  }, [categoriaSeleccionada]);
  return (
    <>
      <Accordion expanded={expanded} onChange={handleChange} sx={{mb:2}}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        Categoria
      </AccordionSummary>
      <AccordionDetails>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          value={selectedOption} 
          onChange={handleCategory}
        >
          <FormControlLabel value="Gimnasio" control={<Radio />} label="Gimnasio" />
          <FormControlLabel value="Suplementos" control={<Radio />} label="Suplementos" />
          <FormControlLabel value="Kinesiologia" control={<Radio />} label="Kinesiologia" />
        </RadioGroup>
      </AccordionDetails>
    </Accordion>

    <Accordion >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        Filtros
      </AccordionSummary>
      <AccordionDetails>
        {selectedOption ? 
        <Accordion sx={{ boxShadow: 'none', '&::before': { display: 'none' } }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Precio
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              <Grid container spacing={1} sx={{width:'100%'}} justifyContent="center" alignItems="center">
                <Grid  sx={{width:'30%'}}>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="minimo"
                    value={minimo}
                    onChange={handleMinimo}
                    multiline
                    maxRows={4}
                    size="small"
                    sx={{ width: '100%' }}
                    />
                </Grid>
                <Grid>
                  <HorizontalRuleIcon />
                </Grid>
                <Grid  sx={{width:'30%'}}>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="maximo"
                    value={maximo}
                    onChange={handleMaximo}
                    multiline
                    maxRows={4}
                    size="small"
                    sx={{ width: '100%' }}
                    />
                </Grid>
                <IconButton onClick={handleTag}>
                  <ArrowForwardIosIcon fontSize='small'/>
                </IconButton>
              </Grid>
            </FormGroup>
          </AccordionDetails>
        </Accordion>
        :       
        <Alert variant="outlined" severity="warning">
          Selecciona una categoria para filtrar
        </Alert>
      }
      </AccordionDetails>
    </Accordion>

  </>
  )
}

Filtros.propTypes = {
  categoriaSeleccionada: PropTypes.string, 
};