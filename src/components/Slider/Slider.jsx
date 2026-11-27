import { useCallback, useEffect, useRef, useState } from "react";
import "./Slider.css";

/* Данные слайдов */
const SLIDES = [
    { id: 1,  src: `${import.meta.env.BASE_URL}images/countryPhoto/Czike-taman-pass.webp`,                    caption: "Перевал Чике-Таман" },
    { id: 2,  src: `${import.meta.env.BASE_URL}images/countryPhoto/Czuiskaja_step_Ортолык.webp`,              caption: "Чуйская степь. Ортолык." },
    { id: 3,  src: `${import.meta.env.BASE_URL}images/countryPhoto/Hovd_aymak_Bulgan.webp`,                   caption: "Монгольский Алтай. Аймак Ховд. Недалеко от Булгана." },
    { id: 4,  src: `${import.meta.env.BASE_URL}images/countryPhoto/Charysh-district_near-Sentelek-village.webp`, caption: "Чарышский район, недалеко от пос. Сентелек" },
    { id: 5,  src: `${import.meta.env.BASE_URL}images/countryPhoto/Near_Aja.webp`,                            caption: "Окрестности оз. Ая." },
    { id: 6,  src: `${import.meta.env.BASE_URL}images/countryPhoto/near-Ak-tash-mine.webp`,                   caption: "Окрестности Ак-ташского рудника." },
    { id: 7,  src: `${import.meta.env.BASE_URL}images/countryPhoto/Razrabotnaj-mount_Tigerekskij-range.webp`, caption: "г. Разработная, Тигирекский хр." },
    { id: 8,  src: `${import.meta.env.BASE_URL}images/countryPhoto/Chuja-value_Severo-chujskiy_range.webp`,   caption: "дол. р. Чуя и Северо-Чуйский хребет." },
    { id: 9,  src: `${import.meta.env.BASE_URL}images/countryPhoto/North-Chuj_range_near_Kurai.webp`,         caption: "Северо-Чуйский хр. близ пос. Курай." },
    { id: 10, src: `${import.meta.env.BASE_URL}images/countryPhoto/Belij-Bom-Chuja-value.webp`,               caption: "Белый Бом, дол. р. Чуя." },
];

/* Хук: сколько слайдов показывать в зависимости от ширины экрана */
function getPerView() {
    if (typeof window === "undefined") return 1;
    const w = window.innerWidth;
    if (w >= 1200) return 2;
    if (w >= 768) return 2;
    return 1;
}

function useSlidesPerView() {
    const [perView, setPerView] = useState(getPerView);

    useEffect(() => {
        let frame = null;
        const onResize = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => setPerView(getPerView()));
        };
        window.addEventListener("resize", onResize);
        window.addEventListener("orientationchange", onResize);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("resize", onResize);
            window.removeEventListener("orientationchange", onResize);
        };
    }, []);

    return perView;
}

/* Компонент */
export default function AltaiGallery() {
    const perView = useSlidesPerView();
    const maxIndex = Math.max(0, SLIDES.length - perView);

    const [index, setIndex] = useState(0);
    const [lightboxIndex, setLightboxIndex] = useState(null);

    /* --- состояние зума и панорамирования в модальном окне --- */
    const [isZoomed, setIsZoomed] = useState(false);
    const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
    const [isPanning, setIsPanning] = useState(false);

    const modalPointerStart = useRef(null);
    const panOrigin = useRef({ x: 0, y: 0 });
    const modalMoved = useRef(false);

    // при смене количества видимых слайдов не вылетаем за границы
    useEffect(() => {
        setIndex((i) => Math.min(i, maxIndex));
    }, [maxIndex]);

    const goTo = useCallback(
        (i) => setIndex(Math.min(Math.max(i, 0), maxIndex)),
        [maxIndex]
    );
    const next = useCallback(() => goTo(index + 1), [goTo, index]);
    const prev = useCallback(() => goTo(index - 1), [goTo, index]);

    /* --- свайп / перетаскивание мышью в основном слайдере --- */
    const startX = useRef(null);
    const isDragged = useRef(false);

    const handlePointerDown = (e) => {
        startX.current = e.clientX;
        isDragged.current = false;
    };

    const handlePointerMove = (e) => {
        if (startX.current === null) return;
        if (Math.abs(e.clientX - startX.current) > 8) {
            isDragged.current = true;
        }
    };

    const handlePointerUp = (e) => {
        if (startX.current === null) return;
        const delta = e.clientX - startX.current;
        if (Math.abs(delta) > 50) {
            delta < 0 ? next() : prev();
        }
        startX.current = null;
    };

    const handlePointerCancel = () => {
        startX.current = null;
    };

    /* --- клавиатура основного слайдера --- */
    const handleKeyDown = (e) => {
        if (e.key === "ArrowRight") {
            e.preventDefault();
            next();
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            prev();
        }
    };

    /* --- управление модальным окном (лайтбоксом) --- */
    const resetZoom = useCallback(() => {
        setIsZoomed(false);
        setPanOffset({ x: 0, y: 0 });
        setIsPanning(false);
    }, []);

    const openLightbox = (slideIndex) => {
        if (isDragged.current) return;
        resetZoom();
        setLightboxIndex(slideIndex);
    };

    const closeLightbox = useCallback(() => {
        resetZoom();
        setLightboxIndex(null);
    }, [resetZoom]);

    const nextLightbox = useCallback(() => {
        resetZoom();
        setLightboxIndex((prevIdx) =>
            prevIdx === null ? null : (prevIdx + 1) % SLIDES.length
        );
    }, [resetZoom]);

    const prevLightbox = useCallback(() => {
        resetZoom();
        setLightboxIndex((prevIdx) =>
            prevIdx === null ? null : (prevIdx - 1 + SLIDES.length) % SLIDES.length
        );
    }, [resetZoom]);

    /* --- жесты внутри модального окна: свайп, зум по клику, перемещение при зуме --- */
    const handleModalPointerDown = (e) => {
        if (e.button !== undefined && e.button !== 0) return;
        modalPointerStart.current = { x: e.clientX, y: e.clientY };
        panOrigin.current = { ...panOffset };
        modalMoved.current = false;
        if (isZoomed) {
            setIsPanning(true);
        }
    };

    const handleModalPointerMove = (e) => {
        if (!modalPointerStart.current) return;
        const dx = e.clientX - modalPointerStart.current.x;
        const dy = e.clientY - modalPointerStart.current.y;

        if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
            modalMoved.current = true;
        }

        if (isZoomed && modalMoved.current) {
            setPanOffset({
                x: panOrigin.current.x + dx,
                y: panOrigin.current.y + dy,
            });
        }
    };

    const handleModalPointerUp = (e) => {
        if (!modalPointerStart.current) return;
        const dx = e.clientX - modalPointerStart.current.x;
        const dy = e.clientY - modalPointerStart.current.y;

        setIsPanning(false);

        if (!modalMoved.current) {
            // Обычный клик / тап по фото — переключаем зум
            if (isZoomed) {
                resetZoom();
            } else {
                setIsZoomed(true);
                setPanOffset({ x: 0, y: 0 });
            }
        } else if (!isZoomed) {
            // Свайп пальцем или мышью при обычном масштабе — перелистывание фото
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
                dx < 0 ? nextLightbox() : prevLightbox();
            }
        }

        modalPointerStart.current = null;
    };

    const handleModalPointerCancel = () => {
        modalPointerStart.current = null;
        setIsPanning(false);
    };

    // Клавиатура и блокировка прокрутки страницы при открытом фото
    useEffect(() => {
        if (lightboxIndex === null) return;

        const onModalKeyDown = (e) => {
            if (e.key === "Escape") {
                if (isZoomed) {
                    resetZoom();
                } else {
                    closeLightbox();
                }
            } else if (e.key === "ArrowRight") {
                e.preventDefault();
                nextLightbox();
            } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                prevLightbox();
            }
        };

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", onModalKeyDown);

        return () => {
            document.body.style.overflow = prevOverflow;
            document.removeEventListener("keydown", onModalKeyDown);
        };
    }, [lightboxIndex, isZoomed, resetZoom, closeLightbox, nextLightbox, prevLightbox]);

    const pages = maxIndex + 1;
    const activeSlide = lightboxIndex !== null ? SLIDES[lightboxIndex] : null;

    return (
        <section className="container">
            <h3 className="slideshow-title search">
                Алтайская горная страна в фотографиях.
            </h3>

            <div className="slider">
                <div
                    className="slider__viewport"
                    role="region"
                    aria-roledescription="карусель"
                    aria-label="Фотографии Алтайской горной страны"
                    tabIndex={0}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerCancel}
                    onPointerLeave={handlePointerCancel}
                    onKeyDown={handleKeyDown}
                >
                    <div
                        className="slider__track"
                        style={{
                            "--per-view": perView,
                            transform: `translateX(-${(index * 100) / perView}%)`,
                        }}
                    >
                        {SLIDES.map((slide, i) => {
                            const isVisible = i >= index && i < index + perView;
                            return (
                                <div
                                    className="country-item"
                                    key={slide.id}
                                    aria-hidden={!isVisible}
                                >
                                    <div
                                        className={`slide slide-${slide.id} slide--clickable`}
                                        onClick={() => openLightbox(i)}
                                        role="button"
                                        tabIndex={isVisible ? 0 : -1}
                                        aria-label={`Увеличить фото: ${slide.caption}`}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === " ") {
                                                e.preventDefault();
                                                openLightbox(i);
                                            }
                                        }}
                                    >
                                        <img
                                            src={slide.src}
                                            alt={`Пейзажи Алтая: ${slide.caption}`}
                                            loading="lazy"
                                            decoding="async"
                                            draggable="false"
                                        />
                                    </div>
                                    <p className="slide__text">{slide.caption}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <button
                    type="button"
                    className="slider__btn slider__btn--prev"
                    onClick={prev}
                    disabled={index === 0}
                    aria-label="Предыдущий слайд"
                >
                    &#8249;
                </button>

                <button
                    type="button"
                    className="slider__btn slider__btn--next"
                    onClick={next}
                    disabled={index === maxIndex}
                    aria-label="Следующий слайд"
                >
                    &#8250;
                </button>

                <div className="slider__dots" role="tablist" aria-label="Навигация по слайдам">
                    {Array.from({ length: pages }, (_, i) => (
                        <button
                            key={i}
                            type="button"
                            role="tab"
                            aria-selected={i === index}
                            aria-label={`Слайд ${i + 1} из ${pages}`}
                            className={`slider__dot${i === index ? " is-active" : ""}`}
                            onClick={() => goTo(i)}
                        />
                    ))}
                </div>
            </div>

            {activeSlide && (
                <div
                    className="slider-modal"
                    onClick={closeLightbox}
                    role="dialog"
                    aria-modal="true"
                    aria-label={activeSlide.caption}
                >
                    <div
                        className="slider-modal__dialog"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="slider-modal__close"
                            onClick={closeLightbox}
                            aria-label="Закрыть изображение"
                        >
                            &times;
                        </button>

                        {!isZoomed && (
                            <button
                                type="button"
                                className="slider-modal__nav slider-modal__nav--prev"
                                onClick={prevLightbox}
                                aria-label="Предыдущее фото"
                            >
                                &#8249;
                            </button>
                        )}

                        <figure className="slider-modal__figure">
                            <div
                                className={`slider-modal__stage${isZoomed ? " is-zoomed" : ""}${isPanning ? " is-panning" : ""}`}
                                onPointerDown={handleModalPointerDown}
                                onPointerMove={handleModalPointerMove}
                                onPointerUp={handleModalPointerUp}
                                onPointerCancel={handleModalPointerCancel}
                                title={
                                    isZoomed
                                        ? "Перетащите для осмотра или нажмите, чтобы вернуть масштаб"
                                        : "Нажмите для приближения или смахните влево/вправо"
                                }
                            >
                                <img
                                    src={activeSlide.src}
                                    alt={`Пейзажи Алтая: ${activeSlide.caption}`}
                                    className="slider-modal__img"
                                    draggable="false"
                                    style={{
                                        transform: isZoomed
                                            ? `translate3d(${panOffset.x}px, ${panOffset.y}px, 0) scale(2)`
                                            : "translate3d(0, 0, 0) scale(1)",
                                    }}
                                />
                            </div>
                            <figcaption className="slider-modal__caption">
                                <span>{activeSlide.caption}</span>
                                <span className="slider-modal__counter">
                                    {lightboxIndex + 1} / {SLIDES.length}
                                </span>
                            </figcaption>
                        </figure>

                        {!isZoomed && (
                            <button
                                type="button"
                                className="slider-modal__nav slider-modal__nav--next"
                                onClick={nextLightbox}
                                aria-label="Следующее фото"
                            >
                                &#8250;
                            </button>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}
