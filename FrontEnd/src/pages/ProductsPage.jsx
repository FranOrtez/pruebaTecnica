import React, { useState, useEffect } from 'react';
import { productApi } from '../api/productApi';
import { ProductTable } from '../components/ProductTable';
import { ProductForm } from '../components/ProductForm';
import { Plus, RefreshCw } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';

export const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await productApi.getAll();
      setProducts(data || []);
    } catch (err) {
      setError(err.message || 'Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSaveProduct = async (productData) => {
    try {
      setError('');
      if (editingProduct) {
        await productApi.update(editingProduct.id, productData);
      } else {
        await productApi.create(productData);
      }
      await fetchProducts();
      setShowForm(false);
      setEditingProduct(null);
    } catch (err) {
      setError(err.message || 'Error al guardar el producto');
      throw err; // Re-throw para que el formulario maneje el loading state
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('¿Está seguro que desea eliminar este producto?')) {
      return;
    }
    
    try {
      setError('');
      await productApi.delete(id);
      await fetchProducts();
    } catch (err) {
      setError(err.message || 'Error al eliminar el producto');
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  return (
    <div className="page-container container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.2rem' }}>Inventario</h2>
          <p style={{ color: 'var(--color-text-muted)' }}>Gestione sus productos</p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={fetchProducts} className="btn" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
            <RefreshCw size={18} />
          </button>
          {!showForm && (
            <button onClick={() => setShowForm(true)} className="btn btn-primary">
              <Plus size={18} /> Nuevo Producto
            </button>
          )}
        </div>
      </div>

      {error && (
        <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-error)', padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          {error}
        </div>
      )}

      {showForm && (
        <div style={{ marginBottom: '2rem', animation: 'fadeIn 0.3s' }}>
          <ProductForm 
            product={editingProduct} 
            onSave={handleSaveProduct} 
            onCancel={handleCancelForm} 
          />
        </div>
      )}

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
          <div className="spinner" style={{ width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--color-primary)', borderRadius: '50%' }}></div>
        </div>
      ) : (
        <ProductTable 
          products={products} 
          onEdit={handleEditClick} 
          onDelete={handleDeleteProduct} 
        />
      )}
    </div>
  );
};
