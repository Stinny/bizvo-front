import { Badge } from 'flowbite-react';
import React from 'react';

const Invoices = () => {
  return (
    <div className="w-10/12 flex flex-col gap-4 items-start border border-gray-200 rounded-md p-2">
      <div className="w-full flex items-start justify-between">
        <div className="flex flex-col items-start">
          <p className="text-sm text-stone-800">Bizvo Docs</p>
          <p className="text-xs text-stone-800">Updated on Jan 12th, 2025</p>
        </div>
        <p className="text-xs text-stone-800 font-semibold">V1.0</p>
      </div>
      <div className="flex flex-col gap-4 items-start w-full text-left">
        <p className="text-sm text-stone-800 font-medium">Invoices</p>
        <p className="text-xs text-stone-800">
          Creating and sending invoices is our core feature. You are never
          limited on the amount of invoices you can create and send. A payout
          option needs to be connected in order for you to send invoices.
        </p>
        <p className="text-xs text-stone-800">
          Creating an invoice is really easy and only requires one step. What is
          needed:
        </p>
        <div className="flex items-center gap-2">
          <div className="p-1 border border-gray-200 rounded-md flex items-center justify-center">
            <p className="text-xs text-stone-800">Customer</p>
          </div>
          <div className="p-1 border border-gray-200 rounded-md flex items-center justify-center">
            <p className="text-xs text-stone-800">Title</p>
          </div>
          <div className="p-1 border border-gray-200 rounded-md flex items-center justify-center">
            <p className="text-xs text-stone-800">Description</p>
          </div>
          <div className="p-1 border border-gray-200 rounded-md flex items-center justify-center">
            <p className="text-xs text-stone-800">Amount</p>
          </div>
          <div className="p-1 border border-gray-200 rounded-md flex items-center justify-center">
            <p className="text-xs text-stone-800">Due Date</p>
          </div>
        </div>
        <p className="text-xs text-stone-800">
          You can choose to send an invoice during creation or later on. When an
          invoice is created it will have one of various statuses. This allows
          you to easily keep track of the state of invoices.
        </p>
        <p className="text-xs text-stone-800">Statuses:</p>
        <div className="flex flex-col gap-4 items-start w-full text-left">
          <div className="flex flex-col items-start w-full text-left gap-1">
            <Badge size="xs" color="info">
              Draft
            </Badge>
            <p className="text-xs text-stone-800">
              Invoice was created but not sent
            </p>
          </div>
          <div className="flex flex-col items-start w-full text-left gap-1">
            <Badge size="xs" color="pink">
              Unpaid
            </Badge>
            <p className="text-xs text-stone-800">
              Invoice was sent but not paid yet
            </p>
          </div>
          <div className="flex flex-col items-start w-full text-left gap-1">
            <Badge size="xs" color="success">
              Paid
            </Badge>
            <p className="text-xs text-stone-800">Invoice was paid</p>
          </div>
          <div className="flex flex-col items-start w-full text-left gap-1">
            <Badge size="xs" color="warning">
              Late
            </Badge>
            <p className="text-xs text-stone-800">Invoice is overdue</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoices;
