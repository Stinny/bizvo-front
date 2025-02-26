import React, { useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useLocation } from 'react-router-dom';
import Account from '../../../components/Settings/Account/Account';
import Notifications from '../../../components/Settings/Notifications/Notifications';
import Payments from '../../../components/Settings/Payments/Payments';
import Apps from '../../../components/Settings/Apps/Apps';

const Desktop = ({
  refetch,
  currentUser,
  activeTabIndex,
  setActiveTabIndex,
}) => {
  const location = useLocation();

  return (
    <div className="w-10/12 bg-white border rounded-md border-gray-200 p-2">
      <Tabs
        selectedIndex={activeTabIndex}
        onSelect={(index) => setActiveTabIndex(index)}
        className="w-full text-left"
      >
        <TabList>
          <Tab>Account</Tab>
          <Tab>Payments</Tab>
          <Tab>Notifications</Tab>
          <Tab>Apps</Tab>
        </TabList>

        <TabPanel>
          <Account currentUser={currentUser} refetch={refetch} />
        </TabPanel>

        <TabPanel>
          <Payments currentUser={currentUser} refetch={refetch} />
        </TabPanel>

        <TabPanel>
          <Notifications
            currentUser={currentUser}
            refetch={refetch}
            setActiveTabIndex={setActiveTabIndex}
          />
        </TabPanel>
        <TabPanel>
          <Apps currentUser={currentUser} refetch={refetch} />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Desktop;
