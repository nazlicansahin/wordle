import React from "react";
import Box from "./Box";
import styles from "./Word.module.css";

export default function Word(props) {
    const blankword = '*****';

    return (
        <div className={styles.word}>
            {props.word === null
                ? blankword.split('').map((letter, index) => (
                    <Box key={index} letter={''} />
                ))
                : props.word.split('').map((letter, index) => (
                    <Box color={props.color[index]} key={index} letter={letter} />
                ))}
        </div>
    );
}
