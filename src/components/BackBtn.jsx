import React from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { useNavigate } from 'react-router-dom';

const BackBtn = ({ direction, home }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (home) {
      navigate('/'); // Go back to the previous route in history
    } else {
      navigate(-1); // Go back to the previous route in history
    }
  };

  return direction === 'left' ? (
    <button
      type="button"
      onClick={handleGoBack}
      className="flex items-center justify-center text-stone-800 border border-stone-800 rounded-md p-0.5 flex-grow"
    >
      <ChevronLeft size={14} />
    </button>
  ) : (
    <button
      type="button"
      onClick={handleGoBack}
      className="flex items-center text-xs text-stone-800"
    >
      <ChevronRight size={16} />
    </button>
  );
};

export default BackBtn;
