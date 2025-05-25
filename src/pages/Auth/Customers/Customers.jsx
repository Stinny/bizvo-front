import React, { useEffect } from 'react';
import Desktop from './Desktop';
import { useGetCustomersQuery } from '../../../api/customersApiSlice';
import Loading from '../../../components/Loading';
import Navbar from '../../../components/Navbar/Navbar';
import Sidenav from '../../../components/Sidenav/Sidenav';
import Footer from '../../../components/Footer/Footer';

const Customers = () => {
  //get customers API hook
  const {
    data: customers,
    isLoading,
    isSuccess,
    isFetching,
    refetch,
  } = useGetCustomersQuery();

  useEffect(() => {
    refetch();
  }, []);

  let content;

  if (isLoading) {
    content = <Loading />;
  } else if (isSuccess) {
    content = <Desktop customers={customers} />;
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

export default Customers;
