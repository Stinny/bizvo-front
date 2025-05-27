import React, { useState } from 'react';
import { CornerUpRight, Layers } from 'react-feather';
import { Link, useLocation } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Home from './Views/Home';
import Account from './Views/Account';
import Features from './Views/Features';
import Payments from './Views/Payments';
import Invoices from './Views/Invoices';
import Customers from './Views/Customers';
import Tos from './Views/Tos';
import Privacy from './Views/Privacy';

const Desktop = ({ currentUser }) => {
  const location = useLocation();
  const [activeTabIndex, setActiveTabIndex] = useState(
    location?.state?.index || 0
  );

  const lastUpdated = 'January 18th, 2025';
  const polUpdated = 'January 24th, 2025';

  return (
    <div className="flex flex-col items-start max-w-2xl mx-auto gap-2 h-fit mt-2">
      <div className="w-full mx-auto flex justify-center items-center h-6 mb-1"></div>
      <div className="flex items-center justify-between w-full border border-gray-200 rounded-sm p-2">
        <Link to="/docs">
          <p
            className="font-bold text-stone-800 dark:text-white text-sm flex items-center"
            style={{ fontFamily: 'Geist Mono' }}
          >
            <Layers size={16} className="font-black dark:text-white mr-1" />
            Bizvo|
            <span
              className="text-xs font-normal"
              style={{ fontFamily: 'Geist' }}
            >
              Docs
            </span>
          </p>
        </Link>

        <Link
          to="/dashboard"
          className="flex items-center gap-1 border border-white dark:border-neutral-800 dark:hover:border-white"
        >
          <p className="text-xs text-stone-800 dark:text-white">
            {currentUser ? 'Dashboard' : 'Home'}
          </p>
          <CornerUpRight size={12} className="text-stone-800 dark:text-white" />
        </Link>
      </div>
      <div className="w-full flex flex-col border border-gray-200 p-2 rounded-sm">
        <Tabs
          selectedIndex={activeTabIndex}
          onSelect={(index) => setActiveTabIndex(index)}
          className="w-full text-left"
        >
          <TabList>
            <Tab>Onboard</Tab>
            <Tab>Fees</Tab>
            <Tab>Invoices</Tab>
            <Tab>Customers</Tab>
          </TabList>

          <TabPanel>
            <Account lastUpdated={lastUpdated} />
          </TabPanel>

          <TabPanel>
            <Payments lastUpdated={lastUpdated} />
          </TabPanel>

          <TabPanel>
            <Invoices lastUpdated={lastUpdated} />
          </TabPanel>
          <TabPanel>
            <Customers lastUpdated={lastUpdated} />
          </TabPanel>
        </Tabs>

        {/* {view === 'home' ? (
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
        {view === 'priv' ? <Privacy lastUpdated={polUpdated} /> : ''} */}
      </div>
    </div>
  );
};

export default Desktop;
