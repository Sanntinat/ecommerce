import { IconButton, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Box, Typography } from '@mui/material'
import { StyledTableCell, StyledTableRow } from './styledTable'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import Paginacion from '../Productos/paginacion';
import ModalProductos from './ModalProductos/modalProductos';

export default function GestionarProductos() {
  const [productos, setProductos] = useState([]);
  const [cantidad, setCantidad] = useState(1);
  const [paginacion, setPaginacion] = useState(1);
  const [modalShow, setModalShow] = useState(false);
  const [estadoModal, setEstadoModal] = useState(false);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/productos/?&page=${paginacion}`)
      .then(response => response.json())
      .then(data => {
        setCantidad(Math.ceil(data.count / 20));
        setProductos(data.results);
      })
      .catch(error => console.log(error));
  }, [paginacion]);

  return (
    <Box sx={{ mt: 10 , width: 1350 }}>
    <Typography sx={{ fontSize: '1.2rem', fontWeight: '600', color: '#333' }}>
      Lista de productos
    </Typography>
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
          {productos.map((producto) => (
            <StyledTableRow key={producto.id}>
              <StyledTableCell component="th" scope="row">
                {producto.nombre}
              </StyledTableCell>
              <StyledTableCell align="center">{producto.categoria}</StyledTableCell>
              <StyledTableCell align="center">{producto.precio}</StyledTableCell>
              <StyledTableCell align="center">{producto.stock}</StyledTableCell>
              <StyledTableCell align="center">
                <IconButton onClick={() => {setModalShow(true)}} className='w-100' variant="contained">
                  <EditIcon/>
                </IconButton>
                <IconButton onClick={() => {}} className='w-100' variant="contained">
                  <DeleteIcon/>
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      <Paginacion
        categoriaSeleccionada='' 
        setProductos=''
        setPaginacion={setPaginacion}
        paginacion={paginacion}
        cantidad={cantidad}
      />
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
