import React, { useState } from 'react';
import { Layers, LogOut } from 'react-feather';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import useHandleLogoutUser from '../../../utils/logout';
import Form from './Form';
import { useSetupMutation } from '../../../api/accountApiSlice';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../../api/toastSlice';

const Desktop = () => {
  const dispatch = useDispatch();

  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  const navigate = useNavigate();

  //form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState(undefined);
  const [busType, setBusType] = useState(undefined);
  const [address, setAddress] = useState('');
  const [zip, setZip] = useState('');
  const [desc, setDesc] = useState('');
  const [dob, setDob] = useState('');
  const [profilePic, setProfilePic] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState('');
  const [active, setActive] = useState(false);

  //hook for setup req
  const [setup, result] = useSetupMutation();

  //handles req for finishing setup
  const handleFinishSetup = async (e) => {
    e.preventDefault();

    try {
      const setupReq = await setup({
        name: name,
        desc: desc,
        phone: phone,
        dob: dob,
        image: profilePic,
        address: address,
        zip: zip,
        country: country,
        busType: busType,
      }).unwrap();

      if (setupReq?.msg === 'Finished') {
        dispatch(showNotification(`Hello ${currentUser?.name}`));
        setActive(false);
        const updatedUser = JSON.stringify(setupReq?.user);
        Cookies.set('currentUser', updatedUser, { sameSite: 'Lax' });
        navigate('/dashboard');
      } else {
        setError('There was an error');
        return;
      }
    } catch (err) {
      setError('Server error');
      return;
    }
  };

  const logout = useHandleLogoutUser();

  let content;
  if (active) {
    content = (
      <Form
        setActive={setActive}
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
        dob={dob}
        setDob={setDob}
        handleFinishSetup={handleFinishSetup}
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
                onClick={() => setActive(true)}
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
