import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';

const Home = () => {
  return (
    <div className="mx-auto max-w-3xl flex flex-col">
      <Navbar />
      <div className="w-full h-32 mt-24 border border-gray-200 rounded-md flex items-center justify-center">
        <p className="text-xs text-stone-800">You are logged in..</p>
      </div>
    </div>
  );
};

export default Home;
