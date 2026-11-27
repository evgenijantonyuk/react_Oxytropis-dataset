import { useState, useEffect, useRef, memo } from 'react'
import './ContactForm.css'

// Ключ доступа Web3Forms
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_REGEX = /^(\+7|7|8)\d{10}$/;

const INITIAL_STATE = { name: '', email: '', phone: '', message: '' };
const INITIAL_ERRORS = { name: false, email: false, phone: false, message: false };

function formatPhoneNumber(value) {
    const digits = value.replace(/\D/g, '');
    if (!digits) return '';

    let cleanDigits = digits;
    if (cleanDigits[0] === '8' || cleanDigits[0] === '7') {
        cleanDigits = cleanDigits.slice(1);
    } else if (cleanDigits[0] === '9') {
        // Пользователь начал ввод с 9 (например, 960...)
    }

    cleanDigits = cleanDigits.slice(0, 10);

    let formatted = '+7';
    if (cleanDigits.length > 0) {
        formatted += ' (' + cleanDigits.slice(0, 3);
    }
    if (cleanDigits.length >= 4) {
        formatted += ') ' + cleanDigits.slice(3, 6);
    }
    if (cleanDigits.length >= 7) {
        formatted += '-' + cleanDigits.slice(6, 8);
    }
    if (cleanDigits.length >= 9) {
        formatted += '-' + cleanDigits.slice(8, 10);
    }

    return formatted;
}

const ContactForm = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [errors, setErrors] = useState(INITIAL_ERRORS);
    const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const formRef = useRef(null);
    const closeTimerRef = useRef(null);

    // Сброс состояний и закрытие по клику вне формы / Escape
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
            if (closeTimerRef.current) {
                clearTimeout(closeTimerRef.current);
            }
        };
    }, [isOpen, onClose]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'phone') {
            const formattedPhone = formatPhoneNumber(value);
            setFormData((prev) => ({ ...prev, phone: formattedPhone }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }

        // Убираем подсветку ошибки при вводе текста
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: false }));
        }
        if (statusMessage.text) {
            setStatusMessage({ type: '', text: '' });
        }
    };

    // Снимаем выделение цветом при установке курсора в поле
    const handleFocus = (e) => {
        const { name } = e.target;
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: false }));
        }
        if (statusMessage.type === 'error') {
            setStatusMessage({ type: '', text: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmedName = formData.name.trim();
        const trimmedEmail = formData.email.trim();
        const trimmedMessage = formData.message.trim();
        const cleanPhone = formData.phone.replace(/\D/g, '');

        const newErrors = {
            name: !trimmedName,
            email: !trimmedEmail || !EMAIL_REGEX.test(trimmedEmail),
            phone: cleanPhone.length > 0 && !PHONE_REGEX.test(cleanPhone),
            message: !trimmedMessage,
        };

        setErrors(newErrors);

        if (Object.values(newErrors).some(Boolean)) {
            setStatusMessage({
                type: 'error',
                text: 'Пожалуйста, корректно заполните выделенные поля.',
            });
            return;
        }

        setIsSubmitting(true);
        setStatusMessage({ type: '', text: '' });

        try {
            const payload = {
                access_key: WEB3FORMS_ACCESS_KEY,
                subject: `Новое сообщение с сайта Oxytropis от ${trimmedName}`,
                from_name: 'Сайт Остролодочники АГС',
                name: trimmedName,
                email: trimmedEmail,
                message: trimmedMessage,
            };

            if (cleanPhone.length > 0) {
                payload.phone = formData.phone.trim();
            }

            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setStatusMessage({
                    type: 'success',
                    text: 'Сообщение успешно отправлено! Спасибо за обращение.',
                });
                setFormData(INITIAL_STATE);
                setErrors(INITIAL_ERRORS);

                closeTimerRef.current = setTimeout(() => {
                    setStatusMessage({ type: '', text: '' });
                    onClose();
                }, 2000);
            } else {
                setStatusMessage({
                    type: 'error',
                    text: result.message || 'Ошибка при отправке сообщения. Попробуйте позже.',
                });
            }
        } catch (error) {
            console.error(error);
            setStatusMessage({
                type: 'error',
                text: 'Ошибка сети. Проверьте подключение к интернету.',
            });
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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px">
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
                    <form onSubmit={handleSubmit} name="form" noValidate>
                        <div className="input-box">
                            <input
                                type="text"
                                placeholder="Ваше имя *"
                                name="name"
                                id="name"
                                className={errors.name ? 'input-error' : ''}
                                value={formData.name}
                                onChange={handleChange}
                                onFocus={handleFocus}
                            />
                            <label htmlFor="name">Введите свое имя (обязательно)</label>
                        </div>
                        <div className="input-box">
                            <input
                                type="email"
                                placeholder="Введите email *"
                                name="email"
                                id="email"
                                className={errors.email ? 'input-error' : ''}
                                value={formData.email}
                                onChange={handleChange}
                                onFocus={handleFocus}
                            />
                            <label htmlFor="email">В формате: your-name@email.com (обязательно)</label>
                        </div>
                        <div className="input-box">
                            <input
                                type="tel"
                                placeholder="Введите телефон (необязательно)"
                                name="phone"
                                id="phone"
                                className={errors.phone ? 'input-error' : ''}
                                value={formData.phone}
                                onChange={handleChange}
                                onFocus={handleFocus}
                            />
                            <label htmlFor="phone">В формате: +7 (900) 000-00-00 (необязательно)</label>
                        </div>
                        <div className="input-box message-box">
                            <textarea
                                placeholder="Сообщение *"
                                name="message"
                                className={errors.message ? 'input-error' : ''}
                                value={formData.message}
                                onChange={handleChange}
                                onFocus={handleFocus}
                            ></textarea>
                        </div>

                        {statusMessage.text && (
                            <div
                                className={`form-status-message form-status-message_${statusMessage.type}`}
                                role="alert"
                            >
                                {statusMessage.text}
                            </div>
                        )}

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
