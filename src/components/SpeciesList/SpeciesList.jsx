import React, { useMemo, useState, useEffect } from 'react';
import taxonomy from '../data/oxytropis.js';
import ButtonUp from '../ButtonUp/ButtonUp.jsx';
import style from './SpeciesList.module.css';
import OxytropisAnalysis from '../../components/OxytropisAnalis/OxytropisAnalysis.jsx';
import { BarChart2, BookOpen } from 'lucide-react';

// Функция для безопасного экранирования спецсимволов поисковой строки
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');
}

// Вспомогательный компонент для динамического наложения тегов <mark>
function HighlightedText({ text, search, className }) {
    if (!text) return null;
    if (!search || !search.trim()) return <span className={className}>{text}</span>;

    const cleanSearch = search.trim();
    const regex = new RegExp(`(${escapeRegExp(cleanSearch)})`, 'gi');
    const parts = text.split(regex);

    return (
        <span className={className}>
            {parts.map((part, i) =>
                regex.test(part)
                    ? <mark key={i} className={style.highlight}>{part}</mark>
                    : <React.Fragment key={i}>{part}</React.Fragment>
            )}
        </span>
    );
}

function Parts({ parts, search }) {
    if (!parts) return null;
    if (!Array.isArray(parts)) {
        return <HighlightedText text={String(parts)} search={search} />;
    }
    return (
        <>
            {parts.map((part, i) =>
                part.italic
                    ? <i key={i}><HighlightedText text={part.text} search={search} /></i>
                    : <React.Fragment key={i}><HighlightedText text={part.text} search={search} /></React.Fragment>
            )}
        </>
    );
}

function Description({ text, className, search }) {
    if (!text) return null;

    const renderParagraph = (paragraph, i) => {
        if (Array.isArray(paragraph)) {
            return (
                <p key={i} className={className}>
                    {paragraph.map((part, j) =>
                        part.italic
                            ? <i key={j}><HighlightedText text={part.text} search={search} /></i>
                            : <React.Fragment key={j}><HighlightedText text={part.text} search={search} /></React.Fragment>
                    )}
                </p>
            );
        }
        return (
            <p key={i} className={className}>
                <HighlightedText text={paragraph} search={search} />
            </p>
        );
    };

    if (Array.isArray(text)) {
        return <>{text.map(renderParagraph)}</>;
    }

    return (
        <p className={className}>
            <HighlightedText text={text} search={search} />
        </p>
    );
}

function descriptionToText(desc) {
    if (!desc) return '';
    return Array.isArray(desc) ? desc.join(' ') : desc;
}

function SpeciesListItem({ item, search }) {
    switch (item.type) {
        case 'genus':
            return (
                <div className={style.genus} id={item.id}>
                    <p className={style['genus-title']}>
                        <HighlightedText text={item.title} search={search} />&nbsp;
                        <HighlightedText text={item.author} search={search} className={style.species__author} />&nbsp;
                    </p>
                    {item.history && (
                        <p className={style.species__history}>
                            <HighlightedText text={item.history} search={search} />&nbsp;
                        </p>
                    )}
                    {item.typeName && (
                        <p className={style.genus__type}>
                            <HighlightedText text={item.typeLabel} search={search} />&nbsp;
                            <span className={style.genus__type_oxytropis}>
                                <Parts parts={item.typeName} search={search} />&nbsp;
                            </span>{' '}&nbsp;
                            <HighlightedText text={item.typeAuthor} search={search} />
                        </p>
                    )}
                    <Description text={item.description} className={style.genus__description} search={search} />
                </div>
            );
        case 'subgenus':
            return (
                <div className={`${style.subgenus} search`} id={item.id}>
                    <p className={style.subgenus__section}>
                        Подрод&nbsp;
                        <HighlightedText text={item.title} search={search} className={style.subgenus__title} />&nbsp;
                        <HighlightedText text={item.author} search={search} className={style['species__section-author']} />
                    </p>
                    {item.history && (
                        <p className={style['section-history']}>
                            <HighlightedText text={item.history} search={search} />
                        </p>
                    )}
                    {item.typeName && (
                        <p className={style.sidebar__type}>
                            <HighlightedText text={item.typeLabel} search={search} />&nbsp;
                            <Parts parts={item.typeName} search={search} />&nbsp;
                            {item.typeAuthor ? <HighlightedText text={` ${item.typeAuthor}`} search={search} /> : ''}
                        </p>
                    )}
                    <Description text={item.description} className={style.subgenus__description} search={search} />
                </div>
            );
        case 'section':
            return (
                <div className={`${style.section} search`} id={item.id}>
                    <p className={style.species__section}>
                        Секция&nbsp;
                        <HighlightedText text={item.name} search={search} className={style['species__section-name']} />&nbsp;
                        <HighlightedText text={item.author} search={search} className={style['species__section-author']} />
                    </p>
                    {item.history && (
                        <p className={style['section-history']}>
                            <HighlightedText text={item.history} search={search} />
                        </p>
                    )}
                    {item.typeName && (
                        <p className={style.section__type}>
                            <HighlightedText text={item.typeLabel} search={search} />&nbsp;
                            <span className={style['section__type-name']}>
                                <Parts parts={item.typeName} search={search} />
                            </span>&nbsp;
                            {item.typeAuthor ? <HighlightedText text={` ${item.typeAuthor}`} search={search} /> : ''}
                        </p>
                    )}
                    <Description text={item.description} className={style.section__description} search={search} />
                </div>
            );
        case 'species': {
            // Безопасное определение o. caerulea (учитываем любые варианты написания: coerulea, caerulea, cearulea)
            const nameLower = item.nameLat ? String(item.nameLat).toLowerCase() : '';
            const isCaerulea = nameLower.includes('caerulea') || nameLower.includes('coerulea') || nameLower.includes('cearulea');

            return (
                <div
                    className={`${style.species__block} search ${item.mistake ? style.species__block_mistake : ''} ${isCaerulea ? style.species__block_skipNumber : ''}`}
                    id={item.id}
                >
                    {/* Жесткая нумерация удалена. Все выводится автоматически через CSS-счетчики */}
                    
                    <span className={style['species__name-lat']} >
                        {item.nameLatLink ? (
                            <a href={item.nameLatLink} target="_blank" rel="noreferrer">
                                <HighlightedText text={item.nameLat} search={search} />
                            </a>
                        ) : (
                            <HighlightedText text={item.nameLat} search={search} />
                        )}
                    </span>
                    {item.author && (
                        <HighlightedText text={`\u00A0${item.author}`} search={search} className={style.species__author} />
                    )}

                    {item.literature && (
                        <span className={style['species-literature']}>
                            <HighlightedText text={item.literature} search={search} />{' '}
                            {item.synonyms?.map((sItem) => (
                                <React.Fragment key={sItem.id}>
                                    <HighlightedText text={sItem.lat} search={search} className={style.species__synonym} />{' '}
                                    <HighlightedText text={sItem.author} search={search} className={style['species__synonym-author']} />{' '}
                                    <HighlightedText text={sItem.lit} search={search} className={style['species-literature']} />{' '}
                                </React.Fragment>
                            ))}
                        </span>
                    )}

                    {item.nameRu && (
                        <HighlightedText text={`\u00A0${item.nameRu}`} search={search} className={style['species__name-ru']} />
                    )}

                    {item.place && (
                        <p className={style.species__place}>
                            <HighlightedText text={item.place} search={search} />
                        </p>
                    )}
                    {item.speciesType && (
                        <p className={style.species__type}>
                            <HighlightedText text={item.speciesType} search={search} />
                        </p>
                    )}
                    {item.protolog && (
                        <p className={style.species__protolog}>
                            <HighlightedText text={item.protolog} search={search} />
                        </p>
                    )}
                    {item.eco && (
                        <p className={style.species__eco}>
                            <HighlightedText text={item.eco} search={search} />
                        </p>
                    )}

                    {item.spreadLocal && (
                        <p className={style.species__spread}>
                            Распр.:{' '}
                            <span className={style['species__spread-local']}>
                                <HighlightedText text={item.spreadLocal} search={search} />
                            </span>
                        </p>
                    )}
                    {item.spreadGeneral && (
                        <p className={style.species__spread}>
                            Общ. распр.:{' '}
                            <span className={style['species__spread-general']}>
                                <HighlightedText text={item.spreadGeneral} search={search} />
                            </span>
                        </p>
                    )}
                    {item.note && (
                        <p className={style.species__note}>
                            <HighlightedText text={item.note} search={search} />
                        </p>
                    )}
                </div>
            );
        }
        default:
            return null;
    }
}

export default function SpeciesList({ items = taxonomy }) {
    const [query, setQuery] = useState('');

    // Инициализация состояния из localStorage
    const [showAnalysis, setShowAnalysis] = useState(() => {
        const savedState = localStorage.getItem('oxytropis_show_analysis');
        return savedState === 'true';
    });

    // Синхронизация состояния с localStorage
    useEffect(() => {
        localStorage.setItem('oxytropis_show_analysis', showAnalysis);
    }, [showAnalysis]);

    const handleToggleAnalysis = () => {
        setShowAnalysis(prev => !prev);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return items;
        return items.filter((item) => {
            const haystack = [
                item.title,
                item.name,
                item.nameLat,
                item.nameRu,
                item.author,
                descriptionToText(item.description),
                item.eco,
                item.spreadLocal,
                item.spreadGeneral,
                ...(item.synonyms?.map((sItem) => `${sItem.lat} ${sItem.author}`) ?? []),
            ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();
            return haystack.includes(q);
        });
    }, [items, query]);

    return (
        <>
            <ButtonUp />
            <main className={style.container}>
                <section className={style['species-list']}>
                    <div className={style.main__content}>
                        <div className={style.species__list}>
                            <h2 className={style.species__title}>
                                Конспект видов рода&nbsp;<i>Oxytropis</i>&nbsp;DC.<br />
                                Алтайской горной страны
                            </h2>
                        </div>
                    </div>

                    {/* Панель управления: переключатель конспекта/анализа и инпут поиска */}
                    <div className={style['species-list__controls']}>
                        <button
                            className={`${style['analysis-toggle-btn']} ${showAnalysis ? style['analysis-toggle-btn_active'] : ''}`}
                            onClick={handleToggleAnalysis}
                        >
                            {showAnalysis ? <BookOpen size={18} /> : <BarChart2 size={18} />}
                            {showAnalysis ? 'Показать конспект видов' : 'Анализ рода'}
                        </button>

                        {!showAnalysis && (
                            <div className={style['species-list__search']}>
                                <input
                                    className={style['search-input']}
                                    type="search"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Поиск..."
                                    aria-label="Поиск"
                                />
                            </div>
                        )}
                    </div>

                    <div className={style.tab__transition_container}>
                        {showAnalysis ? (
                            <div className={`${style['species-analysis-container']} ${style.fade_in}`}>
                                <OxytropisAnalysis />
                            </div>
                        ) : (
                            <div className={`${style['species-list__body']} ${style.fade_in}`}>
                                {filtered.length === 0 ? (
                                    <p className={style['species-list__empty']}>Ничего не найдено.</p>
                                ) : (
                                    filtered.map((item) => (
                                        <SpeciesListItem key={item.id} item={item} search={query} />
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </>
    );
}
