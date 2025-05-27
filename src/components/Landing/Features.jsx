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
  Smartphone,
} from 'react-feather';
import { Link } from 'react-router-dom';

const Features = () => {
  return isMobile ? (
    <div className="w-full flex flex-col gap-6 items-end">
      <div className="flex flex-col gap-2 w-full">
        <div className="w-full p-2 border border-gray-200 bg-white rounded-sm flex flex-col items-start">
          <File size={16} className="text-stone-800" />
          <p className="text-sm font-medium text-stone-800 mt-1">MoR</p>
          <p className="text-xs text-stone-800 text-left">
            We act as the Merchant of Record, being the legal entity for all
            transactions.
          </p>
          <div className="flex flex-col gap-1 mt-2">
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
        </div>
        <div className="w-full grid grid-cols-2 gap-2">
          <div className="p-2 border border-gray-200 bg-white rounded-sm flex flex-col items-start">
            <CreditCard size={16} className="text-stone-800" />
            <p className="text-sm font-medium text-stone-800 mt-1">
              Secure Payments
            </p>
            <p className="text-xs text-stone-800 text-left">
              All payments securely processed by Stripe.
            </p>
          </div>
          <div className="p-2 border border-gray-200 bg-white rounded-sm flex flex-col items-start">
            <Send size={16} className="text-stone-800" />
            <p className="text-sm font-medium text-stone-800 mt-1">
              Unlimited Invoices
            </p>
            <p className="text-xs text-stone-800 text-left">
              Create and send as many invoices as you need.
            </p>
          </div>

          <div className="p-2 border border-gray-200 bg-white rounded-sm flex flex-col items-start">
            <Smartphone size={16} className="text-stone-800" />
            <p className="text-sm font-medium text-stone-800 mt-1">
              Automated Alerts
            </p>
            <p className="text-xs text-stone-800 text-left">
              Automated alerts to ensure payments aren't missed.
            </p>
          </div>
          <div className="p-2 border border-gray-200 bg-white rounded-sm flex flex-col items-start">
            <Link2 size={16} className="text-stone-800" />
            <p className="text-sm font-medium text-stone-800 mt-1">
              Payment Links
            </p>
            <p className="text-xs text-stone-800 text-left">
              One-click links for fast payments.
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-1 w-full">
        <Link
          to="/docs"
          className="p-1 w-16 bg-white hover:bg-gray-50 border border-gray-200 text-stone-800 rounded-sm text-xs font-medium flex items-center justify-center"
        >
          Docs <ChevronRight size={12} />
        </Link>
        <Link
          to="/pricing"
          className="p-1 w-16 bg-white hover:bg-gray-50 border border-gray-200 text-stone-800 rounded-sm text-xs font-medium flex items-center justify-center"
        >
          Pricing <ChevronRight size={12} />
        </Link>
      </div>
    </div>
  ) : (
    <div className="w-full flex flex-col gap-6 items-end">
      <div className="flex gap-2">
        <div className="w-5/12 p-2 border border-gray-200 bg-white rounded-sm flex flex-col items-start">
          <File size={16} className="text-stone-800" />
          <p className="text-sm font-medium text-stone-800 mt-1">MoR</p>
          <p className="text-xs text-stone-800 text-left">
            We act as the Merchant of Record, being the legal entity for all
            transactions.
          </p>
          <div className="flex flex-col gap-1 mt-2">
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
        </div>
        <div className="w-7/12 grid grid-cols-2 gap-2">
          <div className="p-2 border border-gray-200 bg-white rounded-sm flex flex-col items-start">
            <CreditCard size={16} className="text-stone-800" />
            <p className="text-sm font-medium text-stone-800 mt-1">
              Secure Payments
            </p>
            <p className="text-xs text-stone-800 text-left">
              All payments securely processed by Stripe.
            </p>
          </div>
          <div className="p-2 border border-gray-200 bg-white rounded-sm flex flex-col items-start">
            <Send size={16} className="text-stone-800" />
            <p className="text-sm font-medium text-stone-800 mt-1">
              Unlimited Invoices
            </p>
            <p className="text-xs text-stone-800 text-left">
              Create and send as many invoices as you need.
            </p>
          </div>

          <div className="p-2 border border-gray-200 bg-white rounded-sm flex flex-col items-start">
            <Smartphone size={16} className="text-stone-800" />
            <p className="text-sm font-medium text-stone-800 mt-1">
              Automated Alerts
            </p>
            <p className="text-xs text-stone-800 text-left">
              Automated alerts to ensure payments aren't missed.
            </p>
          </div>
          <div className="p-2 border border-gray-200 bg-white rounded-sm flex flex-col items-start">
            <Link2 size={16} className="text-stone-800" />
            <p className="text-sm font-medium text-stone-800 mt-1">
              Payment Links
            </p>
            <p className="text-xs text-stone-800 text-left">
              One-click links for fast and easy payments.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-1 w-full">
        <Link
          to="/docs"
          className="p-1 w-16 bg-white hover:bg-gray-50 border border-gray-200 text-stone-800 rounded-sm text-xs font-medium flex items-center justify-center"
        >
          Docs <ChevronRight size={12} />
        </Link>
        <Link
          to="/pricing"
          className="p-1 w-16 bg-white hover:bg-gray-50 border border-gray-200 text-stone-800 rounded-sm text-xs font-medium flex items-center justify-center"
        >
          Pricing <ChevronRight size={12} />
        </Link>
      </div>
    </div>
  );
};

export default Features;
