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
    <footer className="w-full bg-transparent">
      <div className="max-w-3xl bg-white flex justify-center items-center mt-4 mb-6">
        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="flex text-xs p-1 justify-center items-center text-stone-800 rounded-md"
          >
            Contact
          </Link>
          <Link
            to="/tos"
            className="flex text-xs p-1 justify-center items-center text-stone-800 rounded-md"
          >
            Terms
          </Link>
          <Link
            to="/tos"
            className="flex text-xs p-1 justify-center items-center text-stone-800 rounded-md"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  ) : (
    <footer className="w-full bg-transparent">
      <div className="max-w-3xl bg-white flex justify-center items-center mt-4 mb-6">
        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="flex text-xs p-1 justify-center items-center text-stone-800 rounded-md"
          >
            Contact
          </Link>
          <Link
            to="/tos"
            className="flex text-xs p-1 justify-center items-center text-stone-800 rounded-md"
          >
            Terms
          </Link>
          <Link
            to="/tos"
            className="flex text-xs p-1 justify-center items-center text-stone-800 rounded-md"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
