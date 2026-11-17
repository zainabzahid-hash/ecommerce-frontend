import api from '../../../services/apiClient.js'

// same shape as categoryApi, just another resource
export const productApi = {
    getAll: (params) => api.get('/products', { params }), // { page, limit }
    getById: (id) => api.get(`/products/${id}`),
    create: (data) => api.post('/products', data),
    update: (id, data) => api.patch(`/products/${id}`, data),
    remove: (id) => api.delete(`/products/${id}`),
}