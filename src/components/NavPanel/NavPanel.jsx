import { useState } from 'react';
import './NavPanel.css';
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <div className={`navbar-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>

                    <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
                        {/* ФИКС: onClick перенесен на li, чтобы закрывать меню при клике в любую точку области */}
                        <li onClick={closeMenu}>
                            <Link to="/">Главная</Link>
                        </li>
                        <li onClick={closeMenu}>
                            <Link to="/morphology">Морфология растений</Link>
                        </li>
                        <li onClick={closeMenu}>
                            <Link to="/key">Ключ для определения видов</Link>
                        </li>
                        <li onClick={closeMenu}>
                            <Link to="/species-list">Конспект видов</Link>
                        </li>
                        <li onClick={closeMenu}>
                            <Link to="/afterword">Послесловие</Link>
                        </li>
                        <li onClick={closeMenu}>
                            <Link to="/literature">Литература</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
