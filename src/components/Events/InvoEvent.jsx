import React from 'react';
import { FileText } from 'react-feather';
import { Link } from 'react-router-dom';
import DateFormat from './DateFormat';

const InvoEvent = ({ even }) => {
  let evTxt;

  switch (even?.type) {
    case 'sent':
      evTxt = 'Invoice sent';
      break;
    case 'create':
      evTxt = 'Invoice created';
      break;
    case 'cancel':
      evTxt = 'Invoice canceled';
      break;
    case 'edit':
      evTxt = 'Invoice updated';
      break;
    case 'paid':
      evTxt = (
        <span className="font-medium">${(even?.value / 100).toFixed(2)}</span>
      );

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
      <div className="flex items-center justify-start w-32">
        {even?.type === 'paid' ? (
          <p
            className="text-stone-800 dark:text-white"
            style={{ fontSize: '11px' }}
          >
            Invoice paid {evTxt}
          </p>
        ) : (
          <p
            className="text-stone-800 dark:text-white"
            style={{ fontSize: '11px' }}
          >
            {evTxt}
          </p>
        )}
      </div>
      <div className="w-12 flex justify-center">
        <FileText size={12} />
      </div>
      <div className="flex items-center justify-end w-44">
        <p
          className="text-stone-800 dark:text-white"
          style={{ fontSize: '11px' }}
        >
          <DateFormat createdAt={even?.createdAt} />
        </p>
      </div>
    </Link>
  );
};

export default InvoEvent;
