export const formato = (editedProduct) => {
  return {
    "id": editedProduct.id,
    "nombre": editedProduct.nombre,
    "descripcion": editedProduct.descripcion,
    "precio": editedProduct.precio,
    "stock": editedProduct.stock,
    "imagen_url": editedProduct.imagen_url,
    "tags": editedProduct.tags,
  };
};
