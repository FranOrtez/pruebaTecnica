// API base URL
const BASE_URL = 'https://localhost:7194/api';

export const fetchClient = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);

    // Parsear respuesta JSON si no es 204 No Content
    let data = null;
    if (response.status !== 204) {
      const text = await response.text();
      data = text ? JSON.parse(text) : null;
    }

    if (!response.ok) {
      // Manejar 401 Unauthorized
      if (response.status === 401) {
        if (!url.includes('/auth/login')) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
          throw new Error('Sesión expirada. Por favor inicie sesión nuevamente.');
        } else {
          throw new Error(data?.message || 'Datos incorrectos.');
        }
      }
      
      throw new Error(data?.message || 'Error en la petición');
    }

    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
