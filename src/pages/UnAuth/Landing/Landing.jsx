import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';
import img from '../../../assets/onlinePay.svg';
import Features from '../../../components/Landing/Features';
import Subscribe from '../../../components/Landing/Subscribe';
import Footer from '../../../components/Footer/Footer';

const Landing = () => {
  return (
    <div className="flex flex-col gap-20 max-w-3xl mx-auto relative">
      <Navbar />
      <div className="mx-auto flex items-center">
        <div className="w-6/12 mx-auto flex flex-col gap-4 items-start">
          <p className="text-2xl text-left text-stone-800 font-bold">
            Quick, Easy, and Fast Invoicing
          </p>
          <p className="text-sm text-stone-700 text-left">
            Easy invoicing for small businesses, freelancers, and creators.
            Spend more time on the fun stuff and less on the paperwork.
          </p>

          <Link
            to="/signup"
            className="p-1 w-20 border border-stone-800 font-bold text-stone-800 rounded-md text-xs flex items-center justify-center"
          >
            Signup
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
