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

    /* --- свайп / перетаскивание мышью --- */
    const startX = useRef(null);

    const handlePointerDown = (e) => {
        startX.current = e.clientX;
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

    /* --- клавиатура --- */
    const handleKeyDown = (e) => {
        if (e.key === "ArrowRight") {
            e.preventDefault();
            next();
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            prev();
        }
    };

    const pages = maxIndex + 1;

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
                                    <div className={`slide slide-${slide.id}`}>
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
        </section>
    );
}