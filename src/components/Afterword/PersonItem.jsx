import { memo } from "react";
import styles from "./Aterword.module.css";

function PersonItem({ person }) {
    const { name, link, years, regalia, isPassedAway, note } = person;

    const nameClassName = `${styles.person__teacher} ${
        isPassedAway ? styles.person__teacher_frame : ""
    }`.trim();

    return (
        <li className={styles.person}>
            <p>
                {link ? (
                    <a
                        className={nameClassName}
                        target="_blank"
                        rel="noopener noreferrer"
                        href={link}
                    >
                        {name}
                    </a>
                ) : (
                    <span className={nameClassName}>{name}</span>
                )}
                {years && ` ${years}`} {regalia}
            </p>
            {note && <p className={styles.colleague__note}>{note}</p>}
        </li>
    );
}

export default memo(PersonItem);
