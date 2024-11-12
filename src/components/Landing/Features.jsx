import React from 'react';
import {
  Archive,
  Bell,
  ChevronDown,
  ChevronRight,
  CreditCard,
  File,
  Image,
} from 'react-feather';
import { Link } from 'react-router-dom';

const Features = () => {
  return (
    <div className="w-full flex flex-col gap-1 items-end">
      <div className="w-full grid grid-cols-5 gap-2">
        <div className="p-2 border border-gray-200 bg-white rounded-md flex flex-col items-start">
          <CreditCard size={18} className="text-stone-800" />
          <p className="text-sm font-bold text-stone-800 mt-1">
            Secure Payments
          </p>
          <p className="text-xs text-stone-600 text-left">
            All transactions are securely processed through Stripe.
          </p>
        </div>
        <div className="p-2 border border-gray-200 bg-white rounded-md flex flex-col items-start">
          <Archive size={18} className="text-stone-800" />
          <p className="text-sm font-bold text-stone-800 mt-1">
            Unlimited Invoices
          </p>
          <p className="text-xs text-stone-600 text-left">
            Create and send as many invoices needed.
          </p>
        </div>
        <div className="p-2 border border-gray-200 bg-white rounded-md flex flex-col items-start">
          <File size={18} className="text-stone-800" />
          <p className="text-sm font-bold text-stone-800 mt-1">MoR</p>
          <p className="text-xs text-stone-600 text-left">
            We serve as your Merchant of Record.
          </p>
        </div>
        <div className="p-2 border border-gray-200 bg-white rounded-md flex flex-col items-start">
          <Bell size={18} className="text-stone-800" />
          <p className="text-sm font-bold text-stone-800 mt-1">
            Automated Alerts
          </p>
          <p className="text-xs text-stone-600 text-left">
            Automated upcoming and past due payment alerts.
          </p>
        </div>
        <div className="p-2 border border-gray-200 bg-white rounded-md flex flex-col items-start">
          <Image size={18} className="text-stone-800" />
          <p className="text-sm font-bold text-stone-800 mt-1">Branding</p>
          <p className="text-xs text-stone-600 text-left">
            Easily add custom branding and logos to all invoices.
          </p>
        </div>
      </div>
      <Link to="/" className="text-xs text-stone-800 flex items-end gap-1">
        All features <ChevronRight size={14} />
      </Link>
    </div>
  );
};

export default Features;
