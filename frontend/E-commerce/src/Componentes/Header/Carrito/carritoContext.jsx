import { createContext, useState, useEffect } from 'react';

// Crear el contexto
export const CarritoContext = createContext();

// Proveedor del contexto
export const CarritoProvider = ({ children }) => {
  const [productosSeleccionados, setProductosSeleccionados] = useState(
    JSON.parse(localStorage.getItem('productosSeleccionados')) || []
  );

  // Función para agregar un producto al carrito
  const agregarProducto = (producto) => {
    setProductosSeleccionados((prev) => [...prev, producto]);
  };

  // Función para eliminar un producto del carrito
  const eliminarProducto = (idProducto) => {
    setProductosSeleccionados((prev) => prev.filter((producto) => producto.id !== idProducto));
  };

  // Función para vaciar el carrito
  const vaciarCarrito = () => {
    setProductosSeleccionados([]); // Vacía el carrito
  };

  useEffect(() => {
    // Actualizar el localStorage con los productos actuales
    localStorage.setItem('productosSeleccionados', JSON.stringify(productosSeleccionados));
  }, [productosSeleccionados]);

  return (
    <CarritoContext.Provider value={{ productosSeleccionados, agregarProducto, eliminarProducto, vaciarCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};
