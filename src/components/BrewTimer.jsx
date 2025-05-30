import React, { useState, useEffect } from "react";

function BrewTimer({ seconds, onStart}) {
  console.log("受け取った秒数:" , seconds)
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [isRunning, setRunning] = useState(false);

  useEffect(() => {
    let timerId;

    if (isRunning && timeLeft > 0) {
      timerId = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      setRunning(false);
      alert("done.");
    }

    return () => clearTimeout(timerId);
  }, [isRunning, timeLeft]);


    const handleStart = () => {
      if (timeLeft > 0) {
        setRunning(true);
        onStart?.();
      }
    };

  const handleStop = () => {
    setRunning(false);
  };

  const resetTimer = () => {
    setTimeLeft(seconds);
    setRunning(false);
  };

  return (
    <div style={{ backgroundColor: 'rgb(196, 118, 41)', padding: '1rem', borderRadius: '8px' }}>
      <div style={{ fontSize: "2rem", textAlign: "center"}}>{timeLeft}sec</div>
      <div className="timer-button-group">
        {isRunning? (
          <button onClick={handleStop}>Stop</button>
        ) : (
          <button onClick={handleStart} disabled={timeLeft === 0}>
            Start
          </button>
        )}
      <button onClick={resetTimer}>Reset</button>
     </div>
    </div>
  );
}

export default BrewTimer;