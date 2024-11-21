import React, { useState } from 'react';
import { AlertOctagon, Save, Trash } from 'react-feather';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import Delete from './Delete';

const Edit = ({
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
  error,
  edit,
  setEdit,
  handleSaveEdits,
  customerId,
}) => {
  //country select options
  const options = countryList().getData();
  const [del, setDel] = useState(false);

  return del ? (
    <Delete
      customerId={customerId}
      customerEmail={email}
      customerName={name}
      setDel={setDel}
    />
  ) : (
    <div className="w-10/12 bg-white border rounded-md border-gray-200 p-2 flex flex-col gap-4 items-start">
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col items-start">
          <p className="text-sm text-stone-800">
            Editing customer: {customerId}
          </p>
          <p className="text-xs text-stone-700">
            Edit details for this customer
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setDel(!del)}
            className="text-red-400 font-bold"
          >
            <Trash size={16} />
          </button>
          <button
            type="button"
            onClick={handleSaveEdits}
            className="text-stone-800 font-bold"
          >
            <Save size={16} />
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
              type="tel"
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
  );
};

export default Edit;
