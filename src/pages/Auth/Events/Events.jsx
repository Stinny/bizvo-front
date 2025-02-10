import React, { useEffect, useState } from 'react';
import Desktop from './Desktop';
import { useGetEventsQuery } from '../../../api/eventsApiSlice';
import Loading from '../../../components/Loading';
import Navbar from '../../../components/Navbar/Navbar';
import Sidenav from '../../../components/Sidenav/Sidenav';
import { useLocation, useSearchParams } from 'react-router-dom';

const Events = () => {
  const location = useLocation();
  const [evId, setEvId] = useState(location?.state?.evId || null);

  const { data, isLoading, isFetching, isSuccess, refetch } =
    useGetEventsQuery();

  useEffect(() => {
    refetch();
  }, []);

  let content;

  if (isLoading || isFetching) {
    content = <Loading />;
  } else if (isSuccess) {
    content = <Desktop events={data} evId={evId} />;
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

export default Events;
