import React from 'react';
import {
  AlertOctagon,
  CheckCircle,
  CreditCard,
  FileText,
  RefreshCw,
  Send,
  XSquare,
} from 'react-feather';
import { Link } from 'react-router-dom';
import DateFormat from './DateFormat';

const InvoEvent = ({ even, handleOpenEvent }) => {
  let evIcon;

  switch (even?.type) {
    case 'sent':
      evIcon = <Send size={12} className="text-stone-800" />;
      break;
    case 'cancel':
      evIcon = <XSquare size={12} className="text-red-400" />;
      break;
    case 'paid':
      evIcon = <CheckCircle size={12} className="text-green-400" />;
      break;
    case 'fail':
      evIcon = <AlertOctagon size={12} className="text-red-400" />;
      break;
    default:
      break;
  }

  return (
    <button
      type="button"
      onClick={() => handleOpenEvent(even)}
      className={`w-full flex items-center justify-between border border-gray-200 hover:border-stone-800 cursor-pointer rounded-sm p-2 ${
        even?.seen ? 'bg-white' : 'bg-gray-50'
      }`}
      key={even?._id}
    >
      <div className="flex items-center justify-start text-left">
        {even?.type === 'paid' ? (
          <p className="text-stone-800 font-medium dark:text-white text-xs">
            {even?.email}
          </p>
        ) : even?.type === 'cancel' ? (
          <p className="text-stone-800 dark:text-white text-xs font-medium">
            Invoice canceled
          </p>
        ) : (
          <p
            className="text-stone-800 dark:text-white text-xs font-medium"
            // style={{ fontSize: '11px' }}
          >
            Invoice overdue
          </p>
        )}
      </div>
      {/* <div className="w-10 flex justify-start">{evIcon}</div> */}

      {/* <DateFormat createdAt={even?.createdAt} /> */}
      <div className="flex items-center justify-end w-52">
        {even?.type === 'paid' ? (
          <p className="text-stone-800 text-xs font-medium dark:text-white">
            +$
            {parseFloat(even?.amount / 100)?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        ) : even?.type === 'cancel' ? (
          <XSquare size={16} className="text-red-400" />
        ) : (
          <p
            className="text-stone-800 dark:text-white text-xs"
            // style={{ fontSize: '11px' }}
          >
            <AlertOctagon size={16} className="text-amber-300" />
          </p>
        )}
      </div>
    </button>
  );
};

export default InvoEvent;
