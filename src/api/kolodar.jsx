import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/calendar/'; // Django сервер


// Функція для отримання усіх подій календаря
export const getAllEvents = async () => {
    try {
        const response = await axios.get(`${BASE_URL}allEvents/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching clients:', error);
        throw error;
    }
};

// Функція для додавання події
export const addEvent = async (newEvent) => {
    try {
        const response = await axios.post(`${BASE_URL}addEvent/`, newEvent);
        console.log(response.data)
        return response.data; // Повертає доданого клієнта
    } catch (error) {
        console.error('Помилка додавання клієнта:', error);
        throw error; // Обробка помилки
    }
};

// Функція видалення події
export const deleteEvent = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}deleteEvent/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Помилка видалення клієнта:', error);
        throw error;
    }
};

// Функція редагування події
export const updateEvent = async (id, updatedData) => {
    try {
        const response = await axios.put(`${BASE_URL}editEvent/${id}/`, updatedData);
        return response.data;
    } catch (error) {
        console.error('Помилка редагування події:', error);
        throw error;
    }
};


