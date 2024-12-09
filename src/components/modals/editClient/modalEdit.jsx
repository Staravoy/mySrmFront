import React, { useState, useEffect } from 'react';
import { updateClient } from '../../../api/clients';

const ModalAddClient = ({ closeEditModal, openMiniModal, fetchClients, editingClient }) => {
    const [formData, setFormData] = useState({
        nameClient: '',
        phoneNumber: '',
        birthday: '',
    });

    useEffect(() => {
        if (editingClient) {
            setFormData({
                nameClient: editingClient.nameClient || '',
                phoneNumber: editingClient.phoneNumber || '',
                birthday: editingClient.birthday || '',
            });
        }
    }, [editingClient]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateClient(editingClient.id, formData); // Передаємо ID і дані
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
                                    type="date"
                                    className="form-control"
                                    id="birthday"
                                    name="birthday"
                                    value={formData.birthday}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeEditModal}>
                                    Відмінити
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Редагувати
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
