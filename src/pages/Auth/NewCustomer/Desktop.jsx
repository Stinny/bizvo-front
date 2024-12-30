import React, { useState } from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import Sidenav from '../../../components/Sidenav/Sidenav';
import Footer from '../../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { AlertOctagon, Phone, Save, X } from 'react-feather';
import { Switch } from 'antd';

const Desktop = ({
  name,
  setName,
  email,
  setEmail,
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
  handleCreateCustomer,
  error,
}) => {
  const options = countryList().getData();

  const [addDes, setAddDes] = useState(false);
  const [addTel, setAddTel] = useState(false);

  const handlePhoneToggle = (checked) => {
    if (!checked) {
      setPhone('');
      setAddTel(false);
    } else if (checked) {
      setAddTel(true);
    }
  };

  const handleDescToggle = (checked) => {
    if (!checked) {
      setDesc('');
      setAddDes(false);
    } else if (checked) {
      setAddDes(true);
    }
  };

  return (
    <div className="w-10/12 bg-white border rounded-md border-gray-200 p-2 pb-6 flex flex-col gap-4 items-center justify-center">
      <div className="w-full flex items-center justify-between relative">
        <div className="flex flex-col items-start">
          <p className="text-sm text-stone-800">New Customer</p>
          <p className="text-xs text-stone-700">Create a new customer below</p>
        </div>
        <div className="flex items-center gap-3 absolute top-0 right-0 mr-1 mt-1">
          <Link to="/dashboard/add" className="text-red-400">
            <X size={16} />
          </Link>
          <button
            type="button"
            onClick={handleCreateCustomer}
            className="text-stone-800"
          >
            <Save size={16} />
          </button>
        </div>
      </div>
      {error ? (
        <div className="w-72 flex items-center justify-start gap-2 border border-gray-200 rounded-md p-2">
          <AlertOctagon size={16} className="text-red-500" />
          <p className="text-stone-800 text-xs">{error}</p>
        </div>
      ) : (
        ''
      )}
      <form className="flex items-start gap-4 w-72">
        <div className="flex flex-col gap-4 items-start w-full">
          <div className="flex flex-col items-start w-full gap-1">
            <p className="text-xs text-stone-600">Name</p>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Name"
                className="border text-xs border-gray-200 bg-gray-50 focus:border-gray-200 focus:outline-none text-stone-800 hover:bg-gray-200 hover:border-gray-200 focus:bg-gray-200 focus:ring-0 w-full rounded-md p-2 pr-10"
                onChange={(e) => setName(e.target.value)}
                value={name}
                maxLength={25}
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <p className="text-stone-700" style={{ fontSize: '10px' }}>
                  {name?.length}/25
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 items-start w-full">
            <div className="w-full flex items-center justify-between">
              <p className="text-xs text-stone-600">
                {addTel ? 'Email & Phone' : 'Email'}
              </p>
              <div className="flex items-center gap-1">
                <Phone size={14} className="text-stone-800" />
                <Switch
                  size="small"
                  checked={addTel}
                  onChange={(checked) => handlePhoneToggle(checked)}
                  style={{
                    backgroundColor: addTel
                      ? 'rgb(41 37 36)'
                      : 'rgb(229 231 235)',
                    borderColor: '#000000',
                  }}
                />
              </div>
            </div>
            <input
              type="email"
              placeholder="Email"
              className="border text-xs border-gray-200 bg-gray-50 focus:border-gray-200 focus:outline-none text-stone-800 hover:bg-gray-200 hover:border-gray-200 focus:bg-gray-200 focus:ring-0 w-full rounded-md p-2"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            {addTel ? (
              <input
                type="tel"
                placeholder="(123)-456-7890"
                className="border w-full text-xs border-gray-200 bg-gray-50 focus:border-gray-200 focus:outline-none text-stone-800 hover:bg-gray-200 hover:border-gray-200 focus:bg-gray-200 focus:ring-0 rounded-md p-2"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
            ) : (
              ''
            )}
          </div>
          <div className="flex flex-col items-start w-full gap-1">
            <p className="text-xs text-stone-600">Address</p>
            <input
              type="text"
              placeholder="Address"
              className="border text-xs border-gray-200 bg-gray-50 focus:border-gray-200 focus:outline-none text-stone-800 hover:bg-gray-200 hover:border-gray-200 focus:bg-gray-200 focus:ring-0 w-full rounded-md p-2"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
          </div>
          <div className="w-full flex items-center gap-2">
            <div className="flex flex-col items-start w-8/12 gap-1">
              <p className="text-xs text-stone-600">Country</p>
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
                    height: 33,
                    minHeight: 33,
                  }),
                  indicatorsContainer: (provided) => ({
                    ...provided,
                    height: 33,
                  }),
                  menuPortal: (provided) => ({
                    ...provided,
                    zIndex: 999,
                    fontSize: '12px',
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
                className="w-full text-left outline-none ring-0"
              />
            </div>
            <div className="flex flex-col items-start w-4/12 gap-1">
              <p className="text-xs text-stone-600">Postal</p>
              <input
                type="text"
                placeholder="01234"
                className="border text-xs border-gray-200 bg-gray-50 focus:border-gray-200 focus:outline-none text-stone-800 hover:bg-gray-200 hover:border-gray-200 focus:bg-gray-200 focus:ring-0 w-full rounded-md p-2"
                onChange={(e) => setZip(e.target.value)}
                value={zip}
              />
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Switch
              size="small"
              checked={addDes}
              onChange={(checked) => handleDescToggle(checked)}
              style={{
                backgroundColor: addDes ? 'rgb(41 37 36)' : 'rgb(229 231 235)',
                borderColor: '#000000',
              }}
            />
            <p className="text-xs text-stone-800">Add description</p>
          </div>
          {addDes ? (
            <div className="flex flex-col items-start w-full">
              <textarea
                placeholder="About this customer.."
                className="border border-gray-200 hover:border-gray-200 hover:bg-gray-200 focus:bg-gray-200 focus:border-gray-200 focus:ring-0 w-full h-16 rounded-md p-2 bg-gray-50 resize-none text-xs"
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
              />
            </div>
          ) : (
            ''
          )}
        </div>
      </form>
    </div>
  );
};

export default Desktop;
