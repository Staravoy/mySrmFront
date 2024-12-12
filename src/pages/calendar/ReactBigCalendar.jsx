// Загальні імпорти
import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/uk";
// Стилі
import "./ReactBigCalendar.css"
import "react-big-calendar/lib/css/react-big-calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// Імпорти компонентів та процесців
import getEvents from "../../services/bigcalendar/getEvent";
import messages from "./messages"; // слова для календарю
// Модальні вікна
import MwAddEvent from "../../components/modals/addEvent/mwAddEvent"
import MiniModal from '../../components/modals/mini/miniModal';
import MwEditDelet from "../../components/modals/editDeletEvent/MwEditDeleteEvent";
// Малюнки
import InformIcon from '../../components/image/information_icon.png';



//----------------------------- UNDER THE HOOD ---------------------------------------  
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
  const [eventsData, setEventsData] = useState([]); // Список подій
  const [showModal, setShowModal] = useState(false); // Відображення модального вікна

// Отримання усіх подій
  const fetchAllEvents = async () => {
    try {
      const data = await getEvents(); // Отримуємо відформатовані дані з БД
      setEventsData(data); // Оновлюємо стан
    } catch (error) {
      console.error("Помилка отримання даних:", error);
    }
  };

// Початкове завантаження подій
    useEffect(() => {
      fetchAllEvents();
    }, []);
  
// Форма для додавання події
    const [newEvent, setNewEvent] = useState({
      title: "",
      client:"",
      start: new Date(),
      end: new Date(),
    });

    // Відкриття МВ додавання подіїта підготовка даних
    const handleSelect = ({ start, end }) => {
      setNewEvent({ title: "", start, end });
      setShowModal(true);
    };

    // Міні МВ
    const [isOpenMiniModal, setIsOpenMiniModal] = useState(false) // Стан для відкриття міні МВ
    const [miniModalMessage, setMiniModalMessage] = useState(""); // Стан для повідомлення в міні МВ
    const openMiniModal = (message) => {
      setIsOpenMiniModal(true)
      setMiniModalMessage(message);} // Функція МВ відправки поавідомлення
    const closeMiniModal = () => setIsOpenMiniModal(false) // Функція закриття міні МВ

    // Додавання події до календаря
    const handleAddEvent = () => {
      setEventsData([...eventsData, newEvent]);
      setShowModal(false);
    };
  
  // Стан для модального вікна перегляду події
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showMwEditDelet, setShowMwEditDelet] = useState(false)

    // Обробник натискання на подію
    const handleEventSelect = (event) => {
      setSelectedEvent(event); // Зберігаємо дані події у стан
      setShowMwEditDelet(true)
    };

    // Закриття модального вікна перегляду події
    const closeEventModal = () => {
      setSelectedEvent(null);
      setShowMwEditDelet(false)
    };



// ------------------------------ RENDER ---------------------------------------------
  return (
    <div>
      <div className="d-flex align-items-center">
        <h3 className="p-2">Календар</h3>
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
          style={{ height: "80vh" }}
          onSelectEvent={handleEventSelect}
          onSelectSlot={handleSelect}
          messages={messages}
        />
      </div>

      {/* МВ додвання події */}
      {showModal && (
        <MwAddEvent
          newEvent={newEvent}
          setNewEvent={setNewEvent} // Передача даних про нову подію
          setShowModal={setShowModal} // Функція для закриття МВ
          handleAddEvent={handleAddEvent} // Функція для додавання події
          fetchAllEvents={fetchAllEvents} // Функція для оновлення подій
          openMiniModal={openMiniModal} // Відкриття міні МВ
        />)}

      {/* Міні МВ */}
      {isOpenMiniModal && <MiniModal
        message={miniModalMessage} // Передавання мовідомлення
        closeMiniModal={closeMiniModal}
      />}

      {/* МВ видалення та редагування */}
      {selectedEvent && <MwEditDelet
        closeEventModal={closeEventModal}
        selectedEvent={selectedEvent}
        openMiniModal={openMiniModal}
        fetchAllEvents={fetchAllEvents}
      />}

      
      
    </div>
  );
}
