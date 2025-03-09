import { Tooltip } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Clock, Info } from 'react-feather';

const LinkExp = ({ expDate, refetch, isOwner }) => {
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
    if (timeLeft?.minutes === 0 && timeLeft?.seconds === 0 && !isOwner) {
      refetch();
    }
  }, [timeLeft]);

  return isOwner ? (
    <Tooltip
      style="light"
      arrow={false}
      content={
        <p className="text-xs text-stone-800 text-left w-52">
          Opened from your dashboard. This is a preview only.
        </p>
      }
    >
      <div className="flex items-center gap-1">
        <Info size={12} className="text-blue-400" />
        <p className="text-blue-400" style={{ fontSize: '11px' }}>
          Preview
        </p>
      </div>
    </Tooltip>
  ) : (
    <Tooltip
      style="light"
      arrow={false}
      content={
        <p className="text-xs text-stone-800 text-left w-52">
          Time until this payment link expires and a new one is needed
        </p>
      }
    >
      <p
        className={`font-medium hover:cursor-pointer  ${
          timeLeft?.minutes < 1 ? 'text-red-300' : 'text-stone-800'
        }`}
        style={{ fontSize: '11px' }}
      >
        {/* <Clock size={12} /> */}
        <span
          className={`font-medium  ${
            timeLeft?.minutes < 1 ? 'text-red-300' : 'text-stone-800'
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
