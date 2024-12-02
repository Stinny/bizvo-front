import { Avatar } from 'flowbite-react';
import React, { useRef, useState } from 'react';
import { AlertOctagon, ChevronLeft, ChevronRight, Upload } from 'react-feather';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import DateInput from 'rsuite/DateInput';

const Form = ({
  handleFinishSetup,
  setActive,
  setProfilePic,
  setSelectedImage,
  selectedImage,
  name,
  setName,
  phone,
  setPhone,
  country,
  setCountry,
  address,
  setAddress,
  zip,
  setZip,
  desc,
  setDesc,
  setBusType,
  busType,
  dob,
  setDob,
  error,
}) => {
  const fileInputRef = useRef(null);
  const [step, setStep] = useState('pro');

  const handleButtonClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(e.target.files);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const isEmpty = !name.trim() || !desc.trim();

  //country select options
  const options = countryList().getData();

  //business type select options
  const busOpts = [
    { value: 'individual', label: 'Individual' },
    { value: 'company', label: 'Company' },
  ];

  return (
    <div className="mx-auto p-2 bg-white border border-gray-200 rounded-md flex flex-col gap-4 items-start w-96">
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col items-start text-left">
          {step === 'pro' ? (
            <>
              <p className="text-sm text-stone-800">Account Setup</p>
              <p className="text-xs text-stone-700">
                Stuff we need before going to your dashboard
              </p>
            </>
          ) : (
            <>
              <p className="text-sm text-stone-800">Account Setup 2/2</p>
              <p className="text-xs text-stone-700">
                Stuff we need for payements and records
              </p>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setActive(false)}
          className="p-1 border border-red-400 text-red-400 text-xs rounded-md"
        >
          Cancel
        </button>
      </div>
      {error ? (
        <div className="w-full flex items-center justify-start gap-2 border border-gray-200 rounded-md p-2">
          <AlertOctagon size={16} className="text-red-500" />
          <p className="text-stone-800 text-xs">{error}</p>
        </div>
      ) : (
        ''
      )}
      <form className="flex items-start w-full">
        {step === 'pro' ? (
          <div className="flex flex-col items-start w-full">
            <div className="flex flex-col gap-2 items-start w-full">
              <div className="flex flex-col items-start w-full">
                <p className="text-xs text-stone-700">Country</p>
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
                      backgroundColor: 'rgb(249 250 251)',
                      borderWidth: 1,
                      '&:hover': {
                        backgroundColor: 'rgb(229 231 235)', // Keep the same border color on hover
                      },
                      '&:focus': {
                        backgroundColor: 'rgb(229 231 235)', // Keep the same border color on hover
                      },
                      fontSize: '12px',
                      borderRadius: '.375rem',
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
                        ? 'rgb(229 231 235)'
                        : state.isFocused
                        ? 'rgb(249 250 251)'
                        : '',
                      color: 'black',
                    }),
                  }}
                  className="w-full text-left"
                />
              </div>
              <div className="flex flex-col items-start w-full">
                <p className="text-xs text-stone-700">Business Name</p>
                <input
                  type="text"
                  placeholder="Business or personal name"
                  className="border text-xs border-gray-200 bg-gray-50 focus:border-gray-200 focus:outline-none text-stone-800 hover:bg-gray-200 hover:border-gray-200 focus:bg-gray-200 focus:ring-0 w-full rounded-md p-2"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div className="flex flex-col items-start w-full">
                <p className="text-xs text-stone-700">About</p>
                <textarea
                  placeholder="What do you sell.."
                  className="border border-gray-200 hover:border-gray-200 hover:bg-gray-200 focus:bg-gray-200 focus:border-gray-200 focus:ring-0 w-full h-16 rounded-md p-2 bg-gray-50 resize-none text-xs"
                  onChange={(e) => setDesc(e.target.value)}
                  value={desc}
                />
              </div>

              <div className="flex items-center gap-4 w-full">
                <Avatar size="md" img={selectedImage ? selectedImage : ''} />

                <div className="file-upload">
                  <input
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                    type="file"
                    onChange={handleImageChange}
                  />
                  <button
                    onClick={handleButtonClick}
                    className="text-xs rounded-md border border-stone-800 text-stone-800 p-1 flex items-center gap-1"
                  >
                    Upload Logo <Upload size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
        {step === 'bus' ? (
          <div className="flex flex-col items-start w-full">
            <div className="flex flex-col gap-2 items-start w-full">
              <div className="flex flex-col items-start w-full">
                <p className="text-xs text-stone-700">Address</p>
                <input
                  type="text"
                  placeholder="Address"
                  className="border text-xs border-gray-200 bg-gray-50 focus:border-gray-200 focus:outline-none text-stone-800 hover:bg-gray-200 hover:border-gray-200 focus:bg-gray-200 focus:ring-0 w-full rounded-md p-2"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                />
              </div>
              <div className="flex items-center gap-2 w-full">
                <div className="flex flex-col items-start w-full">
                  <p className="text-xs text-stone-700">Country</p>
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
                        backgroundColor: 'rgb(249 250 251)',
                        borderWidth: 1,
                        '&:hover': {
                          backgroundColor: 'rgb(229 231 235)', // Keep the same border color on hover
                        },
                        '&:focus': {
                          backgroundColor: 'rgb(229 231 235)', // Keep the same border color on hover
                        },
                        fontSize: '12px',
                        borderRadius: '.375rem',
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
                          ? 'rgb(229 231 235)'
                          : state.isFocused
                          ? 'rgb(249 250 251)'
                          : '',
                        color: 'black',
                      }),
                    }}
                    className="w-full text-left"
                  />
                </div>
                <div className="flex flex-col items-start w-full">
                  <p className="text-xs text-stone-700">Postal Code</p>
                  <input
                    type="text"
                    placeholder="Postal code"
                    className="border text-xs border-gray-200 bg-gray-50 focus:border-gray-200 focus:outline-none text-stone-800 hover:bg-gray-200 hover:border-gray-200 focus:bg-gray-200 focus:ring-0 w-full rounded-md p-2"
                    onChange={(e) => setZip(e.target.value)}
                    value={zip}
                  />
                </div>
              </div>
              <div className="flex flex-col items-start w-full">
                <p className="text-xs text-stone-700">Business Type</p>
                <Select
                  options={busOpts}
                  onChange={(value) => setBusType(value)}
                  value={busType}
                  placeholder="Business Type"
                  menuPortalTarget={document.body}
                  menuPosition={'fixed'}
                  isSearchable
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderColor: 'rgb(229 231 235)',
                      backgroundColor: 'rgb(249 250 251)',
                      borderWidth: 1,
                      '&:hover': {
                        backgroundColor: 'rgb(229 231 235)', // Keep the same border color on hover
                      },
                      '&:focus': {
                        backgroundColor: 'rgb(229 231 235)', // Keep the same border color on hover
                      },
                      fontSize: '12px',
                      borderRadius: '.375rem',
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
                        ? 'rgb(229 231 235)'
                        : state.isFocused
                        ? 'rgb(249 250 251)'
                        : '',
                      color: 'black',
                    }),
                  }}
                  className="w-full text-left"
                />
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </form>
      <div className="w-full flex justify-end items-center">
        {/* {step === 'pro' ? (
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled
              className="p-1 border border-gray-100 rounded-md text-gray-100"
            >
              <ChevronLeft size={12} />
            </button>
            {true ? (
              <button
                type="button"
                onClick={() => setStep('bus')}
                className="p-1 border border-stone-800 rounded-md text-stone-800"
              >
                <ChevronRight size={12} />
              </button>
            ) : (
              <button
                type="button"
                className="p-1 border border-gray-100 rounded-md text-gray-100"
                disabled
              >
                <ChevronRight size={12} />
              </button>
            )}
          </div>
        ) : (
          ''
        )}
        {step === 'bus' ? (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setStep('pro')}
              className="p-1 border border-stone-800 rounded-md text-stone-800"
            >
              <ChevronLeft size={12} />
            </button>
            <button
              type="button"
              className="p-1 border border-gray-100 rounded-md text-gray-100"
              disabled
            >
              <ChevronRight size={12} />
            </button>
          </div>
        ) : (
          ''
        )} */}
        {isEmpty ? (
          <button
            type="button"
            disabled
            className="p-1 border border-gray-100 text-gray-100 text-xs rounded-md flex items-center justify-center gap-1"
          >
            Dashboard <ChevronRight size={14} />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleFinishSetup}
            className="p-1 border border-stone-800 text-stone-800 text-xs rounded-md flex items-center justify-center gap-1"
          >
            Dashboard <ChevronRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Form;
