import React from 'react';
import { Mail } from 'react-feather';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';

const Account = ({ lastUpdated, ViewSelect }) => {
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
        <p className="text-sm text-stone-800 font-medium">Account Setup</p>
        <p className="text-xs text-stone-800">
          When creating an account you have two options. Either signup using an
          email address or signup using a Google account:
        </p>
        <div className="flex items-center gap-2">
          <div className="p-2 w-full border border-gray-200 text-stone-800 rounded-md text-xs flex items-center justify-center gap-1">
            <Mail size={16} className="text-stone-800" /> Email
          </div>
          <div className="p-2 w-full border border-gray-200 text-stone-800 rounded-md text-xs flex items-center justify-center gap-1">
            <FcGoogle className="text-lg" /> Google
          </div>
        </div>
        <p className="text-xs text-stone-800">
          After signing up you have an account setup to complete before viewing
          your dashboard. The setup takes less than one minute to collect:
        </p>

        <div className="flex items-center gap-2">
          <div className="p-1 border border-gray-200 rounded-md flex items-center justify-center">
            <p className="text-xs text-stone-800">Business Name</p>
          </div>
          <div className="p-1 border border-gray-200 rounded-md flex items-center justify-center">
            <p className="text-xs text-stone-800">Business Location</p>
          </div>
          <div className="p-1 border border-gray-200 rounded-md flex items-center justify-center">
            <p className="text-xs text-stone-800">What You Sell</p>
          </div>
          <div className="p-1 border border-gray-200 rounded-md flex items-center justify-center">
            <p className="text-xs text-stone-800">Logo</p>
          </div>
        </div>
        <p className="text-xs text-stone-800">
          Once the account setup is complete you are sent to your dashboard.
          From there you can connect a payout option and start sending invoices.
          Create an{' '}
          <span className="font-semibold">
            <Link to="/signup">account</Link>
          </span>{' '}
          or login{' '}
          <span className="font-semibold">
            <Link to="/signup">here.</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Account;
