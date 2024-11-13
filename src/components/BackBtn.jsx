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
      className="flex items-center text-xs text-stone-800"
    >
      <ChevronLeft size={16} />
      Back
    </button>
  ) : (
    <button
      type="button"
      onClick={handleGoBack}
      className="flex items-center text-xs text-stone-800"
    >
      Back
      <ChevronRight size={16} />
    </button>
  );
};

export default BackBtn;
