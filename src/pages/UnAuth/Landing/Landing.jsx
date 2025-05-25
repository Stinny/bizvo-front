import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';
import img from '../../../assets/tech.svg';
import Features from '../../../components/Landing/Features';
import Subscribe from '../../../components/Landing/Subscribe';
import Footer from '../../../components/Footer/Footer';
import { Code } from 'react-feather';
import { isMobile } from 'react-device-detect';
import Mobile from './Mobile';
import DiffPays from '../../../components/Landing/DiffPays';
import Why from '../../../components/Landing/Why';

const Landing = () => {
  const badges = ['Sales Tax', 'VAT', 'GST', 'Refunds', 'Chargebacks']; // Badge text options
  const [currentBadge, setCurrentBadge] = useState(0);

  // Cycle through badges every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBadge((prev) => (prev + 1) % badges.length);
    }, 2000);
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [badges.length]);

  return isMobile ? (
    <Mobile badges={badges} currentBadge={currentBadge} />
  ) : (
    <div className="flex flex-col gap-16 max-w-3xl mx-auto relative">
      <Navbar />
      <div className="mx-auto flex items-center gap-12">
        <div className="w-6/12 mx-auto flex flex-col gap-3 items-start">
          <p className="text-4xl text-left text-stone-800 font-bold">
            One Time Payments Made Easy.
          </p>
          <p className="text-lg text-stone-800 text-left">
            Stop playing accountant. Collect payments the easy way with
            tax-compliant one-time payments.
          </p>

          <Link
            to="/signup"
            className="p-2 border border-stone-800 text-stone-800 rounded-sm text-xs font-medium flex items-center justify-center"
          >
            Start Collecting
          </Link>
        </div>
        <div className="w-6/12 flex justify-end relative">
          <img src={img} className="w-full" />
          <div className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-stone-800 text-white rounded-md text-xs font-medium p-1">
            {badges[currentBadge]}
          </div>
        </div>
      </div>
      <Features />
      <Why />
      {/* <DiffPays /> */}
      <Subscribe />
      <Footer />
    </div>
  );
};

export default Landing;
