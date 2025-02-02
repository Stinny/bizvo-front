import React, { useEffect } from 'react';
import Desktop from './Desktop';
import { useGetEventsQuery } from '../../../api/eventsApiSlice';
import Loading from '../../../components/Loading';
import Navbar from '../../../components/Navbar/Navbar';
import Sidenav from '../../../components/Sidenav/Sidenav';

const Events = () => {
  const { data, isLoading, isFetching, isSuccess, refetch } =
    useGetEventsQuery();

  useEffect(() => {
    refetch();
  }, []);

  let content;

  if (isLoading || isFetching) {
    content = <Loading />;
  } else if (isSuccess) {
    content = <Desktop events={data} />;
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
