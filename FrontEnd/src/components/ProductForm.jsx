import React, { useState, useEffect } from 'react';
import { validateProduct } from '../validations/productValidations';
import { productApi } from '../api/productApi';
import { Save, X } from 'lucide-react';

export const ProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    productTypeId: ''
  });
  const [types, setTypes] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const data = await productApi.getTypes();
        setTypes(data || []);
      } catch (err) {
        console.error('Error fetching types', err);
      }
    };
    fetchTypes();
  }, []);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        stock: product.stock || '',
        productTypeId: product.productTypeId || ''
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpiar error al cambiar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateProduct(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Asegurar tipos correctos para el backend
      const dataToSave = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        productTypeId: Number(formData.productTypeId)
      };
      
      await onSave(dataToSave);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
      <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {product ? 'Editar Producto' : 'Nuevo Producto'}
      </h3>
      
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Tipo de Producto</label>
            <select
              name="productTypeId"
              className="form-input"
              value={formData.productTypeId}
              onChange={handleChange}
            >
              <option value="">Seleccione un tipo</option>
              {types.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
            {errors.productTypeId && <span className="error-text">{errors.productTypeId}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Precio</label>
            <input
              type="number"
              step="0.01"
              name="price"
              className="form-input"
              value={formData.price}
              onChange={handleChange}
            />
            {errors.price && <span className="error-text">{errors.price}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Stock</label>
            <input
              type="number"
              name="stock"
              className="form-input"
              value={formData.stock}
              onChange={handleChange}
            />
            {errors.stock && <span className="error-text">{errors.stock}</span>}
          </div>
        </div>

        <div className="form-group" style={{ marginTop: '0.5rem' }}>
          <label className="form-label">Descripción</label>
          <textarea
            name="description"
            className="form-input"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            style={{ resize: 'vertical' }}
          />
          {errors.description && <span className="error-text">{errors.description}</span>}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
          <button type="button" className="btn btn-danger" onClick={onCancel} disabled={isSubmitting}>
            <X size={18} />
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="spinner" style={{ width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}></div>
            ) : (
              <><Save size={18} /> Guardar</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
