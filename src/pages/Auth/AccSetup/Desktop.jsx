import React, { useRef, useState } from 'react';
import { Download, Info, Layers, LogOut, Tool } from 'react-feather';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import useHandleLogoutUser from '../../../utils/logout';
import { useSetupMutation } from '../../../api/accountApiSlice';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../../api/toastSlice';
import { Avatar, Tooltip } from 'flowbite-react';
import Select from 'react-select';
import { Spin } from 'antd';

const Desktop = () => {
  const dispatch = useDispatch();

  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  //form state
  const [name, setName] = useState('');
  const [country, setCountry] = useState(undefined);
  const [desc, setDesc] = useState('');
  const [logo, setLogo] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState('');
  const [bizType, setBizType] = useState('physical');

  const handleButtonClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const isCountry = country ? Object.keys(country).length : country;
  const isEmpty = !name.trim() || !desc.trim() || !selectedImage;

  //country select options
  const options = [{ value: 'US', label: 'United States' }];

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
    formData.append('bizType', bizType);
    formData.append('logoImg', logo);

    try {
      const setupReq = await setup(formData).unwrap();

      if (setupReq?.msg === 'Finished') {
        dispatch(showNotification(`Hello ${setupReq?.user?.name}`));
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
  if (settingUp) {
    content = (
      <div className="w-80 mx-auto mt-32 flex items-center justify-center h-96">
        <Spin size="small" />
      </div>
    );
  } else {
    content = (
      <div className="w-80 mx-auto mt-32 flex flex-col gap-4">
        <div className="w-full flex items-center justify-center">
          <Link to="/">
            <p
              className="font-bold text-stone-800 dark:text-white text-sm flex items-center gap-1"
              style={{ fontFamily: 'Geist Mono' }}
            >
              <Layers size={16} className="font-black dark:text-white" />
              Bizvo
            </p>
          </Link>
        </div>
        <div className="flex flex-col gap-6 items-center w-full border border-gray-200 rounded-sm p-2">
          <div className="flex flex-col gap-2 items-start text-left w-full">
            <p className="text-stone-800 text-md font-medium">
              Welcome to Bizvo!
            </p>

            <p className="text-stone-800 text-xs">
              You created an account using the email{' '}
              <span className="font-medium">{currentUser?.email}</span>. To
              start collecting payments, please finish setting up your account
              below or logout.
            </p>

            <div className="w-full flex items-center justify-start gap-2 border border-gray-200 bg-white rounded-sm p-2">
              <Info size={16} className="text-blue-400" />
              <p className="text-stone-800 text-xs">
                Currently support U.S. businesses only
              </p>
            </div>

            {error ? (
              <div className="w-full flex items-center justify-start gap-2 border border-gray-200 rounded-sm p-2">
                <AlertOctagon size={16} className="text-red-400" />
                <p className="text-stone-800 text-xs">{error}</p>
              </div>
            ) : (
              ''
            )}

            <form className="flex items-start w-full">
              <div className="flex flex-col items-start w-full">
                <div className="flex flex-col gap-2 items-start w-full">
                  <div className="flex flex-col w-full items-start gap-1">
                    <p className="text-stone-800 text-xs">Account</p>
                    <input
                      type="text"
                      className="text-xs bg-gray-50 border border-gray-200 focus:outline-none text-stone-800 ring-0 w-full rounded-sm p-2"
                      disabled
                      value={currentUser?.email}
                    />
                  </div>
                  <div className="flex flex-col items-start w-full gap-1">
                    <p className="text-xs text-stone-800">Name & Logo</p>
                    <div className="flex items-center gap-1 w-full">
                      <input
                        type="text"
                        placeholder="My Bizz"
                        className="border text-xs border-gray-200 bg-white outline-none text-stone-800 hover:bg-gray-50 focus:bg-gray-50 w-full rounded-sm p-2"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                      />
                      <div className="file-upload">
                        <input
                          style={{ display: 'none' }}
                          ref={fileInputRef}
                          type="file"
                          onChange={handleImageChange}
                        />
                        <button
                          type="button"
                          onClick={handleButtonClick}
                          className="flex items-center justify-center cursor-pointer"
                        >
                          <Avatar
                            size="sm"
                            img={selectedImage ? selectedImage : ''}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start w-full gap-1">
                    <p className="text-xs text-stone-800">Country</p>
                    <Select
                      options={options}
                      onChange={(value) => setCountry(value)}
                      value={country}
                      placeholder="Country"
                      menuPortalTarget={document.body}
                      menuPosition={'fixed'}
                      isSearchable
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderColor: 'rgb(229 231 235)',
                          backgroundColor: '#fff',
                          borderWidth: 1,
                          '&:hover': {
                            backgroundColor: 'rgb(249 250 251)', // Keep the same border color on hover
                          },
                          '&:focus': {
                            backgroundColor: 'rgb(249 250 251)', // Keep the same border color on hover
                          },
                          fontSize: '12px',
                          borderRadius: '4px',
                          boxShadow: 'none',
                          zIndex: 999,
                          position: 'relative',
                          height: 34,
                          minHeight: 34,
                        }),
                        indicatorsContainer: (provided) => ({
                          ...provided,
                          height: 34,
                        }),
                        menuPortal: (provided) => ({
                          ...provided,
                          zIndex: 999,
                          fontSize: '12px',
                        }),
                        input: (base) => ({
                          ...base,
                          'input:focus': {
                            boxShadow: 'none',
                          },
                        }),
                        option: (provided, state) => ({
                          ...provided,
                          backgroundColor: state.isSelected
                            ? 'rgb(249 250 251)'
                            : state.isFocused
                            ? 'rgb(249 250 251)'
                            : '',
                          color: 'black',
                        }),
                      }}
                      className="w-full text-left"
                    />
                  </div>
                  <div className="flex flex-col items-start w-full gap-1">
                    <p className="text-xs text-stone-800">Service Type</p>
                    <div className="w-full flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setBizType('physical')}
                        className={`w-3/6 p-2 border border-gray-200 rounded-sm text-xs text-stone-800 flex items-center justify-center gap-1 hover:bg-gray-50 cursor-pointer ${
                          bizType === 'physical'
                            ? 'bg-gray-50 border-gray-200'
                            : 'bg-white'
                        }`}
                      >
                        <Tool size={14} /> Physical
                      </button>
                      <button
                        type="button"
                        onClick={() => setBizType('digital')}
                        className={`w-3/6 p-2 border border-gray-200 rounded-sm text-xs text-stone-800 flex items-center justify-center gap-1 hover:bg-gray-50 cursor-pointer ${
                          bizType === 'digital'
                            ? 'bg-gray-50 border-gray-200'
                            : 'bg-white'
                        }`}
                      >
                        <Download size={14} /> Digital
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-start w-full gap-1">
                    <p className="text-xs text-stone-800">Description</p>
                    <textarea
                      placeholder="Describe your services.."
                      className="border border-gray-200 hover:bg-gray-50 focus:bg-gray-50 outline-none w-full h-16 rounded-sm p-2 bg-white resize-none text-xs"
                      onChange={(e) => setDesc(e.target.value)}
                      value={desc}
                    />
                  </div>
                </div>
              </div>
            </form>

            <div className="w-full flex items-center gap-2 mt-2">
              <button
                type="button"
                onClick={() => logout('logout')}
                className="p-2 w-2/12 border cursor-pointer border-stone-800 text-stone-800 rounded-sm flex items-center justify-center"
              >
                <LogOut size={16} />
              </button>
              <button
                type="button"
                className="p-2 w-10/12 border cursor-pointer border-stone-800 text-stone-800 rounded-sm text-xs font-medium"
                onClick={handleFinishSetup}
                disabled={isEmpty || !isCountry}
              >
                Finish Setup{' '}
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
