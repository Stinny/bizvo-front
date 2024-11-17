import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import Sidenav from '../../../components/Sidenav/Sidenav';
import Footer from '../../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import { Plus } from 'react-feather';
import { Spinner } from 'flowbite-react';
import ReactCountryFlag from 'react-country-flag';

const Desktop = ({ customers }) => {
  let content;

  content = customers?.length ? (
    <div className="w-10/12 flex flex-col items-start gap-2">
      <div className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-md p-2">
        <div className="flex flex-col items-start">
          <p className="text-sm text-stone-800">Customers</p>
          <p className="text-xs text-stone-700">View all your customers</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/dashboard/customers/add"
            className="p-1 border border-stone-800 text-stone-800 font-bold text-xs rounded-md"
          >
            <Plus size={12} />
          </Link>
        </div>
      </div>
      <div className="flex flex-col w-full gap-2">
        {customers?.map((customer, index) => (
          <Link
            to={`/dashboard/customers/${customer?._id}`}
            className="w-full bg-white hover:border-stone-800 border border-gray-200 rounded-md p-2 grid grid-cols-4 items-center"
            key={index}
          >
            <div className="w-full flex justify-start">
              <p className="text-xs text-stone-800">{customer?.name}</p>
            </div>
            <div className="w-full">
              <p className="text-xs text-stone-800">{customer?.email}</p>
            </div>
            <div className="w-full">
              <ReactCountryFlag
                countryCode={customer?.country?.value}
                className="mb-1"
              />
            </div>
            <div className="w-full flex justify-end">
              <p className="text-xs text-stone-800">$175.00</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  ) : (
    <div className="w-10/12 bg-white border rounded-md border-gray-200 p-2 h-96 flex items-center justify-center">
      <div className="flex flex-col items-center text-center">
        <p className="text-sm text-stone-800">No customers</p>
        <p className="text-xs text-stone-700">
          Create a new customer to send an invoice to
        </p>
        <Link
          to="/dashboard/customers/add"
          className="flex items-center justify-center gap-1 border border-stone-800 rounded-md p-1 mt-2"
        >
          <p className="text-xs text-stone-800">New</p>
          <Plus size={12} className="text-stone-800 font-bold" />
        </Link>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-3xl flex flex-col gap-2 h-screen relative">
      <Navbar />
      <div className="flex items-start gap-2">
        <Sidenav />
        {content}
      </div>
      <Footer />
    </div>
  );
};

export default Desktop;
