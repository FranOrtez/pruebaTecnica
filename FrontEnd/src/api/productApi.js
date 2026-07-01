import { fetchClient } from './fetchClient';

export const productApi = {
  getAll: () => fetchClient('/products'),
  getById: (id) => fetchClient(`/products/${id}`),
  create: (data) => fetchClient('/products', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => fetchClient(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => fetchClient(`/products/${id}`, {
    method: 'DELETE',
  }),
  getTypes: async () => {
    return fetchClient('/products/types');
  }
};
