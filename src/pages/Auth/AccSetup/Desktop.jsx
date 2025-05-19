import React, { useState } from 'react';
import { ChevronRight, Layers, LogOut } from 'react-feather';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import useHandleLogoutUser from '../../../utils/logout';
import Form from './Form';
import { useSetupMutation } from '../../../api/accountApiSlice';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../../api/toastSlice';
import { Tooltip } from 'flowbite-react';

const Desktop = () => {
  const dispatch = useDispatch();

  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  const navigate = useNavigate();

  //form state
  const [name, setName] = useState('');
  const [country, setCountry] = useState(undefined);
  const [desc, setDesc] = useState('');
  const [address, setAddress] = useState('');
  const [logo, setLogo] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState('');
  const [active, setActive] = useState(false);

  //hook for setup req
  const [setup, { isLoading: settingUp }] = useSetupMutation();

  //handles req for finishing setup
  const handleFinishSetup = async (e) => {
    e.preventDefault();

    // Create FormData and append the file and other data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', desc);
    formData.append('country', JSON.stringify(country));
    formData.append('logoImg', logo);

    try {
      const setupReq = await setup(formData).unwrap();

      if (setupReq?.msg === 'Finished') {
        dispatch(showNotification(`Hello ${setupReq?.user?.name}`));
        setActive(false);
        const updatedUser = JSON.stringify(setupReq?.user);
        Cookies.set('currentUser', updatedUser, { sameSite: 'Lax' });
        navigate('/dashboard');
      } else if (setupReq?.msg === 'Slug taken') {
        setError('Profile slug is taken');
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
        setLogo={setLogo}
        setSelectedImage={setSelectedImage}
        selectedImage={selectedImage}
        name={name}
        setName={setName}
        country={country}
        setCountry={setCountry}
        desc={desc}
        setDesc={setDesc}
        error={error}
        handleFinishSetup={handleFinishSetup}
        settingUp={settingUp}
      />
    );
  } else {
    content = (
      <div className="p-2 bg-white border border-gray-200 rounded-md w-96 mx-auto mt-32">
        <div className="flex flex-col gap-6 items-center w-full">
          <div className="flex items-start justify-between w-full">
            <Link to="/" className="h-full flex gap-1 items-center">
              <Layers size={20} className="font-black" />
              <p
                className="font-bold text-stone-800 text-lg"
                style={{ fontFamily: 'Space Mono, monospace' }}
              >
                Bizvo
              </p>
            </Link>
            <Tooltip
              arrow={false}
              style="light"
              content={<p className="text-stone-800 text-xs">Logout</p>}
            >
              <button
                type="button"
                onClick={() => logout('logout')}
                className=""
              >
                <LogOut size={16} className="text-stone-800" />
              </button>
            </Tooltip>
          </div>
          <div className="flex flex-col gap-4 items-start text-left w-full">
            <p className="text-stone-800 text-sm font-medium">Welcome!</p>
            <p className="text-stone-800 text-xs">
              Are you ready to start collecting payments? Before you can see
              your dashboard, we need some more information from you on the next
              page.
            </p>
            <div className="flex flex-col w-full items-start gap-1">
              <p className="text-stone-800 text-xs">Account:</p>
              <input
                type="text"
                className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2"
                disabled
                value={currentUser?.email}
              />
            </div>
            <div className="flex items-center w-full justify-end">
              <button
                type="button"
                onClick={() => setActive(true)}
                className="p-0.5 border border-stone-800 rounded-md text-stone-800 flex items-center justify-center"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div className="h-fit">{content}</div>;
};

export default Desktop;
