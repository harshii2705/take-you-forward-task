import React, { useState, useEffect } from 'react';
import Timer from './Timer';

const Banner = ({ description, link, duration, onTimerEnd }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        onTimerEnd();
      }, duration * 1000);

      return () => clearTimeout(timer);
    }
  }, [duration, onTimerEnd]);

  if (!visible) return null;

  return (
    <div className="banner">
      <p>{description}</p>
      <a href={link} target="_blank" rel="noopener noreferrer">Click Here</a>
      <Timer duration={duration} />
    </div>
  );
};

export default Banner;
