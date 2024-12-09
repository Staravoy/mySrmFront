import React, { useState, useEffect } from "react";
import moment from "moment";
import { updateEvent } from "../../../api/kolodar";

const EditEvent = ({ setShowModal, selectedEvent, openMiniModal, closeEventModal, fetchAllEvents }) => {
    const [dataEvent, setDataEvent] = useState({
        title: "",
        start: new Date(),
        end: new Date(),
    });

    useEffect(() => {
        if (selectedEvent) {
            setDataEvent({
                title: selectedEvent.title || "",
                start: selectedEvent.start ? new Date(selectedEvent.start) : new Date(),
                end: selectedEvent.end ? new Date(selectedEvent.end) : new Date(),
            });
        }
    }, [selectedEvent]);

    const changeEvent = (e) => {
        const { name, value } = e.target;
        setDataEvent({
            ...dataEvent,
            [name]: value,
        });
    };

    const redactEvent = async (e) => {
        e.preventDefault();
        try {
            const updatedEvent = await updateEvent(selectedEvent.id, dataEvent); // Повертає оновлені дані
            setShowModal(false); // Закриваємо модальне вікно
            closeEventModal(false)
            openMiniModal("Подію відредаговано")
            fetchAllEvents()
        } catch (error) {
            console.error("Помилка редагування події:", error);
        }
    };


    return (
        <div>
            <div
                className="modal fade show"
                style={{ display: "block" }}
                aria-modal="true"
                role="dialog"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Внести зміни</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setShowModal(false)}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Назва події:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        value={dataEvent.title}
                                        onChange={changeEvent}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Початок:</label>
                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        name="start"
                                        value={moment(dataEvent.start).format("YYYY-MM-DDTHH:mm")}
                                        onChange={(e) =>
                                            setDataEvent({
                                                ...dataEvent,
                                                start: new Date(e.target.value),
                                            })
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Кінець:</label>
                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        name="end"
                                        value={moment(dataEvent.end).format("YYYY-MM-DDTHH:mm")}
                                        onChange={(e) =>
                                            setDataEvent({
                                                ...dataEvent,
                                                end: new Date(e.target.value),
                                            })
                                        }
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setShowModal(false)}
                            >
                                Закрити
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={redactEvent}
                            >
                                Зберігти зміни
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="modal-backdrop fade show"
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 1050,
                }}
            ></div>
        </div>
    );
};

export default EditEvent;
