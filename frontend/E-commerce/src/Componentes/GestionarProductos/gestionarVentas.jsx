import * as React from 'react';
import { Box, Collapse, IconButton, Button, Table, TableBody, TableContainer, TableHead, TableRow, Paper, Alert } from '@mui/material/';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { StyledTableCell, StyledTableRow } from './styledTable'
import { useState, useEffect } from 'react';
import CambiarEstadoVenta from './CrudProductos/cambiarEstadoVenta';
import Paginacion from '../Productos/paginacion';


export default function GestionarVentas({ventas, isLoading, error, ventasDetalle, isLoadingDetalle, errorDetalle, fetchData, setPaginacion, paginacion}) {
  const [openRow, setOpenRow] = useState(null);

  const [modalShow, setModalShow] = useState(false);
  const [ventaSeleccionado, setVentaSeleccionado] = useState(null);
  const [estadoModal, setEstadoModal] = useState(false);
  const [estadoVenta, setEstadoVenta] = useState(false);
  const [nuevoEstado, setNuevoEstado] = useState("");
  const toggleRow = (rowName) => {
    setOpenRow(openRow === rowName ? null : rowName);
  };

  useEffect(() => {
    setEstadoModal(false);
    fetchData();
  }, [estadoModal, paginacion]);

  if (error) {
    return (
      <Alert severity="error" sx={{ width: '100%' }}>Error al cargar las ventas</Alert>
    );
  }

  return (
    <Box sx={{ mr:1, ml:1}}>
      {estadoVenta === "Eliminado" && (
        <Alert sx={{ mb: 2 }} severity="error">
          Venta eliminada correctamente
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
            <StyledTableCell align='center'>Estado</StyledTableCell>
            <StyledTableCell align='center'>Acciones</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
        {error && (
              <StyledTableRow>
                <StyledTableCell colSpan={5} align="center">
                  <Alert severity="error" sx={{ width: '100%' }}>Error al cargar las ventas</Alert>
                </StyledTableCell>
              </StyledTableRow>
            )}

            {/* Mensaje de carga */}
            {isLoading && !error && (
              <StyledTableRow>
                <StyledTableCell colSpan={5} align="center" sx={{minWidth:'500px'}}>
                  <Alert severity="info" sx={{ width: '95%'}}>Cargando...</Alert>
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
                <StyledTableCell align='center'>{venta.usuario_email}</StyledTableCell>
                <StyledTableCell align='center'>{venta.total}</StyledTableCell>
                <StyledTableCell align='center'>{venta.estado}</StyledTableCell>
                <StyledTableCell align='center'>
            {venta.estado === "Pendiente" && (
              <>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    setModalShow(true);
                    setVentaSeleccionado(venta.id);
                    setNuevoEstado("Finalizada");
                  }}
                >
                  Finalizar
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    setModalShow(true);
                    setVentaSeleccionado(venta.id);
                    setNuevoEstado("Cancelada");
                  }}
                >
                  Cancelar
                </Button>
              </>
            )}
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
                            <StyledTableCell align='center'>Cantidad</StyledTableCell>
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
          )})}
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
     <CambiarEstadoVenta
      open={modalShow}
      onClose={() => setModalShow(false)}
      seleccionado={ventaSeleccionado}
      setEstadoModal={setEstadoModal}
      setEstado={setEstadoVenta}
      url="/ventas/"
      nuevoEstado={nuevoEstado}
    />
    </Box>
  );
}


