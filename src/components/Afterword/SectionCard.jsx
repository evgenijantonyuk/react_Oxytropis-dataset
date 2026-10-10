
import styles from './Conclusion.module.css';

export default function SectionCard({ name, text }) {
    return (
        <div className={styles.section__card}>
            <h4 className={styles.section__name}>{name}</h4>
            <p className={styles.section__text}>{text}</p>
        </div>
    );
}
