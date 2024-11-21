import React, { useState } from 'react';
import { addClient } from '../../../api/clients'; // Імпортуємо функцію для додавання клієнта

const ModalAddClient = ({ closeModal, openMiniModal, fetchClients }) => {
    const [formData, setFormData] = useState({
        nameClient: '',
        phoneNumber: '',
        birthday: '',
    });

    const [error, setError] = useState(null);

    // Обробник змін у полях форми
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'birthday') {
            // Валідація формату дати: dd.mm.yyyy
            const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/;
            if (value && !dateRegex.test(value)) {
                setError('Дата має бути у форматі дд.мм.рррр');
            } else {
                setError(null);
                // Конвертуємо дату у формат yyyy-mm-dd
                const [day, month, year] = value.split('.');
                const isoDate = `${year}-${month}-${day}`;
                setFormData({ ...formData, birthday: isoDate });
            }
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    // Обробник надсилання форми
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (error) {
            alert('Виправте помилки у формі!');
            return;
        }
        try {
            await addClient(formData); // Додаємо нового клієнта через API
            openMiniModal('Клієнта додано!'); // Показуємо повідомлення
            fetchClients(); // Оновлюємо список клієнтів
            closeModal(); // Закриваємо модальне вікно
        } catch (error) {
            console.error('Помилка додавання клієнта:', error);
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
                        <h5 className="modal-title" id="exampleModalLabel">Додати клієнта</h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={closeModal} // Викликаємо функцію закриття
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
                                    onChange={handleChange}
                                    required
                                />
                                {error && <small className="text-danger">{error}</small>}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                    Відмінити
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Зберегти
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
