import React from 'react';
import { Save, X } from 'react-feather';
import DateInput from 'rsuite/DateInput';
import Select from 'react-select';
import countryList from 'react-select-country-list';

const Edit = ({
  setEdit,
  handleSaveEdits,
  phone,
  setPhone,
  country,
  setCountry,
  address,
  setAddress,
  zip,
  setZip,
  error,
  busType,
  setBusType,
  dob,
  setDob,
  email,
  currency,
  setCurrency,
  taxId,
  setTaxId,
}) => {
  //country select options
  const options = countryList().getData();

  //business type select options
  const busOpts = [
    { value: 'individual', label: 'Individual' },
    { value: 'company', label: 'Company' },
  ];

  return (
    <div className="w-full flex flex-col items-start gap-4">
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col items-start">
          <p className="text-sm text-stone-800">Account Settings</p>
          <p className="text-xs text-stone-700">
            Change and save the settings below
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setEdit(false)}
            className="text-red-400"
          >
            <X size={16} />
          </button>
          <button
            type="button"
            onClick={handleSaveEdits}
            className="text-stone-800"
          >
            <Save size={16} />
          </button>
        </div>
      </div>
      <div className="flex items-start w-full gap-2">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col items-start w-full">
            <p className="text-xs text-stone-700">Email</p>
            <input
              type="text"
              placeholder="Email"
              className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2"
              disabled
              value={email}
            />
          </div>
          <div className="flex flex-col items-start w-full">
            <p className="text-xs text-stone-700">Phone</p>
            <input
              type="text"
              placeholder="123-456-7890"
              className="text-xs bg-gray-50 border border-gray-200 focus:border-gray-200 focus:bg-gray-200 focus:outline-none text-stone-800 focus:ring-0 w-full rounded-md p-2"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
          </div>
          <div className="flex flex-col items-start w-full">
            <p className="text-xs text-stone-700">DOB</p>
            <DateInput
              onChange={(date, event) => setDob(date)}
              value={dob}
              className="w-full bg-gray-50 text-xs border border-gray-200 rounded-md focus:bg-gray-200 focus:ring-0 focus:border-gray-200 focus-within:outline-0"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
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
          <div className="flex flex-col items-start w-full">
            <p className="text-xs text-stone-700">Address</p>
            <input
              type="text"
              placeholder="Address"
              className="text-xs bg-gray-50 border border-gray-200 focus:border-gray-200 focus:bg-gray-200 focus:outline-none text-stone-800 focus:ring-0 w-full rounded-md p-2"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
          </div>
          <div className="flex items-center gap-2 w-full">
            <div className="flex flex-col items-start w-8/12">
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
            <div className="flex flex-col items-start w-4/12">
              <p className="text-xs text-stone-700">Postal Code</p>
              <input
                type="text"
                placeholder="Postal Code"
                className="text-xs bg-gray-50 border border-gray-200 focus:border-gray-200 focus:bg-gray-200 focus:outline-none text-stone-800 focus:ring-0 w-full rounded-md p-2"
                onChange={(e) => setZip(e.target.value)}
                value={zip}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
