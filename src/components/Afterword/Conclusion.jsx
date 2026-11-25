import React, { memo } from 'react';
import ConclusionBlock from './ConclusionBlock.jsx';
import SectionCard from './SectionCard.jsx';
import { blocksData, sectionsData } from '../data/conclusionData.js';
import styles from './Conclusion.module.css';

function Conclusion() {
    return (
        <section className={styles.conclusion}>
            <header className={styles.conclusion__header}>
                <h2 className={styles.conclusion__title}>ЗАКЛЮЧЕНИЕ</h2>
                <p className={styles.conclusion__subtitle}>
                    В результате всестороннего сравнительно-морфологического, биоморфологического
                    и историко-протологического исследования представителей полиморфного рода Остролодочник...
                </p>
            </header>

            {blocksData.map((block) => (
                <ConclusionBlock
                    key={block.id}
                    title={block.title}
                    paragraphs={block.paragraphs}
                />
            ))}

            <div className={styles.sections__wrapper}>
                <h3 className={styles.sections__main_title}>
                    Секционная дифференциация и морфогенетические особенности таксонов
                </h3>
                <p className={styles.sections__intro}>
                    Критический пересмотр структуры диагностического ключа и конспекта видов позволил детально
                    охарактеризовать морфологическую специфику всех ключевых секций...
                </p>

                <div className={styles.sections__grid}>
                    {sectionsData.map((sect) => (
                        <SectionCard
                            key={sect.id}
                            name={sect.name}
                            text={sect.text}
                        />
                    ))}
                </div>
            </div>

            <div className={styles.conclusion__end}>
                <h3>Общий итог</h3>
                <p>
                    Проведенное исследование доказывает, что классический сравнительно-морфологический метод, опирающийся на детальный анализ репродуктивных и вегетативных структур во всем спектре секционного разнообразия, в сочетании с текстологической ревизией первоописаний и исторических гербарных фондов, остается фундаментальной и надежной основой для построения естественной системы, уточнения границ видов и создания точных диагностических ключей для определения обширного рода Oxytropis.
                </p>
            </div>
        </section>
    );
}

export default memo(Conclusion);
