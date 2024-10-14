import { Box } from '@mui/material'
import { CartaProducto }  from '../Card/card'
import { useState, useEffect } from 'react'

export default function ListaProductos({productos}) {
  const productosGuardados = JSON.parse(localStorage.getItem('productosSeleccionados')) || [];
  const [productosSeleccionados, setProductosSeleccionados] = useState(productosGuardados);
  console.log(productosSeleccionados);
  useEffect(() => {
    localStorage.setItem('productosSeleccionados', JSON.stringify(productosSeleccionados));
  }
  , [productosSeleccionados]);

  return (
    <>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 4, mt:2, width:'80%' }}>
      {console.log(productos)}
      {productos?.results?.map((producto) => (
        <CartaProducto key={producto.id} producto={producto} setProductosSeleccionados={setProductosSeleccionados} />
      ))}
    </Box>
    </>
  )
}
