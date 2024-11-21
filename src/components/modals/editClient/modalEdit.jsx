import React, { useState, useEffect } from 'react';
import { updateClient } from '../../../api/clients';

const ModalAddClient = ({ closeEditModal, openMiniModal, fetchClients, editingClient }) => {
    const [formData, setFormData] = useState({
        nameClient: '',
        phoneNumber: '',
        birthday: '',
    });

    const [rawBirthday, setRawBirthday] = useState(''); // Проміжний стан для дати
    const [error, setError] = useState(null);

    useEffect(() => {
        if (editingClient) {
            console.log("Модальне вікно отримало дані:", editingClient);

            // Конвертуємо дату з формату ISO у дд.мм.рррр для зручності
            const formattedDate = editingClient.birthday
                ? editingClient.birthday.split('-').reverse().join('.')
                : '';

            setFormData({
                nameClient: editingClient.nameClient || '',
                phoneNumber: editingClient.phoneNumber || '',
                birthday: editingClient.birthday || '',
            });
            setRawBirthday(formattedDate); // Відображення у форматі дд.мм.рррр
        }
    }, [editingClient]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'birthday') {
            setRawBirthday(value); // Оновлюємо значення для відображення
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Перевірка формату дати лише під час збереження
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/;
        if (!dateRegex.test(rawBirthday)) {
            setError('Дата має бути у форматі дд.мм.рррр');
            return;
        }

        // Конвертація дати у формат ISO
        const [day, month, year] = rawBirthday.split('.');
        const isoDate = `${year}-${month}-${day}`;

        try {
            await updateClient(editingClient.id, {
                ...formData,
                birthday: isoDate,
            }); // Передаємо ID і дані
            openMiniModal('Запис відредаговано!!!'); // Показуємо повідомлення
            fetchClients(); // Оновлюємо список клієнтів
            closeEditModal(); // Закриваємо модальне вікно
        } catch (error) {
            console.error('Помилка редагування клієнта:', error);
        }
    };

    return (
        <div
            className="modal fade show"
            style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Редагування клієнта</h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={closeEditModal}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="nameClient" className="form-label">Імʼя клієнта</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nameClient"
                                    name="nameClient"
                                    value={formData.nameClient}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phoneNumber" className="form-label">Телефон</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="birthday" className="form-label">Дата народження</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="birthday"
                                    name="birthday"
                                    placeholder="дд.мм.рррр"
                                    value={rawBirthday}
                                    onChange={handleChange}
                                    required
                                />
                                {error && <small className="text-danger">{error}</small>}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeEditModal}>
                                    Відмінити
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Змінити
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalAddClient;
