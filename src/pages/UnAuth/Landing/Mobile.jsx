import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';
import img from '../../../assets/tech.svg';
import Features from '../../../components/Landing/Features';
import Subscribe from '../../../components/Landing/Subscribe';
import Footer from '../../../components/Footer/Footer';
import Why from '../../../components/Landing/Why';
import DiffPays from '../../../components/Landing/DiffPays';
import { ChevronDown, Layers } from 'react-feather';

const Mobile = () => {
  return (
    <div className="flex flex-col gap-10 w-full items-center justify-center p-4">
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 relative">
        <Link to="/">
          <p
            className="font-bold text-stone-800 dark:text-white text-sm flex items-center gap-1"
            style={{ fontFamily: 'Geist Mono' }}
          >
            <Layers size={16} className="font-black dark:text-white" />
            Bizvo
          </p>
        </Link>
        <div className="flex flex-col items-center justify-center gap-2 max-w-2xl">
          <p className="text-3xl text-stone-800 font-bold text-center">
            One-Time Payments Made Easy.
          </p>
          <p className="text-sm text-stone-800 text-center">
            Tax-compliant one-time payments for service businesses. Collect
            payments without the hassle — easy for you and your customers.
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Link
            to="/login"
            className="p-2 bg-stone-800 border border-stone-800 text-white rounded-sm text-xs font-medium flex items-center justify-center"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="p-2 border border-stone-800 text-stone-800 rounded-sm text-xs font-medium flex items-center justify-center"
          >
            Start Collecting
          </Link>
        </div>
        <div className="w-full flex items-center justify-center h-44"></div>
        <div className="w-full flex items-center justify-center absolute bottom-3/12">
          <ChevronDown size={18} className="text-stone-800 dark:text-white" />
        </div>
      </div>
      <Features />
      <Subscribe />
      <Footer />
    </div>
  );
};

export default Mobile;
