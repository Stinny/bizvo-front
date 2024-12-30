import { Checkbox } from 'antd';
import React from 'react';
import { BarChart, CreditCard, FileText, Send } from 'react-feather';

const Desktop = ({ data, currentUser }) => {
  return (
    <div className="w-10/12 flex flex-col gap-2">
      <div className="w-full grid grid-cols-8 gap-2">
        <div className="col-span-2 flex flex-col gap-2">
          <div className="border rounded-md border-gray-200 bg-white flex flex-col gap-1 items-start text-left p-2">
            <p className="text-xs text-stone-600">Revenue</p>
            <p className="text-stone-900 text-sm">
              $
              {parseFloat(data?.revenue)?.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className="border rounded-md border-gray-200 bg-white flex flex-col items-start gap-1 p-2">
            <p className="text-xs text-stone-600">Invoices</p>
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-1">
                <FileText size={14} className="text-stone-800" />
                <p className="text-sm text-stone-900">{data?.numOfInvos}</p>
              </div>
              <div className="flex items-center gap-1">
                <Send size={14} className="text-stone-800" />
                <p className="text-sm text-stone-900">{data?.invoSent}</p>
              </div>
              <div className="flex items-center gap-1">
                <CreditCard size={14} className="text-stone-800" />
                <p className="text-sm text-stone-900">{data?.invoPaid}</p>
              </div>
            </div>
          </div>
          <div className="border rounded-md border-gray-200 bg-white flex flex-col gap-1 items-start text-left p-2">
            <p className="text-xs text-stone-600">Customers</p>
            <p className="text-sm text-stone-900">{data?.numOfCusts}</p>
          </div>
          <div className="border rounded-md border-gray-200 bg-white flex flex-col gap-1 items-start text-left p-2">
            <p className="text-xs text-stone-600">Payouts</p>
            <p className="text-sm text-stone-900">{data?.numOfPayouts}</p>
          </div>
        </div>
        <div className="col-span-6 flex-grow">
          <div className="border rounded-md border-gray-200 bg-white flex items-center justify-center w-full h-full">
            <BarChart size={18} />
          </div>
        </div>
      </div>
      <div className="border rounded-md border-gray-200 bg-white flex flex-col gap-1 items-start p-2 w-full">
        <p className="text-xs text-stone-600">Checklist</p>
        <div className="flex items-center w-full h-full justify-between">
          <div className="w-full flex items-center gap-2">
            <Checkbox disabled checked={currentUser?.emailConfirmed} />
            <p className="text-xs text-stone-800 text-left">Email confirmed</p>
          </div>
          <div className="w-full flex items-center gap-2">
            <Checkbox
              disabled
              checked={currentUser?.bankAdded || currentUser?.stripeOnboard}
            />
            <p className="text-xs text-stone-800 text-left">Payouts ready</p>
          </div>
          <div className="w-full flex items-center gap-2">
            <Checkbox disabled checked={currentUser?.custAdded} />
            <p className="text-xs text-stone-800 text-left">Customer added</p>
          </div>
          <div className="w-full flex items-center gap-2">
            <Checkbox disabled checked={currentUser?.invoSent} />
            <p className="text-xs text-stone-800 text-left">Invoice sent</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Desktop;
