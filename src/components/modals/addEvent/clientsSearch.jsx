import React, { useState, useEffect } from "react";
import { getClients } from "../../../api/clients";

export default function ClientsSearch({ onClientSelect }) {
    const [clients, setClients] = useState([]); // Усі клієнти
    const [filteredClients, setFilteredClients] = useState([]); // Відфільтровані клієнти
    const [searchValue, setSearchValue] = useState(""); // Поточне значення поля пошуку

    // Завантаження клієнтів при першому рендері
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const data = await getClients();
                setClients(data); // Зберігаємо весь список об'єктів
                setFilteredClients(data); // Початково показуємо весь список
            } catch (error) {
                console.error("Помилка отримання даних:", error);
            }
        };

        fetchClients();
    }, []);

    const handleSearchChange = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchValue(value); // Оновлюємо поточне значення
        if (value === "") {
            setFilteredClients(clients); // Якщо пошук порожній, показуємо весь список
        } else {
            const filtered = clients.filter((client) =>
                client.nameClient.toLowerCase().includes(value)
            );
            setFilteredClients(filtered);
        }
    };

    const handleSelect = (e) => {
        const selectedName = e.target.value; // Вибране ім'я з `datalist`
        setSearchValue(selectedName); // Оновлюємо пошукове значення
        onClientSelect(selectedName); // Передаємо вибране ім'я у батьківський компонент
    };

    return (
        <div>
            <label htmlFor="clientSearch" className="form-label">Введіть клієнта:</label>
            <input
                className="form-control"
                list="datalistOptions"
                id="clientSearch"
                placeholder="Почніть ввод..."
                value={searchValue}
                onChange={handleSearchChange} // Викликаємо функцію пошуку при зміні
                onBlur={handleSelect} // Обробляємо вибір клієнта
            />
            <datalist id="datalistOptions">
                {filteredClients.map((client, index) => (
                    <option key={index} value={client.nameClient} /> // Використовуємо лише ім'я
                ))}
            </datalist>
        </div>
    );
}
