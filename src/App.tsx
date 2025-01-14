import { useState, useEffect } from 'react';
import './App.css';
import WordInput from './components/WordInput';
import Modal from './components/Modal';
import Result from './components/Result';
import { encryptData, decryptData, getRandomWord } from './utils';

function App() {
    const [words, setWords] = useState(Array(6).fill(''));
    const [activeWordIndex, setActiveWordIndex] = useState(0);
    const [key, setKey] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [modalText, setModalText] = useState('');
    const [shakeIndex, setShakeIndex] = useState(-1);
    const [correctWord, setCorrectWord] = useState<string[]>([]);
    const [usedWords, setUsedWords] = useState<string[]>([]);
    const [isAnimating, setIsAnimating] = useState(false);
    const [statistics, setStatistics] = useState<Object>();
    const [reset, setReset] = useState(false);
    const [keyboardLayout, setKeyboardLayout] = useState([
        [
            { letter: 'Q', color: '#818384' },
            { letter: 'W', color: '#818384' },
            { letter: 'E', color: '#818384' },
            { letter: 'R', color: '#818384' },
            { letter: 'T', color: '#818384' },
            { letter: 'Y', color: '#818384' },
            { letter: 'U', color: '#818384' },
            { letter: 'I', color: '#818384' },
            { letter: 'O', color: '#818384' },
            { letter: 'P', color: '#818384' },
        ],
        [
            { letter: 'A', color: '#818384' },
            { letter: 'S', color: '#818384' },
            { letter: 'D', color: '#818384' },
            { letter: 'F', color: '#818384' },
            { letter: 'G', color: '#818384' },
            { letter: 'H', color: '#818384' },
            { letter: 'J', color: '#818384' },
            { letter: 'K', color: '#818384' },
            { letter: 'L', color: '#818384' },
        ],
        [
            { letter: 'ENTER', color: '#818384' },
            { letter: 'Z', color: '#818384' },
            { letter: 'X', color: '#818384' },
            { letter: 'C', color: '#818384' },
            { letter: 'V', color: '#818384' },
            { letter: 'B', color: '#818384' },
            { letter: 'N', color: '#818384' },
            { letter: 'M', color: '#818384' },
            { letter: 'BACKSPACE', color: '#818384' },
        ],
    ]);
    

    const showModal = (message: string) => {
        setModalText(message);
        setIsVisible(true);
        setTimeout(() => setIsVisible(false), 1000);
    };

    const setShake = (index: number) => {
        setShakeIndex(index);
        setTimeout(() => setShakeIndex(-1), 1000);
    };

    const updateStatistics = (win: boolean) => {
        const savedData = localStorage.getItem('gameData');
        const gameData = savedData ? JSON.parse(savedData) : null;
    
        const totalWins = gameData?.wins.reduce((sum: any, win: any) => sum + win, 0) || 0;
        const updatedWins = [...(gameData?.wins || [])];
    
        if (win && activeWordIndex >= 0 && activeWordIndex < updatedWins.length) {
            updatedWins[activeWordIndex] = (updatedWins[activeWordIndex] || 0) + 1;
        }
    
        const newStatistics = {
            gamesPlayed: (gameData?.gamesPlayed || 0) + 1,
            winRate: Math.round(((totalWins + (win ? 1 : 0)) / ((gameData?.gamesPlayed || 0) + 1)) * 100),
            streak: win ? (gameData?.streak || 0) + 1 : 0,
            bestStreak: Math.max(gameData?.bestStreak || 0, win ? (gameData?.streak || 0) + 1 : 0),
            guesses: [...words],
            wins: updatedWins,
            isDone: true,
            word: encryptData(correctWord.join('')),
        };
    
        localStorage.setItem('gameData', JSON.stringify(newStatistics));
        setStatistics(newStatistics);
    };
    
    const updateWord = (value: string, index: number, status: string[]) => {
        setIsAnimating(true);
        const newWords = [...words];
        newWords[index] = value;
        setWords(newWords);
        const updatedLayout = [...keyboardLayout];
        for (let i = 0; i < value.length; i++) {
            const letter = value[i];
            for (const row of updatedLayout) {
                for (const key of row) {
                    if (key.letter === letter) {
                        if (key.color !== '#538d4e') {
                            if (status[i] === 'flip1') {
                                key.color = '#3a3a3c';
                            } else if (status[i] === 'flip2') {
                                key.color = '#b59f3b';
                            } else if (status[i] === 'flip3') {
                                key.color = '#538d4e';
                            }
                        }
                    }
                }
            }
        }
        setKeyboardLayout(updatedLayout);

        if (value === correctWord.join('')) {
            showModal('You won!');
            updateStatistics(true);
            setTimeout(() => { setIsDone(true) }, 2000);
        } else if (activeWordIndex < words.length - 1) {
            setActiveWordIndex((prev) => prev + 1);
        } else {
            showModal(correctWord.join(''));
            updateStatistics(false);
            setTimeout(() => { setIsDone(true) }, 2000);
        }

        setTimeout(() => setIsAnimating(false), 2000);
    };

    const playAgain = () => {
        const newWord = getRandomWord(usedWords);
        const savedData = localStorage.getItem('gameData');
        setUsedWords((prev) => [...prev, newWord.join('')]);
        setCorrectWord(newWord);
        setWords(Array(6).fill(''));
        setActiveWordIndex(0);
        setKey('');
        setReset(true);
        setIsDone(false);
        setKeyboardLayout((prevLayout) =>
            prevLayout.map(row =>
                row.map(key => ({
                    ...key,
                    color: '#818384',
                }))
            )
        );
        if (savedData) {
            const gameData = JSON.parse(savedData);
            gameData.isDone = false;
            gameData.guesses = ['', '', '', '', '', ''];
            gameData.word = encryptData(newWord.join(''));
            localStorage.setItem('gameData', JSON.stringify(gameData));
        } else {
            const defaultData = {
                gamesPlayed: 0,
                winRate: 0,
                streak: 0,
                bestStreak: 0,
                guesses: ['', '', '', '', '', ''],
                wins: [0, 0, 0, 0, 0, 0],
                isDone: false,
                word: encryptData(newWord.join('')),
            };
            localStorage.setItem('gameData', JSON.stringify(defaultData));
        }
    };

    const initializeGame = () => {
        const savedData = localStorage.getItem('gameData');
        if (savedData) {
            const gameData = JSON.parse(savedData);
            const word = decryptData(gameData.word);
            setCorrectWord(word.split(''));
            setWords(gameData.guesses || Array(6).fill(''));
            setIsDone(gameData.isDone);
            setStatistics(gameData);
        } else {
            const newWord = getRandomWord(usedWords);
            setUsedWords((prev) => [...prev, newWord.join('')]);
            setCorrectWord(newWord);
            localStorage.setItem(
                'gameData',
                JSON.stringify({
                    gamesPlayed: 0,
                    winRate: 0,
                    streak: 0,
                    bestStreak: 0,
                    guesses: Array(6).fill(''),
                    wins: Array(6).fill(0),
                    isDone: false,
                    word: encryptData(newWord.join('')),
                })
            );
        }
    };

    const resetFalse = () => {
        setReset(false)
    }

    useEffect(() => {
        initializeGame();
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => setKey(e.key);
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <>
            <Modal isVisible={isVisible} text={modalText} />
            <Result isVisible={isDone} gameData={statistics} playAgain={playAgain} />
            {correctWord[0] && (
                <div style={{ marginBottom: '15px' }}>
                    {words.map((word, index) => (
                        <div
                            className={`container ${shakeIndex === index ? 'shake' : ''}`}
                            key={index}
                        >
                            <WordInput
                                word={word}
                                index={activeWordIndex}
                                inputLetter={activeWordIndex === index ? key : ''}
                                setInputLetter={setKey}
                                setDone={(value: string, status: string[]) => updateWord(value, index, status)}
                                setModalText={showModal}
                                setShake={setShake}
                                correctWord={correctWord}
                                isAnimating={isAnimating}
                                reset={reset}
                                setReset={resetFalse}
                            />
                        </div>
                    ))}
                </div>
            )}
            <div style={{ width: '100%' }}>
                {keyboardLayout.map((row, rowIndex) => (
                    <div
                        className={rowIndex === 1 ? 'container3' : 'container2' }
                        key={rowIndex}
                    >
                        {row.map((key) => (
                            <div
                                key={key.letter}
                                className="button"
                                style={{
                                    fontSize: key.letter === 'ENTER' ? '0.75rem' : '',
                                    width: ['ENTER', 'BACKSPACE'].includes(key.letter) ? '15%' : '',
                                    background: key.color
                                }}
                                onClick={() => setKey(key.letter)}
                            >
                                {key.letter === 'BACKSPACE' ? (
                                    <i className="fa-solid fa-delete-left"></i>
                                ) : (
                                    key.letter
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
