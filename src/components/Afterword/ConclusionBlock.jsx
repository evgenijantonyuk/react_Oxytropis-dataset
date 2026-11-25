import React, { memo } from 'react';
import styles from './Conclusion.module.css';

function ConclusionBlock({ title, paragraphs }) {
    return (
        <div className={styles.conclusion__block}>
            <h3 className={styles.block__title}>{title}</h3>
            {paragraphs.map((text, index) => (
                <p key={index} className={styles.block__text}>{text}</p>
            ))}
        </div>
    );
}

export default memo(ConclusionBlock);
