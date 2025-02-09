import React from 'react';
import { isMobile } from 'react-device-detect';
import {
  Archive,
  ArrowRight,
  Bell,
  ChevronDown,
  ChevronRight,
  CreditCard,
  File,
  Image,
  Link2,
  Send,
} from 'react-feather';
import { Link } from 'react-router-dom';

const Features = () => {
  return isMobile ? (
    <div className="w-full flex flex-col gap-1 items-end">
      <div className="flex flex-col gap-2 w-full">
        <div className="w-full p-2 border border-gray-200 bg-white rounded-md flex flex-col items-start">
          <File size={18} className="text-stone-800" />
          <p className="text-sm font-bold text-stone-800 mt-1">MoR Services</p>
          <p className="text-xs text-stone-800 text-left">
            We serve as your Merchant of Record, acting as the legal entity for
            all transactions. That includes:
          </p>
          <div className="flex flex-col gap-2 mt-3">
            <p className="text-xs text-stone-800 flex items-center gap-1">
              <ChevronRight size={14} />
              Tax Calculation
            </p>
            <p className="text-xs text-stone-800 flex items-center gap-1">
              <ChevronRight size={14} />
              Tax Collection
            </p>
            <p className="text-xs text-stone-800 flex items-center gap-1">
              <ChevronRight size={14} />
              Tax Remittance
            </p>
          </div>
          <p className="text-xs text-stone-800 text-left mt-3">and more..</p>
        </div>
        <div className="w-full grid grid-cols-2 gap-2">
          <div className="p-2 border border-gray-200 bg-white rounded-md flex flex-col items-start">
            <CreditCard size={18} className="text-stone-800" />
            <p className="text-sm font-bold text-stone-800 mt-1">
              Secure Payments
            </p>
            <p className="text-xs text-stone-800 text-left">
              All payments securely processed by Stripe.
            </p>
          </div>
          <div className="p-2 border border-gray-200 bg-white rounded-md flex flex-col items-start">
            <Send size={18} className="text-stone-800" />
            <p className="text-sm font-bold text-stone-800 mt-1">
              Unlimited Invoices
            </p>
            <p className="text-xs text-stone-800 text-left">
              Never reach a limit on created or sent invoices.
            </p>
          </div>

          <div className="p-2 border border-gray-200 bg-white rounded-md flex flex-col items-start">
            <Bell size={18} className="text-stone-800" />
            <p className="text-sm font-bold text-stone-800 mt-1">
              Automated Alerts
            </p>
            <p className="text-xs text-stone-800 text-left">
              Automated alerts to ensure payments aren't missed.
            </p>
          </div>
          <div className="p-2 border border-gray-200 bg-white rounded-md flex flex-col items-start">
            <Link2 size={18} className="text-stone-800" />
            <p className="text-sm font-bold text-stone-800 mt-1">
              Payment Links
            </p>
            <p className="text-xs text-stone-800 text-left">
              Secure links for fast and easy payments.
            </p>
          </div>
        </div>
      </div>
      <Link
        to="/docs"
        state={{ view: { value: 'features', label: 'Features' } }}
        className="text-xs text-stone-800 flex items-end gap-1"
      >
        All features <ChevronRight size={14} />
      </Link>
    </div>
  ) : (
    <div className="w-full flex flex-col gap-1 items-end">
      <div className="flex gap-2">
        <div className="w-5/12 p-2 border border-gray-200 bg-white rounded-md flex flex-col items-start">
          <File size={18} className="text-stone-800" />
          <p className="text-sm font-bold text-stone-800 mt-1">MoR Services</p>
          <p className="text-xs text-stone-800 text-left">
            We serve as your Merchant of Record, acting as the legal entity for
            all transactions. That includes:
          </p>
          <div className="flex flex-col gap-2 mt-3">
            <p className="text-xs text-stone-800 flex items-center gap-1">
              <ChevronRight size={14} />
              Tax Calculation
            </p>
            <p className="text-xs text-stone-800 flex items-center gap-1">
              <ChevronRight size={14} />
              Tax Collection
            </p>
            <p className="text-xs text-stone-800 flex items-center gap-1">
              <ChevronRight size={14} />
              Tax Remittance
            </p>
          </div>
          <p className="text-xs text-stone-800 text-left mt-3">and more..</p>
        </div>
        <div className="w-7/12 grid grid-cols-2 gap-2">
          <div className="p-2 border border-gray-200 bg-white rounded-md flex flex-col items-start">
            <CreditCard size={18} className="text-stone-800" />
            <p className="text-sm font-bold text-stone-800 mt-1">
              Secure Payments
            </p>
            <p className="text-xs text-stone-800 text-left">
              All payments securely processed by Stripe.
            </p>
          </div>
          <div className="p-2 border border-gray-200 bg-white rounded-md flex flex-col items-start">
            <Send size={18} className="text-stone-800" />
            <p className="text-sm font-bold text-stone-800 mt-1">
              Unlimited Invoices
            </p>
            <p className="text-xs text-stone-800 text-left">
              Never reach a limit on invoices created or sent
            </p>
          </div>

          <div className="p-2 border border-gray-200 bg-white rounded-md flex flex-col items-start">
            <Bell size={18} className="text-stone-800" />
            <p className="text-sm font-bold text-stone-800 mt-1">
              Automated Alerts
            </p>
            <p className="text-xs text-stone-800 text-left">
              Automated alerts to ensure payments aren't missed.
            </p>
          </div>
          <div className="p-2 border border-gray-200 bg-white rounded-md flex flex-col items-start">
            <Link2 size={18} className="text-stone-800" />
            <p className="text-sm font-bold text-stone-800 mt-1">
              Payment Links
            </p>
            <p className="text-xs text-stone-800 text-left">
              Secure links for fast and easy payments.
            </p>
          </div>
        </div>
      </div>
      <Link
        to="/docs"
        state={{ view: 'features' }}
        className="text-xs text-stone-800 flex items-end gap-1"
      >
        All features <ChevronRight size={14} />
      </Link>
    </div>
  );
};

export default Features;
