import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header/header';
import ClientTable from './pages/clients/clients';
import MyCalendar from './pages/calendar/ReactBigCalendar';

import 'primereact/resources/themes/lara-light-indigo/theme.css'; // Тема (можна вибрати іншу)
import 'primereact/resources/primereact.min.css'; // Базові стилі PrimeReact
import 'primeicons/primeicons.css'; // Іконки PrimeReact
import 'primeflex/primeflex.css'; // PrimeFlex для класів CSS



function App() {
    return (
        <Router>
            <Header />
        <Routes>
          <Route path="/clients" element={<ClientTable />} />
          <Route path="/calendar" element={<MyCalendar/>} />
          <Route path="/statistics" element={<h1>Сторінка Статистика</h1>} />
          <Route path="/" element={<h1>Вітаю ну що сьогодні попрацюємо</h1>} />
        </Routes>
        </Router>
    );
}

export default App;
