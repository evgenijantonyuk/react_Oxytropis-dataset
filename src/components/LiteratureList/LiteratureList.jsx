import { useMemo, useState } from 'react';
// Импортируем массив с готовыми поисковыми индексами и функцию сборки цитаты
import { REFERENCES_WITH_LINKS, toCitation } from './references.js';
import ButtonUp from '../ButtonUp/ButtonUp.jsx';
import './LiteratureList.css';

export default function LiteratureList() {
    const [query, setQuery] = useState('');

    // Инлайн-поиск: если запрос есть, фильтруем массив по нормализованному индексу
    const list = useMemo(() => {
        const cleanQuery = query.trim().toLowerCase();
        if (!cleanQuery) return REFERENCES_WITH_LINKS;

        return REFERENCES_WITH_LINKS.filter((ref) =>
            ref.searchIndex && ref.searchIndex.includes(cleanQuery)
        );
    }, [query]);

    return (
       <>
           <ButtonUp />
           <div className="container">
               <div className="literature-list">
                   <h2 className="literature__title">Литература</h2>

                   <div className="literature-list__search">
                       <input
                           type="search"
                           className="search-input"
                           placeholder="Поиск по авторам, названиям, источнику или году…"
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
       </>
    );
}
