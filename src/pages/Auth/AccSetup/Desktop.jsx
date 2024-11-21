import React, { useState } from 'react';
import { Layers, LogOut } from 'react-feather';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import useHandleLogoutUser from '../../../utils/logout';
import Form from './Form';

const Desktop = () => {
  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  //form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState(undefined);
  const [busType, setBusType] = useState(undefined);
  const [address, setAddress] = useState('');
  const [zip, setZip] = useState('');
  const [desc, setDesc] = useState('');
  const [error, setError] = useState('');
  const [profilePic, setProfilePic] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const [setup, setSetup] = useState(false);

  const logout = useHandleLogoutUser();

  let content;
  if (setup) {
    content = (
      <Form
        setSetup={setSetup}
        setProfilePic={setProfilePic}
        setSelectedImage={setSelectedImage}
        selectedImage={selectedImage}
        name={name}
        setName={setName}
        phone={phone}
        setPhone={setPhone}
        country={country}
        setCountry={setCountry}
        address={address}
        setAddress={setAddress}
        zip={zip}
        setZip={setZip}
        desc={desc}
        setDesc={setDesc}
        error={error}
        busType={busType}
        setBusType={setBusType}
      />
    );
  } else {
    content = (
      <div className="mx-auto p-2 bg-white border border-gray-200 rounded-md flex items-center justify-center">
        <div className="flex flex-col gap-6 items-center">
          <Link to="/dashboard" className="h-full flex gap-1">
            <Layers size={20} className="font-black" />
            <p
              className="font-bold text-stone-800 text-md"
              style={{ fontFamily: 'Space Mono, monospace' }}
            >
              Bizvo
            </p>
          </Link>
          <div className="flex flex-col gap-6 items-center text-center w-80">
            <p className="text-stone-700 text-xs">
              Welcome to Bizvo! A simple way to collect money from your
              customers. Before you begin collecting, we just need some
              information from you to complete your account setup.
            </p>
            <div className="flex flex-col w-full items-start">
              <p className="text-stone-700 text-xs">Logged in as:</p>
              <input
                type="text"
                className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2"
                disabled
                value={currentUser?.email}
              />
            </div>
            <div className="flex gap-1 items-center">
              <button
                type="button"
                onClick={() => logout('logout')}
                className="flex items-center gap-2 border rounded-md border-stone-800 hover:outline-none p-1"
              >
                <LogOut size={14} className="text-stone-800 font-bold" />
                <p className="text-xs text-stone-800">Logout</p>
              </button>
              <button
                type="button"
                onClick={() => setSetup(true)}
                className="p-1 border border-stone-800 rounded-md text-xs text-stone-800"
              >
                Finish Setup
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center mx-auto">
      {content}
    </div>
  );
};

export default Desktop;
