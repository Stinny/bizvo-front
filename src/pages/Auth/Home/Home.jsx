import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import Sidenav from '../../../components/Sidenav/Sidenav';
import Footer from '../../../components/Footer/Footer';

const Home = () => {
  return (
    <div className="mx-auto max-w-3xl flex flex-col items-start gap-2 h-screen relative">
      <Navbar />
      <div className="flex items-start gap-2 w-full">
        <Sidenav />
        <div className="w-10/12 bg-white border rounded-md border-gray-200 p-2 h-96 flex items-center justify-center">
          <p className="text-xs text-stone-800">Dashboard</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
