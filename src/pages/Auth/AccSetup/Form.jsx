import { Avatar, Spinner } from 'flowbite-react';
import React, { useRef, useState } from 'react';
import {
  AlertOctagon,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Info,
  Layers,
  Upload,
  X,
} from 'react-feather';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import DateInput from 'rsuite/DateInput';

const Form = ({
  handleFinishSetup,
  setActive,
  setLogo,
  setSelectedImage,
  selectedImage,
  name,
  setName,
  country,
  setCountry,
  desc,
  setDesc,
  error,
  data,
  checkingSlug,
  checkedSlug,
  settingUp,
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

  //business type select options
  const busOpts = [
    { value: 'individual', label: 'Individual' },
    { value: 'company', label: 'Company' },
  ];

  return settingUp ? (
    <div className="w-96 mx-auto h-56 flex items-center justify-center bg-white border border-gray-200 rounded-md mt-32">
      <Spinner />
    </div>
  ) : (
    <div className="mx-auto p-2 bg-white border border-gray-200 rounded-md flex flex-col gap-4 items-start w-96 relative mt-32">
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
        <button
          type="button"
          onClick={() => setActive(false)}
          className="text-red-400"
        >
          <X size={16} />
        </button>
      </div>
      <div className="w-full flex items-center justify-start gap-2 border border-blue-400 bg-blue-50 rounded-md p-2">
        <Info size={16} className="text-blue-400" />
        <p className="text-stone-800 text-xs font-medium">
          Currently supporting U.S. businesses only
        </p>
      </div>

      {error ? (
        <div className="w-full flex items-center justify-start gap-2 border border-gray-200 rounded-md p-2">
          <AlertOctagon size={16} className="text-red-400" />
          <p className="text-stone-800 text-xs">{error}</p>
        </div>
      ) : (
        ''
      )}

      <form className="flex items-start w-full">
        <div className="flex flex-col items-start w-full">
          <div className="flex flex-col gap-2 items-start w-full">
            <div className="flex flex-col items-start w-full gap-1">
              <p className="text-xs text-stone-800">Business Name</p>
              <input
                type="text"
                placeholder="My Bizz"
                className="border text-xs border-gray-200 bg-gray-50 focus:border-gray-200 focus:outline-none text-stone-800 hover:bg-gray-200 hover:border-gray-200 focus:bg-gray-200 focus:ring-0 w-full rounded-md p-2"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>

            <div className="flex flex-col items-start w-full gap-1">
              <p className="text-xs text-stone-800">Business Country</p>
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

            <div className="flex flex-col items-start w-full gap-1">
              <p className="text-xs text-stone-800">What you sell</p>
              <textarea
                placeholder="Describe your services.."
                className="border border-gray-200 hover:border-gray-200 hover:bg-gray-200 focus:bg-gray-200 focus:border-gray-200 focus:ring-0 w-full h-16 rounded-md p-2 bg-gray-50 resize-none text-xs"
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
              />
            </div>

            {/* <div className="flex flex-col items-start w-full gap-1">
              <p className="text-xs text-stone-600">Profile Slug</p>
              <div className="flex w-full">
                <div className="rounded-tl-md rounded-bl-md bg-gray-50 border border-r-0 border-gray-200 flex items-center p-2 pr-1">
                  <p className="text-xs">bizvo.com/</p>
                </div>
                <input
                  type="text"
                  placeholder="Slug"
                  className="border text-xs border-gray-200 bg-gray-50 focus:ring-0 focus:border-gray-200 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 border-l-0 rounded-tr-md rounded-br-md p-2 pl-1 flex-1"
                  onChange={(e) => setSlug(e.target.value)}
                  value={slug}
                />
              </div>
              {checkedSlug && (
                <>
                  {data?.available ? (
                    <div className="w-full flex items-center justify-start gap-2 border border-gray-200 rounded-md p-2 mt-1">
                      <CheckCircle size={16} className="text-green-400" />
                      <p className="text-stone-800 text-xs">Slug available</p>
                    </div>
                  ) : (
                    ''
                  )}
                  {!data?.available ? (
                    <div className="w-full flex items-center justify-start gap-2 border border-gray-200 rounded-md p-2 mt-1">
                      <AlertOctagon size={16} className="text-red-400" />
                      <p className="text-stone-800 text-xs">Slug unavailable</p>
                    </div>
                  ) : (
                    ''
                  )}
                </>
              )}
            </div> */}

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
                  Logo <Upload size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="absolute bottom-0 right-0 mr-2 mb-2">
        {isEmpty || !isCountry || !data?.available ? (
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
