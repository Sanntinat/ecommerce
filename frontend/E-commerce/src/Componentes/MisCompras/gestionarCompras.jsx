import * as React from 'react';
import { Box, Collapse, IconButton, Table, TableBody, TableContainer, TableHead, TableRow, Paper, Alert, Typography, Button } from '@mui/material/';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { StyledTableCell, StyledTableRow } from '../GestionarProductos/styledTable';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Paginacion from '../Productos/paginacion';

export default function GestionarCompras({ ventas, isLoading, error, ventasDetalle, isLoadingDetalle, errorDetalle, fetchData, setPaginacion, paginacion }) {
  const [openRow, setOpenRow] = useState(null);
  const navigate = useNavigate();

  const toggleRow = (rowName) => {
    setOpenRow(openRow === rowName ? null : rowName);
  };

  useEffect(() => {
    fetchData();
  }, [paginacion]);

  if (error) {
    return (
      <Alert severity="error" sx={{ width: '100%' }}>Error al cargar las compras</Alert>
    );
  }

  return (
	  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: "90%", maxWidth: 800, p: 3, m: 10}}>
      {/* Título Mis Compras */}
      <Typography
        variant="h4"
        align="center"
        sx={{
          marginBottom: '20px',
          color: '#007bff',
          fontWeight: 'bold',
          textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
        }}
      >
        Mis Compras
      </Typography>
      <TableContainer component={Paper} sx={{ width: "100%", overflowX: 'auto', mt: 2 }}>
        <Table aria-label="collapsible table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell />
              <StyledTableCell align='center'>Fecha</StyledTableCell>
              <StyledTableCell align='center'>Total</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {isLoading && !error && (
              <StyledTableRow>
                <StyledTableCell colSpan={3} align="center">
                  <Alert severity="info" sx={{ width: '95%' }}>Cargando...</Alert>
                </StyledTableCell>
              </StyledTableRow>
            )}
          {ventas?.results?.map((venta) => {
              const fechaCompleta = new Date(venta.fecha);
              const anio = fechaCompleta.getFullYear();
              const mes = String(fechaCompleta.getMonth() + 1).padStart(2, "0");
              const dia = String(fechaCompleta.getDate()).padStart(2, "0");
              const fechaFormateada = `${anio}-${mes}-${dia}`;
              return (
                <React.Fragment key={venta.id}>
                  <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <StyledTableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => toggleRow(venta.fecha)}
                      >
                        {openRow === venta.fecha ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                      </IconButton>
                    </StyledTableCell>
                    <StyledTableCell align="center" component="th" scope="row">
                      {fechaFormateada} {/* Mostrar la fecha formateada */}
                    </StyledTableCell>
                  <StyledTableCell align='center'>{venta.total}</StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={openRow === venta.fecha} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 1 }}>
                        <Table size="small" aria-label="purchases">
                          <TableHead>
                            <TableRow>
                              <StyledTableCell align='center'>Producto</StyledTableCell>
                              <StyledTableCell align='center'>Cantidad</StyledTableCell>
                              <StyledTableCell align='center'>Subtotal</StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {isLoadingDetalle && (
                              <StyledTableRow>
                                <StyledTableCell colSpan={5} align="center">
                                  <Alert severity="info" sx={{ width: '95%' }}>Cargando...</Alert>
                                </StyledTableCell>
                              </StyledTableRow>
                            )}
                            {errorDetalle && (
                              <StyledTableRow>
                                <StyledTableCell colSpan={5} align="center">
                                  <Alert severity="error" sx={{ width: '100%' }}>Error al cargar los productos</Alert>
                                </StyledTableCell>
                              </StyledTableRow>
                            )}
                            {venta?.detalles?.map((ventaDetalle) => {
                              const detallesAsociados = ventasDetalle?.filter((detalle) => detalle.id === ventaDetalle.id);

                              return detallesAsociados?.map((detalle, detalleIndex) => (
                                <TableRow key={`${detalle.id}-${detalleIndex}`}>
                                  <StyledTableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                      <img
                                        src={detalle.producto.imagen_url}
                                        alt={detalle.producto.nombre}
                                        style={{ width: '30px', height: '30px', objectFit: 'cover', marginRight: '8px' }}
                                      />
                                      <span>{detalle.producto.nombre}</span>
                                    </Box>
                                  </StyledTableCell>
                                  <StyledTableCell align="center">{detalle.cantidad}</StyledTableCell>
                                  <StyledTableCell align="center">{detalle.subtotal}</StyledTableCell>
                                </TableRow>
                              ));
                            })}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </StyledTableCell>
                </TableRow>
              </React.Fragment>
            )})}
          </TableBody>
        </Table>
      </TableContainer>

	  {/* Paginación */}
	  <Box sx={{ mt: 2}}>
	      {!isLoading && !error && (
	        <Paginacion
	          setPaginacion={setPaginacion}
	          paginacion={paginacion}
	          paginaSiguiente={ventas?.next ? ventas?.next : ""}
	        />
      		)}
		</Box>

      {/* Botón Volver */}
      <Box sx={{ marginTop: 2, textAlign: 'center' }}>
        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
          Volver
        </Button>
      </Box>
    </Box>
  );
}
