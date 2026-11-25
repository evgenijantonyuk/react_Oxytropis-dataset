import React, { memo } from "react";
import styles from "./Aterword.module.css";
import Conclusion from "./Conclusion.jsx";
import { teachersList, colleaguesList } from "../data/afterwordData.js";

// Вынесенный и мемоизированный компонент карточки человека
const PersonItem = memo(function PersonItem({ person }) {
    const { name, link, years, regalia, isPassedAway, note } = person;

    const nameClassName = `${styles.person__teacher} ${
        isPassedAway ? styles.person__teacher_frame : ""
    }`.trim();

    return (
        <li className={styles.person}>
            <p>
                {link ? (
                    <a
                        className={nameClassName}
                        target="_blank"
                        rel="noopener noreferrer"
                        href={link}
                    >
                        {name}
                    </a>
                ) : (
                    <span className={nameClassName}>{name}</span>
                )}
                {years && ` ${years}`} {regalia}
            </p>
            {note && <p className={styles.colleague__note}>{note}</p>}
        </li>
    );
});

function Afterword() {
    return (
        <>
            <Conclusion />
            <main className={styles.container}>
                <section className={styles.persons}>
                    <h2 className={styles.thanks__title}>Выражение благодарности</h2>

                    <p className={styles.person__thanks}>
                        Автор выражает глубокую и искреннюю признательность своим глубокоуважаемым учителям.
                        Вы не только сформировали теоретико-методологическую базу и практические навыки исследований,
                        но и щедро делились фундаментальным научным опытом. Благодарю за мудрые наставления,
                        душевное тепло и неоценимую поддержку как в профессиональной деятельности, так и в повседневной жизни:
                    </p>

                    <ul className={styles.persons__list}>
                        {teachersList.map((teacher) => (
                            <PersonItem key={teacher.id} person={teacher} />
                        ))}
                    </ul>

                    <p className={styles.person__thanks}>
                        Искреннюю признательность и глубокую благодарность автор выражает коллегам и единомышленникам,
                        оказывавшим всестороннюю поддержку на протяжении всей работы над проектом и содействовавшим в
                        критической обработке контента. Отдельная благодарность верным друзьям и товарищам по экспедиционным выездам:
                    </p>

                    <ul className={styles.persons__list}>
                        {colleaguesList.map((colleague) => (
                            <PersonItem key={colleague.id} person={colleague} />
                        ))}
                    </ul>
                </section>
            </main>
        </>
    );
}

export default memo(Afterword);
