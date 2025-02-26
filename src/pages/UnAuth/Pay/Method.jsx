import React, { useState } from 'react';
import { ChevronLeft, CreditCard } from 'react-feather';
import Payment from './Method/Payment';
import { useGetPaySetupMutation } from '../../../api/customersApiSlice';

const Method = ({ setView, customer, invoice, refetch, added, setAdded }) => {
  const [ready, setReady] = useState(false);
  const [sec, setSec] = useState('');

  //hook for getting setup intent
  const [getPaySetup, { isLoading }] = useGetPaySetupMutation();

  const handleMoveToMethod = async () => {
    try {
      const intentReq = await getPaySetup({
        customerId: customer?._id,
      }).unwrap();

      if (intentReq?.sec) {
        setSec(intentReq?.sec);
        setReady(true);
      }
    } catch (err) {
      return;
    }
  };

  return (
    <div className="flex flex-col gap-2 min-h-28 w-full">
      {ready ? (
        <Payment
          sec={sec}
          setReady={setReady}
          customer={customer}
          invoice={invoice}
          refetch={refetch}
          added={added}
          setAdded={setAdded}
        />
      ) : (
        <>
          <div className="w-full flex items-center gap-1">
            <button
              type="button"
              onClick={() => setView('details')}
              className="text-stone-800 flex items-center justify-center border border-stone-800 p-0.5 rounded-md"
            >
              <ChevronLeft size={12} />
            </button>

            <p className="text-stone-800 text-xs">Payment Method</p>
          </div>
          <div className="w-full flex flex-col items-start gap-4">
            <div className="w-full flex flex-col items-center justify-center gap-2 border border-gray-200 rounded-md p-2 h-44">
              <p className="text-xs text-stone-800 font-medium">
                xxxx xxxx xxxx {customer?.payment?.lastFour}
              </p>
              <p className="text-xs text-stone-800 w-52">
                Payment method saved from past transactions
              </p>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleMoveToMethod}
                  className="p-1 border border-red-400 text-red-400 rounded-md font-medium"
                  style={{ fontSize: '10px' }}
                  disabled={isLoading}
                >
                  Remove
                </button>
                <button
                  type="button"
                  onClick={handleMoveToMethod}
                  className="p-1 border border-stone-800 rounded-md font-medium"
                  style={{ fontSize: '10px' }}
                  disabled={isLoading}
                >
                  Change
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Method;
