import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useGetInvoiceQuery } from '../../../api/invoicesApiSlice';
import Loading from '../../../components/Loading';
import Desktop from './Desktop/Desktop';
import Navbar from '../../../components/Navbar/Navbar';
import Sidenav from '../../../components/Sidenav/Sidenav';
import Footer from '../../../components/Footer/Footer';

const InvoDetail = () => {
  const { invoiceId } = useParams();
  const location = useLocation();
  const [activeTabIndex, setActiveTabIndex] = useState(
    location?.state?.tab || 0
  );

  const { data, isLoading, isSuccess, isFetching, refetch } =
    useGetInvoiceQuery({ invoiceId });

  useEffect(() => {
    refetch();
  }, []);

  let content;

  if (isLoading || isFetching) {
    content = <Loading />;
  } else if (isSuccess) {
    content = (
      <Desktop
        invoice={data?.invoice}
        trxs={data?.trxs}
        events={data?.events}
        activeTabIndex={activeTabIndex}
        setActiveTabIndex={setActiveTabIndex}
        refetch={refetch}
      />
    );
  }

  return (
    <div className="mx-auto max-w-2xl flex flex-col items-start gap-2 h-fit">
      <Navbar />
      <div className="flex items-start gap-2 w-full">
        {/* <Sidenav /> */}
        {content}
      </div>
    </div>
  );
};

export default InvoDetail;
