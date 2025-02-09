import React from 'react';
import { ChevronRight } from 'react-feather';

const Home = ({ ViewSelect, lastUpdated }) => {
  return (
    <div className="w-full flex flex-col gap-4 items-start border border-gray-200 rounded-md p-2">
      <div className="w-full flex items-start justify-between">
        <div className="flex flex-col items-start">
          <p className="text-md text-stone-800 font-semibold">Bizvo Docs</p>
          <p className="text-xs text-stone-800">Updated on {lastUpdated}</p>
        </div>
        <p className="text-xs text-stone-800 font-semibold">V1.0</p>
      </div>
      <div className="flex flex-col gap-4 items-start w-full text-left">
        <ViewSelect />
        <p className="text-xs text-stone-800">
          Welcome to Bizvo docs! These are provided so anyone can learn how to
          use Bizvo to began collecting payments.
        </p>
        <p className="text-xs text-stone-800">
          Using a platform like Bizvo to collect payments is beneficial to
          businesses providng digital services to avoid the financial burden
          that comes with transactions. Spend more time on growing your business
          and less time handling transactions.
        </p>

        <p className="text-xs text-stone-800">
          Use the dropdown above to view the other categories.
        </p>
      </div>
    </div>
  );
};

export default Home;
