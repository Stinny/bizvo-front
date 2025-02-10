import { Tooltip } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Clock } from 'react-feather';

const LinkExp = ({ expDate, refetch }) => {
  const calculateTimeLeft = () => {
    const now = new Date(); // Local time
    const expirationTime = new Date(expDate); // Convert UTC to local
    const difference = expirationTime.getTime() - now.getTime();

    if (difference <= 0) return { hours: 0, minutes: 0, seconds: 0 };

    return {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [expDate]);

  useEffect(() => {
    if (timeLeft?.minutes === 0 && timeLeft?.seconds === 0) {
      refetch();
    }
  }, [timeLeft]);

  return (
    <Tooltip
      style="light"
      arrow={false}
      content={
        <p className="text-xs text-stone-800 text-left">
          Time until payment link expires
        </p>
      }
    >
      <p className="hover:cursor-pointer">
        <span
          className={`font-medium text-xs  ${
            timeLeft?.minutes < 1 ? 'text-red-400' : 'text-stone-800'
          }`}
        >
          {String(timeLeft.minutes).padStart(2, '0')}:
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
      </p>
    </Tooltip>
  );
};

export default LinkExp;
