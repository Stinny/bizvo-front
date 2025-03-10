import React from 'react';
import InvoStatus from '../InvoStatus';

const Status = ({ invoice }) => {
  return (
    <div className="w-full flex justify-between items-start">
      <div className="flex flex-col items-start">
        <p className="text-stone-800 text-sm">
          {invoice?.type === 'single' ? 'Invoice' : 'Recurring Invoice'}
        </p>
        <p className="text-stone-800 text-xs">#{invoice?._id}</p>
      </div>
      <InvoStatus status={invoice?.status} />
    </div>
  );
};

export default Status;
