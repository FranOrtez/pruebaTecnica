import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { ProductsPage } from '../pages/ProductsPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { ProtectedRoute } from '../auth/ProtectedRoute';
import { Navbar } from '../components/Navbar';

export const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route 
          path="/products" 
          element={
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          } 
        />
        
        <Route path="/" element={<Navigate to="/products" replace />} />
        
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};
