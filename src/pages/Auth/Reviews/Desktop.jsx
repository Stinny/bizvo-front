import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import Sidenav from '../../../components/Sidenav/Sidenav';
import Footer from '../../../components/Footer/Footer';
import { MessageCircle } from 'react-feather';

const Desktop = () => {
  return (
    <div className="mx-auto max-w-3xl flex flex-col gap-2 h-screen relative">
      <Navbar />
      <div className="flex items-start gap-2">
        <Sidenav />
        <div className="w-10/12 bg-white border rounded-md border-gray-200 p-2 h-96 flex flex-col items-center justify-center">
          <MessageCircle size={18} className="text-stone-800 mb-2" />
          <p className="text-sm text-stone-800">Reviews</p>
          <p className="text-xs text-stone-600">Coming soon!</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Desktop;
