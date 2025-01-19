import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import Home from './MobileViews/Home';
import Account from './MobileViews/Account';
import Features from './MobileViews/Features';
import Payments from './MobileViews/Payments';
import Invoices from './MobileViews/Invoices';
import Customers from './MobileViews/Customers';
import { AlignRight, Layers } from 'react-feather';
import { Link } from 'react-router-dom';

const Mobile = ({ view, setView }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setOpen((prev) => !prev);
  };

  const handleChangeView = (view) => {
    setView(view);
    setOpen(false);
  };

  //for handling when a user clicks away from the dropdown menu
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false); // Close the dropdown if clicking outside
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const activeLink =
    'w-full border border-stone-800 rounded-md text-stone-800 text-xs p-1';
  const notActiveLink =
    'w-full text-xs p-1 border border-white rounded-md hover:border-stone-800';

  const lastUpdated = 'January 18th, 2025';

  return (
    <div className="flex flex-col w-full gap-2 p-4">
      <div className="w-full bg-white flex justify-between items-center border border-gray-200 rounded-md p-2 relative">
        {/* logo section */}

        <Link to="/" className="h-full flex gap-1 items-center">
          <Layers size={20} className="font-black" />
          <p
            className="font-bold text-stone-800 text-lg"
            style={{ fontFamily: 'Space Mono, monospace' }}
          >
            Bizvo
          </p>
        </Link>

        <AlignRight
          size={17}
          onClick={toggleDropdown}
          className="text-stone-800"
        />
        {open ? (
          <div
            ref={dropdownRef}
            className="w-full flex justify-end absolute top-full z-50 right-0"
          >
            <div className="flex flex-col gap-1 items-start border border-gray-200 rounded-md bg-white p-2">
              <button
                type="button"
                onClick={() => handleChangeView('home')}
                className={view === 'home' ? activeLink : notActiveLink}
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => handleChangeView('account')}
                className={view === 'account' ? activeLink : notActiveLink}
              >
                Account
              </button>
              <button
                type="button"
                onClick={() => handleChangeView('features')}
                className={view === 'features' ? activeLink : notActiveLink}
              >
                Features
              </button>
              <button
                type="button"
                onClick={() => handleChangeView('payments')}
                className={view === 'payments' ? activeLink : notActiveLink}
              >
                Payments
              </button>
              <button
                type="button"
                onClick={() => handleChangeView('invos')}
                className={view === 'invos' ? activeLink : notActiveLink}
              >
                Invoices
              </button>
              <button
                type="button"
                onClick={() => handleChangeView('custs')}
                className={view === 'custs' ? activeLink : notActiveLink}
              >
                Customers
              </button>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
      <div className="w-full">
        {view === 'home' ? (
          <Home setView={setView} lastUpdated={lastUpdated} />
        ) : (
          ''
        )}
        {view === 'account' ? (
          <Account setView={setView} lastUpdated={lastUpdated} />
        ) : (
          ''
        )}
        {view === 'features' ? (
          <Features setView={setView} lastUpdated={lastUpdated} />
        ) : (
          ''
        )}
        {view === 'payments' ? (
          <Payments setView={setView} lastUpdated={lastUpdated} />
        ) : (
          ''
        )}
        {view === 'invos' ? (
          <Invoices setView={setView} lastUpdated={lastUpdated} />
        ) : (
          ''
        )}
        {view === 'custs' ? (
          <Customers setView={setView} lastUpdated={lastUpdated} />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Mobile;
