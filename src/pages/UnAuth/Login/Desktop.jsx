import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';
import { AlertOctagon, ChevronLeft, Layers, X } from 'react-feather';
import LoginGBtn from '../../../components/Auth/LoginGBtn';
import Footer from '../../../components/Footer/Footer';
import { Spinner } from 'flowbite-react';
import BackBtn from '../../../components/BackBtn';

const Desktop = ({
  email,
  pass,
  setEmail,
  setPass,
  handleLogin,
  error,
  setError,
  isLoading,
}) => {
  const [googling, setGoogling] = useState(false);

  return (
    <div className="flex flex-col max-w-3xl mx-auto">
      {isLoading || googling ? (
        <div className="w-full h-52 flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="w-80 flex flex-col items-start mx-auto gap-4">
          <div className="w-full flex items-center justify-center">
            <Link to="/">
              <p
                className="font-bold text-stone-800 dark:text-white text-md flex items-center gap-1"
                style={{ fontFamily: 'Geist Mono' }}
              >
                <Layers size={18} className="font-black dark:text-white" />
                Bizvo
              </p>
            </Link>
          </div>
          <div className="mx-auto flex flex-col w-80 gap-4 p-2 border border-gray-200 bg-white rounded-md">
            <div className="flex gap-1 w-full">
              <BackBtn direction={'left'} home={true} />
              <div className="flex flex-col items-start w-full">
                <p className="text-md text-stone-800 font-medium">Login</p>
                <p className="text-stone-700 text-xs">
                  Create an account{' '}
                  <span>
                    <Link to="/signup" className="font-bold text-stone-600">
                      here
                    </Link>
                  </span>
                </p>
              </div>
            </div>
            {error ? (
              <div className="w-full flex items-center justify-start gap-2 border border-gray-200 rounded-md p-2">
                <AlertOctagon size={16} className="text-red-400" />
                <p className="text-stone-800 text-xs">{error}</p>
              </div>
            ) : (
              ''
            )}
            <form onSubmit={handleLogin} className="flex flex-col gap-2 w-full">
              <LoginGBtn setError={setError} setGoogling={setGoogling} />

              <div className="flex items-center w-full">
                <div className="flex-grow border-t w-full border-gray-200 h-0"></div>
                <span className="mx-4 text-xs text-stone-800">or</span>
                <div className="flex-grow border-t w-full border-gray-200 h-0"></div>
              </div>

              <input
                type="email"
                placeholder="Email"
                className="border text-xs border-gray-200 bg-gray-50 focus:border-gray-200 focus:outline-none text-stone-800 hover:bg-gray-200 hover:border-gray-200 focus:bg-gray-200 focus:ring-0 w-full rounded-md p-2"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <div className="flex flex-col items-start w-full">
                <input
                  type="password"
                  placeholder="Password"
                  className="border text-xs border-gray-200 bg-gray-50 focus:border-gray-200 focus:outline-none text-stone-800 hover:bg-gray-200 hover:border-gray-200 focus:bg-gray-200 focus:ring-0 w-full rounded-md p-2"
                  onChange={(e) => setPass(e.target.value)}
                  value={pass}
                />
                <div className="w-full flex justify-end">
                  <Link
                    to="/password/request"
                    className="text-stone-600"
                    style={{ fontSize: '11px' }}
                  >
                    Forgot?
                  </Link>
                </div>
              </div>
              <button className="p-2 w-full border border-stone-800 text-stone-800 rounded-md text-xs font-medium">
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Desktop;
