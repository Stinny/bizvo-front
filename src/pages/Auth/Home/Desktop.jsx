import React from 'react';
import { BarChart, CreditCard, FileText, Send } from 'react-feather';

const Desktop = ({ data }) => {
  return (
    <div className="w-10/12 flex flex-col items-start gap-2">
      <div className="w-full grid grid-cols-4 gap-2">
        <div className="border rounded-md border-gray-200 bg-white flex flex-col gap-1 items-start text-left p-2">
          <p className="text-xs text-stone-600">Revenue</p>
          <p className="text-md text-stone-900">$1,208.00</p>
        </div>
        <div className="border rounded-md border-gray-200 bg-white flex flex-col gap-1 items-start text-left p-2">
          <p className="text-xs text-stone-600">Balance</p>
          <p className="text-md text-stone-900">$998.00</p>
        </div>
        <div className="border rounded-md border-gray-200 bg-white flex flex-col gap-1 items-start text-left p-2">
          <p className="text-xs text-stone-600">Payouts</p>
          <p className="text-md text-stone-900">0</p>
        </div>
        <div className="border rounded-md border-gray-200 bg-white flex flex-col items-start text-left p-2">
          <p className="text-xs text-stone-600">Customers</p>
          <p className="text-md text-stone-900">{data?.numOfCusts}</p>
        </div>
      </div>
      <div className="w-full grid grid-cols-4 gap-2">
        <div className=" flex flex-col gap-2 h-96">
          <div className="border rounded-md border-gray-200 bg-white flex flex-col items-start gap-1 p-2">
            <p className="text-xs text-stone-600">Invoices</p>
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-1">
                <FileText size={14} className="text-stone-800" />
                <p className="text-sm text-stone-900">{data?.numOfInvos}</p>
              </div>
              <div className="flex items-center gap-1">
                <Send size={14} className="text-stone-800" />
                <p className="text-sm text-stone-900">154</p>
              </div>
              <div className="flex items-center gap-1">
                <CreditCard size={14} className="text-stone-800" />
                <p className="text-sm text-stone-900">0</p>
              </div>
            </div>
          </div>
          <div className="border rounded-md border-gray-200 bg-white flex items-center justify-center flex-grow">
            <p className="text-xs text-stone-600">Checklist</p>
          </div>
        </div>
        <div className="border rounded-md border-gray-200 bg-white flex items-center justify-center col-span-3 h-96">
          <BarChart size={18} />
        </div>
      </div>
    </div>
  );
};

export default Desktop;
