import React, { useEffect } from 'react';
import Desktop from './Desktop/Desktop';
import { useParams } from 'react-router-dom';
import { useGetCustomerQuery } from '../../../api/customersApiSlice';
import { Spinner } from 'flowbite-react';
import Loading from '../../../components/Loading';
import Navbar from '../../../components/Navbar/Navbar';
import Sidenav from '../../../components/Sidenav/Sidenav';
import Footer from '../../../components/Footer/Footer';

const CustomerDetail = () => {
  const { customerId } = useParams();
  const {
    data: customer,
    isLoading,
    isSuccess,
    refetch,
  } = useGetCustomerQuery({ customerId });

  useEffect(() => {
    refetch();
  }, []);

  let content;

  if (isLoading) {
    content = <Loading />;
  } else if (isSuccess) {
    content = <Desktop customer={customer} refetch={refetch} />;
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

export default CustomerDetail;
