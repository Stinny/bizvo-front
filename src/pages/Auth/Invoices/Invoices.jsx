import React, { useEffect } from 'react';
import Desktop from './Desktop';
import { useGetInvoicesQuery } from '../../../api/invoicesApiSlice';
import Loading from '../../../components/Loading';
import Navbar from '../../../components/Navbar/Navbar';
import Sidenav from '../../../components/Sidenav/Sidenav';
import Footer from '../../../components/Footer/Footer';

const Invoices = () => {
  const {
    data: invoices,
    isLoading,
    isSuccess,
    refetch,
  } = useGetInvoicesQuery();

  useEffect(() => {
    refetch();
  }, []);

  let content;

  if (isLoading) {
    content = <Loading />;
  } else if (isSuccess) {
    content = <Desktop invoices={invoices} />;
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

export default Invoices;
