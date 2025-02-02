import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';
import img from '../../../assets/tech.svg';
import Features from '../../../components/Landing/Features';
import Subscribe from '../../../components/Landing/Subscribe';
import Footer from '../../../components/Footer/Footer';
import Why from '../../../components/Landing/Why';
import DiffPays from '../../../components/Landing/DiffPays';

const Mobile = ({ badges, currentBadge }) => {
  return (
    <div className="flex flex-col gap-10 w-full p-4 mx-auto relative">
      <Navbar />
      <div className="mx-auto flex flex-col gap-4">
        <div className="w-full mx-auto flex flex-col gap-3 items-start">
          <p className="text-4xl text-left text-stone-800 font-bold">
            Customer Payments Made Easy.
          </p>
          <p className="text-xl text-stone-800 text-left">
            Stop playing accountant. Collect payments the easy way and have the
            hard stuff done for you.
          </p>

          <Link
            to="/signup"
            className="p-2 border border-stone-800 text-stone-800 rounded-md text-xs font-medium flex items-center justify-center"
          >
            Start Collecting
          </Link>
        </div>
        <div className="w-full relative">
          <img src={img} className="w-full" />
          <div className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-stone-800 text-white rounded-md text-sm font-medium p-1">
            {badges[currentBadge]}
          </div>
        </div>
      </div>
      <Features />
      <Why />
      <DiffPays />
      <Subscribe />
      <Footer />
    </div>
  );
};

export default Mobile;
