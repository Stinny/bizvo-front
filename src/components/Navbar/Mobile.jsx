import React, { useEffect, useRef, useState } from 'react';
import { AlignRight, Layers } from 'react-feather';
import { Link } from 'react-router-dom';

const Mobile = () => {
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

  return (
    <div className="w-full bg-white flex justify-between items-center border border-gray-200 rounded-md p-2 relative">
      {/* logo section */}

      <Link to="/">
        <p
          className="font-bold text-stone-800 dark:text-white text-md flex items-center gap-1"
          style={{ fontFamily: 'Geist Mono' }}
        >
          <Layers size={18} className="font-black" />
          Bizvo
        </p>
      </Link>

      <AlignRight
        size={17}
        onClick={toggleDropdown}
        className="text-stone-800"
      />
      {open ? (
        <div
          ref={dropdownRef}
          className="w-full flex justify-end absolute top-full z-50 right-0"
        >
          <div className="bg-white border border-gray-200 rounded-md flex flex-col items-center gap-2 p-2">
            <Link
              to="/docs"
              className="w-full p-1 pl-2 pr-2 text-xs text-stone-800 border border-white rounded-md hover:border-stone-800 hover:outline-non"
            >
              <p className="text-xs text-stone-800">Docs</p>
            </Link>
            <Link
              to="/pricing"
              className="w-full p-1 pl-2 pr-2 text-xs text-stone-800 border border-white rounded-md hover:border-stone-800 hover:outline-non"
            >
              <p className="text-xs text-stone-800">Pricing</p>
            </Link>
            <Link
              to="/login"
              className="w-full border rounded-md border-stone-800 hover:outline-none p-1 pl-2 pr-2 text-xs"
            >
              Login
            </Link>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Mobile;
