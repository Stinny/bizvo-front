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
import Cookies from 'js-cookie';

const Desktop = ({ refetch }) => {
  const location = useLocation();
  const [activeTabIndex, setActiveTabIndex] = useState(
    location?.state?.index || 0
  );

  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  return (
    <div className="w-10/12 bg-white border rounded-md border-gray-200 p-2">
      <Tabs
        selectedIndex={activeTabIndex}
        onSelect={setActiveTabIndex}
        className="w-full text-left"
      >
        <TabList>
          <Tab>Profile</Tab>
          <Tab>Account</Tab>
          <Tab>Payments</Tab>
          <Tab>Notifications</Tab>
        </TabList>

        <TabPanel>
          <Profile currentUser={currentUser} refetch={refetch} />
        </TabPanel>

        <TabPanel>
          <Account currentUser={currentUser} refetch={refetch} />
        </TabPanel>

        <TabPanel>
          <Payments currentUser={currentUser} refetch={refetch} />
        </TabPanel>

        <TabPanel>
          <Notifications currentUser={currentUser} refetch={refetch} />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Desktop;
