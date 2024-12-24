import React from 'react';
import {
  Archive,
  ArrowRight,
  Bell,
  ChevronDown,
  ChevronRight,
  CreditCard,
  File,
  Image,
  Send,
} from 'react-feather';
import { Link } from 'react-router-dom';

const Features = () => {
  return (
    <div className="w-full flex flex-col gap-1 items-end">
      <div className="flex gap-2">
        <div className="w-5/12 p-2 border border-gray-200 bg-white rounded-md flex flex-col items-start">
          <File size={18} className="text-stone-800" />
          <p className="text-sm font-bold text-stone-800 mt-1">MoR Services</p>
          <p className="text-xs text-stone-600 text-left">
            We serve as your Merchant of Record, acting as the legal entity for
            all transactions. Let us handle:
          </p>
          <div className="flex flex-col gap-2 mt-3">
            <p className="text-xs text-stone-800 flex items-center gap-1">
              <ChevronRight size={14} />
              Taxes
            </p>
            <p className="text-xs text-stone-800 flex items-center gap-1">
              <ChevronRight size={14} />
              Compliance
            </p>
            <p className="text-xs text-stone-800 flex items-center gap-1">
              <ChevronRight size={14} />
              Chargebacks
            </p>
            <p className="text-xs text-stone-800 flex items-center gap-1">
              <ChevronRight size={14} />
              Refunds
            </p>
          </div>
        </div>
        <div className="w-7/12 grid grid-cols-2 gap-2">
          <div className="p-2 border border-gray-200 bg-white rounded-md flex flex-col items-start">
            <CreditCard size={18} className="text-stone-800" />
            <p className="text-sm font-bold text-stone-800 mt-1">
              Secure Payments
            </p>
            <p className="text-xs text-stone-600 text-left">
              All payments securely processed by Stripe.
            </p>
          </div>
          <div className="p-2 border border-gray-200 bg-white rounded-md flex flex-col items-start">
            <Send size={18} className="text-stone-800" />
            <p className="text-sm font-bold text-stone-800 mt-1">
              Unlimited Invoices
            </p>
            <p className="text-xs text-stone-600 text-left">
              No limit on sending invoices.
            </p>
          </div>

          <div className="p-2 border border-gray-200 bg-white rounded-md flex flex-col items-start">
            <Bell size={18} className="text-stone-800" />
            <p className="text-sm font-bold text-stone-800 mt-1">
              Automated Alerts
            </p>
            <p className="text-xs text-stone-600 text-left">
              Automated alerts to ensure payments aren't missed.
            </p>
          </div>
          <div className="p-2 border border-gray-200 bg-white rounded-md flex flex-col items-start">
            <Image size={18} className="text-stone-800" />
            <p className="text-sm font-bold text-stone-800 mt-1">Branding</p>
            <p className="text-xs text-stone-600 text-left">
              Easily add custom branding and logos.
            </p>
          </div>
        </div>
      </div>
      <Link to="/" className="text-xs text-stone-800 flex items-end gap-1">
        All features <ChevronRight size={14} />
      </Link>
    </div>
  );
};

export default Features;
