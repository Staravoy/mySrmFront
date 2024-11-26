import React, { useEffect, useState } from 'react';
// Компоненти
import { getClients, deleteClient } from '../../api/clients';
// Малюнки
import InformIcon from '../../components/image/information_icon.png';
// Стилі
import './clients.css';
// Модальні вікна
import Modal from '../../components/modals/addClient/modalAdd';
import MiniModal from '../../components/modals/mini/miniModal';
import EditModal from '../../components/modals/editClient/modalEdit'

const ClientTable = () => {

    // Стан для відображення завантаження
    const [loading, setLoading] = useState(true); 

    // Модальне вікно "Додати клієнта"
    const [isOpenModal, setIsOpenModal] = useState(false);
    const openModal = () => {
        setIsOpenModal(true)
    };
    const closeModal = () => {
        setIsOpenModal(false);
    };

    // Міні Модальне вікно
    const [isOpenMiniModal, setIsOpenMiniModal] = useState(false) // Стан для відкриття міні МВ
    const [miniModalMessage, setMiniModalMessage] = useState(""); // Стан для повідомлення в міні МВ
    const openMiniModal = (message) => {
        setIsOpenMiniModal(true)
        setMiniModalMessage(message);} // Функція відкриття МВ та відправки поавідомлення
    const closeMiniModal = () => setIsOpenMiniModal(false) // Функція закриття міні МВ

    // Список усіх клієнтів
    const [clients, setClients] = useState([]); // Стан для списку клієнтів
    const fetchClients = async () => {
        try {
            const data = await getClients();
            setFilteredClients(data); // Оновлюємо відфільтровані клієнти
            setClients(data);
        } catch (error) {
            console.error('Помилка отримання даних:', error);
        } finally {
            setLoading(false);
        }
    };

    //Видалення клієнта за id
    const handleDeleteClient = async (id) => {
        if (window.confirm('Ви справді бажаєте видалити клієнта?')) {
            try {
                await deleteClient(id); // Видаляємо клієнта через API
                openMiniModal("Клієнта видалено!!!")
                await fetchClients();   // Оновлюємо список клієнтів
            } catch (error) {
                console.error('Помилка видалення:', error);
            }
        }
    };

    // Функціонал Редагування клієнта
    const [editModal, setEditModal] = useState(false) // Edit Modal
    const openEditModal = () => setEditModal(true)
    const closeEditModal = () => setEditModal(false)
    
    const [editingClient, setEditingClient] = useState() // Стан для редагованого клієнта

    const handleUpdateClient = (client) => {
        setEditingClient(client); // Встановлення клієнта для редагування
        openEditModal()
    };

    // Пошукове поле
    const [searchTerm, setSearchTerm] = useState('') // Стан для пошукового поля
    const [filteredClients, setFilteredClients] = useState([]) // Відфільтрований список

    const handleSearchChange = (e) => { 
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        if (value === '') {
            setFilteredClients(clients); // Якщо пошук порожній, показуємо весь список
        } else {
            const filtered = clients.filter(client => 
                client.nameClient.toLowerCase().includes(value) || 
                client.phoneNumber.toLowerCase().includes(value)
            );
            setFilteredClients(filtered);
        }
    };




    useEffect(() => {
        fetchClients(); 
    }, []);
        if (loading) {
            return <div className="text-center mt-5">Завантаження...</div>;
        }
// ------------------------- Render --------------------------------------------------------
    return (
        <div>
            <div className="d-flex align-items-center">
                <h2 className="p-2">Клієнт</h2>
                <img className="InformIcon" src={InformIcon} alt="InformIcon" />
                <p className="p-2 text-secondary mb-0">
                    Створюйте клієнтів, додавайте їх контакти, щоб завжди бути на зв’язку з ними.
                </p>
                <button
                    type="button"
                    className="btn btn-outline-secondary ms-auto me-3"
                    onClick={openModal} // Відкрити МВ "Додати клієнта"
                >
                    Додати клієнта
                </button>
            </div>

            {/* Основне МВ */}
            {isOpenModal && <Modal
                closeModal={closeModal}
                openMiniModal={openMiniModal}
                fetchClients={fetchClients}
            />}
            
            {/* Міні МВ */}
            {isOpenMiniModal && <MiniModal
                message={miniModalMessage}
                closeMiniModal={closeMiniModal} />}
            
            {/* МВ для редагування запису*/}
            {editModal && <EditModal
                closeEditModal={closeEditModal}
                openMiniModal={openMiniModal}
                fetchClients={fetchClients}
                editingClient={ editingClient } />}

            <form className="d-flex mb-3">
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Пошук по таблиці"
                    aria-label="Search"
                    onChange={handleSearchChange}
                />
                <button
                    className="btn btn-outline-success me-3"
                    type="submit">Пошук</button>
            </form>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">№</th>
                        <th scope="col">Імʼя клієнта</th>
                        <th scope="col">Телефон</th>
                        <th scope="col">Дата народження</th>
                        <th scope="col">Операції</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredClients.length > 0 ? (
                        filteredClients.map((client, index) => (
                        <tr key={client.id || index}>
                            <th scope="row">{index + 1}</th>
                            <td>{client.nameClient}</td>
                            <td>{client.phoneNumber}</td>
                            <td>{new Date(client.birthday).toLocaleDateString()}</td>
                            <td>

                                {/* Кнопка Редагування запису */}
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm"
                                    onClick={() => handleUpdateClient(client)}>
                                    Редагувати
                                </button>

                                {/* Кнопка Видалення запису */}
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm ms-1"
                                    onClick={() => handleDeleteClient(client.id)}
                                >
                                    Видалити
                                </button>

                            </td>
                        </tr>
                        ))) : (
                            <tr>
                                <td colSpan="5" className='text-center'>
                                    Клієнта не знайдено
                                </td>
                            </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};





export default ClientTable;
