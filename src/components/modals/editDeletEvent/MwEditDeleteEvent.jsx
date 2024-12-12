import React, { useState } from "react";
import { deleteEvent } from '../../../api/kolodar'
import EditEvent from "./editEvent";



// ------------------------------- UNDER THE HOOD -------------------------
function MwEditDelet({ closeEventModal, selectedEvent, openMiniModal, fetchAllEvents }) {

    const handleDelete = async () => {

    if (window.confirm('Ви справді бажаєте видалити подію?')) {
        try {
            await deleteEvent(selectedEvent.id); // Видаляємо подію через API
            openMiniModal("Подію видалено!!!");
            closeEventModal(); // Закриваємо модальне вікно
            await fetchAllEvents(); // Оновлюємо список подій
        } catch (error) {
            console.error('Помилка видалення:', error);
        }
    }
    };

    const [showModal, setShowModal] = useState(false)

    const updateSelectedEvent = (updatedEvent) => {
        selectedEvent = updatedEvent; // Оновлюємо дані про подію
    };
    
 
    

// --------------------------------- RENDER -----------------------------------------
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
                            <h5 className="modal-title">Деталі події</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={closeEventModal}
                                aria-label="Закрити"
                            ></button>
                        </div>
                     
                        <div className="modal-body">
                            {selectedEvent ? (
                                <>  
                                <div className="mb-3 text-center">
                                     <p>{selectedEvent.title}</p>
                                </div>

                                 
                                <div className='mb-3 text-center'>
                                     <p>{selectedEvent.client}</p>
                                </div>

                                <div className="mb-3">
                                    <label className='fw-bold'>Початок:</label>
                                    <p>{new Date(selectedEvent.start).toLocaleString()}</p>
                                </div>

                                 <div className="mb-3">
                                    <label className='fw-bold'>Завершення:</label>
                                    <p>{new Date(selectedEvent.end).toLocaleString()}</p>
                                 </div>

                                <div className="mb-3">
                                    <p><strong>ID:</strong> {selectedEvent.id}</p>
                                </div>
                                </>
                                ) : (
                                    <p>Інформація про подію недоступна.</p>
                                )}
                            </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => setShowModal(true)} // Відкрити модалку
                            >
                                Редагувати
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => handleDelete(selectedEvent)}
                            >
                                Видалити
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={closeEventModal}
                            >
                                Закрити
                         </button>                     
                        </div>
                    </div>
                </div>

         </div>
         
         {showModal && <EditEvent
             selectedEvent={selectedEvent}
             setShowModal={setShowModal}
             updateSelectedEvent={updateSelectedEvent}
             closeEventModal={closeEventModal}
             openMiniModal={openMiniModal}
             fetchAllEvents={ fetchAllEvents } />}

        </div>
    );
}


export default MwEditDelet