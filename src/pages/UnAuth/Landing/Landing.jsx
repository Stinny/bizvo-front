import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';
import img from '../../../assets/tech.svg';
import Features from '../../../components/Landing/Features';
import Subscribe from '../../../components/Landing/Subscribe';
import Footer from '../../../components/Footer/Footer';
import { ChevronLeft, ChevronRight, Code, Layers } from 'react-feather';
import { isMobile } from 'react-device-detect';
import Mobile from './Mobile';
import DiffPays from '../../../components/Landing/DiffPays';
import Why from '../../../components/Landing/Why';

const Landing = () => {
  return isMobile ? (
    <Mobile />
  ) : (
    <div className="flex flex-col gap-10 max-w-3xl mx-auto items-center justify-center mt-32">
      <Link to="/">
        <p
          className="font-bold text-stone-800 dark:text-white text-sm flex items-center gap-1"
          style={{ fontFamily: 'Geist Mono' }}
        >
          <Layers size={16} className="font-black dark:text-white" />
          Bizvo
        </p>
      </Link>
      <div className="flex flex-col items-center justify-center">
        <p className="text-4xl text-stone-800 font-bold text-center">
          One-Time Payments Made Easy.
        </p>
        <p className="text-lg text-stone-800 text-center">
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
      <Features />
      <Subscribe />
      <Footer />
    </div>
  );
};

export default Landing;
