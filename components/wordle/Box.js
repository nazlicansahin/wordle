import styles from "components/wordle/Box.module.css"
'use strict';
/*create box for wordle*/
export default function Box(props) {
    return (
        <>
            <p style={{ backgroundColor: props.color }} className={styles.box}>{props.letter}</p>
        </>
    )
}