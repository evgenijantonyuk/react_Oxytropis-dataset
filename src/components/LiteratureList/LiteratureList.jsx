import React, { useMemo, useState } from "react";
import Highlight from "./Highlight";
import { DEFAULT_REFERENCES } from "./references";
import {
    buildTextContent,
    downloadAsTextFile,
    filterItems,
    normalizeReference,
} from "./utils";
import "./LiteratureList.css";

/**
 * Адаптивный список литературы с поиском, ссылками и экспортом в .txt.
 *
 * @param {Object} props
 * @param {(string | { text: string, url?: string, doi?: string })[]} [props.references]
 * @param {string} [props.title]
 * @param {string} [props.eyebrow]
 * @param {string} [props.fileName]
 * @param {'url' | 'search' | 'none'} [props.linkMode='search']
 */
export default function LiteratureList({
                                           references = DEFAULT_REFERENCES,
                                           title = "Литература",
                                           eyebrow = "Библиография",
                                           fileName = "literatura.txt",
                                           linkMode = "search",
                                       }) {
    const [query, setQuery] = useState("");

    const items = useMemo(
        () => references.map((ref, i) => normalizeReference(ref, i, linkMode)),
        [references, linkMode]
    );

    const filtered = useMemo(() => filterItems(items, query), [items, query]);

    const handleDownload = () => {
        downloadAsTextFile(buildTextContent(filtered), fileName);
    };

    return (
        <div className="lit-scope">
            <section className="lit-card" aria-labelledby="lit-title">
                <header className="lit-header">
                    <div className="lit-title-row">
                        <div>
                            {eyebrow && <p className="lit-eyebrow">{eyebrow}</p>}
                            <h1 className="lit-title" id="lit-title">
                                {title}
                            </h1>
                        </div>
                        <span className="lit-count">
              {filtered.length} / {items.length}
            </span>
                    </div>

                    <div className="lit-toolbar">
                        <div className="lit-search">
              <span className="lit-search-icon" aria-hidden="true">
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              </span>
                            <input
                                type="search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Поиск…"
                                aria-label="Поиск по списку литературы"
                            />
                            {query && (
                                <button
                                    type="button"
                                    className="lit-clear"
                                    onClick={() => setQuery("")}
                                    aria-label="Очистить поиск"
                                >
                                    ×
                                </button>
                            )}
                        </div>

                        <button
                            type="button"
                            className="lit-btn"
                            onClick={handleDownload}
                            disabled={filtered.length === 0}
                            aria-label="Скачать список"
                            title="Скачать список"
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            <span className="lit-btn-text">Скачать список</span>
                        </button>
                    </div>
                </header>

                {filtered.length > 0 ? (
                    <ol className="lit-list">
                        {filtered.map((item) => (
                            <li className="lit-item" key={item.n}>
                                <span className="lit-num">{item.n}</span>
                                <p className="lit-text">
                                    {item.url ? (
                                        <a
                                            className="lit-link"
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title="Открыть источник"
                                        >
                                            <Highlight text={item.text} query={query} />
                                            <span className="lit-link-icon" aria-hidden="true">
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </span>
                                        </a>
                                    ) : (
                                        <Highlight text={item.text} query={query} />
                                    )}
                                </p>
                            </li>
                        ))}
                    </ol>
                ) : (
                    <p className="lit-empty">
                        Ничего не найдено. Попробуйте изменить запрос.
                    </p>
                )}
            </section>
        </div>
    );
}