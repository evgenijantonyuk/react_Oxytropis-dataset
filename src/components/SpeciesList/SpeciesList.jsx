
import React, { useMemo, useState } from 'react';
import taxonomy from '../../components/data/oxytropis.js';
import './SpeciesList.css'
import ButtonUp from "../../components/ButtonUp/ButtonUp.jsx";

function SpeciesListItem({ item }) {

    switch (item.type) {
        case 'genus':
            return (
                <div className="genus" id={item.id}>
                    <p className="genus-title">
                        {item.title}&nbsp;
                        <span className="species__author">{item.author}</span>
                    </p>
                    {item.history && <p className="species__history">{item.history}</p>}
                    {item.typeName && (
                        <p className="genus__type">
                            {item.typeLabel}&nbsp;
                            <span className="genus__type_oxytropis">{item.typeName}</span>{' '}
                            {item.typeAuthor}
                        </p>
                    )}
                    {item.description && (
                        <p className="genus__description">{item.description}</p>
                    )}
                </div>
            );
        case 'subgenus':
            return (
                <div className="subgenus search" id={item.id}>
                    <h3 className="subgenus__title">
                        {item.title}&nbsp;
                        <span className="species__author">{item.author}</span>
                    </h3>
                    {item.history && <p className="section-history">{item.history}</p>}
                    {item.typeName && (
                        <p className="section__type">
                            {item.typeLabel}&nbsp;<i>{item.typeName}</i>
                        </p>
                    )}
                    {item.description && (
                        <p className="subgenus__description">{item.description}</p>
                    )}
                </div>
            );
        case 'section':
            return (
                <div className="section search" id={item.id}>
                    <p className="species__section">
                        Секция&nbsp;
                        <span className="species__section-name">{item.name}</span>&nbsp;
                        <span className="species__section-author">{item.author}</span>
                    </p>
                    {item.history && <p className="section-history">{item.history}</p>}
                    {item.typeName && (
                        <p className="section__type">
                            {item.typeLabel}&nbsp;
                            <span className="section__type-name"><i>{item.typeName}</i></span>
                            {item.typeAuthor ? ` ${item.typeAuthor}` : ''}
                        </p>
                    )}
                    {item.description && (
                        <p className="section__description">{item.description}</p>
                    )}
                </div>
            );
        case 'species':
            return (
                <div
                    className={
                        'species__block search' + (item.mistake ? ' species__block_mistake' : '')
                    }
                    id={item.id}
                >
                    {item.number && <span className="species__number">{item.number}</span>}

                    <span className="species__name-lat" >
            {item.nameLatLink ? (
                <a href={item.nameLatLink} target="_blank" rel="noreferrer">
                    {item.nameLat}&nbsp;
                </a>
            ) : (
                item.nameLat
            )}
          </span>
                    {item.author && <span className="species__author">{item.author}</span>}

                    {item.literature && (
                        <span className="species-literature">
              {item.literature}{' '}
                            {item.synonyms?.map((s) => (
                                <React.Fragment key={s.id}>
                                    <span className="species__synonym">{s.lat}</span>{' '}
                                    <span className="species__synonym-author">{s.author}</span>{' '}
                                    <span className="species-literature">{s.lit}</span>{' '}
                                </React.Fragment>
                            ))}
            </span>
                    )}

                    {item.nameRu && (
                        <span className="species__name-ru"> {item.nameRu}</span>
                    )}

                    {item.place && <p className="species__place">{item.place}</p>}
                    {item.speciesType && <p className="species__type">{item.speciesType}</p>}
                    {item.protolog && <p className="species__protolog">{item.protolog}</p>}
                    {item.eco && <p className="species__eco">{item.eco}</p>}

                    {item.spreadLocal && (
                        <p className="species__spread">
                            Распр.:{' '}
                            <span className="species__spread-local">{item.spreadLocal}</span>
                        </p>
                    )}
                    {item.spreadGeneral && (
                        <p className="species__spread">
                            Общ. распр.:{' '}
                            <span className="species__spread-general">{item.spreadGeneral}</span>
                        </p>
                    )}
                    {item.note && <p className="species__note">{item.note}</p>}
                </div>
            );
        default:
            return null;
    }
}

/**
 * Список всех таксонов с поиском.
 */
export default function SpeciesList({ items = taxonomy }) {
    const [query, setQuery] = useState('');
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
                item.description,
                item.eco,
                item.spreadLocal,
                item.spreadGeneral,
                ...(item.synonyms?.map((s) => `${s.lat} ${s.author}`) ?? []),
            ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();
            return haystack.includes(q);
        });
    }, [items, query]);

    return (
        <main className="container">
            <section className="species-list">
                <div className="main-content">
                    <div className="species__list">
                        <h2 className="species__title">
                            Конспект видов рода&nbsp;Oxytropis&nbsp;DC.<br />
                            Алтайской горной страны
                        </h2>
                    </div>
                </div>
                <div className="species-list__search">
                    <input className="search-input"
                           type="search"
                           value={query}
                           onChange={(e) => setQuery(e.target.value)}
                           placeholder="Поиск…"
                           aria-label="Поиск"
                    />
                </div>
                <ButtonUp />
                <div className="species-list__body">
                    {filtered.length === 0 ? (
                        <p className="species-list__empty">Ничего не найдено.</p>
                    ) : (
                        filtered.map((item) => (
                            <SpeciesListItem key={item.id} item={item}/>
                        ))
                    )}
                </div>
            </section>
        </main>
    );
}