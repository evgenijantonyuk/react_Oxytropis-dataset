
import styles from './Conclusion.module.css'; // Используем модульные стили по аналогии с вашим кодом

export default function ConclusionBlock({ title, paragraphs }) {
    return (
        <div className={styles.conclusion__block}>
            <h3 className={styles.block__title}>{title}</h3>
            {paragraphs.map((text, index) => (
                <p key={index} className={styles.block__text}>{text}</p>
            ))}
        </div>
    );
}
