// Services/CrudService.js


import api from "./NetworkManager.js";

const CrudService = (endpoint) => ({
    fetchAll: () => api.get(`/${endpoint}/list`),

    getOne: (id) => api.get(`/${endpoint}/get/${id}`),

    create: (data) => api.post(`/${endpoint}/create`, data),

    update: (id, data) => api.put(`/${endpoint}/update/${id}`, data),

    delete: (id) => api.delete(`/${endpoint}/delete/${id}`),

    deleteAll: (ids) => api.post(`/${endpoint}/delete-all`, ids),

    updateStatus: (id) => api.get(`/${endpoint}/update-status/${id}`),

    filter: (payload) => api.post(`/${endpoint}/filter`, payload)
});

export default CrudService;
