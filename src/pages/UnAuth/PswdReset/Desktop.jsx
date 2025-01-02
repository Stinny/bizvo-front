import React from 'react';
import {
  AlertOctagon,
  Check,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Layers,
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
          <Link to="/" className="flex gap-1 items-center mb-2">
            <Layers size={18} className="font-black" />
            <p
              className="font-bold text-stone-800 text-lg"
              style={{ fontFamily: 'Space Mono, monospace' }}
            >
              Bizvo
            </p>
          </Link>
          <p className="text-stone-800 text-sm flex items-center gap-1">
            <CheckCircle size={18} className="text-green-400" />
            Password reset
          </p>
          <p className="text-stone-600 text-xs">
            Password reset was succussful. Return to the login page to access
            your account.
          </p>
          <Link
            to="/login"
            className="mt-2 flex items-center justify-center gap-1 border border-stone-800 rounded-md p-1 text-xs text-stone-800 w-24"
          >
            Login <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-80 flex flex-col items-start mx-auto gap-2 mt-32">
      <div className="mx-auto flex flex-col w-80 gap-4 p-2 border border-gray-200 bg-white rounded-md">
        <div className="flex flex-col items-start w-full text-left">
          <Link to="/" className="h-full flex gap-1 items-center">
            <Layers size={20} className="font-black" />
            <p
              className="font-bold text-stone-800 text-lg"
              style={{ fontFamily: 'Space Mono, monospace' }}
            >
              Bizvo
            </p>
          </Link>
          <p className="text-stone-600 text-xs">Reset account password</p>
        </div>

        <form className="flex flex-col gap-2 w-full">
          {error ? (
            <div className="w-full flex items-center justify-start gap-2 border border-gray-200 rounded-md p-2">
              <AlertOctagon size={16} className="text-red-400" />
              <p className="text-stone-800 text-xs">{error}</p>
            </div>
          ) : (
            ''
          )}
          <input
            type="password"
            placeholder="Password"
            className="border text-xs border-gray-200 bg-gray-50 focus:border-gray-200 focus:outline-none text-stone-800 hover:bg-gray-200 hover:border-gray-200 focus:bg-gray-200 focus:ring-0 w-full rounded-md p-2"
            onChange={(e) => setPass(e.target.value)}
            value={pass}
          />
          <input
            type="password"
            placeholder="Confirm"
            className="border text-xs border-gray-200 bg-gray-50 focus:border-gray-200 focus:outline-none text-stone-800 hover:bg-gray-200 hover:border-gray-200 focus:bg-gray-200 focus:ring-0 w-full rounded-md p-2"
            onChange={(e) => setPassTwo(e.target.value)}
            value={passTwo}
          />

          <button
            type="button"
            onClick={handleResetPswd}
            className="p-2 w-full border border-stone-800 text-stone-800 rounded-md text-xs"
          >
            Reset Password
          </button>
        </form>
      </div>
      <div className="w-full flex">
        <Link
          to="/"
          className="text-stone-600 flex items-center"
          style={{ fontSize: '12px' }}
        >
          <ChevronLeft size={14} />
          Home
        </Link>
      </div>
    </div>
  );
};

export default Desktop;
