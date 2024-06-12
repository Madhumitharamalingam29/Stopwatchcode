import React, { useState, useRef } from 'react';
import './stopwatch.css'; // Import CSS file for styling

function Stopwatch() {
    const [timer, setTimer] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const displayRef = useRef(null);

    const startStopwatch = () => {
        if (!isRunning) {
            const startTime = Date.now() - elapsedTime;
            setTimer(setInterval(() => {
                const currentTime = Date.now();
                const elapsed = currentTime - startTime;
                setElapsedTime(elapsed);
            }, 10));
            setIsRunning(true);
            displayRef.current.textContent = 'Stop';
        } else {
            clearInterval(timer);
            setIsRunning(false);
            displayRef.current.textContent = 'Start';
        }
    };

    const resetStopwatch = () => {
        clearInterval(timer);
        setIsRunning(false);
        setElapsedTime(0);
        displayRef.current.textContent = 'Start';
    };

    const formatTime = (time) => {
        const milliseconds = Math.floor(time % 1000 / 10);
        const seconds = Math.floor(time / 1000 % 60);
        const minutes = Math.floor(time / 60000 % 60);
        const hours = Math.floor(time / 3600000);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="stopwatch-container">
            <div ref={displayRef} className="display">Start</div>
            <button onClick={startStopwatch} className="control-button">{isRunning ? 'Stop' : 'Start'}</button>
            <button onClick={resetStopwatch} className="control-button">Reset</button>
            <div className="elapsed-time">Elapsed Time: {formatTime(elapsedTime)}</div>
        </div>
    );
}

export default Stopwatch;
