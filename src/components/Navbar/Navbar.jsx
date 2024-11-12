import React from 'react';
import { CreditCard, FileText, Layers } from 'react-feather';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-full bg-transparent">
      <div className="max-w-3xl bg-white flex justify-between items-center border border-gray-200 rounded-md p-2">
        {/* logo section */}

        <Link to="/" className="h-full flex gap-1">
          <Layers size={20} className="font-black" />
          <p
            className="font-bold text-stone-800 text-md"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Bizvo
          </p>
        </Link>

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
              className="flex text-xs items-center justify-center border border-stone-800 font-bold text-stone-800 rounded-md p-1 pl-2 pr-2"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
