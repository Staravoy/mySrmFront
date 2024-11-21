import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000'; // Ваш Django сервер


// Функція для отримання списку клієнтів
export const getClients = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/clients/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching clients:', error);
        throw error;
    }
};


// Функція для додавання клієнта
export const addClient = async (clientData) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/clients/add`, clientData);
        return response.data; // Повертає доданого клієнта
    } catch (error) {
        console.error('Помилка додавання клієнта:', error);
        throw error; // Обробка помилки
    }
};

// Функція видалення клієнта
export const deleteClient = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/api/clients/delete/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Помилка видалення клієнта:', error);
        throw error;
    }
};

export const updateClient = async (id, updatedData) => {
    try {
        const response = await axios.put(`${BASE_URL}/api/client/update/${id}/`, updatedData);
        return response.data;
    } catch (error) {
        console.error('Помилка редагування клієнта:', error);
        throw error;
    }
};
