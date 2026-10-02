import { useMemo, useState } from 'react';
import {
    REFERENCES_WITH_LINKS,
    searchReferences,
    toCitation,
} from './references.js';
import './LiteratureList.css';

export default function LiteratureList() {
    const [query, setQuery] = useState('');

    const list = useMemo(
        () => (query ? searchReferences(query) : REFERENCES_WITH_LINKS),
        [query]
    );

    return (
        <div className="container">
            <div className="literature-list">
                <h2 className="literature__title">Литература</h2>

                <div className="literature-list__search">
                    <input
                        type="search"
                        className="search-input"
                        placeholder="Поиск по авторам, названиям, источнику…"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        aria-label="Поиск по литературе"
                    />
                </div>

                <p className="literature__count">
                    Найдено записей: <b>{list.length}</b>
                </p>

                {list.length === 0 ? (
                    <p className="literature__empty">Ничего не найдено</p>
                ) : (
                    <ul className="literature__items">
                        {list.map((ref) => (
                            <li key={ref.id} className="literature__block">
                                <a
                                    className="literature__link"
                                    href={ref.url}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                  <span className="literature__citation">
                    {toCitation(ref)}
                  </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}