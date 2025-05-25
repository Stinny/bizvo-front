import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import Sidenav from '../../../components/Sidenav/Sidenav';
import Footer from '../../../components/Footer/Footer';
import { useGetStatsTempQuery } from '../../../api/accountApiSlice';
import Loading from '../../../components/Loading';
import Desktop from './Desktop';
import Cookies from 'js-cookie';

const Home = () => {
  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  const [filter, setFilter] = useState({ label: 'Last 7 days', value: 'week' });

  const { data, isLoading, isSuccess, isFetching, refetch } =
    useGetStatsTempQuery({ filter: filter.value });

  useEffect(() => {
    refetch();
  }, []);

  let content;

  if (isLoading || isFetching) {
    content = <Loading />;
  } else if (isSuccess) {
    content = (
      <Desktop
        data={data}
        currentUser={currentUser}
        filter={filter}
        setFilter={setFilter}
      />
    );
  }

  return (
    <div className="mx-auto max-w-2xl flex flex-col items-start gap-2">
      <Navbar />
      <div className="flex items-start gap-2 w-full">
        {/* <Sidenav /> */}
        {content}
      </div>
    </div>
  );
};

export default Home;
