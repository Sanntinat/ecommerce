import { Accordion, AccordionSummary, AccordionDetails, FormGroup, FormControlLabel, TextField, Radio, RadioGroup, Alert, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState, useEffect } from 'react';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import PropTypes from 'prop-types';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { handleGeneral, handleTag } from './handle';

export default function Filtros({categoriaSeleccionada, selectedOption, setSelectedOption, setSelectedTags}) {
  const [expanded, setExpanded] = useState(true);
  const [maximo, setMaximo] = useState('');
  const [minimo, setMinimo] = useState('');

  const handleChange = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (categoriaSeleccionada !== '' && categoriaSeleccionada !== null) {
      setSelectedOption(categoriaSeleccionada);
      console.log(categoriaSeleccionada);
    }
  }, [categoriaSeleccionada, setSelectedOption]);
  
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
          onChange={(event) => handleGeneral(event, setSelectedOption)}
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
                    onChange={(event) => handleGeneral(event, setMinimo)}
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
                    onChange={(event) => handleGeneral(event, setMaximo)}
                    multiline
                    maxRows={4}
                    size="small"
                    sx={{ width: '100%' }}
                    />
                </Grid>
                <IconButton onClick={() => handleTag(setSelectedTags, minimo, maximo)}>
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