import React, { useState } from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import Sidenav from '../../../components/Sidenav/Sidenav';
import Footer from '../../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import CustSelect from './CustSelect';
import { ChevronLeft, ChevronRight } from 'react-feather';
import Details from './Details';

const Desktop = ({ handleSaveInvoice, custOpts }) => {
  const [step, setStep] = useState('cust');

  return (
    <div className="mx-auto max-w-3xl flex flex-col gap-2 h-screen relative">
      <Navbar />
      <div className="flex items-start gap-2">
        <Sidenav />
        <div className="w-10/12 flex flex-col gap-4 bg-white border rounded-md border-gray-200 p-2">
          <div className="w-full flex items-center justify-between">
            <div className="flex flex-col items-start text-left">
              <p className="text-sm text-stone-800">New Invoice</p>
              <p className="text-xs text-stone-700">
                Create and send a new invoice
              </p>
            </div>
            {/* <div className="flex items-center gap-2">
              <Link
                to="/dashboard/invoices"
                className="p-1 border border-red-400 text-red-400 font-bold text-xs rounded-md"
              >
                Cancel
              </Link>
              <button
                type="button"
                onClick={handleCreateInvoice}
                className="p-1 border border-stone-800 text-stone-800 font-bold text-xs rounded-md"
              >
                Create
              </button>
            </div> */}
            {step === 'dets' ? (
              <div className="flex items-center gap-1">
                <Link
                  to="/dashboard/invoices"
                  className="p-1 border border-red-400 text-red-400 text-xs rounded-md"
                >
                  Cancel
                </Link>
                <button
                  type="button"
                  onClick={() => setStep('cust')}
                  className="p-1 flex items-center border border-stone-800 text-stone-800 text-xs rounded-md"
                >
                  <ChevronLeft size={12} />
                  Customer
                </button>
              </div>
            ) : (
              ''
            )}

            {step === 'cust' ? (
              <div className="flex items-center gap-1">
                <Link
                  to="/dashboard/invoices"
                  className="p-1 border border-red-400 text-red-400 text-xs rounded-md"
                >
                  Cancel
                </Link>
                <button
                  type="button"
                  onClick={() => setStep('dets')}
                  className="p-1 flex items-center border border-stone-800 text-stone-800 text-xs rounded-md"
                >
                  Details <ChevronRight size={12} />
                </button>
              </div>
            ) : (
              ''
            )}
          </div>

          {step === 'cust' ? <CustSelect custOpts={custOpts} /> : ''}

          {step === 'dets' ? <Details /> : ''}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Desktop;
