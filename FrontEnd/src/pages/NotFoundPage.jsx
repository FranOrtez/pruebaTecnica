import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="glass" style={{ padding: '3rem', textAlign: 'center', borderRadius: 'var(--radius-lg)' }}>
        <div style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
          <AlertCircle size={64} />
        </div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>404</h1>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>
          La página que estás buscando no existe.
        </p>
        <Link to="/" className="btn btn-primary">
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
};
