import React, { useState } from 'react';
import { LIFE_FORMS_DATA } from '../data/oxytropisLiveForm.js';
import './OxytropisLifeForms.css';

export default function OxytropisLifeForms() {
    // По умолчанию активируем первую вкладку из массива данных
    const [activeTab, setActiveTab] = useState(LIFE_FORMS_DATA[0]?.id);

    const activeData = LIFE_FORMS_DATA.find((item) => item.id === activeTab);

    return (
        <div className="oxytropis-container">
            {/* Шапка */}
            <div className="oxytropis-header">
                <h2 className="oxytropis-title">
                    Жизненные формы рода <span className="oxytropis-title-latin">Oxytropis</span>
                </h2>
                <p className="oxytropis-subtitle">
                    Эволюционные морфологические адаптации остролодочников к выживанию в экстремальных условиях высокогорий, степей и тундр.
                </p>
            </div>

            {/* Навигационные вкладки */}
            <div className="oxytropis-tabs">
                {LIFE_FORMS_DATA.map((form) => (
                    <button
                        key={form.id}
                        onClick={() => setActiveTab(form.id)}
                        className={`oxytropis-tab-btn ${activeTab === form.id ? 'active' : ''}`}
                    >
                        {form.title}
                    </button>
                ))}
            </div>

            {/* Контентная карточка */}
            {activeData && (
                <div className="oxytropis-card">

                    {/* Изображение с бэджем */}
                    <div className="oxytropis-image-wrapper">
                        <img
                            src={activeData.imageUrl}
                            alt={activeData.title}
                            className="oxytropis-img"
                        />
                        <div className="oxytropis-badge">
                            {activeData.scientificName}
                        </div>
                    </div>

                    {/* Текстовая информация */}
                    <div className="oxytropis-info">
                        <div>
                            <h3 className="oxytropis-card-title">{activeData.title}</h3>
                            <p className="oxytropis-examples">
                                Примеры: <span className="oxytropis-examples-list">{activeData.exampleSpecies}</span>
                            </p>
                            <p className="oxytropis-description">
                                {activeData.description}
                            </p>
                        </div>

                        {/* Список адаптаций */}
                        <div className="oxytropis-adaptations">
                            <h4 className="oxytropis-adaptations-title">Ключевые адаптации:</h4>
                            <ul className="oxytropis-list">
                                {activeData.adaptations?.map((adaptation, index) => (
                                    <li key={index} className="oxytropis-list-item">
                                        <span className="oxytropis-bullet" />
                                        {adaptation}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Источники */}
                        {activeData.resource && (
                            <div className="oxytropis-sources">
                                <p className="oxytropis-adaptations-title__resource">Источник:&#32;
                                    <span>
                                    {activeData.resource}
                                </span>
                                </p>

                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
