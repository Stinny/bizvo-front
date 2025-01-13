import React from 'react';
import { Layers } from 'react-feather';
import { Link } from 'react-router-dom';
import { FaProductHunt, FaXTwitter } from 'react-icons/fa6';
import Cookies from 'js-cookie';
import { isMobile } from 'react-device-detect';

const Footer = () => {
  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  return currentUser ? (
    <footer className="w-full bg-transparent absolute bottom-0">
      <div className="w-full bg-white flex justify-between items-center border border-gray-200 rounded-md p-2">
        {/* logo section */}

        <Link to="/dashboard" className="h-full flex gap-1">
          <Layers size={20} className="font-black" />
          <p
            className="font-bold text-stone-800 text-md"
            style={{ fontFamily: 'Space Mono, monospace' }}
          >
            Bizvo
          </p>
        </Link>

        {/* links section */}
        <div className="h-full flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <Link
              to="/tos"
              className="flex text-xs p-1 pl-2 pr-2 justify-center items-center text-stone-800 rounded-md"
            >
              <p className="font-medium">Terms</p>
            </Link>
            <Link
              to="/privacy"
              className="flex text-xs p-1 pl-2 pr-2 justify-center items-center text-stone-800 rounded-md"
            >
              <p className="font-medium">Privacy</p>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <FaProductHunt className="text-sm text-stone-800" />
          <FaXTwitter className="text-sm text-stone-800" />
        </div>
      </div>
    </footer>
  ) : (
    <>
      {isMobile ? (
        <footer className="w-full bg-transparent flex justify-center">
          <div className="w-full bg-white flex justify-between items-center border border-gray-200 rounded-md p-2">
            {/* logo section */}
            <Link to="/" className="h-full flex gap-1">
              <Layers size={20} className="font-black" />
              <p
                className="font-bold text-stone-800 text-md"
                style={{ fontFamily: 'Space Mono, monospace' }}
              >
                Bizvo
              </p>
            </Link>

            {/* links section */}
            <div className="flex gap-2 items-center">
              <Link
                to="/tos"
                className="flex text-xs p-1 justify-center items-center text-stone-800 rounded-md"
              >
                <p className="font-medium">Terms</p>
              </Link>
              <Link
                to="/privacy"
                className="flex text-xs p-1 justify-center items-center text-stone-800 rounded-md"
              >
                <p className="font-medium">Privacy</p>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <FaProductHunt className="text-sm text-stone-800" />
              <FaXTwitter className="text-sm text-stone-800" />
            </div>
          </div>
        </footer>
      ) : (
        <footer className="w-full bg-transparent absolute top-full">
          <div className="max-w-3xl bg-white flex justify-between items-center border border-gray-200 rounded-md p-2 mt-4 mb-6">
            {/* logo section */}

            <Link to="/" className="h-full flex gap-1">
              <Layers size={20} className="font-black" />
              <p
                className="font-bold text-stone-800 text-md"
                style={{ fontFamily: 'Space Mono, monospace' }}
              >
                Bizvo
              </p>
            </Link>

            {/* links section */}
            <div className="h-full flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <Link
                  to="/tos"
                  className="flex text-xs p-1 pl-2 pr-2 justify-center items-center text-stone-800 rounded-md"
                >
                  <p className="font-medium">Terms</p>
                </Link>
                <Link
                  to="/privacy"
                  className="flex text-xs p-1 pl-2 pr-2 justify-center items-center text-stone-800 rounded-md"
                >
                  <p className="font-medium">Privacy</p>
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <FaProductHunt className="text-sm text-stone-800" />
              <FaXTwitter className="text-sm text-stone-800" />
            </div>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
