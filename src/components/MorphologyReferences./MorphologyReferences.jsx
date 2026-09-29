import React from "react";
import './MorphologyReferences.css';

const referencesData = [
    { id: 1, text: "Красная книга Российской Федерации (Растения и грибы) / Министерство природных ресурсов и экологии РФ. — М., 2008. — URL: ", url: "https://redbookrf.ru" },
    { id: 2, text: "Minnesota Wildflowers: a field guide to the flora of Minnesota. — URL: ", url: "https://minnesotawildflowers.info" },
    { id: 3, text: "PictureThis AI Botanical Database. — URL: ", url: "https://picturethisai.com" },
    { id: 4, text: "iNaturalist: Образовательный проект в области гражданской науки. — URL: ", url: "https://inaturalist.org" },
    { id: 5, text: "NatureGate (LuontoPortti): Справочник по биологическому разнообразию. — URL: ", url: "https://luontoportti.com" },
    { id: 6, text: "Мегаэнциклопедия Кирилла и Мефодия. Раздел: Ботаника. — URL: ", url: "https://megabook.ru" },
    { id: 7, text: "Красная книга Республики Бурятия: Редкие и находящиеся под угрозой исчезновения виды растений и грибов. — Улан-Удэ, 2013. — URL: ", url: "https://burpriroda.ru" },
    { id: 8, text: "Montana Plant Life: Botanical database. — URL: ", url: "https://plant-life.org" },
    { id: 9, text: "Flora of China // eFloras. Harvard University Herbaria & Missouri Botanical Garden. — URL: ", url: "https://efloras.org" },
    { id: 10, text: "OregonFlora: Botanical Research and Wildflower Guide. — URL: ", url: "https://oregonflora.org" },
    { id: 11, text: "Wikipedia, the free encyclopedia. — URL: ", url: "https://wikipedia.org" },
    { id: 12, text: "Wikipedia, the free encyclopedia. — URL: ", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%B0%D0%B9%D0%BB:Oxytropis_pilosa_De_Cand._-_Flora_regni_Borussici_vol._8_-_t._529.png" },
    { id: 13, text: "Flowers of India: Digital Botanical Database. — URL: ", url: "https://flowersofindia.net" },
    { id: 14, text: "Научная электронная библиотека «КиберЛенинка». — URL: ", url: "https://cyberleninka.ru" },
    { id: 15, text: "Saskatchewan Wildflowers: A Guide to the Flora of Saskatchewan. — URL: ", url: "https://saskwildflower.ca" },
    { id: 16, text: "Википедия — свободная энциклопедия. — URL: ", url: "https://wikipedia.org" },
    { id: 17, text: "Плантариум: открытый онлайн-атлас и определитель растений России и сопредельных стран. — URL: ", url: "https://plantarium.ru" },
    { id: 18, text: "Useful Temperate Plants Database. — URL: ", url: "https://theferns.info" },
    { id: 19, text: "Пленник Р. Я. Роль бобовых в растительных сообществах Горного Алтая // Сибирский экологический журнал. — 1999. — № 5. — С. 515–522.", url: "" },
    { id: 20, text: "Золотов Д. В., Черных Д. В. и др. Остролодочники (Oxytropis DC., Fabaceae) в Алтайском государственном заповеднике // Проблемы ботаники Южной Сибири и Монголии. — Барнаул, 2019. — С. 54–57.", url: "" },
    { id: 21, text: "Сумневич Г. П. Новый вид рода Oxytropis DC. из Южного Алтая // Систематические заметки по материалам Гербария им. П. Н. Крылова при Томском государственном университете. — Томск, 1937. — № 5. — С. 1–3.", url: "" },
    { id: 22, text: "English botany, or, Coloured figures of British plants / J. Sowerby, J. T. Boswell, P. Lankester [et al.]. – 3rd ed. – London : R. Hardwicke, 1876. – Vol. 3 : Leguminiferae to Rosaceae. – Plate CCCLXXIV : Oxytropis campestris (L.) DC. (Illustration). ", url: "http://www.biodiversitylibrary.org/page/32598546" }



];

export default function MorphologyReferences() {
    return (
        <section className="morphology-references">
            <h2 className="references-heading">Список литературы / References</h2>
            <ol className="references-list">
                {referencesData.map((ref) => (
                    <li key={ref.id} className="references-item">
                        {ref.text}
                        {ref.url && (
                            <a href={ref.url} target="_blank" rel="noreferrer">
                                {ref.url}
                            </a>
                        )}
                    </li>
                ))}
            </ol>
        </section>
    );
}
