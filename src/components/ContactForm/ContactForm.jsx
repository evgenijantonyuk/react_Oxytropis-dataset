import { useState, useEffect, useRef, memo } from 'react'
import './ContactForm.css';

// Ключ доступа Web3Forms
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY


const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_REGEX = /^(\+7|7|8)\d{10}$/;

const INITIAL_STATE = { name: '', email: '', phone: '', message: '' };

const ContactForm = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const formRef = useRef(null);

    // Закрытие по клику вне формы и по клавише Escape (только когда окно открыто)
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                if (!event.target.closest('.contacts-button')) {
                    onClose();
                }
            }
        };

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const cleanPhone = formData.phone.replace(/[\s\-()]/g, '');

        if (!EMAIL_REGEX.test(formData.email.trim()) || !PHONE_REGEX.test(cleanPhone)) {
            alert('Проверьте корректность заполнения полей Email и Телефона');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    access_key: WEB3FORMS_ACCESS_KEY,
                    subject: `Новое сообщение с сайта Oxytropis от ${formData.name.trim()}`,
                    from_name: 'Сайт Остролодочники АГС',
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    phone: formData.phone.trim(),
                    message: formData.message.trim(),
                }),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                alert('Сообщение успешно отправлено!');
                setFormData(INITIAL_STATE);
                onClose();
            } else {
                alert(result.message || 'Ошибка при отправке сообщения.');
            }
        } catch (error) {
            console.error(error);
            alert('Ошибка сети. Проверьте подключение к интернету.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="contacts">
            <div className="content" ref={formRef}>
                <button
                    type="button"
                    className="form__close-btn"
                    onClick={onClose}
                    aria-label="Закрыть форму"
                >
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
                            <input
                                type="text"
                                placeholder="Ваше имя"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="name">Введите свое имя</label>
                        </div>
                        <div className="input-box">
                            <input
                                type="email"
                                placeholder="Введите email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="email">В формате: your-name@email.com</label>
                        </div>
                        <div className="input-box">
                            <input
                                type="tel"
                                placeholder="Введите телефон"
                                name="phone"
                                id="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="phone">В формате: 88000000000 или 78000000000</label>
                        </div>
                        <div className="input-box message-box">
                            <textarea
                                placeholder="Сообщение"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <div className="button">
                            <input
                                type="submit"
                                id="button"
                                value={isSubmitting ? 'Отправка...' : 'Отправить'}
                                disabled={isSubmitting}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default memo(ContactForm);
