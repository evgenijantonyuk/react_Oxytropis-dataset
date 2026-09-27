import { useState } from 'react';

const links = [
    { href: './index.html', label: 'Главная' },
    { href: './list.html', label: 'Конспект видов' },
    { href: './key.html', label: 'Ключ для определения видов' },
    { href: './afterword.html', label: 'Послесловие' },
];

export default function Navigation() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <ul className="items">
                {links.map((l) => (
                    <li className="item" key={l.href}>
                        <a href={l.href} className="item__link">{l.label}</a>
                    </li>
                ))}
            </ul>

            <div className="mobile-container">
                <button
                    className="header__burger-btn"
                    id="burger"
                    onClick={() => setOpen((v) => !v)}
                    aria-label="Меню"
                >
                    <span /><span /><span />
                </button>
                <nav className={`nav-mobile ${open ? 'open' : ''}`}>
                    <ul className="mobile-items">
                        {links.map((l) => (
                            <li className="mobile-item" key={l.href}>
                                <a href={l.href} className="mobile-item__link">{l.label}</a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    );
}