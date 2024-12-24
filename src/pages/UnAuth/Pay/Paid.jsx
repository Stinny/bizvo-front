import { Avatar, Badge } from 'flowbite-react';
import moment from 'moment';
import React, { useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import {
  Briefcase,
  ChevronDown,
  ChevronRight,
  Download,
  Info,
  Layers,
  MoreVertical,
  User,
} from 'react-feather';
import { Link } from 'react-router-dom';

const Paid = ({ invoice, currentUser }) => {
  const [viewBus, setViewBus] = useState(false);
  const [viewCust, setViewCust] = useState(false);
  const [view, setView] = useState('');

  const isOwner = invoice?.sellerId === currentUser?._id;

  //for display
  const taxAmount = invoice?.tax?.amount / 100;

  const handleView = (newView) => {
    if (newView === view) {
      setView('');
    } else {
      setView(newView);
    }
  };

  return (
    <div
      style={{ width: '370px' }}
      className="mx-auto flex flex-col gap-2 items-start mt-16"
    >
      <div className="w-full flex justify-center items-center text-center">
        <p className="text-stone-800" style={{ fontSize: '12px' }}>
          Paid on {moment(invoice?.paidOn).format('MMMM Do, YYYY')}
        </p>
      </div>
      {isOwner ? (
        <div className="w-full flex items-center justify-start gap-2 border border-gray-200 bg-white rounded-md p-2">
          <Info size={14} className="text-blue-400" />
          <p className="text-xs text-stone-800">
            Created by you, PDF unavailable!
          </p>
        </div>
      ) : (
        ''
      )}
      <div className="w-full bg-white border border-gray-200 rounded-md flex flex-col gap-4 items-start p-2">
        <div className="w-full flex justify-between items-start relative">
          <div className="flex flex-col items-start">
            <p className="text-stone-800 text-sm">Invoice</p>
            <p className="text-stone-600 text-xs">#{invoice?._id}</p>
          </div>

          <Badge size="xs" color="success">
            Paid
          </Badge>
        </div>
        <div className="w-full flex items-center gap-2">
          <Avatar size="md" img={invoice?.seller?.logo} />
          <div className="flex flex-col items-start text-left">
            <p className="text-stone-800 text-sm">{invoice?.title}</p>
            <p className="text-stone-600 text-xs">{invoice?.description}</p>
          </div>
        </div>

        <div className="w-full flex flex-col items-start gap-2 p-2 pl-4 pr-4 rounded-md bg-gray-50">
          <div className="w-full flex justify-between items-center">
            <p className="text-stone-700 text-xs">Amount:</p>
            <p className="text-stone-700 text-xs">
              ${invoice?.amount?.toFixed(2)}
            </p>
          </div>
          <div className="w-full flex justify-between items-center">
            <p className="text-stone-700 text-xs">
              Tax({invoice?.tax?.rate}%):
            </p>
            <p className="text-stone-700 text-xs">${taxAmount?.toFixed(2)}</p>
          </div>
          <div className="w-full flex justify-between items-center">
            <p className="text-stone-800 text-xs font-bold">Total:</p>
            <p className="text-stone-800 text-xs font-bold">
              ${(invoice?.amount + taxAmount).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-start w-full">
          <button
            type="button"
            onClick={() => handleView('bus')}
            className="w-full flex flex-col bg-white items-start text-left border border-gray-200 rounded-md p-2"
          >
            <div className="w-full flex items-center justify-between">
              <Briefcase size={16} className="text-stone-800" />

              {view === 'bus' ? (
                <ChevronDown size={14} />
              ) : (
                <ChevronRight size={14} />
              )}
            </div>

            <div
              className={`transition-[max-height] duration-300 ease-in-out overflow-hidden w-full ${
                view === 'bus' ? 'max-h-40' : 'max-h-0'
              }`}
            >
              <div className="w-full flex flex-col gap-2 items-start text-left p-2 mt-1">
                <div className="flex flex-col items-start w-full gap-1">
                  <p className="text-stone-600" style={{ fontSize: '11px' }}>
                    Business
                  </p>
                  <div className="flex flex-col gap-2 items-start w-full">
                    <p className="text-xs text-stone-800">
                      {invoice?.seller?.name}
                    </p>
                    <p className="text-xs text-stone-800">
                      {invoice?.seller?.email}
                    </p>
                    <p className="text-stone-800 flex items-center gap-1">
                      <ReactCountryFlag
                        countryCode={invoice?.seller?.country?.value}
                      />{' '}
                      <span className="text-xs">
                        {invoice?.seller?.country?.label}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </button>
          <button
            type="button"
            onClick={() => handleView('cus')}
            className="w-full flex flex-col bg-white items-start text-left border border-gray-200 rounded-md p-2"
          >
            <div className="w-full flex items-center justify-between">
              <User size={16} className="text-stone-800" />
              {view === 'cus' ? (
                <ChevronDown size={14} />
              ) : (
                <ChevronRight size={14} />
              )}
            </div>

            <div
              className={`transition-[max-height] duration-300 ease-in-out overflow-hidden w-full ${
                view === 'cus' ? 'max-h-40' : 'max-h-0'
              }`}
            >
              <div className="w-full flex flex-col gap-2 items-start text-left p-2 mt-1">
                <div className="w-full flex flex-col items-start gap-1">
                  <p className="text-stone-600" style={{ fontSize: '11px' }}>
                    Customer
                  </p>
                  <div className="flex flex-col gap-2 items-start w-full">
                    <p className="text-xs text-stone-800">
                      {invoice?.customer?.name}
                    </p>
                    <p className="text-xs text-stone-800">
                      {invoice?.customer?.email}
                    </p>
                    <p className="text-stone-800 flex items-center gap-1">
                      <ReactCountryFlag
                        countryCode={invoice?.customer?.country?.value}
                      />{' '}
                      <span className="text-xs">
                        {invoice?.customer?.country?.label}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>
        <div className="w-full flex justify-between items-end">
          <div className="flex flex-col items-start">
            <p className="text-stone-600 text-xs">Total:</p>
            <p className="text-stone-800 text-sm font-bold">
              ${(invoice?.amount + taxAmount).toFixed(2)}
            </p>
          </div>
          <button
            type="button"
            //   onClick={handleMoveToPayment}
            className="p-1 pl-2 pr-2 border border-stone-800 text-stone-800 rounded-md text-xs flex items-center justify-center gap-1"
            disabled={isOwner}
          >
            PDF <Download size={14} />
          </button>
        </div>
      </div>
      <div className="w-full bg-white border border-gray-200 rounded-md p-2 flex flex-col items-center text-center">
        <Link to="/" className="h-full flex gap-1">
          <Layers size={18} className="font-black" />
          <p
            className="font-bold text-stone-800 text-sm"
            style={{ fontFamily: 'Space Mono, monospace' }}
          >
            Bizvo
          </p>
        </Link>
        <p className="text-stone-800" style={{ fontSize: '10px' }}>
          Online Invoicing Made Easier
        </p>
      </div>
    </div>
  );
};

export default Paid;
