import React from 'react';
import { Layers } from 'react-feather';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';
import Home from './Views/Home';
import Account from './Views/Account';
import Features from './Views/Features';
import Payments from './Views/Payments';
import Invoices from './Views/Invoices';
import Customers from './Views/Customers';
import Tos from './Views/Tos';
import Privacy from './Views/Privacy';

const Desktop = ({ view, setView }) => {
  const activeLink =
    'w-full border border-stone-800 rounded-md text-stone-800 text-xs p-1';
  const notActiveLink =
    'w-full text-xs p-1 border border-white rounded-md hover:border-stone-800';

  const lastUpdated = 'January 18th, 2025';
  const polUpdated = 'January 24th, 2025';

  return (
    <div className="flex flex-col max-w-3xl mx-auto gap-2">
      <Navbar />
      <div className="w-full flex items-start gap-2">
        <div className="bg-white border border-gray-200 rounded-md flex flex-col items-start p-2 w-2/12">
          <div className="flex flex-col gap-1 items-start w-full">
            <button
              type="button"
              onClick={() => setView('home')}
              className={view === 'home' ? activeLink : notActiveLink}
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => setView('account')}
              className={view === 'account' ? activeLink : notActiveLink}
            >
              Onboard
            </button>
            <button
              type="button"
              onClick={() => setView('payments')}
              className={view === 'payments' ? activeLink : notActiveLink}
            >
              Fees
            </button>
            <button
              type="button"
              onClick={() => setView('invos')}
              className={view === 'invos' ? activeLink : notActiveLink}
            >
              Invoices
            </button>
            <button
              type="button"
              onClick={() => setView('custs')}
              className={view === 'custs' ? activeLink : notActiveLink}
            >
              Customers
            </button>
            <button
              type="button"
              onClick={() => setView('features')}
              className={view === 'features' ? activeLink : notActiveLink}
            >
              Features
            </button>
            <div className="w-full flex flex-col gap-1 border-t border-gray-200 pt-1">
              <button
                type="button"
                onClick={() => setView('tos')}
                className={view === 'tos' ? activeLink : notActiveLink}
              >
                Terms
              </button>
              <button
                type="button"
                onClick={() => setView('priv')}
                className={view === 'priv' ? activeLink : notActiveLink}
              >
                Privacy
              </button>
              <Link
                to="/contact"
                className="flex items-center justify-center border-stone-800 border rounded-md p-1 w-full text-xs text-stone-800"
              >
                Message Us
              </Link>
            </div>
          </div>
        </div>

        {view === 'home' ? (
          <Home lastUpdated={lastUpdated} setView={setView} />
        ) : (
          ''
        )}
        {view === 'account' ? <Account lastUpdated={lastUpdated} /> : ''}
        {view === 'features' ? <Features lastUpdated={lastUpdated} /> : ''}
        {view === 'payments' ? <Payments lastUpdated={lastUpdated} /> : ''}
        {view === 'invos' ? <Invoices lastUpdated={lastUpdated} /> : ''}
        {view === 'custs' ? <Customers lastUpdated={lastUpdated} /> : ''}
        {view === 'tos' ? <Tos lastUpdated={polUpdated} /> : ''}
        {view === 'priv' ? <Privacy lastUpdated={polUpdated} /> : ''}
      </div>
    </div>
  );
};

export default Desktop;
