import { useMemo, useState } from "react";
import Highlight from "./Highlight";
import { DEFAULT_REFERENCES } from "./references";
import { buildTextContent, downloadAsTextFile, filterItems } from "./utils";
import "./LiteratureList.css";
import ButtonUp from "../ButtonUp/ButtonUp.jsx";
import styles from "../Afterword/Aterword.module.css";

/**
 * Адаптивный список литературы с поиском и экспортом в .txt
 *
 * @param {Object} props
 * @param {string[]} [props.references] — массив строк. По умолчанию — встроенный список.
 * @param {string}   [props.title]      — заголовок (по умолчанию «Литература»).
 * @param {string}   [props.eyebrow]    — надпись над заголовком (по умолчанию «Библиография»).
 * @param {string}   [props.fileName]   — имя файла при скачивании (по умолчанию «literatura.txt»).
 */
export default function LiteratureList({
                                           references = DEFAULT_REFERENCES,
                                           title = "Литература",
                                           eyebrow = "Библиография",
                                           fileName = "literatura.txt",
                                       }) {
    const [query, setQuery] = useState("");

    const items = useMemo(
        () => references.map((text, index) => ({ n: index + 1, text })),
        [references]
    );

    const filtered = useMemo(() => filterItems(items, query), [items, query]);

    const handleDownload = () => {
        downloadAsTextFile(buildTextContent(filtered), fileName);
    };

    return (
        <>
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
                                placeholder="Поиск по автору, названию, году…"
                                aria-label="Поиск по списку литературы"
                            />
                            {query && (
                                <button
                                    type="button"
                                    className="lit-clear"
                                    onClick={() => setQuery("")}
                                    aria-label="Очистить поиск"
                                >

                                </button>
                            )}
                        </div>

                        <button
                            type="button"
                            className="lit-btn"
                            onClick={handleDownload}
                            disabled={filtered.length === 0}
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
                            Скачать список
                        </button>
                    </div>
                </header>

                {filtered.length > 0 ? (
                    <ol className="lit-list">
                        {filtered.map((item) => (
                            <li className="lit-item" key={item.n}>
                                <span className="lit-num">{item.n}</span>
                                <p className="lit-text">
                                    <Highlight text={item.text} query={query} />
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
            <ButtonUp />
        </div>
            <footer className={styles.footer__afterword}>
                <p>&#169; Антонюк Е. В.</p>
                <p className={styles.footer__text}>
                    Если есть замечания или вопросы, а так же предложения о сотрудничестве обрайтесь по элекронной
                    почте:
                    <a className={styles.contactsButton} target="_blank"
                       href="mailto:evgenijantonyuk@gmail.com?subject=Вопрос&body=Привет">evgenijantonyuk@gmail.com</a>
                </p>
            </footer>
        </>

    );
}