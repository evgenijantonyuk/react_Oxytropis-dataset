import React from "react";
import morphology from "../dateMorphology/morphology.js";
import MorphologyReferences from "../MorphologyReferences./MorphologyReferences.jsx";

import './Morphology.css';
import ButtonUp from "../ButtonUp/ButtonUp.jsx";
import styles from "../Afterword/Aterword.module.css";

function Morphology({ item }) {
    switch (item.type) {
        case 'morphology':
            return (
                <div className="morphology" id={item.id}>
                    <h2 className="morphology-title">
                        {item.number && <span className="morphology-number">{item.number}. </span>}
                        {item.title}
                    </h2>

                    {item.description && (
                        <p className="morphology-descr">{item.description}</p>
                    )}

                    <div className="morphology-subsections">
                        {item.subtitle1 && (
                            <div className="morphology-sub">
                                <h3 className="morphology-subtitle">{item.subtitle1}</h3>
                                {item.description1 && <p className="morphology-subdescr">{item.description1}</p>}
                            </div>
                        )}

                        {item.subtitle2 && (
                            <div className="morphology-sub">
                                <h3 className="morphology-subtitle">{item.subtitle2}</h3>
                                {item.description2 && <p className="morphology-subdescr">{item.description2}</p>}
                            </div>
                        )}

                        {item.subtitle3 && (
                            <div className="morphology-sub">
                                <h3 className="morphology-subtitle">{item.subtitle3}</h3>
                                {item.description3 && <p className="morphology-subdescr">{item.description3}</p>}
                            </div>
                        )}
                    </div>

                    {item.image && (
                        <figure className="morphology-figure">
                            <img
                                /* Добавляем базовый путь динамически */
                                src={`${import.meta.env.BASE_URL}${item.image.replace(/^\//, '')}`}
                                alt={item.imageAlt}
                                className="morphology-img"
                                loading="lazy"
                            />
                            <figcaption className="morphology-caption">{item.imageAlt}</figcaption>
                        </figure>
                    )}

                    {item.image1 && (
                        <figure className="morphology-figure">
                            <img
                                /* Добавляем базовый путь динамически */
                                src={`${import.meta.env.BASE_URL}${item.image1.replace(/^\//, '')}`}
                                alt={item.imageAlt1}
                                className="morphology-img"
                                loading="lazy"
                            />
                            <figcaption className="morphology-caption">{item.imageAlt1}</figcaption>
                        </figure>
                    )}


                </div>

            );
        default:
            return null;
    }
}

export default function MorphologyList({ items = morphology }) {
    return (
        <>
            <div className="morphology-list">
                {items.map((item) => (
                    <Morphology key={item.id} item={item} />
                ))}
            </div>
            <MorphologyReferences />
            <ButtonUp />
            {/*<footer className={styles.footer__afterword}>*/}
            {/*    <p>&#169; Антонюк Е. В.</p>*/}
            {/*    <p className={styles.footer__text}>*/}
            {/*        Если есть замечания или вопросы, а так же предложения о сотрудничестве обрайтесь по элекронной*/}
            {/*        почте:*/}
            {/*        <a className={styles.contactsButton} target="_blank"*/}
            {/*           href="mailto:evgenijantonyuk@gmail.com?subject=Вопрос&body=Привет">evgenijantonyuk@gmail.com</a>*/}
            {/*    </p>*/}
            {/*</footer>*/}
        </>
    );
}
