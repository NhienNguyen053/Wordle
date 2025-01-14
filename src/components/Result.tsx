import React, { useState, useEffect } from 'react';
import '../index.css';
import Chart from './Chart';

function Result({ isVisible, gameData, playAgain }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(isVisible);
    }, [isVisible]);

    const closeModal = () => {
        setVisible(false);
    }

    return (
        <div style={{ pointerEvents: visible ? 'auto' : 'none', zIndex: 1000 }}>
            <div className={`overlay ${visible ? 'visible' : ''}`}></div>            
            <div className={`result ${visible ? 'visible' : 'hidden'}`}>
                <div className='exit'>
                    <i className="fa-solid fa-xmark" onClick={closeModal}></i>
                </div>
                <div style={{fontSize: '20px', color: 'white', fontWeight: 500, marginTop: '10px'}}>STATISTICS</div>
                {gameData && (
                    <>
                    <div style={{ display: 'flex', gap: '2%' }}>
                        <div style={{ width: '23.5%' }}>
                            <div>{gameData.gamesPlayed}</div>
                            <div>Played</div>
                        </div>
                        <div style={{ width: '23.5%' }}>
                            <div>{gameData.gamesPlayed > 0 ? Math.round((gameData.wins.reduce((sum, win) => sum + win, 0) / gameData.gamesPlayed) * 100) : 0}</div>
                            <div>Win %</div>
                        </div>
                        <div style={{ width: '23.5%' }}>
                            <div>{gameData.streak}</div>
                            <div>Current Streak</div>
                        </div>
                        <div style={{ width: '23.5%' }}>
                            <div>{gameData.bestStreak}</div>
                            <div>Best Streak</div>
                        </div>
                    </div>
                    <div style={{fontSize: '20px', color: 'white', fontWeight: 500, marginTop: '10px'}}>GUESS DISTRIBUTION</div>
                    <Chart data={gameData.wins}/>
                    </>
                )}
                <button style={{ background: '#4b9147', borderRadius: '5px', color: 'white' }} onClick={playAgain}>PLAY AGAIN</button>
            </div>
        </div>
    );
}

export default Result;
