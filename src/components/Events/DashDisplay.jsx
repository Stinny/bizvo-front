import React from 'react';
import InvoEvent from './InvoEvent';
import CustEvent from './CustEvent';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'react-feather';

const DashDisplay = ({ events }) => {
  return (
    <div className="border rounded-md border-gray-200 dark:border-white bg-white dark:bg-neutral-800 flex flex-col w-full gap-2 items-start p-2 relative">
      <div className="flex items-center justify-between w-full">
        <p className="text-xs text-stone-800 dark:text-white">Recent Events</p>
        <Link
          to="/dashboard/events"
          className="text-stone-800 flex items-center gap-1"
          style={{ fontSize: '11px' }}
        >
          View all <ChevronRight size={12} />
        </Link>
      </div>
      {events?.length ? (
        <>
          {events?.map((even) =>
            even?.source === 'invoice' ? (
              <InvoEvent even={even} />
            ) : (
              <CustEvent even={even} />
            )
          )}
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <p
            className="text-stone-800 dark:text-white"
            style={{ fontSize: '11px' }}
          >
            No recent events
          </p>
        </div>
      )}
    </div>
  );
};

export default DashDisplay;
