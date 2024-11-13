import React, { useState } from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import Sidenav from '../../../components/Sidenav/Sidenav';
import Footer from '../../../components/Footer/Footer';
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useLocation } from 'react-router-dom';
import Account from '../../../components/Settings/Account/Account';
import Profile from '../../../components/Settings/Profile/Profile';
import Notifications from '../../../components/Settings/Notifications/Notifications';
import Payments from '../../../components/Settings/Payments/Payments';

const Desktop = () => {
  const location = useLocation();
  const [activeTabIndex, setActiveTabIndex] = useState(
    location?.state?.index || 0
  );
  return (
    <div className="mx-auto max-w-3xl flex flex-col items-start gap-2 h-screen relative">
      <Navbar />
      <div className="flex items-start gap-2 w-full">
        <Sidenav />
        <div className="w-10/12 bg-white border rounded-md border-gray-200 p-2">
          <Tabs
            selectedIndex={activeTabIndex}
            onSelect={setActiveTabIndex}
            className="w-full text-left"
          >
            <TabList>
              <Tab>Account</Tab>
              <Tab>Profile</Tab>
              <Tab>Notifications</Tab>
              <Tab>Payments</Tab>
            </TabList>

            <TabPanel>
              <Account />
            </TabPanel>

            <TabPanel>
              <Profile />
            </TabPanel>

            <TabPanel>
              <Notifications />
            </TabPanel>

            <TabPanel>
              <Payments />
            </TabPanel>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Desktop;
