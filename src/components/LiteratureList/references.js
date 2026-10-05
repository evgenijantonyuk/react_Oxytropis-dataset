/**
 * Объединённый структурированный список литературы.
 * Каждая запись: { id, authors, title, source, year, details, url }
 * Поиск: searchReferences(query, options)
 * Совместимо с прежними экспортами: DEFAULT_REFERENCES, REFERENCES_WITH_LINKS.
 */

export const REFERENCES = [
    // ===== Кириллический алфавит =====
    { id: 1,  authors: "Антонюк Е. В.", title: "Заметка об Oxytropis setifera Kom.", source: "Turczaninowia", year: 2001, details: "Т. 4. № 3. С. 35–37.", url: "https://cyberleninka.ru/article/n/zametka-ob-oxytropis-setifera-kom/viewer" },
    { id: 2,  authors: "Антонюк Е. В.", title: "Род Oxytropis", source: "Определитель растений Алтайского края. / [И.М. Красноборов и др.]. – Новосибирск : Изд-во СО РАН : Гео", year: 2003, details: "С. 266–268.", url: null },
    { id: 3,  authors: "Антонюк Е. В., Косачев П. А., Смирнов С. В.", title: "Oxytropis heterophylla Bunge (Fabaceae) – новый вид для флоры России.", source: "Turczaninowia.", year: 2019, details: "Т. 22. № 2. С. 181–186.", url: "https://turczaninowia.asu.ru/article/view/5799" },
    { id: 4,  authors: "Антонюк Е. В., Косачев П. А., Шмаков А. И.", title: "Oxytropis krylovii Schipz. (Fabaceae) – новый вид для флоры России.", source: "Turczaninowia", year: 2019, details: "Т. 22. № 4. С. 76–81.", url: "https://turczaninowia.asu.ru/article/view/6970" },
    { id: 5,  authors: "Антонюк Е. В., Косачев П. А., Шмаков А. И.", title: "Дополнение к флоре Алтая (Oxytropis DC.). I.", source: "Turczaninowia", year: 2020, details: "Т. 23. № 3. С. 22–28.", url: "https://cyberleninka.ru/article/n/dopolnenie-k-flore-altaya-oxytropis-dc-i/viewer" },
    { id: 6,  authors: "Антонюк Е.В.", title: "Род Oxytropis DC. во флоре Алтайского края.", source: "Флора и растительность Алтая: Труды Южно-Сибирского ботанического сада. – Барнаул: Изд-во Алт. гос. ун-та", year: 1999, details: "С. 67–71.", url: "https://journal.asu.ru/flora/article/view/19811" },
    { id: 7,  authors: "Байтенов М.С.", title: "Флора Казахстана. Т. 5.", source: "Алма-Ата: Изд-во АН КазССР", year: 1961, details: "388 с.", url: "https://biblioclub.ru/index.php?page=book&id=225415" },
    { id: 8,  authors: null, title: null, source: "Ботанический журнал.", year: 1979, details: "Т. 64, № 9. С. 1233–1234.", url: "https://herba.msu.ru/russian/journals/bzh/archive/" },
    { id: 9,  authors: null, title: null, source: "Ботанический журнал.", year: 1990, details: "Т. 75. С. 1569.", url: "https://herba.msu.ru/russian/journals/bzh/archive/" },
    { id: 10, authors: "Васильченко И.Т., Федченко Б.А.", title: "Флора СССР. Т. 13.", source: "М.; Л.: Изд-во АН СССР", year: 1948, details: "588 с.", url: "https://www.phantastike.com/biology/flora_ussr_volume_13/djvu/view/" },
    { id: 11, authors: null, title: "Остролодочник.", source: "Википедия.", year: 2026, details: null, url: "https://ru.wikipedia.org/wiki/%D0%9E%D1%81%D1%82%D1%80%D0%BE%D0%BB%D0%BE%D0%B4%D0%BE%D1%87%D0%BD%D0%B8%D0%BA" },
    { id: 12, authors: "Грубов В.И.", title: "Растения Центральной Азии. Вып. 8б.", source: "СПб.: Мир и семья", year: 1998, details: "80 с.", url: "http://nskhuman.ru/shipunov/biblbook.php?nbook=10273" },
    { id: 13, authors: "Губанов И.А.", title: "Конспект флоры Внешней Монголии.", source: "М.: Изд-во МГУ", year: 1996, details: "136 с.", url: "https://rusneb.ru/catalog/000199_000009_001742833/" },
    { id: 14, authors: "Гуреева И.И., Соколова И.В.", title: "Типификация видов Oxytropis (Fabaceae), описанных из Южной Сибири.", source: "Новости систематики высших растений", year: 2022, details: "Т. 53. С. 59–67.", url: "https://www.binran.ru/files/journals/Novitates/2022_53/NSPV-53_7-Gureyeva_Sokolova.pdf" },
    { id: 15, authors: "Золотов Д.В., Черных Д.В. и др.", title: "Морфологическая дифференциация рода Oxytropis DC. на Алтае.", source: null, year: 2019, details: null, url: "https://orensteppe.org/content/zolotov-dmitriy-vladimirovich" },
    { id: 16, authors: null, title: null, source: "Известия Главного ботанического сада СССР.", year: 1927, details: "Т. 26. С. 117.", url: "https://herba.msu.ru/shipunov/school/sch-ru.htm" },
    { id: 17, authors: null, title: "КиберЛенинка: научная электронная библиотека.", source: null, year: 2026, details: null, url: "https://cyberleninka.ru/search?q=%D0%B1%D0%BE%D1%82%D0%B0%D0%BD%D0%B8%D0%BA%D0%B0&page=1" },
    { id: 18, authors: "Князев М.С.", title: "Заметки о некоторых видах Oxytropis (Fabaceae) Урала и Западной Сибири.", source: "Ботанический журнал", year: 2001, details: "Т. 86, № 5.", url: "https://cyberleninka.ru/article/n/konspekt-roda-oxytropis-fabaceae-vostochnoy-evropy-i-urala/viewer" },
    { id: 19, authors: null, title: "Красная книга Республики Бурятия: Редкие и находящиеся под угрозой исчезновения виды растений и грибов.", source: "Улан-Удэ", year: 2013, details: null, url: "https://redbook.burpriroda.ru/2014/vse.php?SECTION_ID=3631" },
    { id: 20, authors: null, title: "Красная книга Российской Федерации (растения и грибы).", source: "М.", year: 2008, details: null, url: "https://npsochi.ru/science/library/sborniki-trudov/krasnaya-kniga-rossii-2008/" },
    { id: 21, authors: "Крылов П.Н.", title: "Материалы к флоре Алтая и Томской губернии.", source: null, year: 1891, details: null, url: "https://rusneb.ru/catalog/000199_000009_003972837/" },
    { id: 22, authors: "Крылов П.Н.", title: null, source: "Труды Петербургского ботанического сада.", year: 1903, details: "Т. 21. С. 4–6.", url: "https://ru.ruwiki.ru/wiki/%D0%9A%D1%80%D1%8B%D0%BB%D0%BE%D0%B2,_%D0%9F%D0%BE%D1%80%D1%84%D0%B8%D1%80%D0%B8%D0%B9_%D0%9D%D0%B8%D0%BA%D0%B8%D1%82%D0%B8%D1%87_(%D0%B1%D0%BE%D1%82%D0%B0%D0%BD%D0%B8%D0%BA)?utm_referrer=https://www.google.com/" },
    { id: 23, authors: "Крылов П.Н.", title: "Флора Западной Сибири. Т. 7.", source: "Томск", year: 1933, details: "С. 1721–1763.", url: "https://vital.lib.tsu.ru/vital/access/services/Download/vtls:000241970/SOURCE2?view=true" },
    { id: 24, authors: "Максимович К.И.", title: "Diagnoses plantarum novarum asiaticarum.", source: "St. Petersburg", year: 1880, details: null, url: "https://archive.org/details/diagnosesplantar16maxi/page/n3/mode/2up" },
    { id: 25, authors: null, title: null, source: "Новости систематики высших растений.", year: 1964, details: "С. 203.", url: "http://nskhuman.ru/shipunov/biblbook.php?nbook=6616" },
    { id: 26, authors: null, title: null, source: "Новости систематики высших растений.", year: 2022, details: "Т. 53. С. 59–67.", url: "https://www.binran.ru/publications/novosti-sistematiki-vysshyh-rastenij/2266/" },
    { id: 27, authors: null, title: "Определитель растений Кемеровской области.", source: "Новосибирск: Изд-во СО РАН", year: 2001, details: "С. 201–203.", url: "https://herba.msu.ru/shipunov/school/sch-ru.htm" },
    { id: 28, authors: null, title: "Определитель растений Средней Азии. Т. 7.", source: "Ташкент: Фан", year: 1983, details: "С. 339–366.", url: "http://nskhuman.ru/shipunov/biblbook.php?nbook=12757" },
    { id: 29, authors: "Красноборов И.М.", title: "Определитель растений Тувинской АССР.", source: "Новосибирск: Наука", year: 1984, details: "С. 150–154.", url: "https://reallib.org/reader?file=1222148&pg=3" },
    { id: 30, authors: "Грубов В.И.", title: "Определитель сосудистых растений Монголии.", source: "Л.: Наука", year: 1982, details: "С. 164–169.", url: "http://nskhuman.ru/shipunov/biblbook.php?nbook=10224" },
    { id: 31, authors: "Пленник Р.Я.", title: "Морфологическая эволюция бобовых Юго-Восточного Алтая (на примере родовых комплексов Astragalus L. и Oxytropis DC.).", source: "Новосибирск: Наука", year: 1976, details: null, url: "https://www.google.com/search?q=%D0%9F%D0%BB%D0%B5%D0%BD%D0%BD%D0%B8%D0%BA+%D0%A0.%D0%AF.+%D0%AD%D0%BA%D0%BE%D0%BB%D0%BE%D0%B3%D0%BE-%D0%BC%D0%BE%D1%80%D1%84%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B0%D1%8F+%D1%8D%D0%B2%D0%BE%D0%BB%D1%8E%D1%86%D0%B8%D1%8F+%D0%B1%D0%BE%D0%B1%D0%BE%D0%B2%D1%8B%D1%85+%D0%B2+%D0%B3%D0%BE%D1%80%D0%B0%D1%85+%D0%AE%D0%B6%D0%BD%D0%BE%D0%B9+%D0%A1%D0%B8%D0%B1%D0%B8%D1%80%D0%B8.+%D0%9D%D0%BE%D0%B2%D0%BE%D1%81%D0%B8%D0%B1%D0%B8%D1%80%D1%81%D0%BA%3A+%D0%9D%D0%B0%D1%83%D0%BA%D0%B0+1976&sca_esv=a2875db628506375&sxsrf=APpeQnv_j5PD6To2gy35lfftQk5mO_OGIw%3A1791179262909&udm=50&source=chrome.ob&fbs=ABfTbFVoRrC-QTLMntAkgaY3Jlw1M0E9Cjhp1SXgJnQNWVrX06L8HC9MzKkTNiYdkaZdRzarP81DW672ml7GIJWkLED2rXAmFFpsW--AOpppN3nRUzVpO28lv8nmf49EUeOmo3D7epE7858BLngvPJ6wfzzRoEtnQv34WnRfVu6ja0O8CY_j2dOQRNsxNb-xDHcu9pUxH9MC57RLBXaFL_Z1Pwdly97UkORY1qErKo8KG9tdoSZFbmHozrKBcTjrbFz9PooQsY3BUIe4zs_5hgwS1NuLza-cDA&vsint=&aep=1&ntc=1&cs=1&sa=X&ved=2ahUKEwiJ-8bdlqKXAxVPFBAIHTMAKQ4Q2J8OegQIFRAD&biw=1440&bih=812&dpr=2&mstk=AUtExfDoK8SlWL6bgNyVjD3WZRb9GHvKs9f4sGlgBigg-LI7XjpCa3e5UV3yu8oQTpgtVJbLXLnsEfc8nWVEfQDg5qEIZ6kmHBUnKyglbBc1suz1E_I2knZ9VFbn7wz-2vtsuVHEsLdobF8fHq1E8hnJolPdYm30pvFpSgdWujCIo9pDv1HuR0RvZ5xkLuN2_tXddQUqfd2-1Jbf0bUmkq5MsOikUpJOkNcBYM4k8LR7vz3xg2h_x0W-RDv_o0ca_u8A68Eu172q-c8liChecUfX-4Q5xwi1OL7VVh9t_oKGEyMEUkNMUWb_CpRy-yJ7rxMy0baX4-pGj1P7rFtimtRaDlhH8R2EfI5sOOM3i6u3KJ2Gi197N193rMn4a923eZRes7nXkuu5faPKN184MxvuFuDuLZshVAfP5izDBN5nwVBU1k_j_MeKFx8OhnTphXxdoiu7YQJ2MiE&csuir=1&mtid=HTrDarDzMsSZ1fIPioX02AE" },
    { id: 32, authors: "Положий А.В.", title: "Флора Красноярского края. Т. 6.", source: "Томск", year: 1960, details: "С. 45–55.", url: "http://nskhuman.ru/shipunov/biblbook.php?nbook=6825" },
    { id: 33, authors: "Положий А.В.", title: "Определитель растений Тувинской АССР.", source: "Новосибирск: Наука", year: 1984, details: "С. 150–154.", url: "https://reallib.org/reader?file=1222148" },
    { id: 34, authors: "Положий А.В.", title: "Флора Сибири. Т. 9.", source: "Новосибирск: Наука", year: 1994, details: "С. 7–147.", url: "http://byrranga.ru/biblio.htm" },
    { id: 35, authors: "Попов М.Г.", title: "Новые Astragaleae из флоры Средней Азии.", source: "Notulae Systematicae ex Herbario Instituti Botanici Academiae Scientiarum URSS.", year: 1938, details: "Т. 7. С. 116.", url: "https://drive.google.com/file/d/1ri_bTVO17xyOwPhtHWPB1BJF5OduEOOp/view" },
    { id: 36, authors: null, title: null, source: "Систематические заметки по гербарию Томского университета.", year: 1990, details: "№ 88. С. 5.", url: "https://vital.lib.tsu.ru/vital/access/manager/Repository/vtls:000413868" },
    { id: 37, authors: "Сумневич Г.П.", title: "Материалы к познанию Oxytropis Алтая", source: "Известия Томского университета", year: 1937, details: null, url: "https://www.google.com/search?q=%D0%A1%D1%83%D0%BC%D0%BD%D0%B5%D0%B2%D0%B8%D1%87+%D0%93.%D0%9F.+,+title:+%D0%9C%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D0%B0%D0%BB%D1%8B+%D0%BA+%D0%BF%D0%BE%D0%B7%D0%BD%D0%B0%D0%BD%D0%B8%D1%8E+Oxytropis+%D0%90%D0%BB%D1%82%D0%B0%D1%8F+,+source:+%D0%98%D0%B7%D0%B2%D0%B5%D1%81%D1%82%D0%B8%D1%8F+%D0%A2%D0%BE%D0%BC%D1%81%D0%BA%D0%BE%D0%B3%D0%BE+%D1%83%D0%BD%D0%B8%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D1%82%D0%B5%D1%82%D0%B0+,+year:+1937,+%D1%81%D1%81%D1%8B%D0%BB%D0%BA%D0%B0+%D0%BD%D0%B0+%D1%81%D1%82%D1%8C%D1%8E&sca_esv=8213c76a758a2423&biw=1440&bih=812&aep=10&cs=1&prmd=ivns&sxsrf=APpeQnv8HDv4dDDw1CZClUkd5j9lTenHKw:1791184283643&source=lnms&fbs=ABfTbFXwfYg-AsVmc75aAkBispm6k7RIMh52cWHUntfypj3niv0vpWpy8F5Hmr7ocaLGY8yOCo5JeZAoCR2yp2qbRcUzhkqsNEiG-6ozLvVDtjws7D0-T9S6kvNlYj-kc7UCbzTz7jsJ9BWuWmjGidNfmQN6-xhyjloMsjax75LdLHrWucU6jbX43MPz73wZXQaPJauFGyLptk11zk-CcC-63XccA8h0RJg0p0DH9REKL6bkT3p2duTHnqpEY3MfoQZy7qoL94bib91jpNiuaxa43Syzn3XQYg&sa=X&ved=2ahUKEwjhptC3qaKXAxVlPhAIHWynDhEQ0pQJegQICBAF" },
    { id: 38, authors: "Крылов П.Н., Штейнбергъ Е.", title: null, source: "Труды Ботанического музея Академии наук.", year: 1918, details: "Т. XVII. С. 89.", url: "https://www.biodiversitylibrary.org/item/52592#page/5/mode/1up" },
    { id: 39, authors: null, title: null, source: "Труды Института ботаники АН МНР", year: 1985, details: "Т. 7. С. 93.", url: "https://www.google.com/search?q=%22%D0%A2%D1%80%D1%83%D0%B4%D1%8B+%D0%98%D0%BD%D1%81%D1%82%D0%B8%D1%82%D1%83%D1%82%D0%B0+%D0%B1%D0%BE%D1%82%D0%B0%D0%BD%D0%B8%D0%BA%D0%B8+%D0%90%D0%9D+%D0%9C%D0%9D%D0%A0%22&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg7MgYIAhBFGDwyBggDEEUYPNIBCDc0NzhqMGo0qAIAsAIB&sourceid=chrome&ie=UTF-8&udm=50&fbs=ABfTbFUBFQOAo39pWR7ZooffMply8J9srgQ1inh8zmwZwFYFx6WWPDY-sxWQZ1mbsdA4pqS6UHjC8e92UL7Kk3Mq4JakYL7LdGmK0XULQmFap_AhFpoRcnb052L7EGaoLLGleNHCVkk_-M1xvMj_zOJnL43GlJeo-RQQtHS78tTdhiOyEkozSlwk5BJXxNJ15U8k_2DXohwcmiRqlsgB2w9gTdxJgTjtiUugfaek1x1VxQc3DphA3OGBaF4IO-2-dhc8vssiUr-O5WHwQ7DT6WinZmlAYWyIDg&aep=10&ntc=1&sxsrf=APpeQntDZit_efTSEtpycM20NeMv3z2a7Q%3A1791185428928&mstk=AUtExfCaFBFTS2-l9uIfrzOm44nDMvvxSPhg8hVznVAue9MXVxSsixG5zWXEo1uxycJW50SmCFMnA-yJCuxjVr23w7rN3ufXps5A23apszOJtoepew3jAFpYCkY0F7I_tLhSdi1luHSkbQcui6rg77PU-5txQWUuPG7Aq1HNQOMydsqY9sD2J-DN3ejKraKpYn7HpR2sfQGneuNPpBT5Je006-KebSR-5TJhcF18e5e_2ogfQ2JqEMzxJXn68elV-lVWfLptYxs-lIJfEo27Ftr10MNBi-JG6uWoKCDz74_seNJA6AQg_JljjY5dXYN0h3AKv0tDlb7CWQYKwQ&aioh=3&csuir=1&cs=1&mtid=a1LDaoGRCfLDwPAP_MqosQQ" },
    { id: 40, authors: "Грубов В.И., Улзийхутаг Н.", title: "Определитель сосудистых растений Монголии.", source: "Л.: Наука", year: 1982, details: "С. 164–169.", url: "https://rusneb.ru/catalog/000199_000009_001111536/"  },
    { id: 41, authors: "Филимонова Н.С.", title: "Определитель растений Средней Азии. Т. 7.", source: "Ташкент: Фан", year: 1983, details: "С. 339–366.", url: "http://nskhuman.ru/shipunov/biblbook.php?nbook=12757" },
    { id: 42, authors: "Крылов П.Н.", title: "Флора Западной Сибири. Т. 7.", source: "Томск", year: 1933, details: "С. 1721–1763.", url: "https://vital.lib.tsu.ru/vital/access/manager/Repository/vtls:000241970?exact=sm_creator%3A%22%D0%9A%D1%80%D1%8B%D0%BB%D0%BE%D0%B2%2C+%D0%9F%D0%BE%D1%80%D1%84%D0%B8%D1%80%D0%B8%D0%B9+%D0%9D%D0%B8%D0%BA%D0%B8%D1%82%D0%B8%D1%87%22&f1=sm_subject%3A%22%D1%84%D0%BB%D0%BE%D1%80%D0%B0%22&f0=sm_creator%3A%22%D0%A1%D0%B5%D1%80%D0%B3%D0%B8%D0%B5%D0%B2%D1%81%D0%BA%D0%B0%D1%8F%2C+%D0%9B%D0%B8%D0%B4%D0%B8%D1%8F+%D0%9F%D0%B0%D0%BB%D0%BB%D0%B0%D0%B4%D0%B8%D0%B5%D0%B2%D0%BD%D0%B0%22&f2=sm_subject%3A%22%D0%97%D0%B0%D0%BF%D0%B0%D0%B4%D0%BD%D0%B0%D1%8F+%D0%A1%D0%B8%D0%B1%D0%B8%D1%80%D1%8C.%22" },
    { id: 43, authors: " М. Б. Байтенов.", title: "Флора Казахстана. Т. 5.", source: "Алма-Ата: Изд-во АН КазССР", year: 1961, details: "388 с.", url: "http://nskhuman.ru/shipunov/biblbook.php?nbook=12239" },
    { id: 44, authors: "Шишкин Б.К.", title: "Систематические заметки по гербарию Томского университета.", source: null, year: 1932, details: "№ 7–8. С. 4.", url: "https://journals.tsu.ru/zametki/&journal_page=archive&id=329" },

    // ===== Латиница / English / Latin =====
    { id: 45,  authors: "Abdussalamov A.", title: "О подроде Eumorpha (Bunge) Abduss. рода Oxytropis DC.", source: "Флора Узбекистана", year: null, details: null, url: "https://www.google.com/search?q=Abdussalamov+A.+%2C+%D0%9E+%D0%BF%D0%BE%D0%B4%D1%80%D0%BE%D0%B4%D0%B5+Eumorpha+%28Bunge%29+Abduss.+%D1%80%D0%BE%D0%B4%D0%B0+Oxytropis+DC.+%2C+%D0%A4%D0%BB%D0%BE%D1%80%D0%B0+%D0%A3%D0%B7%D0%B1%D0%B5%D0%BA%D0%B8%D1%81%D1%82%D0%B0%D0%BD%D0%B0&sca_esv=7f9c4df3eb7148c2&sxsrf=APpeQnsFbtCH49XgPanrKLrR1kzUR561Yw%3A1791188545929&udm=50&fbs=ABfTbFVoRrC-QTLMntAkgaY3Jlw1M0E9Cjhp1SXgJnQNWVrX06L8HC9MzKkTNiYdkaZdRzYcHrIbof8pTR1i45TkUNB-ZYZR8ZCTsjtFKn4hXKLNGK5bGfHrNWMynwtRoXJU3_TDGkKprvUwPIKBcTFq5U472f66ABFxSdJXepGRPK-fCdn09WVBP-FC_kH5qo7I1wyww4xVCSQLSNay9Rld4dC_qA0v6elL_e1icKCQOe43LQwJQo9usfUq8ZC29Fkg-ErVcECMMVbUjb85Hk8c144EVHmkEw&vsint=&aep=1&ntc=1&cs=1&sa=X&ved=2ahUKEwjMwYWouaKXAxVzGBAIHcYtLX0Q2J8OegQIFBAD&biw=1440&bih=812&dpr=2&mstk=AUtExfBu4uYUUef0wFISjCR86WZI4luLjkK1ptYnScD8G4ecSM_5aAi4mcKft2wEmjV5Y-r6Zxb1F94VOBAJWdZ0r4TLyi0CDiE8Wflnv0hhA9aWntVRbf92c1_yZFeoDA6PptJCbv5Zjar2YDtQNL3SOJbfv7qZy_peOqsaz6cQYy7jDoMt1AQSk7Gr2UaIUBpJm-vNgKfZrDku_D6fagUIjY_8uwBuJYDDZVVpQpzM6p1cneERgubm_wkMletYw2b22nGvaMcs06h2vlVKjP44aQY7D1rVCZh540vdSAsNjBjPvgMOGjNsZjnFmqNZJHCAyy91Idos7a8hhw&csuir=1&mtid=WF7DaueUKszYwPAP4OeX0AI" },
    { id: 46,  authors: "Ascherson P., Graebner P.", title: "Synopsis der mitteleuropäischen Flora. Bd. VI.", source: "Leipzig: Engelmann", year: "1906–1910", details: null, url: "https://www.biodiversitylibrary.org/item/81181#page/5/mode/1up" },
    { id: 47,  authors: "Bunge A.", title: "Index seminum Horti Academici Dorpatensis", source: "Dorpat", year: 1839, details: "P. 8.", url: null },
    { id: 48,  authors: "Bunge A.", title: "Index seminum Horti Academici Dorpatensis", source: "Dorpat", year: 1840, details: "P. 8.", url: null },
    { id: 49,  authors: "Bunge A.", title: null, source: "Arb. Naturf. Ven. Riga", year: 1847, details: "Bd. 1, H. 2. S. 227.", url: null },
    { id: 50,  authors: "Bunge A.", title: "Beiträge zur Kenntniss der Flora Russlands und der Steppen Central-Asiens", source: null, year: 1852, details: "S. 77.", url: null },
    { id: 51,  authors: "Bunge A.", title: null, source: "Bulletin de la Société Impériale des Naturalistes de Moscou", year: 1866, details: "T. 39, N 2. P. 15.", url: null },
    { id: 52,  authors: "Bunge A.", title: null, source: "Mémoires de l'Académie Impériale des Sciences de Saint-Pétersbourg. Sér. 7", year: 1869, details: "T. 14, N 4. P. 43.", url: null },
    { id: 53,  authors: "Bunge A.", title: null, source: "Mémoires de l'Académie Impériale des Sciences de Saint-Pétersbourg. Sér. 7", year: 1874, details: "T. 22, N 1. P. 70–158.", url: null },
    { id: 54,  authors: "Bunge A.", title: null, source: "Acta Horti Petropolitani", year: 1880, details: "T. 7. P. 367.", url: null },
    { id: 55,  authors: "Bunge A.", title: "In: Maximowicz C.J.", source: "Bulletin de l'Académie Impériale des Sciences de Saint-Pétersbourg", year: 1880, details: "T. 26. P. 470.", url: null },
    { id: 56,  authors: "Candolle A.P. de.", title: "Astragalogia", source: "Paris", year: 1802, details: "P. 35–96.", url: null },
    { id: 57,  authors: "Candolle A.P. de.", title: "Prodromus Systematis Naturalis Regni Vegetabilis. T. 2.", source: "Paris", year: 1825, details: "P. 279–281.", url: null },
    { id: 58,  authors: null, title: "Claves plantarum Xinjiangensis. T. 3.", source: null, year: 1985, details: "P. 85–110.", url: null },
    { id: 59,  authors: null, title: "Claves plantarum Xinjiangensis. T. 6.", source: null, year: 2000, details: "P. 270.", url: null },
    { id: 60,  authors: null, title: "eFloras — Flora of China", source: null, year: 2026, details: null, url: null },
    { id: 61,  authors: "Fischer F.E.L. von, Meyer C.A. von.", title: "Enumeratio plantarum novarum. T. 1.", source: "Petropoli", year: 1841, details: "P. 78–79.", url: null },
    { id: 62,  authors: null, title: "Flora of Pakistan. Oxytropis", source: "Flora of Pakistan", year: 2011, details: "Vol. 100.", url: null },
    { id: 63,  authors: null, title: "Flowers of India", source: null, year: 2026, details: null, url: null },
    { id: 64,  authors: "Gray A.", title: "Astragalus", source: "Proceedings of the American Academy of Arts and Sciences", year: 1864, details: "Vol. 6. P. 234.", url: null },
    { id: 65,  authors: "Gureeva I.I., Balashova N.V.", title: "Типификация таксонов, описанных П.Н. Крыловым", source: null, year: 2011, details: null, url: null },
    { id: 66,  authors: null, title: "iNaturalist", source: null, year: 2026, details: null, url: null },
    { id: 67,  authors: "Karelin G.S., Kirilow I.P.", title: null, source: "Bulletin de la Société Impériale des Naturalistes de Moscou", year: 1841, details: "T. 14. P. 402–403.", url: null },
    { id: 68,  authors: "Karelin G.S., Kirilow I.P.", title: null, source: "Bulletin de la Société Impériale des Naturalistes de Moscou", year: 1842, details: "T. 15. P. 327, 535.", url: null },
    { id: 69,  authors: "Komarov V.L.", title: null, source: "Feddes Repertorium", year: 1914, details: "Bd. 13. S. 226–233.", url: null },
    { id: 70,  authors: "Kuvaev V.B., Sonnikova A.A.", title: "Новый вид рода Oxytropis (Fabaceae) из Западного Саяна", source: "Новости систематики высших растений", year: 1990, details: "Т. 27. С. 99.", url: null },
    { id: 71,  authors: "Ledebour C.F.", title: "Icones Plantarum Novarum vel Imperfecte Cognitarum Floram Rossicam. T. 1.", source: "Berlin", year: 1829, details: "S. 13.", url: null },
    { id: 72,  authors: "Ledebour C.F.", title: "Flora Altaica. T. 3.", source: "Berlin", year: 1831, details: "S. 272–288.", url: null },
    { id: 73,  authors: null, title: "LuontoPortti", source: null, year: 2026, details: null, url: null },
    { id: 74,  authors: null, title: "Megabook: энциклопедия растений", source: null, year: 2026, details: null, url: null },
    { id: 75,  authors: null, title: "Minnesota Wildflowers", source: null, year: 2026, details: null, url: null },
    { id: 76,  authors: null, title: "Montana Plant Life", source: null, year: 2026, details: null, url: null },
    { id: 77,  authors: null, title: "OregonFlora", source: null, year: 2026, details: null, url: null },
    { id: 78,  authors: "Pallas P.S.", title: "Reise durch verschiedene Provinzen des Russischen Reichs. T. 3.", source: "St. Petersburg", year: 1776, details: "S. 293–750.", url: null },
    { id: 79,  authors: "Pallas P.S.", title: null, source: "Acta Academiae Scientiarum Petropolitanae", year: 1779, details: "T. 2. P. 268.", url: null },
    { id: 80,  authors: "Pallas P.S.", title: "Species Astragalorum", source: "Leipzig", year: 1800, details: "P. 47–94.", url: null },
    { id: 81,  authors: "Palibin J.W.", title: null, source: "Bulletin de l'Herbier Boissier. Sér. 2", year: 1908, details: "T. 8, N 3. P. 159–160, 961.", url: null },
    { id: 82,  authors: null, title: "PictureThis", source: null, year: 2026, details: null, url: null },
    { id: 83,  authors: "Regel E.", title: "Descriptiones plantarum novarum", source: null, year: 1880, details: null, url: null },
    { id: 84,  authors: "Ruprecht F.J., Osten-Sacken F.", title: "Baron Fr. v. d. Osten-Sacken. Sertum Tianschanicum", source: "St. Petersburg", year: 1869, details: null, url: null },
    { id: 85,  authors: "Saposhnikov V.V.", title: null, source: "Известия Томского отделения Русского ботанического общества", year: 1921, details: "Т. 1. С. 30.", url: null },
    { id: 86,  authors: "Saposhnikov V.V.", title: null, source: "Notulae Systematicae (Leningrad)", year: 1923, details: "T. 4. P. 131–137.", url: null },
    { id: 87,  authors: null, title: "SaskWildflower", source: null, year: 2026, details: null, url: null },
    { id: 88,  authors: "Schrenk A.G.", title: null, source: "Bulletin de l'Académie Impériale des Sciences de Saint-Pétersbourg", year: 1841, details: "T. 10. P. 254.", url: null },
    { id: 89,  authors: "Schrenk A.G.", title: null, source: "Bulletin de l'Académie Impériale des Sciences de Saint-Pétersbourg", year: 1842, details: "T. 10. P. 254.", url: null },
    { id: 90,  authors: "Schrenk A.G.", title: null, source: "Bulletin Physico-mathématique de l'Académie Impériale des Sciences de Saint-Pétersbourg", year: 1844, details: "T. 2, N 13. P. 196.", url: null },
    { id: 91,  authors: "Sowerby J. E.", title: "English Botany; or, Coloured Figures of British Plants", source: "London", year: 1876, details: null, url: null },
    { id: 92,  authors: "Steiler A.", title: "Generis Baicalia", source: "Flora", year: 1814, details: null, url: null },
    { id: 93,  authors: null, title: "Temperate Plants Database", source: null, year: 2026, details: null, url: null },
    { id: 94,  authors: "Trautvetter E.R.", title: null, source: "Bulletin de la Société Impériale des Naturalistes de Moscou", year: 1860, details: "T. 33, N 1. P. 486.", url: null },
    { id: 95,  authors: "Turczaninow N.S.", title: null, source: "Bulletin de la Société Impériale des Naturalistes de Moscou", year: 1832, details: "T. 5. P. 187.", url: null },
    { id: 96, authors: "Ulbrich E.", title: "Ein neuer Oxytropis aus China", source: "Botanische Jahrbücher für Systematik, Pflanzengeschichte und Pflanzengeographie", year: 1905, details: "Bd. 35. S. 680.", url: null },
    { id: 97, authors: "Vaganov A, Shmakov A, Zaikov V, Zholnerova E, Shalimov A, Belkin D, Batkin A, Kasatkin D, Kosachev P, Antonyuk E, Medvedeva K, Usik N, Mitina V", title: "Virtual Herbarium ALTB (South-Siberian Botanical Garden). Version 1.2.", source: "Altai State University. Occurrence dataset", year: 2020, details: "accessed via GBIF.org on 2020-07-28.", url: "https://doi.org" },
    { id: 98, authors: null, title: "Oxytropis.", source: "Wikipedia.", year: 2026, details: null, url: "https://en.wikipedia.org/wiki/Oxytropis" },
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