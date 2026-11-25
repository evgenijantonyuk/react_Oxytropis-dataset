import { memo } from "react";
import styles from "./Aterword.module.css";
import PersonItem from "./PersonItem.jsx";

function ThanksSection({ intro, list }) {
    return (
        <>
            <p className={styles.person__thanks}>{intro}</p>
            <ul className={styles.persons__list}>
                {list.map((person) => (
                    <PersonItem key={person.id} person={person} />
                ))}
            </ul>
        </>
    );
}

export default memo(ThanksSection);
