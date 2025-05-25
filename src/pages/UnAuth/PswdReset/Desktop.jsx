import React from 'react';
import {
  AlertOctagon,
  Check,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Layers,
  LogIn,
  X,
} from 'react-feather';
import { Link } from 'react-router-dom';

const Desktop = ({
  pass,
  setPass,
  passTwo,
  setPassTwo,
  error,
  handleResetPswd,
  succ,
}) => {
  return succ ? (
    <div className="w-full mx-auto">
      <div className="w-72 mx-auto mt-32">
        <div className="flex flex-col items-center w-full text-center gap-2">
          <div className="w-full flex items-center justify-center">
            <Link to="/">
              <p
                className="font-bold text-stone-800 dark:text-white text-sm flex items-center gap-1"
                style={{ fontFamily: 'Geist Mono' }}
              >
                <Layers size={16} className="font-black dark:text-white" />
                Bizvo
              </p>
            </Link>
          </div>
          <p className="text-stone-800 text-sm flex items-center gap-1 mt-2">
            <CheckCircle size={18} className="text-green-400" />
            Password reset
          </p>
          <p className="text-stone-800 text-xs">
            Password reset was succussful. Return to the login page below.
          </p>
          <Link to="/login" className="mt-2  text-stone-800">
            <LogIn size={16} />
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-80 flex flex-col items-start mx-auto gap-4 mt-32">
      <div className="w-full flex items-center justify-center">
        <Link to="/">
          <p
            className="font-bold text-stone-800 dark:text-white text-sm flex items-center gap-1"
            style={{ fontFamily: 'Geist Mono' }}
          >
            <Layers size={16} className="font-black dark:text-white" />
            Bizvo
          </p>
        </Link>
      </div>
      <div className="mx-auto flex flex-col w-80 gap-2 p-2 border border-gray-200 bg-white rounded-sm">
        <div className="flex gap-1 w-full">
          <div className="flex flex-col items-start w-full">
            <p className="text-md text-stone-800 font-medium">Reset Password</p>
            <p className="text-stone-800 text-xs">
              Reset your account password below
            </p>
          </div>
        </div>

        <form className="flex flex-col gap-2 w-full">
          {error ? (
            <div className="w-full flex items-center justify-start gap-2 border border-gray-200 rounded-sm p-2">
              <AlertOctagon size={16} className="text-red-400" />
              <p className="text-stone-800 text-xs">{error}</p>
            </div>
          ) : (
            ''
          )}
          <input
            type="password"
            placeholder="Password"
            className="border text-xs border-gray-200 bg-white outline-none text-stone-800 hover:bg-gray-50 focus:bg-gray-50 focus:ring-0 w-full rounded-sm p-2"
            onChange={(e) => setPass(e.target.value)}
            value={pass}
          />
          <input
            type="password"
            placeholder="Confirm"
            className="border text-xs border-gray-200 bg-white outline-none text-stone-800 hover:bg-gray-50 focus:bg-gray-50 focus:ring-0 w-full rounded-sm p-2"
            onChange={(e) => setPassTwo(e.target.value)}
            value={passTwo}
          />

          <button
            type="button"
            onClick={handleResetPswd}
            className="p-2 w-full border border-stone-800 text-stone-800 rounded-sm text-xs cursor-pointer"
          >
            Reset
          </button>
        </form>
      </div>
    </div>
  );
};

export default Desktop;
