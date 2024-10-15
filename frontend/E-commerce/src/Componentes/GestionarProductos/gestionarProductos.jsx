import { IconButton, Alert,Paper, Table, TableBody, TableContainer, TableHead, TableRow, Box, FormControl, OutlinedInput, InputAdornment } from '@mui/material'
import { StyledTableCell, StyledTableRow } from './styledTable'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import Paginacion from '../Productos/paginacion';
import ModalProductos from './ModalProductos/modalProductos';
import { useFetchSearch }  from '../../Request/fetch';
import SearchIcon from '@mui/icons-material/Search';

export default function GestionarProductos() {
  const [paginacion, setPaginacion] = useState(1);
  const [modalShow, setModalShow] = useState(false);
  const [estadoModal, setEstadoModal] = useState(false);
  const [valorBuscador, setValorBuscador] = useState('');
  const parseData = (data) => data;
  const [ data, loading, error, searchData ] = useFetchSearch(`/productos/?&page=${paginacion}&nombre=`, 300, parseData);

  useEffect(() => {
    setValorBuscador('');
  }, []);

  useEffect(() => {
      searchData(valorBuscador);
      if (valorBuscador !== '') {
        setPaginacion(1);
      }

  }, [valorBuscador, searchData ]);

  return (
    <Box sx={{ mt: 10 , width: 1350 }}>
      <FormControl sx={{ width:'100%', mb:2 }} variant="outlined">
      <OutlinedInput
        endAdornment={<InputAdornment position="end"><SearchIcon/></InputAdornment>}
        placeholder="Buscar producto"
        value={valorBuscador}
        onChange={(e) => setValorBuscador(e.target.value)}
      />
    </FormControl>
      {loading && <Alert severity="info" sx={{width:'100%'}}>Cargando...</Alert>}
      {error && <Alert severity="error" sx={{width:'100%'}}>{error}</Alert>}
      {data && !loading && !error &&
      <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Nombre producto</StyledTableCell>
                <StyledTableCell align="center">Categoria</StyledTableCell>
                <StyledTableCell align="center">Precio</StyledTableCell>
                <StyledTableCell align="center">Stock</StyledTableCell>
                <StyledTableCell align="center">Accion</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.results?.map((producto) => (
                <StyledTableRow key={producto.id}>
                  <StyledTableCell component="th" scope="row" align="center">
                    <Box display="flex" alignItems="center">
                      <img src={producto.imagen_url} alt={producto.nombre} style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '8px' }} />
                      <span>{producto.nombre}</span>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell align="center">{producto.categoria}</StyledTableCell>
                  <StyledTableCell align="center">{producto.precio}</StyledTableCell>
                  <StyledTableCell align="center">{producto.stock}</StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton onClick={() => {setModalShow(true)}} className='w-100' variant="contained">
                      <EditIcon color='warning'/>
                    </IconButton>
                    <IconButton onClick={() => {}} className='w-100' variant="contained">
                      <DeleteIcon color='error'/>
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Paginacion
        setPaginacion={setPaginacion}
        paginacion={paginacion}
        paginaSiguiente={data?.next ? data?.next : ""}
        />
      </>
    }
      {modalShow && (
        <ModalProductos
          open={modalShow} 
          onClose={() => setModalShow(false)}
          setEstadoModal={setEstadoModal}
        />
      )}
    </Box>
  )
}
