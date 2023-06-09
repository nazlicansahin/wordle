import Box from "../wordle/Box";
import styles from "./WordleKeyboard.module.css";
export default function KeyBoard(props) {
    const blankword = '*****************************';

    return (
        <>
            <div className={styles.keyBoard}>
                <p style={{ backgroundColor: props.color }} className={styles.box}>{props.letter}</p>
            </div>
        </>
    )
}