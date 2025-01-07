import { useState, useEffect } from 'react';
import './App.css';
import WordInput from './components/WordInput';
import Modal from './components/Modal';

function App() {
    const [words, setWords] = useState(['', '', '', '', '', '']);
    const [activeWordIndex, setActiveWordIndex] = useState(0);
    const [key, setKey] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [text, setText] = useState('');
    const [shakeIndex, setShakeIndex] = useState(-1);
    const keyboardLayout = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
    ];

    const setVisible = (value) => {
        setIsVisible(true);
        setText(value);
        setTimeout(() => {
            setIsVisible(false);
        }, 1000);
    };

    const handleKeyDown = (event) => {
        setKey(event.key);
    };

    const keyboardClick = (key) => {
        setKey(key);
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [activeWordIndex]);

    const updateWord = (value, index) => {
        if (activeWordIndex < words.length - 1) {
            setActiveWordIndex((prevIndex) => prevIndex + 1);
        }
        const newWords = [...words];
        newWords[index] = value;
        setWords(newWords);
    };

    const setShake = (value) => {
        setShakeIndex(value);
        setTimeout(() => {
            setShakeIndex(-1);
        }, 1000);
    }

    return (
        <>
            <Modal isVisible={isVisible} text={text}/>
            <div style={{ marginBottom: '15px' }}>
                {words.map((word, index) => (
                    <div className={`container ${shakeIndex === index ? 'shake' : ''} `} key={index}>
                        <WordInput 
                            index={activeWordIndex}
                            inputLetter={activeWordIndex === index ? key : ''} 
                            setInputLetter={(value) => setKey(value)}
                            setDone={(value) => updateWord(value, index)}
                            setModalText={setVisible}
                            setShake={(value) => setShake(value)}
                        />
                    </div>
                ))}
            </div>
            <div>
                {keyboardLayout.map((row, rowIndex) => (
                    <div className="container2" key={rowIndex} style={{ width: rowIndex === 1 ? '456px' : '' }}>
                        {row.map((key) => (
                            <div key={key} className='button' style={{ fontSize: key === 'ENTER' ? '0.75rem' : '', width: key === 'ENTER' || key === 'BACKSPACE' ? '15%' : '' }} onClick={() => keyboardClick(key)}>
                                {key === 'BACKSPACE' ? (
                                    <i className="fa-solid fa-delete-left"></i>
                                ) : (
                                    key
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
}

export default App;
