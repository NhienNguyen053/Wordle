import { useState, useEffect } from 'react';
import Modal from './Modal';

function WordInput({ setDone, inputLetter, setInputLetter, setIsVisible }) {
    const [letters, setLetters] = useState(['', '', '', '', '']);
    const [lettersStatus, setLettersStatus] = useState(['', '', '', '', '']);
    const [correctWord, setCorrectWord] = useState(['D', 'R', 'A', 'K', 'E']);
    
    useEffect(() => {
        const wordle = async() => {
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
                if (inputLetter === 'Backspace') {
                    setLetters((prevLetters) => {
                        const newLetters = [...prevLetters];
                        const lastFilledIndex = newLetters.findLastIndex((letter) => letter !== '');
                        if (lastFilledIndex !== -1) {
                            newLetters[lastFilledIndex] = '';
                        }
                        return newLetters;
                    });
                }
                if (inputLetter === 'Enter') {
                    if (letters.some((letter) => letter === '')) {
                        setIsVisible("Not enough letters");
                    } else {
                        // should have check if word is valid here but
                        const status = [...lettersStatus];
                        letters.map((letter, index) => {
                            if (letter === correctWord[index]) {
                                status[index] = 'green';
                            } else {
                                const exist = correctWord.map((word, index2) => {
                                    if (letter === word[index2]) {
                                        status[index] = 'yellow';
                                        return true;
                                    } else {
                                        if (index2 === (correctWord.length - 1)) {
                                            return false;
                                        }
                                    }
                                });
                                const hasExist = exist.some((item) => item === true);
                                if (!hasExist) {
                                    status[index] = 'gray';
                                }
                            } 
                        });
                        setDone(letters.join(''));
                    }
                }
                setInputLetter(null);
            }
        }
        wordle();
    }, [inputLetter]);


    return (
        <>
            {letters.map((letter, index) => (
                <div key={index} className={`box ${letter ? 'active' : ''}`}>{letter}</div>
            ))}
        </>
    );
}

export default WordInput;
