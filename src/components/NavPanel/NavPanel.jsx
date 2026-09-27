import { useState } from 'react';
import './NavPanel.css';
import { Link } from "react-router-dom";

const Navbar = () => {
    // Состояние для открытия/закрытия мобильного меню
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    {/* Иконка бургера для мобильных */}
                    <div className={`navbar-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>

                    {/* Ссылки навигации */}
                    <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
                        <li>
                            <Link to="/" onClick={() => setIsOpen(false)}>
                                Главная
                            </Link>
                        </li>
                        <li>
                            <Link to="/key" onClick={() => setIsOpen(false)}>
                                Ключ для определения видов
                            </Link>
                        </li>
                        <li>
                            <Link to="/species-list" onClick={() => setIsOpen(false)}>
                                Конспект видов
                            </Link>
                        </li>
                        <li>
                            <Link to="/afterword" onClick={() => setIsOpen(false)}>
                                Послесловие
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
