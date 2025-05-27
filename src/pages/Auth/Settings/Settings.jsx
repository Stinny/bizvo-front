import React, { useEffect, useState } from 'react';
import Desktop from './Desktop';
import {
  useDeleteAccountMutation,
  useGetUserQuery,
} from '../../../api/accountApiSlice';
import Loading from '../../../components/Loading';
import Cookies from 'js-cookie';
import Navbar from '../../../components/Navbar/Navbar';
import { Link, useLocation } from 'react-router-dom';
import {
  AlertOctagon,
  BarChart2,
  Book,
  ChevronLeft,
  CornerUpLeft,
  CornerUpRight,
  Layers,
  Lock,
  Trash,
  X,
} from 'react-feather';
import { Spin } from 'antd';
import Randomstring from 'randomstring';
import { useChangePswdMutation } from '../../../api/authApiSlice';
import Modal from 'react-modal';
import { FcGoogle } from 'react-icons/fc';
import useHandleLogoutUser from '../../../utils/logout';
import Toast from '../../../components/Toast';

const customStyles = {
  content: {
    top: '30%',
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

const Settings = () => {
  const {
    data: userInfo,
    isLoading,
    isSuccess,
    isFetching,
    refetch,
  } = useGetUserQuery();

  const location = useLocation();
  const [activeTabIndex, setActiveTabIndex] = useState(
    location?.state?.index || 0
  );

  const [del, setDel] = useState(false);
  const [pswd, setPswd] = useState(false);
  const [error, setError] = useState('');

  //changing pswd state
  const [oldPswd, setOldPswd] = useState('');
  const [newPswd, setNewPswd] = useState('');
  const [errorPswd, setErrorPswd] = useState('');

  const [deleteAccount, { isLoading: deletingAcc }] =
    useDeleteAccountMutation();
  const [changePswd, { isLoading: changingPswd }] = useChangePswdMutation();
  const logout = useHandleLogoutUser();

  //delete form state
  const [key, setKey] = useState('');
  const [deleteKey, setDeleteKey] = useState(Randomstring.generate(6));

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

  const handleCancelAccDel = () => {
    setKey('');
    setDel(false);
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

  useEffect(() => {
    refetch();
  }, []);

  let content;

  if (isLoading || isFetching) {
    content = <Loading />;
  } else if (isSuccess) {
    const updatedUser = JSON.stringify(userInfo);
    Cookies.set('currentUser', updatedUser, { sameSite: 'Lax' });
    content = (
      <>
        <Modal
          isOpen={del}
          onRequestClose={handleCancelAccDel}
          style={customStyles}
          contentLabel="Acc Delete modal"
        >
          {deletingAcc ? (
            <div className="w-80 h-52 flex items-center justify-center">
              <Spin size="small" />
            </div>
          ) : (
            <div className="w-80 flex flex-col gap-2 items-start">
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
                <p className="text-xs text-stone-800 font-medium">
                  What will happen:
                </p>
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
              <div className="flex flex-col w-full gap-1">
                <input
                  type="text"
                  className="border border-gray-200 w-full p-2 hover:border-gray-200 focus:bg-gray-50 hover:bg-gray-50 focus:outline-none rounded-sm text-xs"
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
                      className="border border-red-400 text-red-400 rounded-sm p-1 text-xs cursor-pointer"
                      onClick={handleDeleteAcc}
                    >
                      Delete
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="border border-gray-100 text-gray-100 rounded-sm p-1 text-xs"
                      disabled
                    >
                      Delete
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
              <Spin size="small" />
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
                <div className="w-full flex items-center justify-start gap-2 border border-gray-200 rounded-sm p-2">
                  <AlertOctagon size={16} className="text-red-400" />
                  <p className="text-stone-800 text-xs">{errorPswd}</p>
                </div>
              ) : (
                ''
              )}
              {userInfo?.googleAuth ? (
                <div className="w-full flex flex-col gap-1 items-center justify-center border border-gray-200 rounded-sm p-4">
                  <div className="flex items-center justify-center gap-2">
                    <FcGoogle className="text-lg" />
                  </div>
                  <p className="text-xs text-stone-800 text-center">
                    Your password is managed by Google. Changes can't be made
                    here.
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
                        className="text-xs bg-white border border-gray-200 hover:bg-gray-50 focus:bg-gray-50 outline-none text-stone-800 w-full rounded-sm p-2"
                        onChange={(e) => setOldPswd(e.target.value)}
                        value={oldPswd}
                      />
                    </div>
                    <div className="flex flex-col items-start w-full gap-1">
                      <p className="text-xs text-stone-800">New password</p>
                      <input
                        type="password"
                        placeholder="New"
                        className="text-xs bg-white border border-gray-200 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none text-stone-800 w-full rounded-sm p-2"
                        onChange={(e) => setNewPswd(e.target.value)}
                        value={newPswd}
                      />
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-end">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className=" text-stone-800 rounded-sm border border-stone-800 p-1 text-xs cursor-pointer"
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
        <div className="bg-white dark:bg-neutral-800 flex flex-col items-start w-full gap-2">
          <div className="w-full mx-auto flex justify-center items-center h-6">
            <Toast />
          </div>
          <div className="flex items-center justify-between w-full border border-gray-200 rounded-sm p-2">
            <Link to="/settings">
              <p
                className="font-bold text-stone-800 dark:text-white text-sm flex items-center"
                style={{ fontFamily: 'Geist Mono' }}
              >
                <Layers size={16} className="font-black dark:text-white mr-1" />
                Bizvo|
                <span
                  className="text-xs font-normal"
                  style={{ fontFamily: 'Geist' }}
                >
                  Settings
                </span>
              </p>
            </Link>

            {!userInfo?.bankAdded && !userInfo?.stripeOnboard ? (
              <div className="text-left flex items-center gap-1 p-1 border border-gray-200 rounded-sm">
                <AlertOctagon size={12} className="text-red-400" />
                <p
                  className="text-stone-800 text-left"
                  style={{ fontSize: '11px' }}
                >
                  Bank account needed
                </p>
              </div>
            ) : (
              <div className="w-24"></div>
            )}
            <Link
              to="/dashboard"
              className="flex items-center gap-1 border border-white dark:border-neutral-800 dark:hover:border-white"
            >
              <p className="text-xs text-stone-800 dark:text-white">
                Dashboard
              </p>
              <CornerUpRight
                size={12}
                className="text-stone-800 dark:text-white"
              />
            </Link>
          </div>
          <Desktop
            refetch={refetch}
            currentUser={userInfo}
            activeTabIndex={activeTabIndex}
            setActiveTabIndex={setActiveTabIndex}
          />
          <div className="w-full flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setPswd(!pswd)}
              className="flex items-center gap-1 text-xs border border-white dark:border-neutral-800 dark:hover:border-white cursor-pointer"
            >
              <Lock size={12} className="text-stone-800 dark:text-white" />
              Password
            </button>
            <button
              type="button"
              onClick={() => setDel(!del)}
              className="flex items-center gap-1 text-xs border border-white dark:border-neutral-800 dark:hover:border-white cursor-pointer"
            >
              <Trash size={12} className="text-red-400 dark:text-white" />
              Delete Account
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="mx-auto max-w-2xl flex flex-col items-start gap-2 h-fit">
      {/* <Navbar /> */}
      <div className="flex items-start gap-2 w-full">{content}</div>
    </div>
  );
};

export default Settings;
