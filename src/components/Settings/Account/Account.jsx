import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  AlertOctagon,
  Check,
  Clipboard,
  Edit as EditIcon,
  Lock,
  Trash,
  X,
} from 'react-feather';
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
import { Avatar, Spinner, Tooltip } from 'flowbite-react';
import { useChangePswdMutation } from '../../../api/authApiSlice';
import { FcGoogle } from 'react-icons/fc';

const Account = ({ currentUser, refetch }) => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      fontFamily: 'Geist',
      padding: '8px',
    },
  };
  Modal.setAppElement('#root');

  const dispatch = useDispatch();

  //logout hook
  const logout = useHandleLogoutUser();

  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [del, setDel] = useState(false);
  const [pswd, setPswd] = useState(false);

  //form state
  const [email, setEmail] = useState(currentUser?.email);
  const [country, setCountry] = useState(currentUser?.country);
  const [name, setName] = useState(currentUser?.name);
  const [about, setAbout] = useState(currentUser?.about);
  const [logo, setLogo] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState('');
  const [errorEmail, setErrorEmail] = useState('');

  //changing pswd
  const [oldPswd, setOldPswd] = useState('');
  const [newPswd, setNewPswd] = useState('');
  const [errorPswd, setErrorPswd] = useState('');

  //delete form state
  const [key, setKey] = useState('');
  const [deleteKey, setDeleteKey] = useState(Randomstring.generate(6));

  //hooks for making API calls
  const [editAccount, { isLoading: updatingAcc }] = useEditAccountMutation();
  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();
  const [changePswd, { isLoading: changingPswd }] = useChangePswdMutation();

  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(currentUser?._id?.toString())
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
      })
      .catch((err) => {
        console.error('Failed to copy!', err);
      });
  };

  //handler function for sending edit req
  const handleSaveEdits = async () => {
    setError('');
    setErrorEmail('');

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', about);
      formData.append('logoImg', logo);
      formData.append('email', email);
      formData.append('country', JSON.stringify(country));

      const editReq = await editAccount(formData).unwrap();

      if (editReq === 'Updated') {
        dispatch(showNotification('Account updated'));
        refetch();
        setEdit(false);
      } else if (editReq === 'Email taken') {
        setErrorEmail('Email already in use');
        return;
      }
    } catch (err) {
      setError('There was an error');
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
      setError('There was an error');
      return;
    }
  };

  const handleChangePswd = async () => {
    setErrorPswd('');

    if (!oldPswd.trim() || !newPswd.trim()) {
      setErrorPswd('Please fill out both fields');
      return;
    }

    try {
      const changeReq = await changePswd({
        oldPswd,
        newPswd,
      }).unwrap();

      if (changeReq === 'Password changed') {
        logout('change');
      } else if (changeReq === 'Invalid password') {
        setErrorPswd('Old password invalid');
        return;
      } else if (changeReq === 'Same password') {
        setErrorPswd('Enter a different password');
        return;
      } else {
        setErrorPswd('There was an error');
        return;
      }
    } catch (err) {
      setErrorPswd('Server error');
      return;
    }
  };

  const handleCancelAccDel = () => {
    setKey('');
    setDel(false);
  };

  const handleCancelEdit = () => {
    setEmail(currentUser?.email);
    setErrorEmail('');
    setError('');
    setEdit(false);
  };

  useEffect(() => {
    setErrorPswd('');
  }, [newPswd, oldPswd]);

  useEffect(() => {
    setErrorEmail('');
  }, [email]);

  return edit ? (
    <Edit
      setEdit={setEdit}
      setEmail={setEmail}
      email={email}
      country={country}
      setCountry={setCountry}
      handleSaveEdits={handleSaveEdits}
      handleCancelEdit={handleCancelEdit}
      currentUser={currentUser}
      updatingAcc={updatingAcc}
      error={error}
      errorEmail={errorEmail}
      name={name}
      setName={setName}
      about={about}
      setAbout={setAbout}
      setLogo={setLogo}
      setSelectedImage={setSelectedImage}
      selectedImage={selectedImage}
    />
  ) : (
    <div className="w-full flex flex-col gap-4 items-start">
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
            <div className="w-full flex items-start justify-between">
              <div className="flex flex-col items-start">
                <p className="text-sm text-stone-800">Delete Account</p>
                <p className="text-xs text-stone-800">
                  Are you sure you want to delete your account?
                </p>
              </div>
              <X
                size={16}
                className="text-red-400 hover:cursor-pointer"
                onClick={handleCancelAccDel}
              />
            </div>
            <div className="flex flex-col items-start gap-2 w-full">
              <p className="text-xs text-stone-800">What will happen:</p>
              <p className="text-xs text-stone-800">
                - All customers will be deleted
              </p>
              <p className="text-xs text-stone-800">
                - All invoices will be deleted or invalid
              </p>
              <p className="text-xs text-stone-800">
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
              <div className="flex items-center">
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
        isOpen={pswd}
        onRequestClose={() => setPswd(false)}
        style={customStyles}
        contentLabel="Pswd modal"
      >
        {changingPswd ? (
          <div className="w-80 h-52 flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="w-72 flex flex-col gap-2 items-start">
            <div className="w-full flex items-start justify-between">
              <div className="flex flex-col items-start">
                <p className="text-sm text-stone-800">Change Password</p>
                <p className="text-xs text-stone-800">
                  Change your account password
                </p>
              </div>
              <X
                size={16}
                className="text-red-400 hover:cursor-pointer"
                onClick={() => setPswd(false)}
              />
            </div>
            {errorPswd ? (
              <div className="w-full flex items-center justify-start gap-2 border border-gray-200 rounded-md p-2">
                <AlertOctagon size={16} className="text-red-400" />
                <p className="text-stone-800 text-xs">{errorPswd}</p>
              </div>
            ) : (
              ''
            )}
            {currentUser?.googleAuth ? (
              <div className="w-full flex flex-col gap-1 items-center justify-center border border-gray-200 rounded-md p-4">
                <div className="flex items-center justify-center gap-2">
                  <p className="text-sm text-stone-800">Authenticated using</p>{' '}
                  <FcGoogle className="text-lg" />
                </div>
                <p className="text-xs text-stone-800 text-center">
                  Changing password is unavailable when authenticated using a
                  Google account
                </p>
              </div>
            ) : (
              <>
                <div className="flex flex-col items-start w-full gap-2">
                  <div className="flex flex-col items-start w-full gap-1">
                    <p className="text-xs text-stone-800">Old password</p>
                    <input
                      type="password"
                      placeholder="Old"
                      className="text-xs bg-gray-50 border border-gray-200 focus:border-gray-200 focus:bg-gray-200 focus:outline-none text-stone-800 focus:ring-0 w-full rounded-md p-2"
                      onChange={(e) => setOldPswd(e.target.value)}
                      value={oldPswd}
                    />
                  </div>
                  <div className="flex flex-col items-start w-full gap-1">
                    <p className="text-xs text-stone-800">New password</p>
                    <input
                      type="password"
                      placeholder="New"
                      className="text-xs bg-gray-50 border border-gray-200 focus:border-gray-200 focus:bg-gray-200 focus:outline-none text-stone-800 focus:ring-0 w-full rounded-md p-2"
                      onChange={(e) => setNewPswd(e.target.value)}
                      value={newPswd}
                    />
                  </div>
                </div>
                <div className="w-full flex items-center justify-end">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className=" text-stone-800 rounded-md border border-stone-800 p-1 text-xs"
                      onClick={handleChangePswd}
                    >
                      Change
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </Modal>
      <div className="w-full flex items-start justify-between">
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-1">
            <p className="text-sm text-stone-800">Account Settings</p>
            <Tooltip
              content={
                copied ? (
                  <p className="text-xs text-stone-800 flex items-center gap-1">
                    <Check size={14} className="text-green-400" /> Copied
                  </p>
                ) : (
                  <p className="text-xs text-stone-800">Copy account ID</p>
                )
              }
              style="light"
              arrow={false}
            >
              <Clipboard
                size={14}
                className="text-stone-800 hover:cursor-pointer"
                onClick={copyToClipboard}
              />
            </Tooltip>
          </div>
          <p className="text-xs text-stone-800">Viewing account settings</p>
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
      <div className="w-full flex flex-col gap-2">
        <p className="text-xs text-stone-800 font-semibold">Account</p>
        <div className="flex items-start w-full gap-2">
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col items-start w-full gap-1">
              {currentUser?.googleAuth ? (
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
              ) : (
                <p className="text-xs text-stone-800">Email</p>
              )}
              <div className="flex w-full">
                <input
                  type="text"
                  placeholder="Address"
                  className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2"
                  disabled
                  value={currentUser?.email}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col items-start w-full gap-1">
              <p className="text-xs text-stone-800">Country</p>
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
        </div>
        <p className="text-xs text-stone-800 font-semibold">Profile</p>
        <div className="flex items-start w-full gap-2">
          <div className="flex flex-col w-full gap-2">
            <div className="flex flex-col gap-2 w-full">
              <div className="flex flex-col items-start w-full gap-1">
                <p className="text-xs text-stone-800">Name & Logo</p>
                <input
                  type="text"
                  placeholder="My Bizz"
                  className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2"
                  disabled
                  value={currentUser?.name}
                />
              </div>
            </div>

            <div className="flex flex-col items-start w-full gap-1">
              <div className="flex items-center w-full gap-2">
                <Avatar size="md" img={currentUser?.logo?.url} />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex flex-col items-start w-full gap-1">
              <p className="text-xs text-stone-800">What You Sell</p>
              {currentUser?.about ? (
                <textarea
                  placeholder="About this customer.."
                  className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2 resize-none h-20"
                  disabled
                  value={currentUser?.about}
                />
              ) : (
                <div className="bg-gray-50 w-full h-16 flex items-center justify-center border border-gray-50 rounded-md">
                  <p className="text-xs text-stone-600">No about</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setDel(!del)}
            className="text-red-400 p-0.5 pl-2 pr-2 border border-red-400 rounded-md"
            style={{ fontSize: '10px' }}
          >
            Delete
          </button>
          <button
            type="button"
            onClick={() => setPswd(!pswd)}
            className="text-stone-800 p-0.5 pl-2 pr-2 border border-stone-800 rounded-md"
            style={{ fontSize: '10px' }}
          >
            New Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
