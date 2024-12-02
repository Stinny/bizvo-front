import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import Sidenav from '../../../components/Sidenav/Sidenav';
import Footer from '../../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import { ChevronRight, FileText, Users } from 'react-feather';

const Desktop = () => {
  return (
    <div className="mx-auto max-w-3xl flex flex-col gap-2 h-screen relative">
      <Navbar />
      <div className="flex items-start gap-2">
        <Sidenav />
        <div className="w-10/12 bg-white border rounded-md border-gray-200 p-2 h-96 flex items-center justify-center">
          <div className="flex flex-col gap-2 w-72">
            <Link
              to="/dashboard/customers/add"
              className="p-2 flex justify-between items-center bg-white border border-gray-200 hover:border-stone-800 rounded-md"
            >
              <div className="flex flex-col gap-1 items-start">
                <Users size={20} className="text-stone-800" />
                <div className="flex flex-col items-start text-left">
                  <p className="text-sm text-stone-800">New Customer</p>
                  <p className="text-xs text-stone-800">
                    Create a new customer
                  </p>
                </div>
              </div>
              <ChevronRight size={16} className="text-stone-800" />
            </Link>
            <Link
              to="/dashboard/invoices/add"
              className="p-2 flex justify-between items-center bg-white border border-gray-200 hover:border-stone-800 rounded-md"
            >
              <div className="flex flex-col gap-1 items-start">
                <FileText size={20} className="text-stone-800" />
                <div className="flex flex-col items-start text-left">
                  <p className="text-sm text-stone-800">New Invoice</p>
                  <p className="text-xs text-stone-800">
                    Create and send a new invoice
                  </p>
                </div>
              </div>
              <ChevronRight size={16} className="text-stone-800" />
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Desktop;
