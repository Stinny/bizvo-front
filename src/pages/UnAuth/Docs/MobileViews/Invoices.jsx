import { Badge } from 'flowbite-react';
import React from 'react';
import { CreditCard, Repeat } from 'react-feather';

const Invoices = ({ lastUpdated }) => {
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
        <p className="text-sm text-stone-800 font-medium">Invoices</p>
        <p className="text-xs text-stone-800">
          Creating and sending invoices is our core feature. We offer two types
          of invoices to support various business models. You are never limited
          on the amount of invoices you can create and send.
        </p>
        <div className="flex flex-col w-full gap-2">
          <div className="p-1 border border-gray-200 rounded-md flex items-start justify-start gap-1">
            <CreditCard size={16} className="text-stone-800" />
            <div className="flex flex-col items-start">
              <p className="text-xs text-stone-800">Single</p>
              <p className="text-stone-800" style={{ fontSize: '11px' }}>
                Collect a single payment
              </p>
            </div>
          </div>
          <div className="p-1 border border-gray-200 rounded-md flex items-start justify-start gap-1">
            <Repeat size={16} className="text-stone-800" />
            <div className="flex flex-col items-start">
              <p className="text-xs text-stone-800">Recurring</p>
              <p className="text-stone-800" style={{ fontSize: '11px' }}>
                Collect on monthly or weekly basis
              </p>
            </div>
          </div>
        </div>
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
            <Badge size="xs" color="warning">
              Await
            </Badge>
            <p className="text-xs text-stone-800">
              Invoice was sent and is awaiting payment
            </p>
          </div>
          <div className="flex flex-col items-start w-full text-left gap-1">
            <div className="flex items-center gap-1">
              <Badge size="xs" color="success">
                Paid
              </Badge>
              <p
                className="text-stone-800 flex items-center gap-1"
                style={{ fontSize: '11px' }}
              >
                <CreditCard size={12} />
                Single
              </p>
            </div>
            <p className="text-xs text-stone-800">Invoice was paid</p>
          </div>
          <div className="flex flex-col items-start w-full text-left gap-1">
            <div className="flex items-center gap-1">
              <Badge size="xs" color="success">
                Active
              </Badge>
              <p
                className="text-stone-800 flex items-center gap-1"
                style={{ fontSize: '11px' }}
              >
                <Repeat size={12} />
                Recurring
              </p>
            </div>
            <p className="text-xs text-stone-800">Invoice payment valid</p>
          </div>
          <div className="flex flex-col items-start w-full text-left gap-1">
            <div className="flex items-center gap-1">
              <Badge size="xs" color="failure">
                Fail
              </Badge>
              <p
                className="text-stone-800 flex items-center gap-1"
                style={{ fontSize: '11px' }}
              >
                <Repeat size={12} />
                Recurring
              </p>
            </div>
            <p className="text-xs text-stone-800">Invoice payment failed</p>
          </div>
          <div className="flex flex-col items-start w-full text-left gap-1">
            <Badge size="xs" color="pink">
              Late
            </Badge>
            <p className="text-xs text-stone-800">Invoice is overdue</p>
          </div>
          <div className="flex flex-col items-start w-full text-left gap-1">
            <Badge size="xs" color="gray">
              Void
            </Badge>
            <p className="text-xs text-stone-800">Invoice was canceled</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoices;
