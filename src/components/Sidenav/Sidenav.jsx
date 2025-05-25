import React, { useEffect, useState } from 'react';
import {
  AlertOctagon,
  BarChart2,
  Clock,
  DollarSign,
  FileText,
  Home,
  Info,
  MessageCircle,
  Plus,
  Settings,
  Users,
} from 'react-feather';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Badge } from 'antd';
import io from 'socket.io-client';
import { RiBankLine } from 'react-icons/ri';

const Sidenav = () => {
  const [forceUpdate, setForceUpdate] = useState(false);

  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  const path = window.location.pathname;
  const activeLink =
    'w-full flex items-center gap-1 border border-b-0 border-stone-800 dark:border-white dark:text-white rounded-t-sm p-1';
  const notActiveLink =
    'w-full flex items-center gap-1 p-1 border border-b-0 border-white dark:border-neutral-800 rounded-t-sm hover:border-stone-800 dark:hover:border-white';

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
      }
    });

    fetchEventsCount();

    const interval = setInterval(fetchEventsCount, 60000); // Fetch events count every 30s

    return () => {
      clearInterval(interval);
      socket.disconnect();
    };
  }, []);

  return (
    <div className="bg-white dark:bg-neutral-800 flex flex-col items-start">
      <div className="flex gap-2 items-center">
        <Link
          to="/dashboard"
          className={path === '/dashboard' ? activeLink : notActiveLink}
        >
          <BarChart2 size={14} className="text-stone-800 dark:text-white" />
          <p className="text-xs text-stone-800 dark:text-white">Dashboard</p>
        </Link>
        <Link
          to="/dashboard/events"
          className={
            path.startsWith('/dashboard/events') ? activeLink : notActiveLink
          }
        >
          <Badge dot={currentUser?.events > 0} status="processing" color="#000">
            <Clock size={14} className="text-stone-800 dark:text-white" />
          </Badge>
          <p className="text-xs text-stone-800 dark:text-white">Events</p>
        </Link>
        <Link
          to="/dashboard/invoices"
          className={
            path.startsWith('/dashboard/invoices') ? activeLink : notActiveLink
          }
        >
          <FileText size={14} className="text-stone-800 dark:text-white" />
          <p className="text-xs text-stone-800 dark:text-white">Invoices</p>
        </Link>
        <Link
          to="/dashboard/customers"
          className={
            path.startsWith('/dashboard/customers') ? activeLink : notActiveLink
          }
        >
          <Users size={14} className="text-stone-800 dark:text-white" />
          <p className="text-xs text-stone-800 dark:text-white">Customers</p>
        </Link>
        <Link
          to="/dashboard/payouts"
          className={
            path.startsWith('/dashboard/payouts') ? activeLink : notActiveLink
          }
        >
          <RiBankLine className="text-stone-800" />
          <p className="text-xs text-stone-800 dark:text-white">Payouts</p>
        </Link>
      </div>
    </div>
  );
};

export default Sidenav;
