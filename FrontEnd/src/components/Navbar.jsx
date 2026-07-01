import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { LogOut, Package } from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="glass" style={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 100, 
      borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
      borderTop: 'none',
      marginBottom: '2rem'
    }}>
      <div className="container" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '1rem 1.5rem' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ color: 'var(--color-primary)' }}>
            <Package size={28} />
          </div>
          <Link to="/products" style={{ color: 'var(--color-text)', fontSize: '1.25rem', fontWeight: 600 }}>
            ProductManager
          </Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{user.email}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', backgroundColor: 'rgba(99, 102, 241, 0.1)', padding: '0.1rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>
              {user.role}
            </span>
          </div>
          <button 
            onClick={handleLogout} 
            className="btn btn-danger" 
            style={{ padding: '0.5rem', borderRadius: '50%' }}
            title="Cerrar sesión"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
};
