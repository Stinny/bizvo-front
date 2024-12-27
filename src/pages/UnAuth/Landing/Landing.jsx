import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';
import img from '../../../assets/onlinePay.svg';
import Features from '../../../components/Landing/Features';
import Subscribe from '../../../components/Landing/Subscribe';
import Footer from '../../../components/Footer/Footer';
import { Code } from 'react-feather';

const Landing = () => {
  return (
    <div className="flex flex-col gap-2 max-w-3xl mx-auto relative">
      <Navbar />
      <div className="mx-auto flex items-center">
        <div className="w-6/12 mx-auto flex flex-col gap-4 items-start">
          <p className="text-4xl text-left text-stone-800 font-bold">
            Online Invoicing Made Easier.
          </p>
          <p className="text-md text-stone-700 text-left">
            Collect payments, remian compliant, and avoid paperwork. Easy for
            you and the customer.
          </p>

          <Link
            to="/signup"
            className="p-2 border border-stone-800 text-stone-800 rounded-md text-sm flex items-center justify-center"
          >
            Start Collecting
          </Link>
        </div>
        <div className="w-6/12 flex justify-end p-10 pr-0">
          <img src={img} className="w-full" />
        </div>
      </div>
      <Features />
      <Subscribe />
      <Footer />
    </div>
  );
};

export default Landing;
