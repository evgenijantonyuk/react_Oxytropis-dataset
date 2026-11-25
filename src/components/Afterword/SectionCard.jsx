import { memo } from 'react';
import styles from './Conclusion.module.css';

function SectionCard({ name, text }) {
    return (
        <article className={styles.section__card}>
            <h4 className={styles.section__name}>{name}</h4>
            <p className={styles.section__text}>{text}</p>
        </article>
    );
}

export default memo(SectionCard);
