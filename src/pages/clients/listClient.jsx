// Винесена функція fetchClients
import { getClients } from '../../api/clients';

const fetchClients = async (setClients, setLoading) => {
    try {
        const data = await getClients(); // Отримуємо дані
        setClients(data); // Оновлюємо список клієнтів
    } catch (error) {
        console.error('Помилка отримання даних:', error);
    } finally {
        setLoading(false); // Завершуємо завантаження
    }
};

export default fetchClients;
