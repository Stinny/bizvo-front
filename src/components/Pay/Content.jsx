import { Badge, Timeline } from 'antd';
import { Spinner } from 'flowbite-react';
import moment from 'moment';
import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  CreditCard,
  Percent,
  Send,
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
    default:
      taxType = 'Sales Tax';
      break;
  }

  let trxItems = [
    {
      dot: <Send size={12} className="text-stone-800" />,
      children: (
        <p className="text-xs text-stone-800 pt-1">
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
  ];

  if (trx?.tax?.id) {
    trxItems.push({
      dot: <Percent size={12} className="text-stone-800" />,
      children: (
        <p className="text-xs text-stone-800 pt-1">
          {taxType}{' '}
          <span className="font-medium">
            ${(trx?.tax?.amount / 100).toFixed(2)}
          </span>
        </p>
      ),
    });
    if (trx?.done) {
      trxItems.push({
        dot: <CreditCard size={12} className="text-stone-800" />,
        children: (
          <p className="text-xs text-stone-800 pt-1">
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
    } else {
      trxItems.push({
        dot: <CreditCard size={12} className="text-stone-800" />,
        children: (
          <p className="text-xs text-stone-800 pt-1">
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
        children: (
          <p className="text-xs text-stone-800 pt-1">
            {invoice?.status !== 'live' ? `Due by` : `Due next`}{' '}
            <span className="font-medium">
              {moment(invoice?.dueDate).format('MMMM Do')}
            </span>
          </p>
        ),
      });
    }
  } else {
    trxItems.push({
      dot: <Badge dot={true} status="processing" color="#000" />,
      children: (
        <p className="text-xs text-stone-800 pt-1">
          {invoice?.status !== 'live' ? `Due by` : `Due next`}{' '}
          <span className="font-medium">
            {moment(invoice?.dueDate).format('MMMM Do')}
          </span>
        </p>
      ),
    });
  }

  return (
    <div className="flex flex-col gap-4 items-start w-full">
      <Timeline className="text-left p-1" items={trxItems} />

      <div className="w-full flex flex-col gap-2">
        {' '}
        <button
          type="button"
          onClick={() => handleView('bus')}
          className="w-full flex flex-col bg-white items-start text-left border border-gray-200 rounded-md p-2"
        >
          <div className="w-full flex items-center justify-between">
            <p className="text-xs text-stone-800">Participants</p>

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
            <div className="w-full flex flex-col gap-4 items-start text-left p-2 mt-1">
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
          className="w-full flex flex-col bg-white items-start text-left border border-gray-200 rounded-md p-2"
        >
          <div className="w-full flex items-center justify-between">
            <p className="text-stone-800 text-xs">Details</p>

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
            <div className="w-full flex flex-col gap-4 items-start text-left p-2 mt-1">
              <div className="flex flex-col items-start w-full gap-2">
                <div className="w-full flex justify-between items-center">
                  <p className="text-xs text-stone-800 font-medium">Sent</p>
                  <p className="text-stone-800" style={{ fontSize: '11px' }}>
                    {moment(invoice?.sentOn).format('MMMM Do, YYYY')}
                  </p>
                </div>

                {invoice?.status === 'paid' ? (
                  <>
                    <div className="w-full flex justify-between items-center">
                      <p className="text-xs text-stone-800 font-medium">Due</p>
                      <p
                        className="text-stone-800"
                        style={{ fontSize: '11px' }}
                      >
                        {moment(invoice?.dueDate).format('MMMM Do, YYYY')}
                      </p>
                    </div>
                    <div className="w-full flex justify-between items-center">
                      <p className="text-xs text-stone-800 font-medium">Paid</p>
                      <p
                        className="text-stone-800"
                        style={{ fontSize: '11px' }}
                      >
                        {moment(invoice?.paidOn).format('MMMM Do, YYYY')}
                      </p>
                    </div>
                  </>
                ) : (
                  ''
                )}
                {invoice?.status === 'live' ? (
                  <>
                    <div className="w-full flex justify-between items-center">
                      <p className="text-xs text-stone-800 font-medium">
                        Due last
                      </p>
                      <p
                        className="text-stone-800"
                        style={{ fontSize: '11px' }}
                      >
                        {moment(invoice?.lastDueDate).format('MMMM Do, YYYY')}
                      </p>
                    </div>
                    <div className="w-full flex justify-between items-center">
                      <p className="text-xs text-stone-800 font-medium">
                        Due next
                      </p>
                      <p
                        className="text-stone-800"
                        style={{ fontSize: '11px' }}
                      >
                        {moment(invoice?.dueDate).format('MMMM Do, YYYY')}
                      </p>
                    </div>
                  </>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Content;
