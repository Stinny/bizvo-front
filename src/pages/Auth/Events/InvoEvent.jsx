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
      className={`w-full flex items-center justify-between border border-gray-200 hover:border-stone-800 rounded-md p-2 ${
        even?.seen ? '' : 'bg-gray-50'
      }`}
      key={even?._id}
    >
      <div className="flex items-center justify-start text-left">
        {even?.type === 'paid' ? (
          <p
            className="text-stone-800 dark:text-white"
            style={{ fontSize: '11px' }}
          >
            {even?.content}{' '}
            <span className="font-medium">
              $
              {parseFloat(even?.amount / 100)?.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </p>
        ) : even?.type === 'sent' ? (
          <p
            className="text-stone-800 dark:text-white"
            style={{ fontSize: '11px' }}
          >
            {even?.content} <span className="font-medium">{even?.email}</span>
          </p>
        ) : (
          <p
            className="text-stone-800 dark:text-white"
            style={{ fontSize: '11px' }}
          >
            {even?.content}
          </p>
        )}
      </div>
      {/* <div className="w-10 flex justify-start">{evIcon}</div> */}
      <div className="flex items-center justify-end w-52">
        <p
          className="text-stone-800 dark:text-white"
          style={{ fontSize: '11px' }}
        >
          <DateFormat createdAt={even?.createdAt} />
        </p>
      </div>
    </button>
  );
};

export default InvoEvent;
