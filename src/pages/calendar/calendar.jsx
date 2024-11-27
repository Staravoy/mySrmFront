import React, { useEffect, useState } from 'react';
// Малюнки
import InformIcon from '../../components/image/information_icon.png';
// Компоненти
import ReactBigCalendar from './ReactBigCalendar'
        
        

const MyCalendar = () => {
    return (
        <div>
            {/* <div className="d-flex align-items-center">
                <h2 className="p-2">Календар</h2>
                <img className="InformIcon" src={InformIcon} alt="InformIcon" />
                <p className="p-2 text-secondary mb-0">
                    Плануйте та відслідковуйте події у календарі.
                </p>
                <button
                    type="button"
                    className="btn btn-outline-secondary ms-auto me-3"
                    // onClick={openModal} // Відкрити МВ "Додати клієнта"
                >
                    Додати подію
                </button>
            </div> */}

            < ReactBigCalendar />

        </div>
    )
}

export default MyCalendar