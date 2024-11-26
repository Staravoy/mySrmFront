import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header/header';
import ClientTable from './pages/clients/clients';
import MyCalendar from './pages/calendar/calendar';


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
