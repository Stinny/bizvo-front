import React, { useEffect, useState } from 'react';
import { AlertOctagon, Check, CheckCircle } from 'react-feather';
import { useSubscribeMutation } from '../../api/authApiSlice';
import { isMobile } from 'react-device-detect';

const Subscribe = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  //hook for making API call
  const [subscribe, { isLoading }] = useSubscribeMutation();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('Enter an email');
      return;
    }

    try {
      const signUpReq = await subscribe({ email: email }).unwrap();
      if (signUpReq === 'Sub created') {
        setSuccess('You are subscribed!');
        setEmail('');
      } else {
        setError('There was an error');
        return;
      }
    } catch (err) {
      setError('There was an error');
      return;
    }
  };

  useEffect(() => {
    setError('');
  }, [email]);

  useEffect(() => {
    if (success) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
        setSuccess('');
      }, 3000); // Hide after 5 seconds (5000 milliseconds)
      return () => clearTimeout(timer); // Clear the timer if the component unmounts or success changes
    }
  }, [success]);

  return isMobile ? (
    <div className="flex flex-col items-center gap-1 w-full mx-auto mt-8 mb-8 p-4">
      {showSuccess && (
        <div className="w-full flex items-center justify-start gap-2 bg-white border border-gray-200 rounded-md p-2">
          <CheckCircle size={16} className="text-green-500" />
          <p className="text-stone-800 text-xs">{success}</p>
        </div>
      )}
      {error && (
        <div className="w-full flex items-center justify-start gap-2 border border-gray-200 bg-white rounded-md p-2">
          <AlertOctagon size={16} className="text-red-400" />
          <p className="text-stone-800 text-xs">{error}</p>
        </div>
      )}
      <form onSubmit={handleSignup} className="w-full flex gap-2">
        <input
          className="h-8 w-9/12 text-xs border border-gray-200 rounded-md p-2 hover:border-gray-200 bg-gray-50 hover:bg-gray-200 focus:border-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-0"
          type="email"
          placeholder="keepmeupdated@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="p-2 border-stone-800 border rounded-md text-stone-800 text-xs w-3/12"
          disabled={isLoading}
        >
          Subscribe
        </button>
      </form>
      <div className="w-full flex justify-start">
        <p className="text-stone-800 text-xs">
          Subscribe for updates. We respect your privacy.
        </p>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center gap-1 w-96 mx-auto mt-10 mb-10">
      {showSuccess && (
        <div className="w-full flex items-center justify-start gap-2 bg-white border border-gray-200 rounded-md p-2">
          <CheckCircle size={16} className="text-green-500" />
          <p className="text-stone-800 text-xs">{success}</p>
        </div>
      )}
      {error && (
        <div className="w-full flex items-center justify-start gap-2 border border-gray-200 bg-white rounded-md p-2">
          <AlertOctagon size={16} className="text-red-400" />
          <p className="text-stone-800 text-xs">{error}</p>
        </div>
      )}
      <form onSubmit={handleSignup} className="w-full flex gap-2">
        <input
          className="h-8 w-9/12 text-xs border border-gray-200 rounded-md p-2 hover:border-gray-200 bg-gray-50 hover:bg-gray-200 focus:border-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-0"
          type="email"
          placeholder="keepmeupdated@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="p-2 border-stone-800 border rounded-md text-stone-800 text-xs font-medium w-3/12"
          disabled={isLoading}
        >
          Subscribe
        </button>
      </form>
      <div className="w-full flex justify-start">
        <p className="text-stone-800 text-xs">
          Subscribe to receive news & updates. We respect your privacy.
        </p>
      </div>
    </div>
  );
};

export default Subscribe;
