import React from "react";
import styles from "./Aterword.module.css";
import Conclusion from "./Conclusion.jsx";
import { teachersList, colleaguesList } from "../data/afterwordData.js";

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

                    {/* Рендеринг списка учителей */}
                    {teachersList.map((teacher) => (
                        <div key={teacher.id} className={styles.person}>
                            <p>
                                <a
                                    className={`${styles.person__teacher} ${teacher.isPassedAway ? styles.person__teacher_frame : ""}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    href={teacher.link}
                                >
                                    {teacher.name}
                                </a>
                                {teacher.years && ` ${teacher.years}`} {teacher.regalia}
                            </p>
                        </div>
                    ))}

                    <p className={styles.person__thanks}>
                        Искреннюю признательность и глубокую благодарность автор выражает коллегам и единомышленникам,
                        оказывавшим всестороннюю поддержку на протяжении всей работы над проектом и содействовавшим в
                        критической обработке контента. Отдельная благодарность верным друзьям и товарищам по экспедиционным выездам:
                    </p>

                    {/* Рендеринг списка коллег */}
                    {colleaguesList.map((colleague) => (
                        <div key={colleague.id} className={styles.person}>
                            <p>
                                <a
                                    className={styles.person__teacher}
                                    target="_blank"
                                    rel="noreferrer"
                                    href={colleague.link}
                                >
                                    {colleague.name}
                                </a>{" "}
                                {colleague.regalia}
                            </p>
                            {colleague.note && (
                                <p className={styles.colleague__note}>
                                    {colleague.note}
                                </p>
                            )}
                        </div>
                    ))}
                </section>
            </main>
        </>
    );
}

export default Afterword;
