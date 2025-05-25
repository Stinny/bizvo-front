import React, { useEffect, useState } from 'react';
import Desktop from './Desktop';
import { useGetEventsQuery } from '../../../api/eventsApiSlice';
import Loading from '../../../components/Loading';
import Navbar from '../../../components/Navbar/Navbar';
import Sidenav from '../../../components/Sidenav/Sidenav';
import { useLocation, useSearchParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { io } from 'socket.io-client';

const Events = () => {
  const location = useLocation();
  const [evId, setEvId] = useState(location?.state?.evId || null);
  const [invoId, setInvoId] = useState(location?.state?.invoId || null);

  const [forceUpdate, setForceUpdate] = useState(false);

  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  const { data, isLoading, isFetching, isSuccess, refetch } =
    useGetEventsQuery();

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_WEBSOCK_URL); // Change URL to your server URL

    const fetchEventsCount = () => {
      socket.emit('getEventsCount', currentUser?._id);
    };

    socket.on('eventsCount', (numberOfEvents) => {
      if (numberOfEvents > currentUser?.events) {
        currentUser.events = numberOfEvents;
        const updatedUser = JSON.stringify(currentUser);
        Cookies.set('currentUser', updatedUser, { sameSite: 'Lax' });
        setForceUpdate((prevState) => !prevState);
        refetch();
      }
    });

    const interval = setInterval(fetchEventsCount, 60000); // Fetch events count every 30s

    return () => {
      clearInterval(interval);
      socket.disconnect();
    };
  }, []);

  let content;

  if (isLoading || isFetching) {
    content = <Loading />;
  } else if (isSuccess) {
    content = (
      <Desktop
        events={data}
        evId={evId}
        setEvId={setEvId}
        invoId={invoId}
        setInvoId={setInvoId}
        currentUser={currentUser}
        setForceUpdate={setForceUpdate}
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

export default Events;
