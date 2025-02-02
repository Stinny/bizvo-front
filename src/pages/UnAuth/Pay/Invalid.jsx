import React, { useEffect, useState } from 'react';
import { AlertOctagon, CheckCircle, Clock, Layers } from 'react-feather';
import { Link } from 'react-router-dom';
import { useGetNewLinkMutation } from '../../../api/invoicesApiSlice';
import { Checkbox, Skeleton } from 'antd';
import InvoStatus from '../../../components/InvoStatus';
import { Spinner } from 'flowbite-react';
import { isMobile } from 'react-device-detect';

const Invalid = ({ invoId, token, exp, customer, invoice }) => {
  const [send, setSend] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [getNewLink, { isLoading }] = useGetNewLinkMutation();

  const handleSendNewLink = async (e) => {
    e.preventDefault();

    if (!send) {
      setError('Please fill out all fields');
      return;
    }

    try {
      const sendReq = await getNewLink({
        iat: token,
        invoId: invoId,
      }).unwrap();
      if (sendReq?.sent || sendReq?.valid) {
        setSent(true);
        return;
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
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 3000); // Hide after 5 seconds (5000 milliseconds)
      return () => clearTimeout(timer); // Clear the timer if the component unmounts or success changes
    }
  }, [error]);

  return isMobile ? (
    <div className="w-full flex flex-col gap-2 items-start p-4">
      {sent ? (
        <div className="w-full bg-white border border-gray-200 rounded-md flex flex-col gap-4 items-center justify-center p-2">
          <div className="w-full flex justify-between items-start">
            <div className="flex flex-col items-start">
              <p className="text-stone-800 text-sm">
                {invoice?.type === 'recurring'
                  ? 'Recurring Invoice'
                  : 'Invoice'}
              </p>
              <p className="text-stone-800 text-xs">#{invoId}</p>
            </div>
            <InvoStatus status={invoice?.status} />
          </div>
          <Skeleton />
          <div className="w-full flex flex-col gap-4 items-center border border-gray-200 rounded-md p-4">
            {' '}
            <CheckCircle size={18} className="text-green-400" />
            <div className="flex flex-col items-center text-center gap-2">
              <p className="text-stone-800 text-xs w-72">
                A valid payment link has been sent or one already exists. Please
                check your inbox.
              </p>
              <div className="w-full flex flex-col items-center">
                <p className="text-stone-800 text-xs text-center font-medium">
                  Sent to
                </p>
                <p className="text-stone-800 text-xs text-center text-wrap">
                  {customer?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full bg-white border border-gray-200 rounded-md flex flex-col gap-4 items-center justify-center p-2">
          <div className="w-full flex justify-between items-start">
            <div className="flex flex-col items-start">
              <p className="text-stone-800 text-sm">
                {invoice?.type === 'recurring'
                  ? 'Recurring Invoice'
                  : 'Invoice'}
              </p>
              <p className="text-stone-800 text-xs">#{invoId}</p>
            </div>
            <InvoStatus status={invoice?.status} />
          </div>
          <Skeleton />

          <div className="w-full flex flex-col items-center gap-4 border border-gray-200 rounded-md p-2 pt-4">
            {exp ? (
              <div className="flex flex-col items-center text-center gap-4">
                <Clock size={18} className="text-red-400" />
                <p className="text-stone-800 text-xs w-64">
                  Payment link has expired. Send new link to make a payment and
                  view full invoice.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center gap-4 pb-4">
                <AlertOctagon size={18} className="text-red-400" />
                <p className="text-stone-800 text-xs w-64">
                  Invoice does not exist or link is invalid. No payment or other
                  changes can be made here.
                </p>
              </div>
            )}

            {exp ? (
              <>
                {isLoading ? (
                  <div className="w-full flex items-center justify-center h-12">
                    <Spinner />
                  </div>
                ) : (
                  <div className="w-full flex flex-col items-start">
                    <form className="w-full flex gap-1">
                      <input
                        className="text-xs w-full border border-gray-50 rounded-md p-2 bg-gray-50 focus:border-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-0"
                        type="email"
                        disabled
                        value={customer?.email}
                      />
                      {send ? (
                        <button
                          type="button"
                          onClick={handleSendNewLink}
                          disabled={isLoading || !send}
                          className="p-1 pl-2 pr-2 border-stone-800 border rounded-md text-stone-800 text-xs font-medium"
                        >
                          Send
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleSendNewLink}
                          disabled
                          className="p-1 pl-2 pr-2 border-gray-100 border rounded-md text-gray-100 text-xs font-medium"
                        >
                          Send
                        </button>
                      )}
                    </form>
                    <div className="flex items-center gap-1">
                      <Checkbox
                        checked={send}
                        onChange={(e) => setSend(e.target.checked)}
                      />
                      <div className="flex flex-col items-start">
                        <p className="text-xs text-stone-800">
                          Send new payment link
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              ''
            )}
          </div>
        </div>
      )}
      <div className="w-full bg-white border border-gray-200 rounded-md p-2 flex flex-col items-center text-center">
        <Link to="/">
          <p
            className="font-bold text-stone-800 dark:text-white text-sm flex items-center gap-1"
            style={{ fontFamily: 'Geist Mono' }}
          >
            <Layers size={16} className="font-black dark:text-white" />
            Bizvo
          </p>
        </Link>
        <p className="text-stone-800" style={{ fontSize: '11px' }}>
          Customer Payments Made Easy
        </p>
      </div>
    </div>
  ) : (
    <div
      className="mx-auto flex flex-col gap-2 items-start mt-16"
      style={{ width: '370px' }}
    >
      {sent ? (
        <div className="w-full bg-white border border-gray-200 rounded-md flex flex-col gap-4 items-center justify-center p-2">
          <div className="w-full flex justify-between items-start">
            <div className="flex flex-col items-start">
              <p className="text-stone-800 text-sm">
                {invoice?.type === 'recurring'
                  ? 'Recurring Invoice'
                  : 'Invoice'}
              </p>
              <p className="text-stone-800 text-xs">#{invoId}</p>
            </div>
            <InvoStatus status={invoice?.status} />
          </div>
          <Skeleton />
          <div className="w-full flex flex-col gap-4 items-center border border-gray-200 rounded-md p-4">
            {' '}
            <CheckCircle size={18} className="text-green-400" />
            <div className="flex flex-col items-center text-center gap-2">
              <p className="text-stone-800 text-xs w-72">
                A valid payment link has been sent or one already exists. Please
                check your inbox.
              </p>
              <div className="w-full flex flex-col items-center">
                <p className="text-stone-800 text-xs text-center font-medium">
                  Sent to
                </p>
                <p className="text-stone-800 text-xs text-center text-wrap">
                  {customer?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full bg-white border border-gray-200 rounded-md flex flex-col gap-4 items-center justify-center p-2">
          <div className="w-full flex justify-between items-start">
            <div className="flex flex-col items-start">
              <p className="text-stone-800 text-sm">
                {invoice?.type === 'recurring'
                  ? 'Recurring Invoice'
                  : 'Invoice'}
              </p>
              <p className="text-stone-800 text-xs">#{invoId}</p>
            </div>
            <InvoStatus status={invoice?.status} />
          </div>
          <Skeleton />

          <div className="w-full flex flex-col items-center gap-4 border border-gray-200 rounded-md p-2 pt-4">
            {exp ? (
              <div className="flex flex-col items-center text-center gap-4">
                <Clock size={18} className="text-red-400" />
                <p className="text-stone-800 text-xs w-64">
                  Payment link has expired. Send new link to make a payment and
                  view full invoice.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center gap-4 pb-4">
                <AlertOctagon size={18} className="text-red-400" />
                <p className="text-stone-800 text-xs w-64">
                  {exp
                    ? `Payment link has expired. Send new link to make a payment and view full invoice.`
                    : `Invoice does not exist or link is invalid. No payment or other changes can be made here.`}
                </p>
              </div>
            )}

            {exp ? (
              <>
                {isLoading ? (
                  <div className="w-full flex items-center justify-center h-12">
                    <Spinner />
                  </div>
                ) : (
                  <div className="w-full flex flex-col items-start gap-1">
                    <form className="w-full flex gap-1">
                      <input
                        className="text-xs w-full border border-gray-50 rounded-md p-2 bg-gray-50 focus:border-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-0"
                        type="email"
                        disabled
                        value={customer?.email}
                      />
                      {send ? (
                        <button
                          type="button"
                          onClick={handleSendNewLink}
                          disabled={isLoading || !send}
                          className="p-1 pl-2 pr-2 border-stone-800 border rounded-md text-stone-800 text-xs font-medium"
                        >
                          Send
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleSendNewLink}
                          disabled
                          className="p-1 pl-2 pr-2 border-gray-100 border rounded-md text-gray-100 text-xs font-medium"
                        >
                          Send
                        </button>
                      )}
                    </form>
                    <div className="flex items-center gap-1">
                      <Checkbox
                        checked={send}
                        onChange={(e) => setSend(e.target.checked)}
                      />
                      <div className="flex flex-col items-start">
                        <p className="text-xs text-stone-800">
                          Send new payment link
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              ''
            )}
          </div>
        </div>
      )}
      <div className="w-full bg-white border border-gray-200 rounded-md p-2 flex flex-col items-center text-center">
        <Link to="/">
          <p
            className="font-bold text-stone-800 dark:text-white text-sm flex items-center gap-1"
            style={{ fontFamily: 'Geist Mono' }}
          >
            <Layers size={16} className="font-black dark:text-white" />
            Bizvo
          </p>
        </Link>
        <p className="text-stone-800" style={{ fontSize: '11px' }}>
          Customer Payments Made Easy
        </p>
      </div>
    </div>
  );
};

export default Invalid;
