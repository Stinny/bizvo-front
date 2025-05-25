import React, { useEffect, useState } from 'react';
import { AlertOctagon, Check, ChevronLeft, Layers } from 'react-feather';
import { Link } from 'react-router-dom';
import { useReqPswdLinkMutation } from '../../../api/authApiSlice';
import { Spinner } from 'flowbite-react';
import { Spin } from 'antd';
import BackBtn from '../../../components/BackBtn';

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
      <Spin size="small" />
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
      <div className="mx-auto flex flex-col w-80 gap-2 p-2 border border-gray-200 bg-white rounded-md">
        <div className="flex gap-1 w-full">
          <BackBtn direction={'left'} />
          <div className="flex flex-col items-start w-full">
            <p className="text-md text-stone-800 font-medium">
              Forgot Password?
            </p>
            <p className="text-stone-800 text-xs">Request a reset link below</p>
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
        <form className="flex flex-col gap-2 w-full">
          <input
            type="email"
            placeholder="Email"
            className="border text-xs border-gray-200 bg-white outline-none text-stone-800 hover:bg-gray-50 focus:bg-gray-50 w-full rounded-sm p-2"
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
              className="p-2 w-full border border-stone-800 text-stone-800 rounded-sm text-xs cursor-pointer"
            >
              Request Link
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ReqLink;
