import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/uk";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { getAllEvents } from "../../api/kolodar"
import MwAddEvent from "../../components/modals/addEvent/mwAddEvent"
// Малюнки
import InformIcon from '../../components/image/information_icon.png';

const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
  const [eventsData, setEventsData] = useState([]); // Список подій
  const [showModal, setShowModal] = useState(false); // Відображення модального вікна

  const fetchAllEvents = async () => {
    try {
      const data = await getAllEvents();

      // Перетворюємо строки у формат Date
      const formattedData = data.map(event => ({
        ...event,
        start: new Date(event.start), // Перетворення на об'єкт Date
        end: new Date(event.end),     // Перетворення на об'єкт Date
      }));

      setEventsData(formattedData);
    } catch (error) {
      console.error("Помилка отримання даних:", error);
    }
  };

  
  useEffect(() => {
    fetchAllEvents();
  }, []);
 

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


// ------------------------------ RENDER ----------------------------
  return (
    <div>
      <div className="d-flex align-items-center">
        <h2 className="p-2">Календар</h2>
        <img className="InformIcon" src={InformIcon} alt="InformIcon" />
        <p className="p-2 text-secondary mb-0">
            Плануйте та відслідковуйте події у календарі.
        </p>
        <button
            type="button"
            className="btn btn-outline-secondary ms-auto me-3"
            onClick={handleSelect} // Відкрити МВ "Додати клієнта"
        >
            Додати подію
        </button>
      </div>
      <div>
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
            agenda: "Розклад",
            showMore: (total) => `+${total} ще`,
            noEventsInRange: "У цьому діапазоні немає подій",
          }}
        />
      </div>

      {/* Модальне вікно для додавання події */}
      {showModal && (
        <MwAddEvent
          newEvent={newEvent}
          setNewEvent={setNewEvent} // Передача даних про нову подію
          setShowModal={setShowModal} // Функція для закриття модального вікна
          handleAddEvent={handleAddEvent} // Функція для додавання події
          fetchAllEvents={fetchAllEvents} // Функція для оновлення подій
        />
      )}
    </div>
  );
}
