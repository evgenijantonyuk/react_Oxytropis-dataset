import styles from "./Aterword.module.css"
import Conclusion from "./Conclusion.jsx";

function Afterword() {
    return (
        <>
            <Conclusion />
            <div className={styles.container}>
                <div className={styles.persons}>
                    <h3>Автор выражает глубокую и искреннюю признательность:</h3>
                    <p className={styles.person__thanks}>Моим учителям - Вы не только
                        научили теории,
                        методике и практике, но и делились своими знаниями и опытом в научной деятельности. Спасибо за
                        мудрые
                        наставления, душевность и неоценимую помощь не только в научной практике, но и в повседневной
                        жизни:</p>

                    <div className={styles.person}>
                        <p>
                            <a className={`${styles.person__teacher} ${styles.person__teacher_frame}`} target="_blank"
                               href="https://ru.wikipedia.org/wiki/%D0%9A%D0%B0%D0%BC%D0%B5%D0%BB%D0%B8%D0%BD_%D0%A0%D1%83%D0%B4%D0%BE%D0%BB%D1%8C%D1%84_%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B8%D1%87">Камелин
                                Рудольф Владимирович</a> (1938 - 2016),
                            профессор, доктор биологических наук, член-корреспондент РАН, заведующий отделом «Гербарий
                            высших
                            растений» Ботанического института РАН, президент Русского ботанического общества
                        </p>
                    </div>

                    <div className={styles.person}>
                        <p>
                            <a className={`${styles.person__teacher} ${styles.person__teacher_frame}`} target="_blank"
                               href="https://ru.wikipedia.org/wiki/%D0%9A%D1%80%D0%B0%D1%81%D0%BD%D0%BE%D0%B1%D0%BE%D1%80%D0%BE%D0%B2,_%D0%98%D0%B2%D0%B0%D0%BD_%D0%9C%D0%BE%D0%B8%D1%81%D0%B5%D0%B5%D0%B2%D0%B8%D1%87">Красноборов
                                Иван Моисеевич</a>
                            (1931—2011), зав. лабораторией, профессор, доктор биологических наук Центральный сибирский
                            ботанический сад СО РАН ЦСБС СО РАН.
                        </p>
                    </div>

                    <div className={styles.person}>
                        <p>
                            <a className={styles.person__teacher} target="_blank"
                               href="https://www.asu.ru/persons/371/">Шмаков Александр
                                Иванович</a> – профессор кафедры ботаники, директор Южно-Сибирского ботанического сада
                            Алтайского государственного университета, доктор биологических наук.
                        </p>
                    </div>

                    <div className={styles.person}>
                        <p>
                            <a className={styles.person__teacher} target="_blank"
                               href="https://famous-scientists.ru/anketa/dorofeev-vladimir-ivanovich-7198">Дорофеев
                                Владимир
                                Иванович</a> – старший научный сотрудник Гербария (БИН РАН, г. Санкт-Петербург).
                            Систематик
                            высших растений. Доцент кафедры биогеографии факультета географии и геоэкологии СПбГУ,
                            доктор
                            биологических наук.
                        </p>
                    </div>

                    <div className={styles.person}>
                        <p>
                            <a className={styles.person__teacher} target="_blank"
                               href="http://www.csbg.nsc.ru/ru/struktura/nauchnye-podrazdeleniya/laboratoriya-gerbarij/sotrudniki-5/shaulo-dmitrij-nikolaevich.html">Шауло
                                Дмитрий Николаевич</a> – в.н.с., заведующий лабораторией Гербарий (ЦСБС РАН, г.
                            Новосибирск).
                            Систематик высших растений. кандидат биологических наук, старший научный сотрудник.
                        </p>
                    </div>

                    <p className={styles.person__thanks}>Я крайне признателен своим коллегам, поддерживающих меня на
                        протяжении всего
                        времени работы и дававших мне бесценные советы по написанию контента сайта. Спасибо огромное
                        друзьям,
                        единомышленникам и товарищам по экспедициям:
                    </p>

                    <div className={styles.person}>
                        <p>
                            <a className={styles.person__teacher} target="_blank"
                               href="https://www.asu.ru/persons/369/">
                                Смирнов Сергей Владимирович</a> – кандидат биологических наук. Доцент. Директор
                            института
                            биологии и биотехнологии.
                        </p>
                    </div>

                    <div className={styles.person}>
                        <p>
                            <a className={styles.person__teacher} target="_blank"
                               href="https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%BC%D0%B0%D0%BD,_%D0%94%D0%BC%D0%B8%D1%82%D1%80%D0%B8%D0%B9_%D0%90%D0%BB%D0%B5%D0%BA%D1%81%D0%B0%D0%BD%D0%B4%D1%80%D0%BE%D0%B2%D0%B8%D1%87">
                                Герман Дмитрий Александрович</a> – кандидат биологических наук. Ведущий научный
                            сотрудник.
                        </p>
                    </div>

                    <div className={styles.person}>
                        <p>
                            <a className={styles.person__teacher} target="_blank"
                               href="https://www.asu.ru/persons/370/">
                                Косачев Петр Алексеевич</a> – кандидат биологических наук. Ведущий научный сотрудник.
                        </p>
                        <p>Отдельное спасибо <span className={styles.person__teacher}>Петру Алексеевичу</span> за
                            предоставленные
                            фотоматериалы пейзажей Алтайской горной страны.</p>
                    </div>

                    <div className={styles.person}>
                        <p>
                            <a className={styles.person__teacher} target="_blank"
                               href="https://www.asu.ru/persons/780/">
                                Ваганов Алексей Владимирович</a> – доктор биологических наук. Ведущий научный сотрудник.
                            Проректор по научному и инновационному развитию.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Afterword;
