import { Badge, Timeline } from 'antd';
import { Spinner } from 'flowbite-react';
import moment from 'moment';
import React, { useState } from 'react';
import {
  CheckCircle,
  ChevronDown,
  ChevronRight,
  CreditCard,
  Percent,
  Send,
  XSquare,
} from 'react-feather';

//content component for pay page

const Content = ({ invoice, biz, trx, customer }) => {
  const [view, setView] = useState('');

  const handleView = (newView) => {
    if (newView === view) {
      setView('');
    } else {
      setView(newView);
    }
  };

  let taxType;

  switch (trx?.tax?.type) {
    case 'vat':
      taxType = 'VAT';
      break;
    case 'gst':
      taxType = 'GST';
      break;
    case 'hst':
      taxType = 'HST';
      break;
    default:
      taxType = 'Sales Tax';
      break;
  }

  let trxItems = [
    {
      dot: <Send size={14} className="text-stone-800" />,
      children: (
        <p className="text-sm text-stone-800">
          Invoiced for{' '}
          <span className="font-medium">
            $
            {parseFloat(trx?.amount / 100)?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </p>
      ),
    },
    {
      dot: <Percent size={14} className="text-stone-800" />,
      children: (
        <p className="text-sm text-stone-800">
          Added tax{' '}
          <span className="font-medium">
            ${(trx?.tax?.amount / 100).toFixed(2)}
          </span>
        </p>
      ),
    },
  ];

  if (trx?.done) {
    trxItems.push({
      dot: <CreditCard size={14} className="text-stone-800" />,
      children: (
        <p className="text-sm text-stone-800">
          Total paid{' '}
          <span className="font-medium">
            $
            {parseFloat(trx?.total / 100)?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </p>
      ),
    });
    trxItems.push({
      dot: <CheckCircle size={14} className="text-stone-800" />,
      children: (
        <p className="text-sm text-stone-800">
          Paid on{' '}
          <span className="font-medium">
            {moment(trx?.doneOn).format('MMMM Do, yyyy')}
          </span>
        </p>
      ),
    });
  } else if (trx?.void) {
    trxItems.push({
      dot: <CreditCard size={14} className="text-stone-800" />,
      children: (
        <p className="text-sm text-stone-800">
          Total due{' '}
          <span className="font-medium">
            $
            {parseFloat(trx?.total / 100)?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </p>
      ),
    });
    trxItems.push({
      dot: <XSquare size={14} className="text-red-400" />,
      children: <p className="text-sm text-stone-800">Invoice was canceled</p>,
    });
  } else {
    trxItems.push({
      dot: <CreditCard size={14} className="text-stone-800" />,
      children: (
        <p className="text-sm text-stone-800">
          Total due{' '}
          <span className="font-medium">
            $
            {parseFloat(trx?.total / 100)?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </p>
      ),
    });
    trxItems.push({
      dot: <Badge dot={true} status="processing" color="#000" />,
      children: <p className="text-sm text-stone-800">Waiting for payment</p>,
    });
  }

  return (
    <div className="flex flex-col gap-4 items-start w-full">
      <div className="w-full pl-1">
        <Timeline className="text-left" items={trxItems} />
      </div>

      <div className="w-full flex flex-col gap-2">
        {' '}
        <button
          type="button"
          onClick={() => handleView('bus')}
          className="w-full flex flex-col bg-white items-start text-left border border-gray-200 rounded-sm p-2"
        >
          <div className="w-full flex items-center justify-between">
            <p className="text-sm text-stone-800">Participants</p>

            {view === 'bus' ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )}
          </div>

          <div
            className={`transition-[max-height] duration-300 ease-in-out overflow-hidden w-full ${
              view === 'bus' ? 'max-h-fit' : 'max-h-0'
            }`}
          >
            <div className="w-full flex flex-col gap-4 items-start text-left mt-2">
              <div className="flex flex-col items-start w-full gap-1">
                <p className="text-xs text-stone-800 font-medium">Sender</p>
                <div className="flex flex-col gap-1 items-start w-full">
                  <p className="text-xs text-stone-800">{biz?.name}</p>
                  <p className="text-xs text-stone-800">{biz?.email}</p>
                  <p className="text-stone-800 flex items-center gap-1">
                    <span className="text-xs">{biz?.country}</span>
                  </p>
                </div>
              </div>
              <div className="w-full flex flex-col items-start gap-1">
                <p className="text-xs text-stone-800 font-medium">Receiver</p>
                <div className="flex flex-col gap-1 items-start w-full">
                  <p className="text-xs text-stone-800">{customer?.name}</p>
                  <p className="text-xs text-stone-800">{customer?.email}</p>
                  <p className="text-stone-800 flex items-center gap-1">
                    <span className="text-xs">{customer?.country?.label}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </button>
        <button
          type="button"
          onClick={() => handleView('due')}
          className="w-full flex flex-col bg-white items-start text-left border border-gray-200 rounded-sm p-2"
        >
          <div className="w-full flex items-center justify-between">
            <p className="text-stone-800 text-sm">Details</p>

            {view === 'due' ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )}
          </div>

          <div
            className={`transition-[max-height] duration-300 ease-in-out overflow-hidden w-full ${
              view === 'due' ? 'max-h-fit' : 'max-h-0'
            }`}
          >
            <div className="w-full flex flex-col gap-4 items-start text-left mt-2">
              <div className="flex items-start w-full gap-2">
                <div className="flex flex-col gap-2 w-3/6">
                  <div className="w-full flex flex-col">
                    <p className=" text-stone-800 font-medium text-xs">
                      Received on
                    </p>
                    <p className="text-stone-800 text-xs">
                      {moment(invoice?.sentOn).format('MMMM Do, YYYY')}
                    </p>
                  </div>

                  <div className="w-full flex flex-col">
                    <p className="text-stone-800 font-medium text-xs">
                      Tax type
                    </p>
                    <p className="text-stone-800 text-xs">{taxType}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-3/6">
                  <div className="w-full flex flex-col">
                    <p className=" text-stone-800 font-medium text-xs">
                      Due by
                    </p>
                    <p className="text-stone-800 text-xs">
                      {moment(invoice?.dueDate).format('MMMM Do, YYYY')}
                    </p>
                  </div>

                  <div className="w-full flex flex-col">
                    <p className=" text-stone-800 font-medium text-xs">
                      Transaction
                    </p>
                    <p className="text-stone-800 text-xs">{trx?._id}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Content;
