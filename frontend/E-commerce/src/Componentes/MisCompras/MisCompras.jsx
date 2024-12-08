import React, { useEffect, useState } from 'react';
import { useFetchCompras } from '../../Request/v2/fetchCompras';
import { useAuth } from '../login/authContext';
import {
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
} from '@mui/material';
import { StyledTableCell, StyledTableRow } from '../GestionarProductos/styledTable';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const MisCompras = () => {
  const { isAuthenticated } = useAuth();
  const { compras, loading, error } = useFetchCompras(isAuthenticated);
  const [productos, setProductos] = useState({});
  const [expandedRows, setExpandedRows] = useState([]);
  const navigate = useNavigate();

  // Función para obtener los detalles de la compra
  const obtenerDetallesVenta = async (ventaId) => {
    try {
      const response = await fetch(`http://localhost:8000/ventas/${ventaId}/detalles/`);
      const detalles = await response.json();
      return detalles;
    } catch (err) {
      console.error('Error al obtener los detalles de la venta:', err);
      return [];
    }
  };

  useEffect(() => {
    if (compras.length > 0) {
      const fetchDetalles = async () => {
        const detallesPorVenta = await Promise.all(
          compras.map(async (compra) => {
            const detalles = await obtenerDetallesVenta(compra.id);
            return { ventaId: compra.id, detalles };
          })
        );

        const detallesMapeados = detallesPorVenta.reduce((acc, { ventaId, detalles }) => {
          acc[ventaId] = detalles;
          return acc;
        }, {});
        setProductos(detallesMapeados);
      };
      fetchDetalles();
    }
  }, [compras]);

  const toggleExpand = (ventaId) => {
    setExpandedRows((prevState) =>
      prevState.includes(ventaId)
        ? prevState.filter((id) => id !== ventaId)
        : [...prevState, ventaId]
    );
  };

  return (
    <Box sx={{ mt: 10, display: 'flex', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 900, width: '100%' }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
          Mis Compras
        </Typography>

        {loading && !error && (
          <CircularProgress sx={{ display: 'block', margin: '0 auto' }} />
        )}
        {error && (
          <Alert sx={{ mb: 2 }} severity="error">
            Error al cargar las compras
          </Alert>
        )}

        <TableContainer sx={{ width: '55vw', maxHeight: '60vh', overflowY: 'auto' }}>
          <Table sx={{ width: '100%' }}>
            <TableHead>
              <StyledTableRow>
                {['Fecha', 'Total'].map((header, index) => (
                  <StyledTableCell key={index} align="center" sx={{ width: '33%' }}>
                    {header}
                  </StyledTableCell>
                ))}
                {/* Columna de detalles sin título */}
                <StyledTableCell sx={{ width: '5%' }} />
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {loading && !error && (
                <StyledTableRow>
                  <StyledTableCell colSpan={3} align="center">
                    Cargando...
                  </StyledTableCell>
                </StyledTableRow>
              )}

              {!loading && compras.length === 0 && !error && (
                <StyledTableRow>
                  <StyledTableCell colSpan={3} align="center">
                    No tienes compras.
                  </StyledTableCell>
                </StyledTableRow>
              )}

              {compras.length > 0 &&
                !loading &&
                !error &&
                compras.map((compra) => {
                  const detalles = productos[compra.id];
                  if (!detalles) return null;

                  return (
                    <React.Fragment key={compra.id}>
                      <StyledTableRow>
                        <StyledTableCell align="center">
                          {new Date(compra.fecha).toLocaleDateString()}
                        </StyledTableCell>
                        <StyledTableCell align="center">${compra.total}</StyledTableCell>
                        {/* Columna de detalles con la flechita */}
                        <StyledTableCell align="left">
                          <IconButton onClick={() => toggleExpand(compra.id)}>
                            <ExpandMoreIcon />
                          </IconButton>
                        </StyledTableCell>
                      </StyledTableRow>

                      {expandedRows.includes(compra.id) && (
                        <StyledTableRow>
                          <StyledTableCell colSpan={3} align="center">
                            <Table>
                              <TableHead>
                                <StyledTableRow>
                                  <StyledTableCell>Producto</StyledTableCell>
                                  <StyledTableCell>Cantidad</StyledTableCell>
                                  <StyledTableCell>Subtotal</StyledTableCell> {/* Nueva columna Subtotal */}
                                </StyledTableRow>
                              </TableHead>
                              <TableBody>
                                {detalles.map((detalle) => (
                                  <StyledTableRow key={detalle.id}>
                                    <StyledTableCell>{detalle.producto.nombre}</StyledTableCell>
                                    <StyledTableCell>{detalle.cantidad}</StyledTableCell>
                                    <StyledTableCell>${detalle.subtotal}</StyledTableCell> {/* Muestra el subtotal */}
                                  </StyledTableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </StyledTableCell>
                        </StyledTableRow>
                      )}
                    </React.Fragment>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" color="primary" onClick={() => navigate('/')}>
            Volver
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default MisCompras;
