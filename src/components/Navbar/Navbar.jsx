import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import {
  CreditCard,
  FileText,
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
      <div className="max-w-3xl bg-white flex justify-between items-center border border-gray-200 rounded-md p-2">
        {/* logo section */}

        <Link to="/dashboard" className="flex gap-1">
          <Layers size={20} className="font-black" />
          <p
            className="font-bold text-stone-800 text-md"
            style={{ fontFamily: 'Space Mono, monospace' }}
          >
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
          className="w-full flex justify-end absolute top-full z-50"
        >
          <div className="bg-white border border-gray-200 rounded-md flex flex-col items-start p-2">
            <div className="flex flex-col gap-2 items-start w-full pb-2">
              <Link
                to="/settings"
                className="w-full p-1 text-xs text-stone-800 flex items-center gap-2 border border-white rounded-md hover:border-stone-800 hover:outline-non"
              >
                <Settings size={14} className="text-stone-800" />
                <p className="text-xs text-stone-800">Settings</p>
              </Link>
              <Link
                to="/contact"
                className="w-full p-1 text-xs text-stone-800 flex items-center gap-2 border border-white rounded-md hover:border-stone-800 hover:outline-non"
              >
                <MessageSquare size={14} className="text-stone-800" />
                <p className="text-xs text-stone-800">Message Us</p>
              </Link>
            </div>
            <div className="border-t border-gray-200 flex flex-col gap-1 items-start w-full pt-2">
              <button
                type="button"
                onClick={() => logout('logout')}
                className="w-full flex items-center gap-2 border  rounded-md border-stone-800 hover:outline-none p-1"
              >
                <LogOut size={14} className="text-stone-800" />
                <p className="text-xs text-stone-800">Logout</p>
              </button>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </nav>
  ) : (
    <nav className="w-full bg-gray-50">
      <div className="max-w-3xl bg-white flex justify-between items-center border border-gray-200 rounded-md p-2">
        {/* logo section */}

        <Link to="/" className="h-full flex gap-1 items-center">
          <Layers size={20} className="font-black" />
          <p
            className="font-bold text-stone-800 text-lg"
            style={{ fontFamily: 'Space Mono, monospace' }}
          >
            Bizvo
          </p>
        </Link>

        <Toast />

        {/* links section */}
        <div className="h-full flex items-center justify-between">
          <div className="flex gap-3 items-center">
            <Link
              to="/docs"
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
              className="flex text-xs items-center justify-center border border-stone-800 text-stone-800 rounded-md p-1 pl-2 pr-2"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );

  return content;
};

export default Navbar;
