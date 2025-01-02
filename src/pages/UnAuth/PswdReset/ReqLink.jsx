import React, { useEffect, useState } from 'react';
import { AlertOctagon, Check, ChevronLeft, Layers } from 'react-feather';
import { Link } from 'react-router-dom';
import { useReqPswdLinkMutation } from '../../../api/authApiSlice';
import { Spinner } from 'flowbite-react';

const ReqLink = () => {
  //form state
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  //hook for making API call
  const [reqPswdLink, { isLoading }] = useReqPswdLinkMutation();

  //handler for sending req
  const handleReqLink = async (e) => {
    e.preventDefault();

    setError('');

    if (!email.trim()) {
      setError('Please enter an email');
      return;
    }

    try {
      const linkReq = await reqPswdLink({ email }).unwrap();

      if (linkReq?.sent) {
        setSent(true);
        return;
      } else if (!linkReq?.sent) {
        setError(linkReq?.msg);
        return;
      } else {
        setError('There was an error');
        return;
      }
    } catch (err) {
      setError('Server error');
    }
  };

  useEffect(() => {
    setError('');
  }, [email]);

  return isLoading ? (
    <div className="w-80 flex flex-col items-center justify-center mx-auto gap-2 mt-32 h-52">
      <Spinner />
    </div>
  ) : (
    <div className="w-80 flex flex-col items-start mx-auto gap-2 mt-32">
      <div className="mx-auto flex flex-col w-80 gap-2 p-2 border border-gray-200 bg-white rounded-md">
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
          <p className="text-stone-600 text-xs">
            Forgot password? Request reset link below
          </p>
        </div>
        {error ? (
          <div className="w-full flex items-center justify-start gap-2 border border-gray-200 rounded-md p-2">
            <AlertOctagon size={16} className="text-red-400" />
            <p className="text-stone-800 text-xs">{error}</p>
          </div>
        ) : (
          ''
        )}
        <form className="flex flex-col gap-2 w-full">
          <input
            type="email"
            placeholder="Email"
            className="border text-xs border-gray-200 bg-gray-50 focus:border-gray-200 focus:outline-none text-stone-800 hover:bg-gray-200 hover:border-gray-200 focus:bg-gray-200 focus:ring-0 w-full rounded-md p-2"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            disabled={sent}
          />

          {sent ? (
            <div className="w-full flex items-center gap-1 justify-start p-2 border border-gray-200 rounded-md">
              <Check size={16} className="text-green-400" />
              <p className="text-xs text-stone-800">Link was sent!</p>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleReqLink}
              className="p-2 w-full border border-stone-800 text-stone-800 rounded-md text-xs"
            >
              Request Link
            </button>
          )}
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

export default ReqLink;
