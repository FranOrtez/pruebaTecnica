export const validateProduct = (product) => {
  const errors = {};
  
  if (!product.name || product.name.trim() === '') {
    errors.name = 'El nombre es obligatorio';
  }
  
  if (!product.description || product.description.trim() === '') {
    errors.description = 'La descripción es obligatoria';
  }
  
  if (product.price === undefined || product.price === '') {
    errors.price = 'El precio es obligatorio';
  } else if (Number(product.price) <= 0) {
    errors.price = 'El precio debe ser mayor que 0';
  }
  
  if (product.stock === undefined || product.stock === '') {
    errors.stock = 'El stock es obligatorio';
  } else if (Number(product.stock) < 0) {
    errors.stock = 'El stock no puede ser negativo';
  }
  
  if (!product.productTypeId || product.productTypeId === '') {
    errors.productTypeId = 'El tipo de producto es obligatorio';
  }
  
  return errors;
};
