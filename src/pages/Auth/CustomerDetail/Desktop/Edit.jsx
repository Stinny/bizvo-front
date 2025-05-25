import React, { useState } from 'react';
import {
  AlertOctagon,
  ChevronLeft,
  Phone,
  Save,
  Trash,
  X,
} from 'react-feather';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import Delete from './Delete';
import { Switch } from 'antd';
import BackBtn from '../../../../components/BackBtn';

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
  handleCancelEdits,
  customerId,
}) => {
  //country select options
  const options = countryList().getData();
  const [del, setDel] = useState(false);
  const [addDes, setAddDes] = useState(false);
  const [addTel, setAddTel] = useState(false);

  const handleClearDesc = () => {
    setDesc('');
    setAddDes(false);
  };

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

  return del ? (
    <Delete
      customerId={customerId}
      customerEmail={email}
      customerName={name}
      setDel={setDel}
    />
  ) : (
    <div className="w-full bg-white border rounded-md border-gray-200 p-2 pb-6 flex flex-col gap-4 items-center justify-center">
      <div className="w-full flex items-center justify-between relative">
        <div className="flex flex-col items-start">
          <p className="text-sm text-stone-800">Editing Customer</p>

          <p className="text-xs text-stone-800">{customerId}</p>
        </div>

        <div className="flex gap-1 absolute top-0 right-0 mr-1 mt-1">
          <button
            type="button"
            onClick={handleCancelEdits}
            className="cursor-pointer flex items-center justify-center border border-stone-800 dark:border-white rounded-sm p-1"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            type="button"
            onClick={handleSaveEdits}
            className="w-full cursor-pointer flex items-center justify-center gap-1 border border-stone-800 dark:border-white rounded-sm p-0.5 pl-1.5 pr-1.5"
          >
            <p
              className="text-stone-800 dark:text-white"
              style={{ fontSize: '11px' }}
            >
              Save
            </p>
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
      <form className="flex flex-col items-start gap-4 w-72">
        <div className="flex flex-col gap-4 items-start w-full">
          <div className="flex flex-col items-start w-full gap-1">
            <p className="text-xs text-stone-800">Name</p>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Name"
                className="border text-xs border-gray-200 bg-white outline-none text-stone-800 hover:bg-gray-50 focus:bg-gray-50 focus:ring-0 w-full rounded-sm p-2 pr-10"
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
          <div className="flex flex-col items-start w-full gap-1">
            <div className="w-full flex items-center justify-between">
              <p className="text-xs text-stone-800">
                {phone?.length || addTel ? 'Email & Phone' : 'Email'}
              </p>
              <div className="flex items-center gap-1">
                <Phone size={14} className="text-stone-800" />
                <Switch
                  size="small"
                  checked={addTel || phone?.length}
                  onChange={(checked) => handlePhoneToggle(checked)}
                  style={{
                    backgroundColor:
                      addTel || phone?.length
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
              className="border text-xs border-gray-200 bg-white outline-none text-stone-800 hover:bg-gray-50 focus:bg-gray-50 focus:ring-0 w-full rounded-sm p-2"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            {addTel || phone?.length ? (
              <input
                type="tel"
                placeholder="(123)-456-7890"
                className="border w-full text-xs border-gray-200 bg-white outline-none text-stone-800 hover:bg-gray-50 focus:bg-gray-50 focus:ring-0 rounded-sm p-2"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
            ) : (
              ''
            )}
          </div>
          <div className="flex flex-col items-start w-full gap-1">
            <p className="text-xs text-stone-800">Address</p>
            <input
              type="text"
              placeholder="Address"
              className="border text-xs border-gray-200 bg-white outline-none text-stone-800 hover:bg-gray-50 focus:bg-gray-50 focus:ring-0 w-full rounded-sm p-2"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
          </div>
          <div className="w-full flex items-center gap-2">
            <div className="flex flex-col items-start w-8/12 gap-1">
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
                      ? 'rgb(249 250 251)'
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
              <p className="text-xs text-stone-800">Postal</p>
              <input
                type="text"
                placeholder="Postal code"
                className="border text-xs border-gray-200 bg-white outline-none text-stone-800 hover:bg-gray-50 focus:bg-gray-50 focus:ring-0 w-full rounded-sm p-2"
                onChange={(e) => setZip(e.target.value)}
                value={zip}
              />
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Switch
              size="small"
              checked={addDes || desc?.length}
              onChange={(checked) => handleDescToggle(checked)}
              style={{
                backgroundColor:
                  addDes || desc?.length ? 'rgb(41 37 36)' : 'rgb(229 231 235)',
                borderColor: '#000000',
              }}
            />
            <p className="text-xs text-stone-800">Add description</p>
          </div>
          {addDes || desc?.length ? (
            <div className="relative w-full">
              <textarea
                placeholder="About this customer.."
                className="border border-gray-200 hover:bg-gray-50 focus:bg-gray-50 w-full h-16 rounded-sm p-2 outline-none bg-white resize-none text-xs"
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
                maxLength={75}
              />
              <div className="absolute right-2 bottom-2 transform -translate-y-1/2">
                <p className="text-stone-700" style={{ fontSize: '10px' }}>
                  {desc?.length}/75
                </p>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </form>
    </div>
  );
};

export default Edit;
