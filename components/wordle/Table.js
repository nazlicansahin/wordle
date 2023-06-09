import Word from "./Word";
import styles from "./Table.module.css";

export default function Table(props) {
    return (
        props.wordArray.map((word, index) => {
            return (
                <>
                    <div className={styles.table}>
                        <Word color={props.color[index]} key={index} word={word} />
                    </div>
                </>
            )
        })
    )
}