import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/uk";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
  const [eventsData, setEventsData] = useState([]); // Список подій
  const [showModal, setShowModal] = useState(false); // Відображення модального вікна

  const [newEvent, setNewEvent] = useState({
    title: "",
    start: new Date(),
    end: new Date(),
  });

  // Відкриття модального вікна та підготовка даних
  const handleSelect = ({ start, end }) => {
    setNewEvent({ title: "", start, end });
    setShowModal(true);
  };

  // Додавання події до календаря
  const handleAddEvent = () => {
    setEventsData([...eventsData, newEvent]);
    setShowModal(false);
  };

  return (
    <div className="App">
      <Calendar
        views={["month", "week", "day", "agenda"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: "100vh" }}
        onSelectEvent={(event) => alert(`Подія: ${event.title}`)}
        onSelectSlot={handleSelect}
        messages={{
          date: "Дата",
          time: "Час",
          event: "Подія",
          allDay: "Весь день",
          week: "Тиждень",
          work_week: "Робочий тиждень",
          day: "День",
          month: "Місяць",
          previous: "Попередній",
          next: "Наступний",
          yesterday: "Вчора",
          tomorrow: "Завтра",
          today: "Сьогодні",
          agenda: "Порядок денний",
          showMore: (total) => `+${total} ще`,
          noEventsInRange: "У цьому діапазоні немає подій",
        }}
      />

      {/* Модальне вікно для додавання події */}
      {showModal && (
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
                  onClick={handleAddEvent}
                >
                  Додати подію
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Затемнення фону */}
      {showModal && (
        <div
          className="modal-backdrop fade show"
          style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1050 }}
        ></div>
      )}
    </div>
  );
}
