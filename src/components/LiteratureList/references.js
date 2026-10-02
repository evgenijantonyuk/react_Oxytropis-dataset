/**
 * Объединённый структурированный список литературы.
 * Каждая запись: { id, authors, title, source, year, details, url }
 * Поиск: searchReferences(query, options)
 * Совместимо с прежними экспортами: DEFAULT_REFERENCES, REFERENCES_WITH_LINKS.
 */

export const REFERENCES = [
    // ===== Кириллический алфавит =====
    { id: 1,  authors: "Антонюк Е. В.", title: "Заметка об Oxytropis setifera Kom.", source: "Turczaninowia", year: 2001, details: "Т. 4. № 3. С. 35–37.", url: null },
    { id: 2,  authors: "Антонюк Е. В.", title: "Род Oxytropis", source: "Определитель растений Алтайского края / [И.М. Красноборов и др.]. – Новосибирск : Изд-во СО РАН : Гео", year: 2003, details: "С. 266–268.", url: null },
    { id: 3,  authors: "Антонюк Е. В., Косачев П. А., Смирнов С. В.", title: "Oxytropis heterophylla Bunge (Fabaceae) – новый вид для флоры России", source: "Turczaninowia", year: 2019, details: "Т. 22. № 2. С. 181–186.", url: "http://asu.ru" },
    { id: 4,  authors: "Антонюк Е. В., Косачев П. А., Шмаков А. И.", title: "Oxytropis krylovii Schipz. (Fabaceae) – новый вид для флоры России", source: "Turczaninowia", year: 2019, details: "Т. 22. № 4. С. 76–81.", url: "http://asu.ru" },
    { id: 5,  authors: "Антонюк Е. В., Косачев П. А., Шмаков А. И.", title: "Дополнение к флоре Алтая (Oxytropis DC.). I", source: "Turczaninowia", year: 2020, details: "Т. 23. № 3. С. 22–28.", url: "http://asu.ru" },
    { id: 6,  authors: "Антонюк Е.В.", title: "Род Oxytropis DC. во флоре Алтайского края", source: "Флора и растительность Алтая: Труды Южно-Сибирского ботанического сада. – Барнаул: Изд-во Алт. гос. ун-та", year: 1999, details: "С. 67–71.", url: null },
    { id: 7,  authors: "Байтенов М.С.", title: "Флора Казахстана. Т. 5.", source: "Алма-Ата: Изд-во АН КазССР", year: 1961, details: "388 с.", url: null },
    { id: 8,  authors: null, title: null, source: "Ботанический журнал", year: 1979, details: "Т. 64, № 9. С. 1233–1234.", url: null },
    { id: 9,  authors: null, title: null, source: "Ботанический журнал", year: 1990, details: "Т. 75. С. 1569.", url: null },
    { id: 10, authors: "Васильченко И.Т., Федченко Б.А.", title: "Флора СССР. Т. 13.", source: "М.; Л.: Изд-во АН СССР", year: 1948, details: "588 с.", url: null },
    { id: 11, authors: null, title: "Остролодочник", source: "Википедия", year: 2026, details: null, url: null },
    { id: 12, authors: "Грубов В.И.", title: "Растения Центральной Азии. Вып. 8б.", source: "СПб.: Мир и семья", year: 1998, details: "80 с.", url: null },
    { id: 13, authors: "Губанов И.А.", title: "Конспект флоры Внешней Монголии", source: "М.: Изд-во МГУ", year: 1996, details: "136 с.", url: null },
    { id: 14, authors: "Гуреева И.И., Соколова И.В.", title: "Типификация видов Oxytropis (Fabaceae), описанных из Южной Сибири", source: "Новости систематики высших растений", year: 2022, details: "Т. 53. С. 59–67.", url: null },
    { id: 15, authors: "Золотов В.В., Черных Е.Г. и др.", title: "Морфологическая дифференциация рода Oxytropis DC. на Алтае", source: null, year: 2019, details: null, url: null },
    { id: 16, authors: null, title: null, source: "Известия Главного ботанического сада СССР", year: 1927, details: "Т. 26. С. 117.", url: null },
    { id: 17, authors: null, title: "КиберЛенинка: научная электронная библиотека", source: null, year: 2026, details: null, url: null },
    { id: 18, authors: "Князев М.С.", title: "Заметки о некоторых видах Oxytropis (Fabaceae) Урала и Западной Сибири", source: "Ботанический журнал", year: 2001, details: "Т. 86, № 5.", url: null },
    { id: 19, authors: null, title: "Конспект флоры Внешней Монголии", source: "М.: Изд-во МГУ", year: 1996, details: "136 с.", url: null },
    { id: 20, authors: null, title: "Красная книга Республики Бурятия: Редкие и находящиеся под угрозой исчезновения виды растений и грибов", source: "Улан-Удэ", year: 2013, details: null, url: null },
    { id: 21, authors: null, title: "Красная книга Российской Федерации (растения и грибы)", source: "М.", year: 2008, details: null, url: null },
    { id: 22, authors: "Крылов П.Н.", title: "Материалы к флоре Алтая и Томской губернии", source: null, year: 1891, details: null, url: null },
    { id: 23, authors: "Крылов П.Н.", title: null, source: "Труды Петербургского ботанического сада", year: 1903, details: "Т. 21. С. 4–6.", url: null },
    { id: 24, authors: "Крылов П.Н.", title: "Флора Западной Сибири. Т. 7.", source: "Томск", year: 1933, details: "С. 1721–1763.", url: null },
    { id: 25, authors: "Максимович К.И.", title: "Diagnoses plantarum novarum asiaticarum", source: "St. Petersburg", year: 1880, details: null, url: null },
    { id: 26, authors: null, title: null, source: "Новости систематики высших растений", year: 1964, details: "С. 203.", url: null },
    { id: 27, authors: null, title: null, source: "Новости систематики высших растений", year: 2022, details: "Т. 53. С. 59–67.", url: null },
    { id: 28, authors: null, title: "Определитель растений Кемеровской области", source: "Новосибирск: Изд-во СО РАН", year: 2001, details: "С. 201–203.", url: null },
    { id: 29, authors: null, title: "Определитель растений Средней Азии. Т. 7.", source: "Ташкент: Фан", year: 1983, details: "С. 339–366.", url: null },
    { id: 30, authors: null, title: "Определитель растений Тувинской АССР", source: "Новосибирск: Наука", year: 1984, details: "С. 150–154.", url: null },
    { id: 31, authors: null, title: "Определитель сосудистых растений Монголии", source: "Л.: Наука", year: 1982, details: "С. 164–169.", url: null },
    { id: 32, authors: "Пленник Р.Я.", title: "Эколого-морфологическая эволюция бобовых в горах Южной Сибири", source: "Новосибирск: Наука", year: 1999, details: null, url: null },
    { id: 33, authors: "Положий А.В.", title: "Флора Красноярского края. Т. 6.", source: "Томск", year: 1960, details: "С. 45–55.", url: null },
    { id: 34, authors: "Положий А.В.", title: "Определитель растений Тувинской АССР", source: "Новосибирск: Наука", year: 1884, details: "С. 150–154.", url: null },
    { id: 35, authors: "Положий А.В.", title: "Флора Сибири. Т. 9.", source: "Новосибирск: Наука", year: 1994, details: "С. 7–147.", url: null },
    { id: 36, authors: "Попов М.Г.", title: "Новые виды среднеазиатских растений", source: "Notulae Systematicae (Leningrad)", year: 1938, details: "Т. 7. С. 116.", url: null },
    { id: 37, authors: null, title: "Растения Центральной Азии. Вып. 8б.", source: "СПб.: Мир и семья", year: 1998, details: "80 с.", url: null },
    { id: 38, authors: null, title: null, source: "Систематические заметки по гербарию Томского университета", year: 1990, details: "№ 88. С. 5.", url: null },
    { id: 39, authors: "Сумневич Г.П.", title: "Материалы к познанию Oxytropis Алтая", source: "Известия Томского университета", year: 1937, details: null, url: null },
    { id: 40, authors: null, title: null, source: "Труды Ботанического музея Академии наук", year: 1918, details: "Т. XVII. С. 89.", url: null },
    { id: 41, authors: null, title: null, source: "Труды Института ботаники АН МНР", year: 1985, details: "Т. 7. С. 93.", url: null },
    { id: 42, authors: "Улзийхутаг Н.", title: "Определитель сосудистых растений Монголии", source: "Л.: Наука", year: 1982, details: "С. 164–169.", url: null },
    { id: 43, authors: "Филимонова Н.С.", title: "Определитель растений Средней Азии. Т. 7.", source: "Ташкент: Фан", year: 1983, details: "С. 339–366.", url: null },
    { id: 44, authors: null, title: "Флора Западной Сибири. Т. 7.", source: "Томск", year: 1933, details: "С. 1721–1763.", url: null },
    { id: 45, authors: null, title: "Флора Казахстана. Т. 5.", source: "Алма-Ата: Изд-во АН КазССР", year: 1961, details: "388 с.", url: null },
    { id: 46, authors: null, title: "Флора Сибири. Т. 9.", source: "Новосибирск: Наука", year: 1994, details: "С. 7–147.", url: null },
    { id: 47, authors: null, title: "Флора СССР. Т. 13.", source: "М.; Л.: Изд-во АН СССР", year: 1948, details: "588 с.", url: null },
    { id: 48, authors: "Шишкин Б.К.", title: "Систематические заметки по гербарию Томского университета", source: null, year: 1932, details: "№ 7–8. С. 4.", url: null },

    // ===== Латиница / English / Latin =====
    { id: 49,  authors: "Abdussalamov A.", title: "О подроде Eumorpha (Bunge) Abduss. рода Oxytropis DC.", source: "Флора Узбекистана", year: null, details: null, url: null },
    { id: 50,  authors: "Ascherson P., Graebner P.", title: "Synopsis der mitteleuropäischen Flora. Bd. VI.", source: "Leipzig: Engelmann", year: "1906–1910", details: null, url: null },
    { id: 51,  authors: "Bunge A.", title: "Index seminum Horti Academici Dorpatensis", source: "Dorpat", year: 1839, details: "P. 8.", url: null },
    { id: 52,  authors: "Bunge A.", title: "Index seminum Horti Academici Dorpatensis", source: "Dorpat", year: 1840, details: "P. 8.", url: null },
    { id: 53,  authors: "Bunge A.", title: null, source: "Arb. Naturf. Ven. Riga", year: 1847, details: "Bd. 1, H. 2. S. 227.", url: null },
    { id: 54,  authors: "Bunge A.", title: "Beiträge zur Kenntniss der Flora Russlands und der Steppen Central-Asiens", source: null, year: 1852, details: "S. 77.", url: null },
    { id: 55,  authors: "Bunge A.", title: null, source: "Bulletin de la Société Impériale des Naturalistes de Moscou", year: 1866, details: "T. 39, N 2. P. 15.", url: null },
    { id: 56,  authors: "Bunge A.", title: null, source: "Mémoires de l'Académie Impériale des Sciences de Saint-Pétersbourg. Sér. 7", year: 1869, details: "T. 14, N 4. P. 43.", url: null },
    { id: 57,  authors: "Bunge A.", title: null, source: "Mémoires de l'Académie Impériale des Sciences de Saint-Pétersbourg. Sér. 7", year: 1874, details: "T. 22, N 1. P. 70–158.", url: null },
    { id: 58,  authors: "Bunge A.", title: null, source: "Acta Horti Petropolitani", year: 1880, details: "T. 7. P. 367.", url: null },
    { id: 59,  authors: "Bunge A.", title: "In: Maximowicz C.J.", source: "Bulletin de l'Académie Impériale des Sciences de Saint-Pétersbourg", year: 1880, details: "T. 26. P. 470.", url: null },
    { id: 60,  authors: "Candolle A.P. de.", title: "Astragalogia", source: "Paris", year: 1802, details: "P. 35–96.", url: null },
    { id: 61,  authors: "Candolle A.P. de.", title: "Prodromus Systematis Naturalis Regni Vegetabilis. T. 2.", source: "Paris", year: 1825, details: "P. 279–281.", url: null },
    { id: 62,  authors: null, title: "Claves plantarum Xinjiangensis. T. 3.", source: null, year: 1985, details: "P. 85–110.", url: null },
    { id: 63,  authors: null, title: "Claves plantarum Xinjiangensis. T. 6.", source: null, year: 2000, details: "P. 270.", url: null },
    { id: 64,  authors: null, title: "eFloras — Flora of China", source: null, year: 2026, details: null, url: null },
    { id: 65,  authors: "Fischer F.E.L. von, Meyer C.A. von.", title: "Enumeratio plantarum novarum. T. 1.", source: "Petropoli", year: 1841, details: "P. 78–79.", url: null },
    { id: 66,  authors: null, title: "Flora of Pakistan. Oxytropis", source: "Flora of Pakistan", year: 2011, details: "Vol. 100.", url: null },
    { id: 67,  authors: null, title: "Flowers of India", source: null, year: 2026, details: null, url: null },
    { id: 68,  authors: "Gray A.", title: "Astragalus", source: "Proceedings of the American Academy of Arts and Sciences", year: 1864, details: "Vol. 6. P. 234.", url: null },
    { id: 69,  authors: "Gureeva I.I., Balashova N.V.", title: "Типификация таксонов, описанных П.Н. Крыловым", source: null, year: 2011, details: null, url: null },
    { id: 70,  authors: null, title: "iNaturalist", source: null, year: 2026, details: null, url: null },
    { id: 71,  authors: "Karelin G.S., Kirilow I.P.", title: null, source: "Bulletin de la Société Impériale des Naturalistes de Moscou", year: 1841, details: "T. 14. P. 402–403.", url: null },
    { id: 72,  authors: "Karelin G.S., Kirilow I.P.", title: null, source: "Bulletin de la Société Impériale des Naturalistes de Moscou", year: 1842, details: "T. 15. P. 327, 535.", url: null },
    { id: 73,  authors: "Komarov V.L.", title: null, source: "Feddes Repertorium", year: 1914, details: "Bd. 13. S. 226–233.", url: null },
    { id: 74,  authors: "Kuvaev V.B., Sonnikova A.A.", title: "Новый вид рода Oxytropis (Fabaceae) из Западного Саяна", source: "Новости систематики высших растений", year: 1990, details: "Т. 27. С. 99.", url: null },
    { id: 75,  authors: "Ledebour C.F.", title: "Icones Plantarum Novarum vel Imperfecte Cognitarum Floram Rossicam. T. 1.", source: "Berlin", year: 1829, details: "S. 13.", url: null },
    { id: 76,  authors: "Ledebour C.F.", title: "Flora Altaica. T. 3.", source: "Berlin", year: 1831, details: "S. 272–288.", url: null },
    { id: 77,  authors: null, title: "LuontoPortti", source: null, year: 2026, details: null, url: null },
    { id: 78,  authors: null, title: "Megabook: энциклопедия растений", source: null, year: 2026, details: null, url: null },
    { id: 79,  authors: null, title: "Minnesota Wildflowers", source: null, year: 2026, details: null, url: null },
    { id: 80,  authors: null, title: "Montana Plant Life", source: null, year: 2026, details: null, url: null },
    { id: 81,  authors: null, title: "OregonFlora", source: null, year: 2026, details: null, url: null },
    { id: 82,  authors: "Pallas P.S.", title: "Reise durch verschiedene Provinzen des Russischen Reichs. T. 3.", source: "St. Petersburg", year: 1776, details: "S. 293–750.", url: null },
    { id: 83,  authors: "Pallas P.S.", title: null, source: "Acta Academiae Scientiarum Petropolitanae", year: 1779, details: "T. 2. P. 268.", url: null },
    { id: 84,  authors: "Pallas P.S.", title: "Species Astragalorum", source: "Leipzig", year: 1800, details: "P. 47–94.", url: null },
    { id: 85,  authors: "Palibin J.W.", title: null, source: "Bulletin de l'Herbier Boissier. Sér. 2", year: 1908, details: "T. 8, N 3. P. 159–160, 961.", url: null },
    { id: 86,  authors: null, title: "PictureThis", source: null, year: 2026, details: null, url: null },
    { id: 87,  authors: "Regel E.", title: "Descriptiones plantarum novarum", source: null, year: 1880, details: null, url: null },
    { id: 88,  authors: "Ruprecht F.J., Osten-Sacken F.", title: "Baron Fr. v. d. Osten-Sacken. Sertum Tianschanicum", source: "St. Petersburg", year: 1869, details: null, url: null },
    { id: 89,  authors: "Saposhnikov V.V.", title: null, source: "Известия Томского отделения Русского ботанического общества", year: 1921, details: "Т. 1. С. 30.", url: null },
    { id: 90,  authors: "Saposhnikov V.V.", title: null, source: "Notulae Systematicae (Leningrad)", year: 1923, details: "T. 4. P. 131–137.", url: null },
    { id: 91,  authors: null, title: "SaskWildflower", source: null, year: 2026, details: null, url: null },
    { id: 92,  authors: "Schrenk A.G.", title: null, source: "Bulletin de l'Académie Impériale des Sciences de Saint-Pétersbourg", year: 1841, details: "T. 10. P. 254.", url: null },
    { id: 93,  authors: "Schrenk A.G.", title: null, source: "Bulletin de l'Académie Impériale des Sciences de Saint-Pétersbourg", year: 1842, details: "T. 10. P. 254.", url: null },
    { id: 94,  authors: "Schrenk A.G.", title: null, source: "Bulletin Physico-mathématique de l'Académie Impériale des Sciences de Saint-Pétersbourg", year: 1844, details: "T. 2, N 13. P. 196.", url: null },
    { id: 95,  authors: "Sowerby J. E.", title: "English Botany; or, Coloured Figures of British Plants", source: "London", year: 1876, details: null, url: null },
    { id: 96,  authors: "Steiler A.", title: "Generis Baicalia", source: "Flora", year: 1814, details: null, url: null },
    { id: 97,  authors: null, title: "Temperate Plants Database", source: null, year: 2026, details: null, url: null },
    { id: 98,  authors: "Trautvetter E.R.", title: null, source: "Bulletin de la Société Impériale des Naturalistes de Moscou", year: 1860, details: "T. 33, N 1. P. 486.", url: null },
    { id: 99,  authors: "Turczaninow N.S.", title: null, source: "Bulletin de la Société Impériale des Naturalistes de Moscou", year: 1832, details: "T. 5. P. 187.", url: null },
    { id: 100, authors: "Ulbrich E.", title: "Ein neuer Oxytropis aus China", source: "Botanische Jahrbücher für Systematik, Pflanzengeschichte und Pflanzengeographie", year: 1905, details: "Bd. 35. S. 680.", url: null },
    { id: 101, authors: "Vaganov A, Shmakov A, Zaikov V, Zholnerova E, Shalimov A, Belkin D, Batkin A, Kasatkin D, Kosachev P, Antonyuk E, Medvedeva K, Usik N, Mitina V", title: "Virtual Herbarium ALTB (South-Siberian Botanical Garden). Version 1.2.", source: "Altai State University. Occurrence dataset", year: 2020, details: "accessed via GBIF.org on 2020-07-28.", url: "https://doi.org" },
    { id: 102, authors: null, title: "Oxytropis", source: "Wikipedia", year: 2026, details: null, url: null },
];

/* ---------- Вспомогательные функции ---------- */

/** Определяет алфавит записи по первой букве автора / названия / источника. */
function detectAlphabet(ref) {
    const probe = (ref.authors || ref.title || ref.source || '').trim();
    return /[А-Яа-яЁё]/.test(probe.charAt(0)) ? 'cyrillic' : 'latin';
}

/** Нормализация строки: нижний регистр, удаление диакритики и пунктуации. */
function normalize(text) {
    return String(text || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\p{L}\p{N}\s]/gu, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

/** Собирает человекочитаемую цитату из полей записи. */
export function toCitation(ref) {
    return [ref.authors, ref.title, ref.source, ref.details, ref.year]
        .filter(Boolean)
        .join(' ');
}

/* ---------- Обогащённый список записей ---------- */

export const REFERENCES_WITH_LINKS = REFERENCES.map((ref) => {
    const alphabet = detectAlphabet(ref);
    const query = [ref.authors, ref.title, ref.source, ref.year]
        .filter(Boolean)
        .join(' ');
    const url =
        ref.url ||
        `https://scholar.google.com/scholar?q=${encodeURIComponent(query)}`;
    const searchIndex = normalize(
        [ref.authors, ref.title, ref.source, ref.details, ref.year]
            .filter(Boolean)
            .join(' ')
    );
    return { ...ref, alphabet, url, searchIndex };
});

/* ---------- Совместимость со старыми импортами ---------- */

/** Плоский массив строк (совместимо с прежним кодом). */
export const DEFAULT_REFERENCES = REFERENCES_WITH_LINKS.map(toCitation);

/* ---------- Поиск ---------- */

/**
 * Поиск по литературе.
 *
 * @param {string} query — запрос (автор, название, источник, год, страницы).
 * @param {object} [options]
 * @param {'cyrillic'|'latin'} [options.alphabet] — фильтр по алфавиту.
 * @param {number|string} [options.year] — фильтр по году.
 * @param {number} [options.limit] — ограничить количество результатов.
 * @param {boolean} [options.onlyAuthors] — искать только по авторам.
 * @param {boolean} [options.onlyTitles]  — искать только по названиям.
 * @returns {Array} отфильтрованные записи.
 */
export function searchReferences(query, options = {}) {
    const { alphabet, year, limit, onlyAuthors, onlyTitles } = options;
    const q = normalize(query);

    let results = REFERENCES_WITH_LINKS;

    if (q) {
        if (onlyAuthors) {
            results = results.filter((r) => normalize(r.authors).includes(q));
        } else if (onlyTitles) {
            results = results.filter((r) => normalize(r.title).includes(q));
        } else {
            results = results.filter((r) => r.searchIndex.includes(q));
        }
    }

    if (alphabet) results = results.filter((r) => r.alphabet === alphabet);
    if (year) results = results.filter((r) => String(r.year) === String(year));
    if (limit) results = results.slice(0, limit);

    return results;
}