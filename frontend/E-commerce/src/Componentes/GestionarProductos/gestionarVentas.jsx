import * as React from 'react';
import { Box, Collapse, IconButton, Table, TableBody, TableContainer, TableHead, TableRow, Paper, Alert } from '@mui/material/';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { StyledTableCell, StyledTableRow } from './styledTable'
import { useState, useEffect } from 'react';
import EliminarProducto from './CrudProductos/eliminarProducto';
import Paginacion from '../Productos/paginacion';


export default function GestionarVentas({ventas, isLoading, error, ventasDetalle, isLoadingDetalle, errorDetalle, fetchData, setPaginacion, paginacion}) {
  const [openRow, setOpenRow] = useState(null);

  const [modalShow, setModalShow] = useState(false);
  const [ventaSeleccionado, setVentaSeleccionado] = useState(null);
  const [estadoModal, setEstadoModal] = useState(false);
  const [estadoVenta, setEstadoVenta] = useState(false);
  const toggleRow = (rowName) => {
    setOpenRow(openRow === rowName ? null : rowName);
  };

  useEffect(() => {
    setEstadoModal(false);
    fetchData();
  }, [estadoModal, paginacion]);

  if (error) {
    return (
      <Alert severity="error" sx={{ width: '100%' }}>Error al cargar los productos</Alert>
    );
  }

  return (
    <Box sx={{ mr:1, ml:1}}>
      {estadoVenta === "Eliminado" && (
        <Alert sx={{ mb: 2 }} severity="error">
          Producto eliminado correctamente
        </Alert>
      )}
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell />
            <StyledTableCell align='center'>Fecha</StyledTableCell>
            <StyledTableCell align='center'>Usuario</StyledTableCell>
            <StyledTableCell align='center'>Total</StyledTableCell>
            <StyledTableCell align='center'>Acciones</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
        {error && (
              <StyledTableRow>
                <StyledTableCell colSpan={5} align="center">
                  <Alert severity="error" sx={{ width: '100%' }}>Error al cargar los productos</Alert>
                </StyledTableCell>
              </StyledTableRow>
            )}

            {/* Mensaje de carga */}
            {isLoading && !error && (
              <StyledTableRow>
                <StyledTableCell colSpan={5} align="center">
                  <Alert severity="info" sx={{ width: '95%'}}>Cargando...</Alert>
                </StyledTableCell>
              </StyledTableRow>
            )}
          {ventas?.results?.map((venta) => (
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
                <StyledTableCell align='center' component="th" scope="row">
                  {venta.fecha}
                </StyledTableCell>
                <StyledTableCell align='center'>{venta.usuario_email}</StyledTableCell>
                <StyledTableCell align='center'>{venta.total}</StyledTableCell>
                <StyledTableCell align='center'>
                  <IconButton onClick={() => {
                    setModalShow(true);
                    setVentaSeleccionado(venta.id);}}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                  <Collapse in={openRow === venta.fecha} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>

                      <Table size="small" aria-label="purchases">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell align='center'>Producto</StyledTableCell>
                            <StyledTableCell align='center'>Cantdad</StyledTableCell>
                            <StyledTableCell align='center'>Subtotal</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {isLoadingDetalle && (
                            <StyledTableRow>
                              <StyledTableCell colSpan={5} align="center">
                                <Alert severity="info" sx={{ width: '95%'}}>Cargando...</Alert>
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
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      alignItems: 'center',
                                    }}
                                  >
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {!isLoading && !error &&
      <Paginacion
      setPaginacion={setPaginacion}
      paginacion={paginacion}
      paginaSiguiente={ventas?.next ? ventas?.next : ""}
      />
      }
    <EliminarProducto
      open={modalShow}
      onClose={() => setModalShow(false)}
      seleccionado={ventaSeleccionado}
      setEstadoModal={setEstadoModal}
      setEstado={setEstadoVenta}
      url="/ventas/"
    />
    </Box>
  );
}


