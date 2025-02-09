import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import {
  BarChart2,
  Book,
  CreditCard,
  FileText,
  Home,
  Layers,
  LogOut,
  MessageSquare,
  Settings,
} from 'react-feather';
import { Link } from 'react-router-dom';
import useHandleLogoutUser from '../../utils/logout';
import { isMobile } from 'react-device-detect';
import { Avatar, Dropdown } from 'flowbite-react';
import img from '../../assets/green.png';
import Toast from '../Toast';
import DarkMode from './DarkMode';
import Mobile from './Mobile';

const Navbar = () => {
  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  const logout = useHandleLogoutUser();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setOpen((prev) => !prev);
  };

  //for handling when a user clicks away from the dropdown menu
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false); // Close the dropdown if clicking outside
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  let content;

  content = currentUser ? (
    <nav className="w-full bg-transparent flex flex-col relative overflow-visible">
      <div className="max-w-3xl bg-white dark:bg-neutral-800 flex justify-between items-center border border-gray-200 dark:border-white rounded-md p-2">
        {/* logo section */}

        <Link to="/dashboard">
          <p
            className="font-bold text-stone-800 dark:text-white text-sm flex items-center gap-1"
            style={{ fontFamily: 'Geist Mono' }}
          >
            <Layers size={16} className="font-black dark:text-white" />
            Bizvo
          </p>
        </Link>

        <Toast />

        <Avatar
          size="xs"
          img={currentUser?.logo?.url}
          onClick={toggleDropdown}
          className="hover:cursor-pointer"
        />
      </div>

      {open ? (
        <div
          ref={dropdownRef}
          className="w-full flex justify-end absolute top-full z-10"
        >
          <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:boder-white rounded-md flex flex-col items-start p-2">
            <div className="flex flex-col gap-2 items-start w-full pb-2">
              <Link
                to="/dashboard"
                className="w-full p-1 pl-2 pr-2 text-xs text-stone-800 flex items-center gap-1 border border-white dark:border-neutral-800 dark:hover:border-white rounded-md hover:border-stone-800 hover:outline-non"
              >
                <BarChart2
                  size={14}
                  className="text-stone-800 dark:text-white"
                />
                <p className="text-xs text-stone-800 dark:text-white">
                  Dashboard
                </p>
              </Link>
              <Link
                to="/contact"
                className="w-full p-1 pl-2 pr-2 text-xs text-stone-800 flex items-center gap-1 border border-white dark:border-neutral-800 dark:hover:border-white rounded-md hover:border-stone-800 hover:outline-non"
              >
                <MessageSquare
                  size={14}
                  className="text-stone-800 dark:text-white"
                />
                <p className="text-xs text-stone-800 dark:text-white">
                  Message
                </p>
              </Link>
              <Link
                to="/docs"
                className="w-full p-1 pl-2 pr-2 text-xs text-stone-800 flex items-center gap-1 border border-white dark:border-neutral-800 dark:hover:border-white rounded-md hover:border-stone-800 hover:outline-non"
              >
                <Book size={14} className="text-stone-800 dark:text-white" />
                <p className="text-xs text-stone-800 dark:text-white">Docs</p>
              </Link>
            </div>
            <div className="border-t border-gray-200 flex items-center justify-between w-full pt-2">
              <DarkMode />
              <button
                type="button"
                onClick={() => logout('logout')}
                className="flex items-center justify-center"
              >
                <LogOut size={14} className="text-stone-800 dark:text-white" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </nav>
  ) : (
    <nav className="w-full bg-white">
      {isMobile ? (
        <Mobile />
      ) : (
        <div className="max-w-3xl bg-white flex justify-between items-center border border-gray-200 rounded-md p-2">
          <Link to="/">
            <p
              className="font-bold text-stone-800 dark:text-white text-sm flex items-center gap-1"
              style={{ fontFamily: 'Geist Mono' }}
            >
              <Layers size={16} className="font-black dark:text-white" />
              Bizvo
            </p>
          </Link>

          <div className="h-full flex items-center justify-between">
            <div className="flex gap-3 items-center">
              <Link
                to="/docs"
                state={{ view: 'home' }}
                className="flex text-xs p-1 pl-2 pr-2 justify-center items-center text-stone-800 rounded-md"
              >
                <p className="font-medium">Docs</p>
              </Link>
              <Link
                to="/pricing"
                className="flex text-xs p-1 pl-2 pr-2 justify-center items-center text-stone-800 rounded-md"
              >
                <p className="font-medium">Pricing</p>
              </Link>
              <Link
                to="/login"
                className="flex text-xs font-medium items-center justify-center border border-stone-800 text-stone-800 rounded-md p-1 pl-2 pr-2"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );

  return content;
};

export default Navbar;
