import { useState, useEffect } from 'react';
import './App.css';
import WordInput from './components/WordInput';
import Modal from './components/Modal';

function App() {
    const [firstWord, setFirstWord] = useState('');
    const [firstKey, setFirstKey] = useState();

    const [secondWord, setSecondWord] = useState('');
    const [secondKey, setSecondKey] = useState();

    const [thirdWord, setThirdWord] = useState('');
    const [thirdKey, setThirdKey] = useState();

    const [fourthWord, setFourthWord] = useState('');
    const [fourthKey, setFourthKey] = useState();

    const [fifthWord, setFifthWord] = useState('');
    const [fifthKey, setFifthKey] = useState();

    const [sixthWord, setSixthWord] = useState('');
    const [sixthKey, setSixthKey] = useState();

    const [isVisible, setIsVisible] = useState('');

    const setVisible = (value) => {
        setIsVisible(value);
        
        setTimeout(() => {
            setIsVisible('');
        }, 1000);
    };

    const setFirst = (value) => {
        setFirstWord(value);
    }
    
    const setSecond = (value) => {
        setSecondWord(value);
    }

    const setThird = (value) => {
        setThirdWord(value);
    }

    const setFourth = (value) => {
        setFourthWord(value);
    }

    const setFifth = (value) => {
        setFifthWord(value);
    }

    const setSixth = (value) => {
        setSixthWord(value);
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (firstWord === '') {
                setFirstKey(event.key);
            }
            else if (secondWord === '') {
                setSecondKey(event.key);
            }
            else if (thirdWord === '') {
                setThirdKey(event.key);
            }
            else if (fourthWord === '') {
                setFourthKey(event.key);
            }
            else if (fifthWord === '') {
                setFifthKey(event.key);
            }
            else if (sixthWord === '') {
                setSixthKey(event.key);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <>
            <Modal isVisible={isVisible}/>
            <div style={{ marginBottom: '15px' }}>
                <div className="container">
                    <WordInput inputLetter={firstKey} setInputLetter={setFirstKey} setDone={setFirst} setIsVisible={setVisible}/>
                </div>
                <div className="container">
                    <WordInput inputLetter={secondKey} setInputLetter={setSecondKey} setDone={setSecond} setIsVisible={setVisible}/>
                </div>
                <div className="container">
                    <WordInput inputLetter={thirdKey} setInputLetter={setThirdKey} setDone={setThird} setIsVisible={setVisible}/>
                </div>
                <div className="container">
                    <WordInput inputLetter={fourthKey} setInputLetter={setFourthKey} setDone={setFourth} setIsVisible={setVisible}/>
                </div>
                <div className="container">
                    <WordInput inputLetter={fifthKey} setInputLetter={setFifthKey} setDone={setFifth} setIsVisible={setVisible}/>
                </div>
                <div className="container">
                    <WordInput inputLetter={sixthKey} setInputLetter={setSixthKey} setDone={setSixth} setIsVisible={setVisible}/>
                </div>
            </div>
            <div>
                <div className="container2">
                    <button className="button">Q</button>
                    <button className="button">W</button>
                    <button className="button">E</button>
                    <button className="button">R</button>
                    <button className="button">T</button>
                    <button className="button">Y</button>
                    <button className="button">U</button>
                    <button className="button">I</button>
                    <button className="button">O</button>
                    <button className="button">P</button>
                </div>
                <div className="container2" style={{ width: '456px' }}>
                    <button className="button">A</button>
                    <button className="button">S</button>
                    <button className="button">D</button>
                    <button className="button">F</button>
                    <button className="button">G</button>
                    <button className="button">H</button>
                    <button className="button">J</button>
                    <button className="button">K</button>
                    <button className="button">L</button>
                </div>
                <div className="container2">
                    <button className="button" style={{ fontSize: '0.75rem', width: '15%' }}>ENTER</button>
                    <button className="button">Z</button>
                    <button className="button">X</button>
                    <button className="button">C</button>
                    <button className="button">V</button>
                    <button className="button">B</button>
                    <button className="button">N</button>
                    <button className="button">M</button>
                    <button className="button" style={{ width: '15%' }}><i className="fa-solid fa-delete-left"></i></button>
                </div>
            </div>
        </>
    )
}

export default App
