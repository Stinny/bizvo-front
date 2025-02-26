import React from 'react';
import { Info } from 'react-feather';

const Customers = ({ lastUpdated }) => {
  return (
    <div className="w-10/12 flex flex-col gap-4 items-start border border-gray-200 rounded-md p-2">
      <div className="w-full flex items-start justify-between">
        <div className="flex flex-col items-start">
          <p className="text-md text-stone-800 font-semibold">Bizvo Docs</p>
          <p className="text-xs text-stone-800">Updated on {lastUpdated}</p>
        </div>
        <p className="text-xs text-stone-800 font-semibold">V1.0</p>
      </div>
      <div className="flex flex-col gap-4 items-start w-full text-left">
        <p className="text-sm text-stone-800 font-medium">Customers</p>
        <p className="text-xs text-stone-800">
          Creating and managing customers is important for successful payments
          and tax reporting. Customer details are always used during the tax
          calculation process. Details must always be as accurate as possible.
        </p>
        <div className="p-1 border border-gray-200 rounded-md flex items-center justify-center gap-1">
          <Info size={12} className="text-blue-400" />
          <p className="text-xs text-stone-800">
            At least one customer is required to create invoices
          </p>
        </div>
        <p className="text-xs text-stone-800">
          Creating a customer is really easy and only requires one form. Any
          customer can be edited at any time. What is needed:
        </p>
        <div className="flex items-center gap-2">
          <div className="p-1 border border-gray-200 rounded-md flex items-center justify-center">
            <p className="text-xs text-stone-800">Name</p>
          </div>
          <div className="p-1 border border-gray-200 rounded-md flex items-center justify-center">
            <p className="text-xs text-stone-800">Email</p>
          </div>
          <div className="p-1 border border-gray-200 rounded-md flex items-center justify-center">
            <p className="text-xs text-stone-800">Country</p>
          </div>
          <div className="p-1 border border-gray-200 rounded-md flex items-center justify-center">
            <p className="text-xs text-stone-800">Address</p>
          </div>
          <div className="p-1 border border-gray-200 rounded-md flex items-center justify-center">
            <p className="text-xs text-stone-800">Postal Code</p>
          </div>
        </div>
        <p className="text-xs text-stone-800">
          You can also choose to add a phone number and a brief description.
          Each customer created will be unique to the email. Having more than
          one customer with the same email is not allowed.
        </p>
      </div>
    </div>
  );
};

export default Customers;
