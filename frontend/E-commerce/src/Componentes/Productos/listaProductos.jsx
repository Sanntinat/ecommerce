import { Box } from '@mui/material'
import { CartaProducto }  from '../Principal/card'

export default function ListaProductos({productos}) {
  return (
    <>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, mt:2 }}>
      {console.log(productos)}
      {productos.map((producto) => (
        <CartaProducto key={producto.id} producto={producto} />
      ))}
    </Box>
    </>
  )
}
