import React, { useEffect, useState } from 'react';
import Desktop from './Desktop';
import { useGetUserQuery } from '../../../api/accountApiSlice';
import Loading from '../../../components/Loading';
import Cookies from 'js-cookie';
import Navbar from '../../../components/Navbar/Navbar';
import Sidenav from '../../../components/Sidenav/Sidenav';
import Footer from '../../../components/Footer/Footer';
import { useLocation } from 'react-router-dom';

const Settings = () => {
  const {
    data: userInfo,
    isLoading,
    isSuccess,
    isFetching,
    refetch,
  } = useGetUserQuery();

  const location = useLocation();
  const [activeTabIndex, setActiveTabIndex] = useState(
    location?.state?.index || 0
  );

  useEffect(() => {
    refetch();
  }, []);

  let content;

  if (isLoading || isFetching) {
    content = <Loading />;
  } else if (isSuccess) {
    const updatedUser = JSON.stringify(userInfo);
    Cookies.set('currentUser', updatedUser, { sameSite: 'Lax' });
    content = (
      <Desktop
        refetch={refetch}
        currentUser={userInfo}
        activeTabIndex={activeTabIndex}
        setActiveTabIndex={setActiveTabIndex}
      />
    );
  }

  return (
    <div className="mx-auto max-w-3xl flex flex-col items-start gap-2 h-fit">
      <Navbar />
      <div className="flex items-start gap-2 w-full">
        <Sidenav />
        {content}
      </div>
    </div>
  );
};

export default Settings;
