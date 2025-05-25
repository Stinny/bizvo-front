import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  AlertOctagon,
  Check,
  Clipboard,
  Copy,
  Download,
  Edit as EditIcon,
  Lock,
  Tool,
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

  //form state
  const [email, setEmail] = useState(currentUser?.email);
  const [country, setCountry] = useState(currentUser?.country);
  const [bizType, setBizType] = useState(currentUser?.bizType);
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
      formData.append('bizType', bizType);

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
      bizType={bizType}
      setBizType={setBizType}
      setSelectedImage={setSelectedImage}
      selectedImage={selectedImage}
    />
  ) : (
    <div className="w-full flex flex-col gap-4 items-start">
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
              <Copy
                size={12}
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
            className="text-stone-800 cursor-pointer"
          >
            <EditIcon size={14} />
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="flex items-start w-full gap-4">
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
                  className="text-xs bg-white border border-gray-200 focus:outline-none text-stone-800 ring-0 w-full rounded-sm p-2"
                  disabled
                  value={currentUser?.email}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start w-full gap-1">
            <p className="text-xs text-stone-800">Service Type</p>
            <div className="w-full flex items-center gap-2">
              <button
                type="button"
                className={`w-3/6 p-2 border border-gray-200 rounded-sm text-xs text-stone-800 flex items-center justify-center gap-1  ${
                  currentUser?.bizType === 'physical'
                    ? 'bg-gray-50 border-gray-200'
                    : 'bg-white'
                }`}
              >
                <Tool size={14} /> Physical
              </button>
              <button
                type="button"
                className={`w-3/6 p-2 border border-gray-200 rounded-sm text-xs text-stone-800 flex items-center justify-center gap-1 ${
                  currentUser?.bizType === 'digital'
                    ? 'bg-gray-50 border-gray-200'
                    : 'bg-white'
                }`}
              >
                <Download size={14} /> Digital
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-start w-full gap-4">
          <div className="flex flex-col w-full gap-4">
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col items-start w-full gap-1">
                <p className="text-xs text-stone-800">Name & Logo</p>
                <div className="flex w-full items-center gap-1">
                  <input
                    type="text"
                    placeholder="My Bizz"
                    className="text-xs w-full bg-white border border-gray-200 focus:outline-none text-stone-800 ring-0 rounded-sm p-2"
                    disabled
                    value={currentUser?.name}
                  />
                  <div className="">
                    <Avatar size="sm" img={currentUser?.logo?.url} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start w-full gap-1">
                <p className="text-xs text-stone-800">Country</p>
                <input
                  type="text"
                  className="border text-xs bg-white w-full border-gray-200 rounded-sm p-2 flex-1"
                  value={`${currentUser?.country?.label}`}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex flex-col items-start w-full gap-1">
              <p className="text-xs text-stone-800">Description of services</p>
              {currentUser?.about ? (
                <textarea
                  placeholder="About this customer.."
                  className="text-xs bg-white border border-gray-200 focus:outline-none text-stone-800 ring-0 w-full rounded-sm p-2 resize-none h-28"
                  disabled
                  value={currentUser?.about}
                />
              ) : (
                <div className="bg-gray-50 w-full h-24 flex items-center justify-center border border-gray-50 rounded-md">
                  <p className="text-xs text-stone-600">No about</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
