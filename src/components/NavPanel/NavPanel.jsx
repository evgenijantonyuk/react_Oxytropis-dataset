
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
                        <li>
                            <Link to="/" onClick={closeMenu}>Главная</Link>
                        </li>
                        <li>
                            <Link to="/morphology" onClick={closeMenu}>Морфология растений</Link>
                        </li>
                        <li>
                            <Link to="/key" onClick={closeMenu}>Ключ для определения видов</Link>
                        </li>
                        <li>
                            <Link to="/species-list" onClick={closeMenu}>Конспект видов</Link>
                        </li>
                        <li>
                            <Link to="/afterword" onClick={closeMenu}>Послесловие</Link>
                        </li>
                        <li>
                            <Link to="/literature" onClick={closeMenu}>Литература</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
