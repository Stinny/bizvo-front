import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetInvoiceQuery } from '../../../api/invoicesApiSlice';
import Loading from '../../../components/Loading';
import Desktop from './Desktop/Desktop';
import Navbar from '../../../components/Navbar/Navbar';
import Sidenav from '../../../components/Sidenav/Sidenav';
import Footer from '../../../components/Footer/Footer';

const InvoDetail = () => {
  const { invoiceId } = useParams();

  const {
    data: invoice,
    isLoading,
    isSuccess,
    isFetching,
    refetch,
  } = useGetInvoiceQuery({ invoiceId });

  useEffect(() => {
    refetch();
  }, []);

  let content;

  if (isLoading || isFetching) {
    content = <Loading />;
  } else if (isSuccess) {
    content = <Desktop invoice={invoice} refetch={refetch} />;
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

export default InvoDetail;
