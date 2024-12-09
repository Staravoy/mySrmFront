
import { getAllEvents } from "../../api/kolodar";

// Функція для отримання та форматування подій
const getEvents = async () => {
  try {
    const data = await getAllEvents();

    // Перетворюємо строки у формат Date
    const formattedData = data.map(event => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
    }));

    return formattedData; // Повертаємо відформатовані дані
  } catch (error) {
    console.error("Помилка отримання даних:", error);
    return []; // Повертаємо порожній масив у разі помилки
  }
};

export default getEvents;
