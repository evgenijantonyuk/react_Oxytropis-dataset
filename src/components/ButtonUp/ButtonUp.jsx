import { useState, useEffect } from 'react';
import arrowUp from '../../assets/icons/up-arrow1.png' // Укажите правильный путь к вашей картинке
import './ButtonUp.css';

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    // Показываем кнопку при прокрутке ниже 300 пикселей
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        // Важно: удаляем обработчик при размонтировании компонента
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    // Функция плавной прокрутки наверх
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            {isVisible && (
                <button className="button__up-list" onClick={scrollToTop}>
                    <img src={arrowUp} alt="up-arrow" />
                </button>
            )}
        </>
    );
}

