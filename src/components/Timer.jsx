import React, { useEffect } from 'react';

const Timer = ({ timeLeft, setTimeLeft }) => {
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, [setTimeLeft]);

    const days = Math.floor(timeLeft / (24 * 3600));
    const hours = Math.floor((timeLeft % (24 * 3600)) / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="banner">
			Time left:
			<h1 >
			{days}d {hours}h {minutes}m {seconds}s
			</h1>
        </div>
    );
};

export default Timer;
