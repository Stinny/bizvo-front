import React from 'react';
import { CreditCard, ExternalLink } from 'react-feather';
import { BiSolidBank } from 'react-icons/bi';
import { BsStripe } from 'react-icons/bs';

const Desktop = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col items-start">
          <p className="text-sm text-stone-800">Payment Settings</p>
          <p className="text-xs text-stone-700">
            Select how you want to be paid
          </p>
        </div>
      </div>
      <div className="w-full grid grid-cols-3 gap-2">
        <div className="p-2 border border-gray-200 rounded-md flex flex-col items-start">
          <CreditCard size={18} className="text-stone-800" />
          <p className="text-sm text-stone-800">Debit Card</p>
          <p className="text-xs text-stone-700">Be paid out to a debit card</p>
          <div className="flex justify-end w-full">
            {/* <ExternalLink size={16} className="text-stone-800" /> */}
            <button
              type="button"
              // onClick={() => logout('logout')}
              className="border rounded-md border-stone-800 hover:outline-none p-0.5 pl-1 pr-1 text-xs"
            >
              Connect
            </button>
          </div>
        </div>
        <div className="p-2 border border-gray-200 rounded-md flex flex-col items-start">
          <BiSolidBank className="text-stone-800" />
          <p className="text-sm text-stone-800">Bank Account</p>
          <p className="text-xs text-stone-700">
            Be paid out to a bank account
          </p>
          <div className="flex justify-end w-full">
            {/* <ExternalLink size={16} className="text-stone-800" /> */}
            <button
              type="button"
              // onClick={() => logout('logout')}
              className="border rounded-md border-stone-800 hover:outline-none p-0.5 pl-1 pr-1 text-xs"
            >
              Connect
            </button>
          </div>
        </div>
        <div className="p-2 border border-gray-200 rounded-md flex flex-col items-start">
          <BsStripe className="text-stone-800" />
          <p className="text-sm text-stone-800">Stripe Account</p>
          <p className="text-xs text-stone-700">
            Be paid out to a Stripe account
          </p>
          <div className="flex justify-end w-full">
            {/* <ExternalLink size={16} className="text-stone-800" /> */}
            <button
              type="button"
              // onClick={() => logout('logout')}
              className="border rounded-md border-stone-800 hover:outline-none p-0.5 pl-1 pr-1 text-xs"
            >
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Desktop;
