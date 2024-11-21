import React, { useEffect, useState } from 'react';
// Компоненти
import { getClients, deleteClient } from '../../api/clients';
// Малюнки
import InformIcon from './information_icon.png';
// Стилі
import './clients.css';
// Модальні вікна
import Modal from '../../components/modals/addClient/modalAdd';
import MiniModal from '../../components/modals/mini/miniModal';
import EditModal from '../../components/modals/editClient/modalEdit';

const ClientTable = () => {
    const [loading, setLoading] = useState(true);
    const [clients, setClients] = useState([]);
    const [filteredClients, setFilteredClients] = useState([]);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenMiniModal, setIsOpenMiniModal] = useState(false);
    const [miniModalMessage, setMiniModalMessage] = useState("");
    const [editModal, setEditModal] = useState(false);
    const [editingClient, setEditingClient] = useState();
    const [searchTerm, setSearchTerm] = useState('');

    const fetchClients = async () => {
        setLoading(true);
        try {
            const data = await getClients();
            setClients(data);
        } catch (error) {
            console.error('Помилка отримання даних:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClient = async (id) => {
        if (window.confirm('Ви справді бажаєте видалити клієнта?')) {
            try {
                await deleteClient(id);
                setMiniModalMessage("Клієнта видалено!!!");
                setIsOpenMiniModal(true);
                fetchClients();
            } catch (error) {
                console.error('Помилка видалення:', error);
            }
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        if (value === '') {
            setFilteredClients(clients);
        } else {
            const filtered = clients.filter(client => 
                client.nameClient.toLowerCase().includes(value) || 
                client.phoneNumber.toLowerCase().includes(value)
            );
            setFilteredClients(filtered);
        }
    };

    const handleUpdateClient = (client) => {
        setEditingClient(client);
        setEditModal(true);
    };

    useEffect(() => {
        fetchClients();
    }, []);

    useEffect(() => {
        setFilteredClients(clients);
    }, [clients]);

    if (loading) {
        return <div className="text-center mt-5">Завантаження...</div>;
    }

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
                    onClick={() => setIsOpenModal(true)}>
                    Додати клієнта
                </button>
            </div>

            {isOpenModal && <Modal closeModal={() => setIsOpenModal(false)} fetchClients={fetchClients} />}
            {isOpenMiniModal && <MiniModal message={miniModalMessage} closeMiniModal={() => setIsOpenMiniModal(false)} />}
            {editModal && <EditModal closeEditModal={() => setEditModal(false)} editingClient={editingClient} fetchClients={fetchClients} />}

            <form className="d-flex mb-3">
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Пошук по таблиці"
                    aria-label="Search"
                    onChange={handleSearchChange}
                />
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
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-sm"
                                        onClick={() => handleUpdateClient(client)}>
                                        Редагувати
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm ms-1"
                                        onClick={() => handleDeleteClient(client.id)}>
                                        Видалити
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
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
