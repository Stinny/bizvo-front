import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import Sidenav from '../../../components/Sidenav/Sidenav';
import Footer from '../../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { AlertOctagon } from 'react-feather';

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

  return (
    <div className="mx-auto max-w-3xl flex flex-col gap-2 h-screen relative">
      <Navbar />
      <div className="flex items-start gap-2">
        <Sidenav />
        <div className="w-10/12 bg-white border rounded-md border-gray-200 p-2 flex flex-col gap-4 items-start">
          <div className="w-full flex items-center justify-between">
            <div className="flex flex-col items-start">
              <p className="text-sm text-stone-800">New Customer</p>
              <p className="text-xs text-stone-700">
                Fill out all details to create a new customer
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to="/dashboard/customers"
                className="p-1 border border-red-400 text-red-400 text-xs rounded-md"
              >
                Cancel
              </Link>
              <button
                type="button"
                onClick={handleCreateCustomer}
                className="p-1 border border-stone-800 text-stone-800 text-xs rounded-md"
              >
                Create
              </button>
            </div>
          </div>
          {error ? (
            <div className="w-full flex items-center justify-start gap-2 border border-gray-200 rounded-md p-2">
              <AlertOctagon size={16} className="text-red-500" />
              <p className="text-stone-800 text-xs">{error}</p>
            </div>
          ) : (
            ''
          )}
          <form className="flex items-start gap-2 w-full">
            <div className="flex flex-col gap-2 items-start w-6/12">
              <div className="flex flex-col items-start w-full">
                <p className="text-xs text-stone-700">Name</p>
                <input
                  type="text"
                  placeholder="Name"
                  className="border text-xs border-gray-200 bg-gray-50 focus:border-gray-200 focus:outline-none text-stone-800 hover:bg-gray-200 hover:border-gray-200 focus:bg-gray-200 focus:ring-0 w-full rounded-md p-2"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div className="flex flex-col items-start w-full">
                <p className="text-xs text-stone-700">Email</p>
                <input
                  type="email"
                  placeholder="Email"
                  className="border text-xs border-gray-200 bg-gray-50 focus:border-gray-200 focus:outline-none text-stone-800 hover:bg-gray-200 hover:border-gray-200 focus:bg-gray-200 focus:ring-0 w-full rounded-md p-2"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="flex flex-col items-start w-full">
                <p className="text-xs text-stone-700">Phone</p>
                <input
                  type="text"
                  placeholder="(123)-456-7890"
                  className="border text-xs border-gray-200 bg-gray-50 focus:border-gray-200 focus:outline-none text-stone-800 hover:bg-gray-200 hover:border-gray-200 focus:bg-gray-200 focus:ring-0 w-full rounded-md p-2"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                />
              </div>
              <div className="flex flex-col items-start w-full">
                <p className="text-xs text-stone-700">Description</p>
                <textarea
                  placeholder="About this customer.."
                  className="border border-gray-200 hover:border-gray-200 hover:bg-gray-200 focus:bg-gray-200 focus:border-gray-200 focus:ring-0 w-full h-24 rounded-md p-2 bg-gray-50 resize-none text-xs"
                  onChange={(e) => setDesc(e.target.value)}
                  value={desc}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 items-start w-6/12">
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
                <p className="text-xs text-stone-700">Address</p>
                <input
                  type="text"
                  placeholder="Address"
                  className="border text-xs border-gray-200 bg-gray-50 focus:border-gray-200 focus:outline-none text-stone-800 hover:bg-gray-200 hover:border-gray-200 focus:bg-gray-200 focus:ring-0 w-full rounded-md p-2"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
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
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Desktop;
