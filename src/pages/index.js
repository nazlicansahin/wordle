import React, { useEffect, useState } from "react";
import Table from "../../components/wordle/Table";
import Word from "../../components/wordle/Word";
import KeyBoard from "../../components/keyboard/WordleKeyboard";
import styles from "../styles/Home.module.css"

export default function Home() {
  //input controll
  const [isInputDisabled, setInputDisabled] = useState(false);
  const [buttonValue, setButtonValue] = useState('CHECK')
  //Keyword

  const Keyword = [
    { key: 'l1', color: null, letter: 'E' }, { key: 'l2', color: null, letter: 'R' },
    { key: 'l3', color: null, letter: 'T' }, { key: 'l4', color: null, letter: 'Y' },
    { key: 'l5', color: null, letter: 'U' }, { key: 'l6', color: null, letter: 'I' },
    { key: 'l7', color: null, letter: 'O' }, { key: 'l8', color: null, letter: 'P' },
    { key: 'l9', color: null, letter: 'Ğ' }, { key: 'l10', color: null, letter: 'Ü' },
    { key: 'l11', color: null, letter: 'A' }, { key: 'l12', color: null, letter: 'S' },
    { key: 'l13', color: null, letter: 'D' }, { key: 'l14', color: null, letter: 'F' },
    { key: 'l15', color: null, letter: 'G' }, { key: 'l16', color: null, letter: 'H' },
    { key: 'l17', color: null, letter: 'J' }, { key: 'l18', color: null, letter: 'K' },
    { key: 'l19', color: null, letter: 'L' }, { key: 'l20', color: null, letter: 'Ş' },
    { key: 'l21', color: null, letter: 'İ' }, { key: 'l22', color: null, letter: 'Z' },
    { key: 'l23', color: null, letter: 'C' }, { key: 'l24', color: null, letter: 'V' },
    { key: 'l25', color: null, letter: 'B' }, { key: 'l26', color: null, letter: 'N' },
    { key: 'l27', color: null, letter: 'M' }, { key: 'l28', color: null, letter: 'Ö' },
    { key: 'l29', color: null, letter: 'Ç' }]

  const [kw, setKw] = useState(Keyword)
  // is continue
  const [game, setGame] = useState(true)
  // set the random words here
  const gameWords = [
    "RADYO",
    "BALIK",
    "DOLAP",
    "KALEM",
    "KAVUN",
    "KÖPEK",
    "MERAK",
    "GAZAP",
    "SEHPA",
    "ROMAN",
    "CEVİZ",]
  const [chosenWord, setChosenWord] = useState('');
  useEffect(() => {
    const randomIndex = gameWords[Math.floor(Math.random() * gameWords.length)];
    setChosenWord(randomIndex);
  }, []);


  //Winn kontrol
  const [win, setWin] = useState(false)
  //chosenWord = 'ahmet' etc.
  const Rows = [
    { color: [null, null, null, null, null], word: null },
    { color: [null, null, null, null, null], word: null },
    { color: [null, null, null, null, null], word: null },
    { color: [null, null, null, null, null], word: null },
    { color: [null, null, null, null, null], word: null },
    { color: [null, null, null, null, null], word: null }
  ];
  const [rows, setRows] = useState(Rows)
  //Input word array
  const [wordArray, setWordArray] = useState(Rows);
  const [inputValue, setInputValue] = useState('');
  //Compare chosenWord with user input
  //array color and decision function
  //Update color function 
  function updateColor(uLetter, color, item) {
    let indexkw = kw.findIndex(object => {
      return object.letter === item.toLocaleUpperCase("tr-TR");
    });
    uLetter = [...kw];
    if (uLetter[indexkw].color == '#6aaa64')
      uLetter[indexkw].color = '#6aaa64'
    else {
      uLetter[indexkw].color = color
      setKw(uLetter)
    }
  }
  const [round, setRound] = useState(0)
  let wordarray
  const compareWords = () => {
    const chosenWordArray = chosenWord.split('')
    wordarray = rows[round].word.split('')

    let updatedLetter
    const colorArray = wordarray.map((item, index) => {
      setRound(round + 1)
      if (item === chosenWordArray[index]) {
        rows[round].color[index] = '#6aaa64'
        updateColor(updatedLetter, '#6aaa64', item)
      }
      else if (chosenWordArray.includes(item)) {
        rows[round].color[index] = '#c9b458'
        updateColor(updatedLetter, '#c9b458', item)
      }
      else {
        rows[round].color[index] = '#787C7E'
        updateColor(updatedLetter, '#787C7E', item)
      }
      console.log(kw)
      console.log(updatedLetter)
    })
    return colorArray
  }
  const handleInputChange = (e) => {
    setInputValue(e.target.value.toLocaleUpperCase("tr-TR"));
  };
  const updateNullWord = () => {
    //lost game controll

    const index = wordArray.findIndex(row => row.word === null);
    if (index !== -1) {
      rows[index].word = inputValue
      wordArray[index].word = inputValue
      const updatedRows = [...wordArray];
      updatedRows[index] = { ...updatedRows[index], word: inputValue };
      setRows(updatedRows)
      setWordArray(updatedRows);
      setInputValue('');
      compareWords()
    }
    if (inputValue == chosenWord) {
      setWin(true)
      setInputDisabled(true);
      setButtonValue('NEW GAME')
      setInputValue('You Win! 🥳')

    }
  };

  const clickHandler = () => {
    if (win) {
      const refresh = () => window.location.reload(true)
      return refresh()
    }

    else {
      if (inputValue.length < 5) {
        alert('kelime 5 harfli olmalı 😅')
        setInputValue('')
      }
      else
        updateNullWord()
    }
  }

  return (
    <>

      <div className={styles.inputContainer} >
        <input maxLength='5' className={styles.input}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          disabled={isInputDisabled}
        />
        <button className={styles.updateButton} onClick={clickHandler}>{buttonValue}</button>
      </div>
      <div className={styles.tableContainer}><div className={styles.table}>
        <Table color={wordArray.map(item => item.color)} wordArray={wordArray.map(item => item.word)} />

      </div></div>
      <div className={styles.keyBoard}>
        {kw.map(item =>
          <KeyBoard key={item.key} color={item.color} letter={item.letter} />

        )}

      </div>
    </>

  );
}
