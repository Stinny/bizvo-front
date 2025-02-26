import React, { useEffect, useRef, useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import {
  AlertOctagon,
  ChevronLeft,
  CreditCard,
  Percent,
  Send,
} from 'react-feather';
import { useConfirmPayInvoExistMutation } from '../../../../api/invoicesApiSlice';
import { Spinner } from 'flowbite-react';
import { Timeline } from 'antd';

const Form = ({
  setReadyForPayment,
  invoice,
  refetch,
  setSucc,
  trx,
  customer,
  handleView,
  view,
  error,
  setError,
}) => {
  const [confirmPayInvoExist, { isLoading }] = useConfirmPayInvoExistMutation();

  //handles confirming payment
  const handleConfirmPayment = async (e) => {
    e.preventDefault();

    setError('');

    try {
      //confirm payment on order
      const paymentReq = await confirmPayInvoExist({
        trxId: trx?._id,
        invoiceId: invoice?._id,
      }).unwrap();
      if (paymentReq?.success) {
        setSucc(true);
        refetch();
      } else if (paymentReq?.failed) {
        setError(paymentReq?.msg);
        return;
      }
    } catch (err) {
      console.log(err);
      setError('There was an error');
      return;
    }
  };

  const handleCancelPay = () => {
    refetch();
    setReadyForPayment(false);
  };

  return (
    <div className="w-full flex flex-col gap-2 items-start">
      <button
        type="button"
        onClick={() => handleView('old')}
        className="w-full flex flex-col flex-grow border border-gray-200 rounded-md p-2"
      >
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-xs text-stone-800">
              xxxx xxxx xxxx {customer?.payment?.lastFour}
            </p>
          </div>
          <div
            className={`w-2.5 h-2.5 border border-gray-200 hover:border-stone-800 rounded-sm ${
              view === 'old' ? 'bg-stone-800' : 'bg-white'
            }`}
          ></div>
        </div>

        <div
          className={`transition-[max-height] duration-300 ease-in-out overflow-hidden ${
            view === 'old' ? 'max-h-44' : 'max-h-0'
          }`}
        >
          <div className="w-full flex items-center justify-center bg-gray-50 rounded-md p-2 h-12 mt-2">
            <p className="text-xs text-stone-800">Saved payment method</p>
          </div>
          {isLoading ? (
            <div className="w-full p-2 flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <div className="w-full flex items-center gap-2 mt-2">
              <button
                type="button"
                onClick={handleCancelPay}
                className="p-2 w-2/12 border border-stone-800 text-stone-800 rounded-md flex items-center justify-center"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                className="p-2 w-10/12 border border-stone-800 text-stone-800 rounded-md text-xs font-medium"
                onClick={handleConfirmPayment}
                // disabled={}
              >
                Pay{' '}
                <span style={{ fontSize: '11px' }}>
                  $
                  {parseFloat(trx?.total / 100)?.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </button>
            </div>
          )}
        </div>
      </button>
    </div>
  );
};

export default Form;
