import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';
import img from '../../../assets/tech.svg';
import Features from '../../../components/Landing/Features';
import Subscribe from '../../../components/Landing/Subscribe';
import Footer from '../../../components/Footer/Footer';

const Mobile = () => {
  return (
    <div className="flex flex-col gap-4 w-full p-2 mx-auto relative">
      <Navbar />
      <div className="mx-auto flex flex-col">
        <div className="w-full mx-auto flex flex-col gap-4 items-start">
          <p className="text-4xl text-left text-stone-800 font-bold">
            Online Invoicing Made Easier.
          </p>
          <p className="text-md text-stone-800 text-left">
            Collect payments, remain compliant, and avoid paperwork. Easy for
            the business and the customer.
          </p>

          <Link
            to="/signup"
            className="p-2 border border-stone-800 text-stone-800 rounded-md text-sm flex items-center justify-center"
          >
            Start Collecting
          </Link>
        </div>
        <div className="w-full">
          <img src={img} className="w-full" />
        </div>
      </div>
      <Features />
      <Subscribe />
      <Footer />
    </div>
  );
};

export default Mobile;
