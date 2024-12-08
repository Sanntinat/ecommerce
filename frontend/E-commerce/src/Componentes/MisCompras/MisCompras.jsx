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
} from '@mui/material';
import { StyledTableCell, StyledTableRow } from '../GestionarProductos/styledTable';
import { useNavigate } from 'react-router-dom';

const MisCompras = () => {
  const { isAuthenticated } = useAuth();
  const { compras, loading, error } = useFetchCompras(isAuthenticated);
  const [productos, setProductos] = useState({});
  const navigate = useNavigate();

  const obtenerDetallesVenta = async (ventaId) => {
    try {
      const response = await fetch(`http://localhost:8000/ventas/${ventaId}/detalles/`);
      const detalles = await response.json();

      const productosDetalles = await Promise.all(
        detalles.map(async (detalle) => {
          const productoResponse = await fetch(`http://localhost:8000/productos/${detalle.producto}/`);
          const producto = await productoResponse.json();
          return { ...detalle, producto };
        })
      );

      return productosDetalles;
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

        <TableContainer>
          <Table>
            <TableHead>
              <StyledTableRow>
                {['Fecha', 'Productos y Cantidades', 'Total'].map((header, index) => (
                  <StyledTableCell key={index} align="center">
                    {header}
                  </StyledTableCell>
                ))}
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
                    <StyledTableRow key={compra.id}>
                      <StyledTableCell align="center">
                        {new Date(compra.fecha).toLocaleDateString()}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {detalles.map((detalle) => (
                          <Box
                            key={detalle.producto.id}
                            display="flex"
                            alignItems="center"
                            sx={{ marginBottom: '8px' }}
                          >
                            <img
                              src={detalle.producto.imagen_url}
                              alt={detalle.producto.nombre}
                              style={{
                                width: '50px',
                                height: '50px',
                                objectFit: 'cover',
                                marginRight: '8px',
                                borderRadius: '4px',
                              }}
                            />
                            <span>{detalle.producto.nombre} - {detalle.cantidad}</span>
                          </Box>
                        ))}
                      </StyledTableCell>
                      <StyledTableCell align="center">${compra.total}</StyledTableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/')}
          >
            Volver
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default MisCompras;
