import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Edit as EditIcon } from 'react-feather';
import Edit from './Edit';
import { useEditAccountMutation } from '../../../api/accountApiSlice';
import { showNotification } from '../../../api/toastSlice';
import ReactCountryFlag from 'react-country-flag';
import moment from 'moment';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    fontFamily: 'Space Mono',
  },
};
Modal.setAppElement('#root');

const Account = ({ currentUser, refetch }) => {
  const dispatch = useDispatch();

  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);

  //form state
  const [email, setEmail] = useState(currentUser?.email);
  const [phone, setPhone] = useState(currentUser?.phone);
  const [country, setCountry] = useState(currentUser?.country);
  const [busType, setBusType] = useState(currentUser?.businessType);
  const [address, setAddress] = useState(currentUser?.address);
  const [zip, setZip] = useState(currentUser?.zipcode);
  const [dob, setDob] = useState(currentUser?.dob);
  const [currency, setCurrency] = useState(currentUser?.currency);
  const [taxId, setTaxId] = useState(currentUser?.taxId);
  const [error, setError] = useState('');

  //hook for making API call
  const [editAccount, result] = useEditAccountMutation();

  //handler function for sending edit req
  const handleSaveEdits = async () => {
    try {
      const editReq = await editAccount({
        phone: phone,
        dob: dob,
        address: address,
        zip: zip,
        country: country,
        busType: busType,
        currency: currency,
        taxId: taxId,
      }).unwrap();

      if (editReq === 'Updated') {
        dispatch(showNotification('Account updated'));
        refetch();
        setEdit(false);
      }
    } catch (err) {
      setError('Server error');
      return;
    }
  };

  return edit ? (
    <Edit
      setEdit={setEdit}
      phone={phone}
      setPhone={setPhone}
      email={email}
      country={country}
      setCountry={setCountry}
      address={address}
      setAddress={setAddress}
      zip={zip}
      setZip={setZip}
      error={error}
      busType={busType}
      setBusType={setBusType}
      dob={dob}
      setDob={setDob}
      currency={currency}
      setCurrency={setCurrency}
      taxId={taxId}
      setTaxId={setTaxId}
      handleSaveEdits={handleSaveEdits}
    />
  ) : (
    <div className="w-full flex flex-col gap-4 items-start">
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col items-start">
          <p className="text-sm text-stone-800">Account Settings</p>
          <p className="text-xs text-stone-700">
            View and edit your account settings
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setEdit(!edit)}
            className="text-stone-800"
          >
            <EditIcon size={16} />
          </button>
        </div>
      </div>
      <div className="flex items-start w-full gap-2">
        <div className="flex flex-col gap-2 w-full">
          <Modal
            isOpen={open}
            onRequestClose={() => setOpen(false)}
            style={customStyles}
            contentLabel="Email modal"
          >
            <div className="w-72 flex flex-col gap-2 items-start">
              <div className="flex flex-col items-start">
                <p className="text-sm text-stone-800">Account Email</p>
                <p className="text-xs text-stone-700">
                  Changing account email will require confirmation
                </p>
              </div>
              <input
                type="text"
                placeholder="Name"
                className="text-xs bg-gray-50 border border-gray-200 focus:border-gray-200 focus:bg-gray-200 focus:outline-none text-stone-800 focus:ring-0 w-full rounded-md p-2"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <div className="w-full flex items-center justify-end">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="border border-red-400 text-red-400 rounded-md p-1 text-xs"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className=" text-stone-800 rounded-md border border-stone-800 p-1 text-xs"
                    // onClick={handleRefund}
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
          </Modal>
          <div className="flex flex-col items-start w-full">
            <p className="text-xs text-stone-700">Email</p>
            <div className="flex w-full">
              <input
                type="text"
                placeholder="Email"
                className="border text-xs border-gray-50 bg-gray-50 focus:ring-0 focus:border-gray-200 border-r-0 rounded-tl-md rounded-bl-md p-2 pr-1 flex-1"
                disabled
                value={currentUser?.email}
              />
              <div className="rounded-tr-md rounded-br-md bg-gray-50 border border-r-0 border-gray-50 flex items-center p-2 pr-1">
                <EditIcon
                  size={14}
                  onClick={() => setOpen(!open)}
                  className="text-stone-800 hover:cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start w-full">
            <p className="text-xs text-stone-700">Phone</p>
            <input
              type="text"
              placeholder="123-456-7890"
              className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2"
              disabled
              value={currentUser?.phone}
            />
          </div>
          <div className="flex flex-col items-start w-full">
            <p className="text-xs text-stone-700">DOB</p>
            <input
              type="text"
              placeholder="DOB"
              className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2"
              disabled
              value={`${moment(currentUser?.dob).format('MMMM D, YYYY')}`}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col items-start w-full">
            <p className="text-xs text-stone-700">Business Type</p>
            <input
              type="text"
              placeholder="Business Type"
              className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2"
              disabled
              value={currentUser?.businessType?.label}
            />
          </div>
          <div className="flex flex-col items-start w-full">
            <p className="text-xs text-stone-700">Address</p>
            <input
              type="text"
              placeholder="Address"
              className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2"
              disabled
              value={currentUser?.address}
            />
          </div>
          <div className="flex items-center gap-2 w-full">
            <div className="flex flex-col items-start w-8/12">
              <p className="text-xs text-stone-700">Country</p>
              <div className="flex w-full">
                <input
                  type="text"
                  className="border text-xs bg-gray-50 border-gray-50 rounded-tl-md rounded-bl-md p-2 flex-1"
                  value={`${currentUser?.country?.label}`}
                  disabled
                />
                <div className="rounded-tr-md rounded-br-md bg-gray-50 border border-l-0 border-gray-50 flex items-center justify-center p-1 pr-2">
                  <ReactCountryFlag countryCode={currentUser?.country?.value} />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start w-4/12">
              <p className="text-xs text-stone-700">Postal Code</p>
              <input
                type="text"
                placeholder="Address"
                className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2"
                disabled
                value={currentUser?.zipcode}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
