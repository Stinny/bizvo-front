import React, { useState } from 'react';
import {
  Bell,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  CreditCard,
  File,
  FileText,
  Layout,
  Link2,
  Send,
  Smartphone,
  Users,
} from 'react-feather';

const Features = ({ lastUpdated, ViewSelect }) => {
  const [view, setView] = useState('');

  const handleView = (newView) => {
    if (newView === view) {
      setView('');
    } else {
      setView(newView);
    }
  };

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
        <ViewSelect />
        <p className="text-sm text-stone-800 font-medium">Features</p>
        <p className="text-xs text-stone-800">
          The features we offer are important to the businesses we support and
          we plan to deliver more as we grow. Browse through all the features we
          currently offer, click on a feature to read more.
        </p>
      </div>

      <div className="w-full flex flex-col gap-4 items-start">
        <button
          type="button"
          onClick={() => handleView('mor')}
          className="w-full flex flex-col flex-grow border border-gray-200 rounded-md p-2"
        >
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <File size={18} />
              <p className="text-xs text-stone-800">MoR Services</p>
            </div>
            {view === 'mor' ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )}
          </div>

          <div
            className={`transition-[max-height] duration-300 ease-in-out overflow-hidden ${
              view === 'mor' ? 'max-h-40' : 'max-h-0'
            }`}
          >
            <p className="text-xs text-left text-stone-800 mt-4">
              We act as your Merchant of Record, serving as the legal
              representative for all transactions. Let us handle the complicated
              and boring stuff. This includes:
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              <div className="p-1 border border-gray-200 rounded-md flex items-center justify-center">
                <p className="text-xs text-stone-800">Tax calculation</p>
              </div>
              <div className="p-1 border border-gray-200 rounded-md flex items-center justify-center">
                <p className="text-xs text-stone-800">Tax collection</p>
              </div>
              <div className="p-1 border border-gray-200 rounded-md flex items-center justify-center">
                <p className="text-xs text-stone-800">Tax remittance</p>
              </div>
              <div className="p-1 border border-gray-200 rounded-md flex items-center justify-center">
                <p className="text-xs text-stone-800">Refunds</p>
              </div>
              <div className="p-1 border border-gray-200 rounded-md flex items-center justify-center">
                <p className="text-xs text-stone-800">Chargebacks</p>
              </div>
            </div>
          </div>
        </button>
        <button
          type="button"
          onClick={() => handleView('pay')}
          className="w-full flex flex-col flex-grow border border-gray-200 rounded-md p-2"
        >
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard size={18} />
              <p className="text-xs text-stone-800">Secure Payments</p>
            </div>
            {view === 'pay' ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )}
          </div>

          <div
            className={`transition-[max-height] duration-300 ease-in-out overflow-hidden ${
              view === 'pay' ? 'max-h-40' : 'max-h-0'
            }`}
          >
            <p className="text-xs text-left text-stone-800 mt-4">
              All transactions are securely processed by Stripe, ensuring user
              safety. We never store sensitive payment information, keeping your
              data completely safe.
            </p>
          </div>
        </button>
        <button
          type="button"
          onClick={() => handleView('alerts')}
          className="w-full flex flex-col flex-grow border border-gray-200 rounded-md p-2"
        >
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell size={18} />
              <p className="text-xs text-stone-800">Automated Alerts</p>
            </div>
            {view === 'alerts' ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )}
          </div>

          <div
            className={`transition-[max-height] duration-300 ease-in-out overflow-hidden ${
              view === 'alerts' ? 'max-h-40' : 'max-h-0'
            }`}
          >
            <p className="text-xs text-left text-stone-800 mt-4">
              Ensure customers never miss a payment with our automated email
              alerts. Customers receive email alerts whenever an invoice is sent
              to them, a due date is approaching or when an invoice is overdue.
            </p>
          </div>
        </button>
        <button
          type="button"
          onClick={() => handleView('invos')}
          className="w-full flex flex-col flex-grow border border-gray-200 rounded-md p-2"
        >
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Send size={18} />
              <p className="text-xs text-stone-800">Unlimited Invoices</p>
            </div>
            {view === 'invos' ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )}
          </div>

          <div
            className={`transition-[max-height] duration-300 ease-in-out overflow-hidden ${
              view === 'invos' ? 'max-h-40' : 'max-h-0'
            }`}
          >
            <p className="text-xs text-left text-stone-800 mt-4">
              There is no limit on creating and sending invoices. Create and
              send as many invoices as your business requires.
            </p>
          </div>
        </button>
        <button
          type="button"
          onClick={() => handleView('links')}
          className="w-full flex flex-col flex-grow border border-gray-200 rounded-md p-2"
        >
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link2 size={18} />
              <p className="text-xs text-stone-800">Payment Links</p>
            </div>
            {view === 'links' ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )}
          </div>

          <div
            className={`transition-[max-height] duration-300 ease-in-out overflow-hidden flex flex-col items-start ${
              view === 'links' ? 'max-h-40' : 'max-h-0'
            }`}
          >
            <p className="text-xs text-left text-stone-800 mt-4">
              Secure payment links sent via email to provide your customers with
              a safe and secure place to make a payment. Multiple payment
              methods are availble including credit cards, Google Pay and Apple
              Pay.
            </p>
            <div className="p-1 border border-gray-200 rounded-md flex items-center justify-center gap-1 mt-2">
              <Smartphone size={14} className="text-stone-800" />
              <p className="text-xs text-stone-800">Mobile Friendly</p>
            </div>
          </div>
        </button>
        <button
          type="button"
          onClick={() => handleView('custs')}
          className="w-full flex flex-col flex-grow border border-gray-200 rounded-md p-2"
        >
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users size={18} />
              <p className="text-xs text-stone-800">Customer Management</p>
            </div>
            {view === 'custs' ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )}
          </div>

          <div
            className={`transition-[max-height] duration-300 ease-in-out overflow-hidden ${
              view === 'custs' ? 'max-h-40' : 'max-h-0'
            }`}
          >
            <p className="text-xs text-left text-stone-800 mt-4">
              Easily create and update the customers you send invoices to. Every
              customer created keeps track of how many invoices were sent to
              them.
            </p>
          </div>
        </button>
      </div>
      <p className="text-xs text-stone-800">More on the way..</p>
    </div>
  );
};

export default Features;
