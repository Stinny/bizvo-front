import React from 'react';
import { Layers, MessageSquare } from 'react-feather';
import { Link } from 'react-router-dom';
import { FaProductHunt, FaXTwitter } from 'react-icons/fa6';
import Cookies from 'js-cookie';
import { isMobile } from 'react-device-detect';

const Footer = () => {
  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  return isMobile ? (
    <footer className="w-full bg-transparent flex justify-center">
      <div className="w-full bg-white flex justify-end items-center gap-3">
        <button type="button" onClick={() => window.scroll(0, 0)} className="">
          <Layers size={16} className="font-black" />
        </button>
        <Link
          to="/contact"
          className="flex text-xs p-1 justify-center items-center text-stone-800 rounded-md"
        >
          <MessageSquare size={16} className="text-stone-800" />
        </Link>
        <FaXTwitter className="text-sm text-stone-800" />
      </div>
    </footer>
  ) : (
    <footer className="w-full bg-transparent absolute top-full">
      <div className="max-w-3xl bg-white flex justify-end items-center gap-3 mt-4 mb-6">
        <button type="button" onClick={() => window.scroll(0, 0)} className="">
          <Layers size={16} className="font-black" />
        </button>
        <Link
          to="/contact"
          className="flex text-xs p-1 justify-center items-center text-stone-800 rounded-md"
        >
          <MessageSquare size={16} className="text-stone-800" />
        </Link>
        <FaXTwitter className="text-sm text-stone-800" />
      </div>
    </footer>
  );
};

export default Footer;
