import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';
import { AlertOctagon, X } from 'react-feather';
import LoginGBtn from '../../../components/Auth/LoginGBtn';
import Footer from '../../../components/Footer/Footer';

const Desktop = ({
  email,
  pass,
  setEmail,
  setPass,
  handleLogin,
  error,
  setError,
}) => {
  return (
    <div className="flex flex-col max-w-3xl mx-auto h-screen relative">
      <Navbar />
      <div className="w-80 flex flex-col items-start mx-auto gap-2 mt-32">
        <div className="flex flex-col items-start w-full text-left">
          <p className="text-lg text-stone-800">Login</p>
          <p className="text-stone-700 text-sm">Enter details to continue</p>
        </div>
        <div className="mx-auto flex flex-col w-80 gap-2 p-2 border border-gray-200 bg-white rounded-md">
          {error ? (
            <div className="w-full flex items-center justify-start gap-2 border border-gray-200 rounded-md p-2">
              <AlertOctagon size={16} className="text-red-500" />
              <p className="text-stone-800 text-xs">{error}</p>
            </div>
          ) : (
            ''
          )}
          <form onSubmit={handleLogin} className="flex flex-col gap-2 w-full">
            <LoginGBtn setError={setError} />

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
            <input
              type="password"
              placeholder="Password"
              className="border text-xs border-gray-200 bg-gray-50 focus:border-gray-200 focus:outline-none text-stone-800 hover:bg-gray-200 hover:border-gray-200 focus:bg-gray-200 focus:ring-0 w-full rounded-md p-2"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
            />
            <button className="p-2 w-full border border-stone-800 text-stone-800 rounded-md text-xs">
              Login
            </button>
          </form>
        </div>
        <div className="w-full flex justify-between">
          <Link
            to="/signup"
            className="hover:text-stone-800 text-xs text-stone-700"
          >
            Signup
          </Link>
          <Link
            to="/signup"
            className="hover:text-stone-800 text-xs text-stone-700"
          >
            Forgot password?
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Desktop;
