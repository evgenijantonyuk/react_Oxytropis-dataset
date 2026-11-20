import { useState } from 'react'
import './Key.css'
import ButtonUp from "../ButtonUp/ButtonUp.jsx"
import { OXYTROPIS_KEY_DATA } from '../data/keyData.js'

function Key() {
    const [activeBlockId, setActiveBlockId] = useState(null);

    const handleStepClick = (targetId) => {
        const idNum = Number(targetId);
        const element = document.getElementById(`key-step-${idNum}`);

        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setActiveBlockId(idNum);

            setTimeout(() => {
                setActiveBlockId((prev) => (prev === idNum ? null : prev));
            }, 1800);
        }
    };

    return (
        <>
            <ButtonUp />
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
                                            onClick={() => handleStepClick(step.nextStep)}
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
