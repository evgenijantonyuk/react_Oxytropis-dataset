import { memo } from "react";
import styles from "./Aterword.module.css";
import ButtonUp from "../ButtonUp/ButtonUp.jsx";
import Conclusion from "./Conclusion.jsx";
import ThanksSection from "./ThanksSection.jsx";
import { teachersList, colleaguesList } from "../data/afterwordData.js";

function Afterword() {
    return (
        <>
            <ButtonUp />
            <main className={styles.container}>
                {/* Блок заключения */}
                <Conclusion />

                {/* Единый блок благодарностей */}
                <section className={styles.persons}>
                    <h2 className={styles.thanks__title}>Выражение благодарности</h2>

                    <ThanksSection
                        intro="Автор выражает глубокую и искреннюю признательность своим глубокоуважаемым учителям. Вы не только сформировали теоретико-методологическую базу и практические навыки исследований, но и щедро делились фундаментальным научным опытом. Благодарю за мудрые наставления, душевное тепло и неоценимую поддержку как в профессиональной деятельности, так и в повседневной жизни:"
                        list={teachersList}
                    />

                    <ThanksSection
                        intro="Искреннюю признательность и глубокую благодарность автор выражает коллегам и единомышленникам, оказывавшим всестороннюю поддержку на протяжении всей работы над проектом и содействовавшим в критической обработке контента. Отдельная благодарность верным друзьям и товарищам по экспедиционным выездам:"
                        list={colleaguesList}
                    />
                </section>
            </main>
        </>
    );
}

export default memo(Afterword);
