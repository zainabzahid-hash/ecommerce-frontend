import api from '../../../services/apiClient.js'

// every category call lives here, components never write URLs
export const categoryApi = {
    getAll: (params) => api.get('/categories', { params }), // { page, limit }
    getById: (id) => api.get(`/categories/${id}`),
    create: (data) => api.post('/categories', data), // { name, parent_id }
    update: (id, data) => api.patch(`/categories/${id}`, data),
    remove: (id) => api.delete(`/categories/${id}`),
}