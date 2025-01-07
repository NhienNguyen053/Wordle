import { useState, useEffect } from 'react';
import Modal from './Modal';

function WordInput({ index, setDone, inputLetter, setInputLetter, setModalText, setShake }) {
    const [letters, setLetters] = useState(['', '', '', '', '']);
    const [lettersStatus, setLettersStatus] = useState(['', '', '', '', '']);
    const [correctWord, setCorrectWord] = useState(['D', 'R', 'A', 'K', 'E']);
    const [animate, setAnimate] = useState(false);
    
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
                        const newStatus = letters.map((letter, idx) => {
                            if (letter === correctWord[idx]) {
                                return '#538d4e';
                            }
                            if (correctWord.includes(letter)) {
                                return '#b59f3b';
                            }
                            return '#3a3a3c';
                        });
                        setLettersStatus(newStatus);
                        setAnimate(true);
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
                <div key={index} className={`box ${letter ? 'active' : ''} ${animate ? 'flip2' : ''}`} style={{ animationDelay: `${index * 0.3}s` }}>{letter}</div>
            ))}
        </>
    );
}

export default WordInput;
