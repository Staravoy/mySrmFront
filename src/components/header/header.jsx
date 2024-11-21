import React, { useState } from 'react';
import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <NavLink
                    to="/"
                    className='navbar-brand'>
                  <h3>ІркиРулять</h3>
                </NavLink>
                
                <NavLink 
                    to="/clients" 
                    className={({ isActive }) => 
                        `navbar-brand ${isActive ? 'text-decoration-underline' : ''}`
                    } 
                >
                    Клієнти
                </NavLink>
                <NavLink 
                    to="/calendar" 
                    className={({ isActive }) => 
                        `navbar-brand ${isActive ? 'text-decoration-underline' : ''}`
                    } 
                >
                    Календар
                </NavLink>
                <NavLink 
                    to="/statistics" 
                    className={({ isActive }) => 
                        `navbar-brand ${isActive ? 'text-decoration-underline' : ''}`
                    } 
                >
                    Статистика
                </NavLink>
            </div>
        </nav>
    );
};

export default Header;