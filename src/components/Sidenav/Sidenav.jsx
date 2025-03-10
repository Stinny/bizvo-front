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

const Sidenav = () => {
  const [forceUpdate, setForceUpdate] = useState(false);

  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  const path = window.location.pathname;
  const activeLink =
    'w-full flex items-center gap-2 border border-stone-800 dark:border-white dark:text-white rounded-md p-1';
  const notActiveLink =
    'w-full flex items-center gap-2 p-1 border border-white dark:border-neutral-800 rounded-md hover:border-stone-800 dark:hover:border-white';

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
    <div className="bg-white dark:bg-neutral-800 border border-gray-200 rounded-md flex flex-col items-start p-2 w-2/12">
      <div className="flex flex-col gap-1 items-start w-full pb-1">
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
      </div>
      <div className="border-t border-gray-200 flex flex-col gap-1 items-start w-full pt-1">
        <Link
          to="/dashboard/payouts"
          className={
            path.startsWith('/dashboard/payouts') ? activeLink : notActiveLink
          }
        >
          <DollarSign size={14} className="text-stone-800 dark:text-white" />
          <p className="text-xs text-stone-800 dark:text-white">Payouts</p>
        </Link>
        <Link
          to="/settings"
          className={path === '/settings' ? activeLink : notActiveLink}
        >
          <Settings size={14} className="text-stone-800 dark:text-white" />
          <p className="text-xs text-stone-800 dark:text-white">Settings</p>
        </Link>
        {!currentUser?.bankAdded && !currentUser?.stripeOnboard ? (
          <div className="w-full text-left flex flex-col items-start gap-1 p-1 border border-gray-200 rounded-md">
            <AlertOctagon size={16} className="text-red-400" />
            <p
              className="text-stone-800 text-left"
              style={{ fontSize: '11px' }}
            >
              Connect a payout option in{' '}
              <span>
                <Link
                  to="/settings"
                  state={{ index: 2 }}
                  className="font-bold text-stone-800"
                >
                  settings
                </Link>
              </span>
            </p>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Sidenav;
