import React, { useEffect } from 'react';
import Desktop from './Desktop';
import { useGetPayoutsQuery } from '../../../api/payoutsApiSlice';
import Loading from '../../../components/Loading';
import Navbar from '../../../components/Navbar/Navbar';
import Sidenav from '../../../components/Sidenav/Sidenav';
import Footer from '../../../components/Footer/Footer';
import Cookies from 'js-cookie';

const Payouts = () => {
  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  //hook for getting payouts
  const { data, isLoading, isSuccess, isFetching, refetch } =
    useGetPayoutsQuery();

  useEffect(() => {
    refetch();
  }, []);

  let content;

  if (isLoading || isFetching) {
    content = <Loading />;
  } else if (isSuccess) {
    content = (
      <Desktop
        payouts={data?.payouts}
        balance={data?.balance}
        currentUser={currentUser}
      />
    );
  }

  return (
    <div className="mx-auto max-w-3xl flex flex-col items-start gap-2 h-screen relative">
      <Navbar />
      <div className="flex items-start gap-2 w-full">
        <Sidenav />
        {content}
      </div>
      <Footer />
    </div>
  );
};
export default Payouts;
