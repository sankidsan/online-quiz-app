import React, { useState, useEffect } from 'react';
function Timer({ setTimeUp, duration }) {
  const [time, setTime] = useState(duration);
  useEffect(() => {
    if (time > 0) {
      const timerId = setInterval(() => setTime(time - 1), 1000);
      return () => clearInterval(timerId);
    } else {
      setTimeUp(true);
    }
  }, [time, setTimeUp]);

  return <div className="timer">Time Remaining: {time} seconds</div>;
}
export default Timer;
