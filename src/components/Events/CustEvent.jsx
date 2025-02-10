import React from 'react';
import { FileText, Users } from 'react-feather';
import { Link } from 'react-router-dom';
import DateFormat from './DateFormat';

const CustEvent = ({ even }) => {
  let evTxt;

  switch (even?.type) {
    case 'create':
      evTxt = 'Customer created';
      break;
    case 'edit':
      evTxt = 'Customer updated';
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
        <p
          className="text-stone-800 dark:text-white"
          style={{ fontSize: '11px' }}
        >
          {evTxt}
        </p>
      </div>
      <div className="w-12 flex justify-center">
        <Users size={12} />
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

export default CustEvent;
