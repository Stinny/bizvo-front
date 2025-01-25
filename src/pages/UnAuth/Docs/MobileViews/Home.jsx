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
          that comes with taxes. Let us handle some of this burden for you.
        </p>
        <div className="flex flex-col items-start gap-3 w-24">
          <button
            type="button"
            onClick={() => setView('account')}
            className="flex items-center justify-between gap-2 text-xs text-stone-800 w-full"
          >
            Account
            <ChevronRight size={14} />
          </button>
          <button
            type="button"
            onClick={() => setView('features')}
            className="flex items-center justify-between gap-2 text-xs text-stone-800 w-full"
          >
            Features
            <ChevronRight size={14} />
          </button>
          <button
            type="button"
            onClick={() => setView('payments')}
            className="flex items-center justify-between gap-2 text-xs text-stone-800 w-full"
          >
            Payments
            <ChevronRight size={14} />
          </button>
          <button
            type="button"
            onClick={() => setView('invos')}
            className="flex items-center justify-between gap-2 text-xs text-stone-800 w-full"
          >
            Invoices
            <ChevronRight size={14} />
          </button>
          <button
            type="button"
            onClick={() => setView('custs')}
            className="flex items-center justify-between gap-2 text-xs text-stone-800 w-full"
          >
            Customers
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
