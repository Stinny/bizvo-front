import React, { useEffect, useState } from 'react';
import { AlertOctagon, Check } from 'react-feather';

const Subscribe = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSignup = async (e) => {
    // e.preventDefault();
    // try {
    //   const signUpReq = await emailSignup({ email: email }).unwrap();
    //   if (signUpReq === 'Signed up') {
    //     setSuccess('You are subscribed!');
    //     setEmail('');
    //   } else {
    //     setError('There was an error');
    //   }
    // } catch (err) {
    //   setError('There was an error');
    // }
  };

  useEffect(() => {
    setError('');
  }, [email]);

  useEffect(() => {
    if (success) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000); // Hide after 5 seconds (5000 milliseconds)
      return () => clearTimeout(timer); // Clear the timer if the component unmounts or success changes
    }
  }, [success]);

  return (
    <div className="flex flex-col items-center gap-1 w-96 mx-auto mb-24">
      {showSuccess && (
        <div className="w-full flex items-center justify-start gap-2 bg-gray-50 border border-gray-200 rounded-md p-2">
          <Check size={16} className="text-green-500" />
          <p className="text-stone-800 text-xs">{success}</p>
        </div>
      )}
      {error && (
        <div className="w-full flex items-center justify-start gap-2 border border-gray-200 rounded-md p-2">
          <AlertOctagon size={16} className="text-red-500" />
          <p className="text-stone-800 text-xs">{error}</p>
        </div>
      )}
      <form onSubmit={handleSignup} className="w-full flex gap-2">
        <input
          className="h-8 w-9/12 text-xs border border-gray-200 rounded-md p-2 hover:border-gray-200 bg-gray-50 hover:bg-gray-200 focus:border-gray-200 focus:bg-gray-200 focus:outline-none"
          type="email"
          placeholder="keepmeupdated@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="p-2 border-stone-800 border rounded-md text-stone-800 text-xs w-3/12"
          disabled={email.trim() ? false : true}
        >
          Subscribe
        </button>
      </form>
      <div className="w-full flex justify-start">
        <p className="text-stone-700 text-xs">
          Subscribe to receive news & updates from us
        </p>
      </div>
    </div>
  );
};

export default Subscribe;
