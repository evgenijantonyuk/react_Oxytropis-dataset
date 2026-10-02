import { useMemo } from 'react';
import { REFERENCES_WITH_LINKS } from './references';
import './LiteratureList.css';

export default function LiteratureList() {
    const { cyrillic, latin } = useMemo(() => {
        return {
            cyrillic: REFERENCES_WITH_LINKS.filter((r) => r.alphabet === 'cyrillic'),
            latin: REFERENCES_WITH_LINKS.filter((r) => r.alphabet === 'latin'),
        };
    }, []);

    return (
        <section className="references">
            <h1 className="references__title">Список литературы</h1>

            <div className="references__block">
                <h2 className="references__subtitle">
                    Кириллический алфавит (русский)
                </h2>
                <ol className="references__list">
                    {cyrillic.map((ref, i) => (
                        <li key={`cyr-${i}`} className="references__item">
                            <a
                                href={ref.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="references__link"
                            >
                                {ref.text}
                            </a>
                        </li>
                    ))}
                </ol>
            </div>

            <div className="references__block">
                <h2 className="references__subtitle">
                    Латинский алфавит (English / Latin / и др.)
                </h2>
                <ol className="references__list">
                    {latin.map((ref, i) => (
                        <li key={`lat-${i}`} className="references__item">
                            <a
                                href={ref.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="references__link"
                            >
                                {ref.text}
                            </a>
                        </li>
                    ))}
                </ol>
            </div>

            <p className="references__count">
                Всего источников: {REFERENCES_WITH_LINKS.length}
            </p>
        </section>
    );
}