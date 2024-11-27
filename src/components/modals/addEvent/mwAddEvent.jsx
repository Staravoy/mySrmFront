import React from "react";
import moment from "moment";
import { addEvent } from "../../../api/kolodar";

const MwAddEvent = ({ newEvent, setShowModal, handleAddEvent, setNewEvent }) => {
    const addEventToDB = async () => {
        if (!newEvent.title || !newEvent.start || !newEvent.end) {
            alert("Будь ласка, заповніть усі поля.");
            return;
        }

        try {
            await addEvent(newEvent); // Виклик API
            handleAddEvent(); // Оновлення стану
        } catch (error) {
            console.error("Помилка додавання події:", error);
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
                            <h5 className="modal-title">Додати подію</h5>
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
                                        value={newEvent.title}
                                        onChange={(e) =>
                                            setNewEvent({ ...newEvent, title: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Початок:</label>
                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        value={moment(newEvent.start).format("YYYY-MM-DDTHH:mm")}
                                        onChange={(e) =>
                                            setNewEvent({
                                                ...newEvent,
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
                                        value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
                                        onChange={(e) =>
                                            setNewEvent({
                                                ...newEvent,
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
                                onClick={addEventToDB}
                            >
                                Додати подію
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Затемнення фону */}
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

export default MwAddEvent;
