import { useState, useEffect, useRef } from 'react';
import './ContactForm.css'

const ContactForm = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const formRef = useRef(null);

    const emailRegex = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
    const phoneRegex = /^((\+7|7|8)+([0-9]){10})$/;

    // Закрытие по клику вне формы
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Если кликнули мимо контента формы — вызываем onClose
            if (isOpen && formRef.current && !formRef.current.contains(event.target)) {
                // Проверяем, чтобы клик не был по кнопке «Написать»
                if (!event.target.classList.contains('contacts-button')) {
                    onClose();
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onClose]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!emailRegex.test(formData.email) || !phoneRegex.test(formData.phone)) {
            alert('Проверьте корректность заполнения полей Email и Телефона');
            return;
        }

        try {
            const response = await fetch('php/send_mail.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Сообщение успешно отправлено!');
                setFormData({ name: '', email: '', phone: '', message: '' });
                onClose(); // Закрываем форму после успешной отправки
            } else {
                alert('Ошибка при отправке.');
            }
        } catch (error) {
            console.error(error);
        }
    };
    // Если isOpen === false, компонент ничего не рендерит
    if (!isOpen) return null;

    return (
        <div className="contacts">
            <div className="content" ref={formRef}>
                <button className="form__close-btn" onClick={onClose}>
                    <svg xmlns="http://w3.org" viewBox="0 0 50 50" width="50px" height="50px">
                        <path d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 z M 32.990234 15.986328 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.990234 15.986328 z"/>
                    </svg>
                </button>
                <div className="left-side">
                    <div className="address details">
                        <i className="fas fa-map-marker-alt"></i>
                        <div className="details-info">
                            <div className="topic">Адрес</div>
                            <div className="text-one">г. Барнаул</div>
                            <div className="text-two">АлтГУ, ул. Молодежная 13</div>
                        </div>
                    </div>

                    <div className="phone details">
                        <i className="fas fa-phone-alt"></i>
                        <div className="details-info">
                            <div className="topic">Телефон</div>
                            <div className="text-one">8-960-944-16-78</div>
                        </div>
                    </div>

                    <div className="email details">
                        <i className="fas fa-envelope"></i>
                        <div className="details-info">
                            <div className="topic">Email</div>
                            <div className="text-one">evgenijantonyuk@gmail.com</div>
                        </div>
                    </div>
                </div>

                <div className="right-side">
                    <div className="topic-text">Отправьте нам сообщение</div>
                    <p>Если у вас есть какие-то вопросы или предложения по сотрудничеству - заполните форму ниже</p>
                    <form onSubmit={handleSubmit} name="form">
                        <div className="input-box">
                            <input type="text" placeholder="Ваше имя" name="name" id="name" value={formData.name} onChange={handleChange} required />
                            <label htmlFor="name">Введите свое имя</label>
                        </div>
                        <div className="input-box">
                            <input type="text" placeholder="Введите email" name="email" id="email" value={formData.email} onChange={handleChange} required />
                            <label htmlFor="email">В формате: your-name@email.com</label>
                        </div>
                        <div className="input-box">
                            <input type="text" placeholder="Введите телефон" name="phone" id="phone" value={formData.phone} onChange={handleChange} required />
                            <label htmlFor="phone">В формате: 88000000000 или 78000000000</label>
                        </div>
                        <div className="input-box message-box">
                            <textarea placeholder="Сообщение" name="message" value={formData.message} onChange={handleChange} required></textarea>
                        </div>
                        <div className="button">
                            <input type="submit" id="button" value="Отправить"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
