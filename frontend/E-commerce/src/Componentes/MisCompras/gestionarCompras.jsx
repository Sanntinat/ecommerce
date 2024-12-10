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
    <Box sx={{ width: '100vw', padding: '20px' }}>
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

      <TableContainer
        component={Paper}
        sx={{
          border: '2px solid #007bff',
          borderRadius: '8px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
		  overflow: 'hidden',
			width: '70%',  
			display: 'flex',
			justifyContent: 'center',
			ml:25,
        }}
      >
        <Table aria-label="collapsible table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell />
              <StyledTableCell align='center'>Fecha</StyledTableCell>
              <StyledTableCell align='center'>Total</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
  {error && (
    <StyledTableRow>
      <StyledTableCell colSpan={3} align="center">
        <Alert severity="error" sx={{ width: '100%' }}>Error al cargar los productos</Alert>
      </StyledTableCell>
    </StyledTableRow>
  )}

  {isLoading && !error && (
    <StyledTableRow>
      <StyledTableCell colSpan={3} align="center">
        <Alert severity="info" sx={{ width: '95%' }}>Cargando...</Alert>
      </StyledTableCell>
    </StyledTableRow>
  )}

  {!isLoading && !error && (!ventas?.results || ventas.results.length === 0) && (
    <StyledTableRow>
      <StyledTableCell colSpan={3} align="center">
        <Alert severity="info" sx={{ width: '100%' }}>No tienes compras</Alert>
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
          {new Date(venta.fecha).toISOString().split('T')[0]}
        </StyledTableCell>
        <StyledTableCell align='center'>{venta.total}</StyledTableCell>
      </TableRow>
      <TableRow>
        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
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
                      <StyledTableCell colSpan={3} align="center">
                        <Alert severity="info" sx={{ width: '95%' }}>Cargando...</Alert>
                      </StyledTableCell>
                    </StyledTableRow>
                  )}
                  {errorDetalle && (
                    <StyledTableRow>
                      <StyledTableCell colSpan={3} align="center">
                        <Alert severity="error" sx={{ width: '100%' }}>Error al cargar las compras</Alert>
                      </StyledTableCell>
                    </StyledTableRow>
                  )}
                  {venta?.detalles.map((ventaDetalleId, index) => {
                    const detalle = ventasDetalle?.find((detalle) => detalle.venta === venta.id);
                    return detalle ? (
                      <TableRow key={`${detalle.id}-${index}`}>
                        <StyledTableCell align='center'>
                          {detalle.producto.nombre}
                        </StyledTableCell>
                        <StyledTableCell align='center'>{detalle.cantidad}</StyledTableCell>
                        <StyledTableCell align='center'>{detalle.subtotal}</StyledTableCell>
                      </TableRow>
                    ) : null;
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

      {!isLoading && !error && (
        <Paginacion
          setPaginacion={setPaginacion}
          paginacion={paginacion}
          paginaSiguiente={ventas?.next ? ventas?.next : ""}
        />
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
        >
          Volver
        </Button>
      </Box>
    </Box>
  );
}
