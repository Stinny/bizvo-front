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

const InvoEvent = ({ even }) => {
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
    <Link
      to={`/dashboard/events`}
      state={{ evId: even?._id }}
      className={`w-full flex items-center justify-between border border-gray-200 hover:border-stone-800 rounded-md p-2 pb-1 pt-1 ${
        even?.seen ? '' : 'bg-gray-50'
      }`}
    >
      <div className="flex items-center justify-start">
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

      {/* <div className="flex items-center justify-end w-44">
        <p
          className="text-stone-800 dark:text-white"
          style={{ fontSize: '10px' }}
        >
          <DateFormat createdAt={even?.createdAt} />
        </p>
      </div> */}
    </Link>
  );
};

export default InvoEvent;
