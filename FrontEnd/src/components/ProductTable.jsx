import React from 'react';
import { useAuth } from '../auth/AuthContext';
import { Edit2, Trash2 } from 'lucide-react';

export const ProductTable = ({ products, onEdit, onDelete }) => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'Admin';

  if (!products || products.length === 0) {
    return (
      <div className="glass" style={{ padding: '3rem', textAlign: 'center', borderRadius: 'var(--radius-lg)' }}>
        <p style={{ color: 'var(--color-text-muted)' }}>No hay productos disponibles.</p>
      </div>
    );
  }

  return (
    <div className="glass" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderBottom: '1px solid var(--color-border)' }}>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Nombre</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Tipo</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Precio</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Stock</th>
              <th style={{ padding: '1rem', fontWeight: 600, textAlign: 'right' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background-color 0.2s' }}>
                <td style={{ padding: '1rem' }}>
                  <div style={{ fontWeight: 500 }}>{product.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{product.description}</div>
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}>
                    {product.productTypeName}
                  </span>
                </td>
                <td style={{ padding: '1rem', fontWeight: 500, color: 'var(--color-success)' }}>
                  ${product.price.toFixed(2)}
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    color: product.stock === 0 ? 'var(--color-error)' : (product.stock < 10 ? '#fbbf24' : 'inherit')
                  }}>
                    {product.stock}
                  </span>
                </td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                    <button 
                      onClick={() => onEdit(product)}
                      className="btn"
                      style={{ padding: '0.4rem', backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--color-primary)' }}
                      title="Editar"
                    >
                      <Edit2 size={16} />
                    </button>
                    {isAdmin && (
                      <button 
                        onClick={() => onDelete(product.id)}
                        className="btn"
                        style={{ padding: '0.4rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-error)' }}
                        title="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
