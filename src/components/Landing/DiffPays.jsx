import React from 'react';
import { isMobile } from 'react-device-detect';
import { DollarSign, File, Repeat } from 'react-feather';

const DiffPays = () => {
  return isMobile ? (
    <div className="flex flex-col gap-4 w-full">
      <div className="w-full p-2 border border-gray-200 bg-white rounded-md flex flex-col items-start">
        <DollarSign size={18} className="text-stone-800" />
        <p className="text-sm font-bold text-stone-800 mt-1">Single</p>
        <p className="text-xs text-stone-800 text-left">
          Collect one time payments. Supports business models that don't rely on
          commitment and need a simple solution.
        </p>
      </div>
      <div className="w-full p-2 border border-gray-200 bg-white rounded-md flex flex-col items-start">
        <Repeat size={18} className="text-stone-800" />
        <p className="text-sm font-bold text-stone-800 mt-1">Recurring</p>
        <p className="text-xs text-stone-800 text-left">
          Collect payments on a recurring basis. Select between weekly and
          monthly payments to generate recurring revenue.
        </p>
      </div>
    </div>
  ) : (
    <div className="w-full flex flex-col gap-1 items-end">
      <div className="flex gap-2">
        <div className="w-6/12 p-2 border border-gray-200 bg-white rounded-md flex flex-col items-start">
          <DollarSign size={18} className="text-stone-800" />
          <p className="text-sm font-bold text-stone-800 mt-1">Single</p>
          <p className="text-xs text-stone-800 text-left">
            Collect one time payments. Supports business models that don't rely
            on commitment and need a simple solution.
          </p>
        </div>
        <div className="w-6/12 p-2 border border-gray-200 bg-white rounded-md flex flex-col items-start">
          <Repeat size={18} className="text-stone-800" />
          <p className="text-sm font-bold text-stone-800 mt-1">Recurring</p>
          <p className="text-xs text-stone-800 text-left">
            Collect payments on a recurring basis. Select between weekly and
            monthly payments to generate recurring revenue.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiffPays;
