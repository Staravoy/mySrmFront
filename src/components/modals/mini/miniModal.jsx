import React, { useEffect, useState } from "react";
import "./miniModal.css";

const ToastModal = ({message,  closeMiniModal }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Показуємо вікно
        setIsVisible(true);

        // Ховаємо вікно через 2 секунди
        const timeout = setTimeout(() => {
            setIsVisible(false);

            // Закриваємо вікно у батьківському компоненті
            closeMiniModal();
        }, 2000);

        // Очищення таймера
        return () => clearTimeout(timeout);
    }, [closeMiniModal]);

    return (
        <div className={`toast-modal ${isVisible ? "show" : ""}`}>
            <p>{ message }</p>
        </div>
    );
};

export default ToastModal;
