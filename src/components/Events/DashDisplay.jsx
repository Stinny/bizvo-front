import React from 'react';
import InvoEvent from './InvoEvent';
import { Link } from 'react-router-dom';
import { ChevronRight, Info } from 'react-feather';
import { Tooltip } from 'flowbite-react';

const DashDisplay = ({ events }) => {
  return events?.length ? (
    <div className="border rounded-md border-gray-200 dark:border-white bg-white dark:bg-neutral-800 flex flex-col w-full gap-2 items-start p-2 relative">
      <div className="absolute top-0 right-0 mr-2 mt-2">
        <Tooltip
          style="light"
          arrow={false}
          content={
            <p className="text-xs text-stone-800 text-left w-28">
              Most recent events
            </p>
          }
        >
          <Info size={12} className="text-stone-800 dark:text-white" />
        </Tooltip>
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="text-xs text-stone-800 dark:text-white">Events</p>
        {/* <Link
          to="/dashboard/events"
          className="text-stone-800 flex items-center justify-center p-0.5 border border-stone-800 rounded-md"
        >
          <ChevronRight size={12} />
        </Link> */}
      </div>

      {events?.map((even) => (
        <InvoEvent even={even} />
      ))}
    </div>
  ) : (
    <div className="border rounded-md border-gray-200 dark:border-white bg-white dark:bg-neutral-800 flex flex-col w-full gap-2 items-start p-2 relative">
      <div className="w-full h-full flex items-center justify-center">
        <p
          className="text-stone-800 dark:text-white"
          style={{ fontSize: '11px' }}
        >
          No recent events
        </p>
      </div>
    </div>
  );
};

export default DashDisplay;
