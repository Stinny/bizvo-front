import { Badge } from 'flowbite-react';
import React from 'react';
import { CreditCard, DollarSign, Repeat } from 'react-feather';

const Invoices = ({ lastUpdated }) => {
  return (
    <div className="w-full flex flex-col gap-4 items-start">
      <div className="w-full flex items-start justify-between">
        <div className="flex flex-col items-start">
          <p className="text-md text-stone-800 font-semibold">Bizvo Docs</p>
          <p className="text-xs text-stone-800">Updated on {lastUpdated}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-start w-full text-left">
        <p className="text-sm text-stone-800 font-medium">Invoices</p>
        <p className="text-xs text-stone-800">
          Sending invoices and collecting payments is our core feature. We offer
          two types of invoices to support various business models. You are
          never limited on the amount of invoices you can create and send.
        </p>
        <div className="w-full flex flex-col gap-1 items-end">
          <div className="flex gap-2 w-full">
            <div className="w-6/12 p-2 border border-gray-200 bg-white rounded-md flex flex-col items-start">
              <DollarSign size={16} className="text-stone-800" />
              <p className="text-xs font-medium text-stone-800 mt-2">
                Single Payments
              </p>
              <p className="text-xs text-stone-800 text-left">
                Collect one time payments. Quick and easy way to be paid by a
                customer.
              </p>
            </div>
            <div className="w-6/12 p-2 border border-gray-200 bg-white rounded-md flex flex-col items-start">
              <Repeat size={16} className="text-stone-800" />
              <p className="text-xs font-medium text-stone-800 mt-2">
                Recurring Payments
              </p>
              <p className="text-xs text-stone-800 text-left">
                Collect payments on a recurring basis. Choose between weekly or
                monthly intervals.
              </p>
            </div>
          </div>
        </div>
        <p className="text-xs text-stone-800">
          Creating an invoice is really easy and only requires one step. Having
          one customer previously created will be required to create your first
          invoice. What is collected for creation:
        </p>
        <div className="flex items-center gap-2">
          <div className="p-1 border border-gray-200 rounded-md flex items-center justify-center">
            <p className="text-xs text-stone-800">Type</p>
          </div>
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
          You can choose to send an invoice during creation or save it as a
          draft for later. When an invoice is created it will have a status.
          This allows the business and the customer to easily keep track of an
          invoice and what needs to be done next.
        </p>
        <p className="text-xs text-stone-800 font-medium">Invoice Status</p>
        <div className="flex flex-col gap-4 items-start w-full text-left">
          <div className="flex flex-col items-start w-full text-left gap-1">
            <Badge size="xs" color="info">
              Draft
            </Badge>
            <p className="text-xs text-stone-800">Created but not sent</p>
          </div>
          <div className="flex flex-col items-start w-full text-left gap-1">
            <Badge size="xs" color="warning">
              Await
            </Badge>
            <p className="text-xs text-stone-800">
              Sent and is awaiting payment
            </p>
          </div>
          <div className="flex flex-col items-start w-full text-left gap-1">
            <Badge size="xs" color="pink">
              Late
            </Badge>
            <p className="text-xs text-stone-800">Payment is overdue</p>
          </div>
          <div className="flex flex-col items-start w-full text-left gap-1">
            <Badge size="xs" color="gray">
              Void
            </Badge>
            <p className="text-xs text-stone-800">Invoice was canceled</p>
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
                <DollarSign size={12} />
                Single
              </p>
            </div>
            <p className="text-xs text-stone-800">Payment was successful</p>
          </div>
          <div className="flex flex-col items-start w-full text-left gap-1">
            <div className="flex items-center gap-1">
              <Badge size="xs" color="success">
                Live
              </Badge>
              <p
                className="text-stone-800 flex items-center gap-1"
                style={{ fontSize: '11px' }}
              >
                <Repeat size={12} />
                Recurring
              </p>
            </div>
            <p className="text-xs text-stone-800">
              Recent payment was successful
            </p>
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
            <p className="text-xs text-stone-800">Payment attempt failed</p>
          </div>
        </div>
        <p className="text-sm text-stone-800 font-medium">Automated Alerts</p>
        <p className="text-xs text-stone-800">
          Ensure customers never miss a payment and are always up to date about
          an invoice with our automated email alerts. Customers will receive
          automated emails about various situations.
        </p>
        <div className="w-full">
          <div className="flex gap-2 w-full">
            <div className="w-3/12 p-2 border border-gray-200 bg-white rounded-md flex flex-col items-start">
              <p className="text-xs font-medium text-stone-800">Sent</p>
              <p className="text-xs text-stone-800 text-left">
                Invoice is sent
              </p>
            </div>
            <div className="w-3/12 p-2 border border-gray-200 bg-white rounded-md flex flex-col items-start">
              <p className="text-xs font-medium text-stone-800">Upcoming</p>
              <p className="text-xs text-stone-800 text-left">
                Payment is upcoming
              </p>
            </div>
            <div className="w-3/12 p-2 border border-gray-200 bg-white rounded-md flex flex-col items-start">
              <p className="text-xs font-medium text-stone-800">Due</p>
              <p className="text-xs text-stone-800 text-left">Payment is due</p>
            </div>
            <div className="w-3/12 p-2 border border-gray-200 bg-white rounded-md flex flex-col items-start">
              <p className="text-xs font-medium text-stone-800">Late</p>
              <p className="text-xs text-stone-800 text-left">
                Payment is late
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoices;
