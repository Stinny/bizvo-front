import React from 'react';
import {
  AlertOctagon,
  DollarSign,
  FileText,
  Home,
  Info,
  MessageCircle,
  Plus,
  Settings,
  Users,
} from 'react-feather';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const Sidenav = () => {
  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  const path = window.location.pathname;
  const activeLink =
    'w-full flex items-center gap-2 border border-stone-800 rounded-md p-1';
  const notActiveLink =
    'w-full flex items-center gap-2 p-1 border border-white rounded-md hover:border-stone-800';

  return (
    <div className="bg-white border border-gray-200 rounded-md flex flex-col items-start p-2 w-2/12">
      <div className="flex flex-col gap-1 items-start w-full pb-1">
        <Link
          to="/dashboard"
          className={path === '/dashboard' ? activeLink : notActiveLink}
        >
          <Home size={14} className="text-stone-800" />
          <p className="text-xs text-stone-800">Home</p>
        </Link>
        <Link
          to="/dashboard/invoices"
          className={
            path.startsWith('/dashboard/invoices') ? activeLink : notActiveLink
          }
        >
          <FileText size={14} className="text-stone-800" />
          <p className="text-xs text-stone-800">Invoices</p>
        </Link>
        <Link
          to="/dashboard/customers"
          className={
            path.startsWith('/dashboard/customers') ? activeLink : notActiveLink
          }
        >
          <Users size={14} className="text-stone-800" />
          <p className="text-xs text-stone-800">Customers</p>
        </Link>
        <Link
          to="/dashboard/reviews"
          className={path === '/dashboard/reviews' ? activeLink : notActiveLink}
        >
          <MessageCircle size={14} className="text-stone-800" />
          <p className="text-xs text-stone-800">Reviews</p>
        </Link>
      </div>
      <div className="border-t border-gray-200 flex flex-col gap-1 items-start w-full pt-1">
        <Link
          to="/dashboard/payouts"
          className={
            path.startsWith('/dashboard/payouts') ? activeLink : notActiveLink
          }
        >
          <DollarSign size={14} className="text-stone-800" />
          <p className="text-xs text-stone-800">Payouts</p>
        </Link>
        <Link
          to="/settings"
          className={path === '/settings' ? activeLink : notActiveLink}
        >
          <Settings size={14} className="text-stone-800" />
          <p className="text-xs text-stone-800">Settings</p>
        </Link>
        <Link
          to="/dashboard/add"
          className="w-full flex items-center justify-center gap-1 border border-stone-800 rounded-md p-1"
        >
          <p className="text-xs text-stone-800">New</p>
          <Plus size={12} className="text-stone-800 font-bold" />
        </Link>
        {!currentUser?.bankAdded && !currentUser?.stripeOnboard ? (
          <div className="w-full text-left flex flex-col items-start gap-1 p-1 border border-gray-200 rounded-md">
            <AlertOctagon size={16} className="text-red-400" />
            <p className="text-stone-800" style={{ fontSize: '10px' }}>
              Select how you want to be paid in{' '}
              <span>
                <Link to="/settings" className="font-bold text-stone-800">
                  settings
                </Link>
              </span>{' '}
              before sending invoices
            </p>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Sidenav;
