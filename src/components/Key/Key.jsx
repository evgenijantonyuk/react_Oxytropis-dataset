import { useState, useRef } from 'react';
import './Key.css';
import ButtonUp from "../ButtonUp/ButtonUp.jsx";
import { OXYTROPIS_KEY_DATA } from '../data/keyData.js';

function Key() {
    const [activeBlockId, setActiveBlockId] = useState(null);
    const [history, setHistory] = useState([]);
    const highlightTimeoutRef = useRef(null);

    const scrollToBlock = (targetId) => {
        const element = document.getElementById(`key-step-${targetId}`);

        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setActiveBlockId(targetId);

            if (highlightTimeoutRef.current) {
                clearTimeout(highlightTimeoutRef.current);
            }

            highlightTimeoutRef.current = setTimeout(() => {
                setActiveBlockId((prev) => (prev === targetId ? null : prev));
            }, 1800);
        }
    };

    const handleStepClick = (currentBlockId, targetId) => {
        const idNum = Number(targetId);
        setHistory((prev) => [...prev, currentBlockId]);
        scrollToBlock(idNum);
    };

    const handleBackClick = () => {
        if (history.length === 0) return;
        const previousId = history[history.length - 1];
        setHistory((prev) => prev.slice(0, -1));
        scrollToBlock(previousId);
    };

    const handleResetHistory = () => {
        setHistory([]);
        scrollToBlock(1);
    };

    return (
        <>
            <ButtonUp />
            {history.length > 0 && (
                <div className="key-nav-panel">
                    <button
                        type="button"
                        className="key-nav-panel__back-btn"
                        onClick={handleBackClick}
                        title={`Вернуться к ступени ${history[history.length - 1]}`}
                    >
                        ← Назад (к ст. {history[history.length - 1]})
                    </button>
                    {history.length > 1 && (
                        <button
                            type="button"
                            className="key-nav-panel__reset-btn"
                            onClick={handleResetHistory}
                            title="Сбросить историю и вернуться к началу ключа"
                        >
                            В начало
                        </button>
                    )}
                </div>
            )}

            <section className="container main-content">
                <h3 className="key__header">
                    Ключ для определения видов рода <i>Oxytropis</i> DC. на территории АГС.
                </h3>

                <div className="species-key">
                    {OXYTROPIS_KEY_DATA.map((block) => (
                        <div
                            id={`key-step-${block.id}`}
                            className={`key__block ${activeBlockId === block.id ? 'key__block_highlighted' : ''}`}
                            key={block.id}
                        >
                            {block.steps.map((step, index) => (
                                <p className="key__string" key={index}>
                                    <span className="key__text">{step.text}</span>

                                    {step.nextStep ? (
                                        <button
                                            type="button"
                                            className="key__number-btn"
                                            onClick={() => handleStepClick(block.id, step.nextStep)}
                                            title={`Перейти к ступени ${step.nextStep}`}
                                        >
                                            {step.nextStep}
                                        </button>
                                    ) : (
                                        <span className="key__species-block">
                                            {step.speciesNumber && (
                                                <span className="key__species-number">
                                                    {step.speciesNumber}{' '}
                                                </span>
                                            )}
                                            <span className="key__species">
                                                {step.url ? (
                                                    <a
                                                        className="species__name-lat"
                                                        href={step.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {step.speciesName}
                                                    </a>
                                                ) : (
                                                    <span className="species__name-lat">
                                                        {step.speciesName}
                                                    </span>
                                                )}
                                            </span>
                                        </span>
                                    )}
                                </p>
                            ))}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

export default Key;