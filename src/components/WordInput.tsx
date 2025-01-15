import { useState, useEffect, useRef } from 'react';
import wordList from '../../wordsList.json';

function WordInput({ word, index, setDone, inputLetter, setInputLetter, setModalText, setShake, correctWord, isAnimating, reset, setReset }) {
    const [letters, setLetters] = useState(['', '', '', '', '']);
    const [lettersStatus, setLettersStatus] = useState(['', '', '', '', '']);
    const [animate, setAnimate] = useState(false);
    const wordSetRef = useRef(false);

    useEffect(() => {
        if (!wordSetRef.current) {
            if (word) {
                const splittedWord = word.split('');
                setLetters(splittedWord);
                const newStatus = splittedWord.map((letter, idx) => {
                    if (letter === correctWord[idx]) {
                        return 'flip3';
                    }
                    if (correctWord.includes(letter)) {
                        return 'flip2';
                    }
                    return 'flip1';
                });
                setLettersStatus(newStatus);
                setAnimate(true);
                setDone(word, newStatus);
            }
            wordSetRef.current = true;
        }
    }, [correctWord]);

    useEffect(() => {
        if (reset) {
            setLetters(['', '', '', '', '']);
            setLettersStatus(['', '', '', '', '']);
            setReset();
        }
    }, [reset])
    
    useEffect(() => {
        const wordle = async() => {
            if (isAnimating) {
                return;
            }

            if (inputLetter) {
                if (inputLetter && /[a-zA-Z]/.test(inputLetter) && inputLetter.length === 1) {
                    setLetters((prevLetters) => {
                        const newLetters = [...prevLetters];
                        const nextIndex = newLetters.findIndex((letter) => letter === '');
                        if (nextIndex !== -1) {
                            newLetters[nextIndex] = inputLetter.toUpperCase();
                        }
                        return newLetters;
                    });
                }
                if (inputLetter === 'Backspace' || inputLetter === 'BACKSPACE') {
                    setLetters((prevLetters) => {
                        const newLetters = [...prevLetters];
                        const lastFilledIndex = newLetters.findLastIndex((letter) => letter !== '');
                        if (lastFilledIndex !== -1) {
                            newLetters[lastFilledIndex] = '';
                        }
                        return newLetters;
                    });
                }
                if (inputLetter === 'Enter' || inputLetter === 'ENTER') {
                    if (letters.some((letter) => letter === '')) {
                        setModalText("Not enough letters");
                        setShake(index);
                    } else {
                        const words = Object.keys(wordList);
                        if (!words.includes(letters.join('').toLowerCase())) {
                            setModalText("Not in word list");
                            setShake(index);
                        } else {
                            const newStatus = letters.map((letter, idx) => {
                                if (letter === correctWord[idx]) {
                                    return 'flip3';
                                }
                                if (correctWord.includes(letter)) {
                                    return 'flip2';
                                }
                                return 'flip1';
                            });
                            setLettersStatus(newStatus);
                            setAnimate(true);
                            setDone(letters.join(''), newStatus);
                            saveLocal();
                        }
                    }
                }
                setInputLetter(null);
            }
        }
        wordle();
    }, [inputLetter]);

    const saveLocal = () => {
        const currentGuess = letters.join('');
        let data = localStorage.getItem('gameData');
        if (data) {
            const parsedData = JSON.parse(data);
            parsedData.guesses[index] = currentGuess;
            localStorage.setItem('gameData', JSON.stringify(parsedData));
        }
    };
    

    return (
        <>
            {letters.map((letter, index) => (
                <div key={index} className={`box ${letter ? 'active' : ''} ${animate ? lettersStatus[index] : ''}`} style={{ animationDelay: `${index * 0.3}s` }}>{letter}</div>
            ))}
        </>
    );
}

export default WordInput;
