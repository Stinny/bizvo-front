import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';
import Sidenav from '../../../components/Sidenav/Sidenav';
import Footer from '../../../components/Footer/Footer';
import { useGetPayoutQuery } from '../../../api/payoutsApiSlice';
import Loading from '../../../components/Loading';
import Desktop from './Desktop';

const PayoutDetail = () => {
  const { payoutId } = useParams();

  const { data, isLoading, isSuccess, isFetching, refetch } = useGetPayoutQuery(
    { payoutId }
  );

  let content;

  if (isLoading || isFetching) {
    content = <Loading />;
  } else if (isSuccess) {
    content = <Desktop payout={data} />;
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

export default PayoutDetail;
