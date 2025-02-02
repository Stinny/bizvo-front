import React, { useEffect } from 'react';
import DashDisplay from './DashDisplay';
import { useGetRecentEventsQuery } from '../../api/eventsApiSlice';
import { Spinner } from 'flowbite-react';

const DashEvents = () => {
  const { data, isLoading, isSuccess, isFetching, refetch } =
    useGetRecentEventsQuery();

  useEffect(() => {
    refetch();
  }, []);

  let content;

  if (isLoading || isFetching) {
    content = (
      <div className="w-full flex justify-center items-center h-full">
        <Spinner />
      </div>
    );
  } else if (isSuccess) {
    content = <DashDisplay events={data} />;
  }

  return content;
};

export default DashEvents;
