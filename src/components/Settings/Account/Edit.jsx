import React, { useRef } from 'react';
import { AlertOctagon, Info, Save, Upload, X } from 'react-feather';
import DateInput from 'rsuite/DateInput';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import ReactCountryFlag from 'react-country-flag';
import { Avatar, Tooltip } from 'flowbite-react';
import { FcGoogle } from 'react-icons/fc';

const Edit = ({
  handleSaveEdits,
  handleCancelEdit,
  country,
  setCountry,
  setEmail,
  email,
  currentUser,
  updatingAcc,
  name,
  setName,
  about,
  setAbout,
  setLogo,
  setSelectedImage,
  selectedImage,
  error,
  errorEmail,
}) => {
  //country select options
  const options = [{ value: 'US', label: 'United States' }];

  //for logo selection
  const fileInputRef = useRef(null);

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

  return (
    <div className="w-full flex flex-col items-start gap-4">
      <div className="w-full flex items-start justify-between">
        <div className="flex flex-col items-start">
          <p className="text-sm text-stone-800">Account Settings</p>
          <p className="text-xs text-stone-700">Editing account settings</p>
        </div>
        {error ? (
          <div className="flex items-center justify-start gap-2 border border-gray-200 rounded-md p-2">
            <AlertOctagon size={14} className="text-red-400" />
            <p className="text-stone-800 text-xs">{error}</p>
          </div>
        ) : (
          ''
        )}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCancelEdit}
            disabled={updatingAcc}
            className="text-red-400"
          >
            <X size={16} />
          </button>
          <button
            type="button"
            onClick={handleSaveEdits}
            disabled={updatingAcc}
            className="text-stone-800"
          >
            <Save size={16} />
          </button>
        </div>
      </div>

      <div className="w-full flex flex-col items-start gap-2">
        <p className="text-xs text-stone-800 font-semibold">Account</p>
        <div className="flex items-start w-full gap-2">
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col items-start w-full gap-1">
              {currentUser?.googleAuth ? (
                <>
                  <p className="text-xs text-stone-800 flex items-center gap-1">
                    Email
                    <Tooltip
                      style="light"
                      arrow={false}
                      content={
                        <p className="text-xs text-stone-800">
                          Authenticated with Google
                        </p>
                      }
                    >
                      <FcGoogle className="text-md" />
                    </Tooltip>
                  </p>
                  <div className="flex w-full">
                    <input
                      type="text"
                      placeholder="Address"
                      className="text-xs bg-white border border-gray-200 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2"
                      disabled
                      value={currentUser?.email}
                    />
                  </div>
                </>
              ) : (
                <>
                  <p className="text-xs text-stone-800">Email</p>
                  <input
                    type="text"
                    placeholder="Email"
                    className="text-xs bg-gray-50 border border-gray-200 focus:border-gray-200 focus:bg-gray-200 focus:outline-none text-stone-800 focus:ring-0 w-full rounded-md p-2"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                  {errorEmail ? (
                    <div className="w-full flex items-center justify-start gap-2">
                      <AlertOctagon size={14} className="text-red-400" />
                      <p className="text-stone-800 text-xs">{errorEmail}</p>
                    </div>
                  ) : (
                    ''
                  )}
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
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
          </div>
        </div>
        <p className="text-xs text-stone-800 font-semibold">Profile</p>
        <form className="flex items-start w-full gap-2">
          <div className="flex flex-col w-full gap-2">
            <div className="flex flex-col items-start w-full gap-1">
              <p className="text-xs text-stone-800">Name</p>
              <input
                type="text"
                placeholder="Name"
                className="text-xs bg-white border border-gray-200 focus:border-gray-200 focus:bg-gray-50 hover:bg-gray-50 focus:outline-none text-stone-800 focus:ring-0 w-full rounded-md p-2"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="flex items-center gap-4 w-full">
              <Avatar
                size="md"
                img={selectedImage ? selectedImage : currentUser?.logo?.url}
              />

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
                  Change <Upload size={12} />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex flex-col items-start w-full gap-1">
              <p className="text-xs text-stone-800">Describe your services</p>
              <textarea
                placeholder="Describe your services.."
                className="text-xs bg-white border border-gray-200 focus:ring-0 focus:border-gray-200 focus:outline-none focus:bg-gray-50 hover:bg-gray-50 text-stone-800 ring-0 w-full rounded-md p-2 resize-none h-20"
                onChange={(e) => setAbout(e.target.value)}
                value={about}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
