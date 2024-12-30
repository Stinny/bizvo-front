import React from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { useNavigate } from 'react-router-dom';

const BackBtn = ({ direction }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous route in history
  };

  return direction === 'left' ? (
    <button
      type="button"
      onClick={handleGoBack}
      className="flex items-center text-xs text-stone-800 border border-stone-800 rounded-md p-1 pl-0.5 pr-0.5"
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
