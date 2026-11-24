import api from '../../../services/apiClient.js'

// every attribute call lives here, components never write URLs
export const attributeApi = {
    getAll: (params) => api.get('/attributes', { params }),
    create: (data) => api.post('/attributes', data), // { name }
    update: (id, data) => api.patch(`/attributes/${id}`, data),
    remove: (id) => api.delete(`/attributes/${id}`), // soft delete
}

export const attributeValueApi = {
    getAll: (params) => api.get('/attribute-values', { params }), // { attribute_id }
    create: (data) => api.post('/attribute-values', data), // { attribute_id, value }
    update: (id, data) => api.patch(`/attribute-values/${id}`, data),
    remove: (id) => api.delete(`/attribute-values/${id}`),
}