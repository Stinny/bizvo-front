import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import Sidenav from '../../../components/Sidenav/Sidenav';
import Footer from '../../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import { MoreVertical, Plus, Send } from 'react-feather';
import { Badge } from 'flowbite-react';

const Desktop = ({ invoices }) => {
  let content;

  content = invoices?.length ? (
    <div className="w-10/12 flex flex-col items-start gap-2">
      <div className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-md p-2">
        <div className="flex flex-col items-start">
          <p className="text-sm text-stone-800">Invoices</p>
          <p className="text-xs text-stone-700">View all your invoices</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/dashboard/invoices/add"
            className="p-1 border border-stone-800 text-stone-800 font-bold text-xs rounded-md"
          >
            <Plus size={12} />
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-3 w-full gap-2">
        {invoices?.map((invoice, index) => (
          <Link
            to={`/dashboard/invoices/${invoice?._id}`}
            className="w-full bg-white hover:border-stone-800 border border-gray-200 rounded-md flex flex-col items-start relative"
            key={index}
          >
            <div className="absolute top-0 right-0 mt-1 mr-1">
              {invoice?.sent ? (
                <Send size={16} className="text-stone-800" />
              ) : (
                <Send size={16} className="text-gray-200" />
              )}
            </div>
            <div className="w-full flex flex-col items-start gap-1 p-2">
              <div className="flex flex-col items-start">
                <p className="text-xs text-stone-700">Title</p>
                <p className="text-xs text-stone-800">{invoice?.title}</p>
              </div>
              <div className="flex flex-col items-start">
                <p className="text-xs text-stone-700">Customer</p>
                <p className="text-xs text-stone-800">
                  {invoice?.customer?.name}
                </p>
              </div>
            </div>
            <div className="w-full flex justify-between border-t border-gray-200 p-2">
              <p className="text-xs text-stone-800">$125.00</p>
              {invoice?.paid ? (
                <Badge size="xs" color="success">
                  Paid
                </Badge>
              ) : (
                <>
                  {invoice?.sent ? (
                    <Badge size="xs" color="pink">
                      Unpaid
                    </Badge>
                  ) : (
                    <Badge size="xs" color="info">
                      Draft
                    </Badge>
                  )}
                </>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  ) : (
    <div className="w-10/12 bg-white border rounded-md border-gray-200 p-2 h-96 flex items-center justify-center">
      <div className="flex flex-col items-center text-center">
        <p className="text-sm text-stone-800">No invoices</p>
        <p className="text-xs text-stone-700">
          Create and send a new invoice below
        </p>
        <Link
          to="/dashboard/invoices/add"
          className="flex items-center justify-center gap-1 border border-stone-800 rounded-md p-1 mt-2"
        >
          <p className="text-xs text-stone-800">New</p>
          <Plus size={12} className="text-stone-800 font-bold" />
        </Link>
      </div>
    </div>
  );

  return content;
};

export default Desktop;
