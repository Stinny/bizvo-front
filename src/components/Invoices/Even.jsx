import React from 'react';
import InvoEvent from '../Events/InvoEvent';
import CustEvent from '../Events/CustEvent';
import { Link } from 'react-router-dom';
import DateFormat from '../Events/DateFormat';

const Even = ({ even }) => {
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
      className={`w-full flex items-center justify-between border border-gray-200 hover:border-stone-800 rounded-md p-2 ${
        even?.seen ? '' : 'bg-gray-50'
      }`}
    >
      <div className="flex items-center justify-start">
        {even?.type === 'paid' ? (
          <p
            className="text-stone-800 dark:text-white font-medium"
            style={{ fontSize: '11px' }}
          >
            Invoice paid {evTxt}
          </p>
        ) : (
          <p
            className="text-stone-800 dark:text-white font-medium"
            style={{ fontSize: '11px' }}
          >
            {evTxt}
          </p>
        )}
      </div>
    </Link>
  );
};

export default Even;
