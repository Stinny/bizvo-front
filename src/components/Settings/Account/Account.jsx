import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Edit as EditIcon } from 'react-feather';
import Edit from './Edit';
import {
  useDeleteAccountMutation,
  useEditAccountMutation,
} from '../../../api/accountApiSlice';
import { showNotification } from '../../../api/toastSlice';
import ReactCountryFlag from 'react-country-flag';
import moment from 'moment';
import Modal from 'react-modal';
import useHandleLogoutUser from '../../../utils/logout';
import Randomstring from 'randomstring';
import { Spinner } from 'flowbite-react';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    fontFamily: 'Roboto Mono',
    padding: '8px',
  },
};
Modal.setAppElement('#root');

const Account = ({ currentUser, refetch }) => {
  const dispatch = useDispatch();

  //logout hook
  const logout = useHandleLogoutUser();

  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [del, setDel] = useState(false);

  //form state
  const [email, setEmail] = useState(currentUser?.email);
  const [name, setName] = useState(currentUser?.name);
  const [phone, setPhone] = useState(currentUser?.phone);
  const [country, setCountry] = useState(currentUser?.country);
  const [busType, setBusType] = useState(currentUser?.businessType);
  const [address, setAddress] = useState(currentUser?.address);
  const [zip, setZip] = useState(currentUser?.zipcode);
  const [dob, setDob] = useState(currentUser?.dob);
  const [currency, setCurrency] = useState(currentUser?.currency);
  const [taxId, setTaxId] = useState(currentUser?.taxId);
  const [error, setError] = useState('');

  //delete form state
  const [key, setKey] = useState('');
  const [deleteKey, setDeleteKey] = useState(Randomstring.generate(6));

  //hooks for making API calls
  const [editAccount, result] = useEditAccountMutation();
  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();

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
        name: name,
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

  //handler for sending delete acc req
  const handleDeleteAcc = async () => {
    if (deleteKey !== key.trim()) {
      setError('Codes do not match');
      return;
    }

    try {
      const deleteAccReq = await deleteAccount().unwrap();

      if (deleteAccReq === 'User deleted') {
        logout('delete');
      }
    } catch (err) {
      setError('Server error');
      return;
    }
  };

  const handleCancelAccDel = () => {
    setKey('');
    setDel(false);
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
      setName={setName}
      name={name}
    />
  ) : (
    <div className="w-full flex flex-col gap-4 items-start">
      <div className="w-full flex items-start justify-between">
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
            isOpen={del}
            onRequestClose={handleCancelAccDel}
            style={customStyles}
            contentLabel="Acc Delete modal"
          >
            {isLoading ? (
              <div className="w-80 h-52 flex items-center justify-center">
                <Spinner />
              </div>
            ) : (
              <div className="w-80 flex flex-col gap-4 items-start">
                <div className="flex flex-col items-start">
                  <p className="text-sm text-stone-800">Delete Account</p>
                  <p className="text-xs text-stone-700">
                    Are you sure you want to delete your account?
                  </p>
                </div>
                <div className="flex flex-col items-start gap-2 w-full">
                  <p className="text-xs text-stone-800">What will happen:</p>
                  <p className="text-xs text-stone-700">
                    - Any created customers will be deleted
                  </p>
                  <p className="text-xs text-stone-700">
                    - Any draft or sent invoices will be deleted or invalid
                  </p>
                  <p className="text-xs text-stone-700">
                    - All other account data will be unavailable
                  </p>
                </div>
                <div className="flex flex-col w-full">
                  <input
                    type="text"
                    className="border border-gray-200 w-full bg-gray-50 hover:border-gray-200 focus:bg-gray-200 focus:ring-0 hover:bg-gray-200 focus:border-gray-200 rounded-md text-xs"
                    placeholder={deleteKey}
                    onChange={(e) => setKey(e.target.value)}
                    value={key}
                  />
                  <p className="text-xs text-stone-700">
                    Type <span className="font-bold">{deleteKey}</span> above to
                    delete your account
                  </p>
                </div>
                <div className="w-full flex items-center justify-end">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className=" text-stone-800 rounded-md border border-stone-800 p-1 text-xs"
                      onClick={handleCancelAccDel}
                    >
                      Cancel
                    </button>
                    {deleteKey === key.trim() ? (
                      <button
                        type="button"
                        className="border border-red-400 text-red-400 rounded-md p-1 text-xs"
                        onClick={handleDeleteAcc}
                      >
                        Delete Account
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="border border-gray-100 text-gray-100 rounded-md p-1 text-xs"
                        disabled
                      >
                        Delete Account
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </Modal>
          <Modal
            isOpen={open}
            onRequestClose={() => setOpen(false)}
            style={customStyles}
            contentLabel="Email modal"
          >
            <div className="w-72 flex flex-col gap-2 items-start">
              <div className="flex flex-col items-start">
                <p className="text-sm text-stone-800">Account Email</p>
                <p className="text-xs text-stone-600">
                  Changing account email will require confirmation
                </p>
              </div>
              <input
                type="text"
                placeholder="Email"
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
          <div className="flex flex-col items-start w-full gap-1">
            <p className="text-xs text-stone-600">Email</p>
            <div className="flex w-full">
              <input
                type="text"
                placeholder="Email"
                className="border text-xs border-gray-50 bg-gray-50 focus:ring-0 focus:border-gray-200 border-r-0 rounded-tl-md rounded-bl-md p-2 pr-1 flex-1"
                disabled
                value={email}
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
          <div className="flex flex-col items-start w-full gap-1">
            <p className="text-xs text-stone-600">Country</p>
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
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col items-start w-full gap-1">
            <p className="text-xs text-stone-600">Business Name</p>
            <input
              type="text"
              placeholder="Address"
              className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2"
              disabled
              value={currentUser?.name}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-end gap-1">
        <button
          type="button"
          onClick={() => setDel(!del)}
          className="text-xs border border-red-400 text-red-400 rounded-md p-1 pl-2 pr-2"
        >
          Delete
        </button>
        <button
          type="button"
          // onClick={() => setDel(!del)}
          className="text-xs border border-stone-800 text-stone-800 rounded-md p-1 pl-2 pr-2"
        >
          Change Password
        </button>
      </div>
    </div>
  );
};

export default Account;
