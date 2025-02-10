import React, { useState } from 'react';
import { ChevronLeft, CreditCard } from 'react-feather';
import Payment from './Method/Payment';
import { useGetPaySetupMutation } from '../../../api/customersApiSlice';

const Method = ({ setSeePay, customer, invoice, refetch, added, setAdded }) => {
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
      <div className="w-full flex items-center gap-1">
        {ready ? (
          <button
            type="button"
            onClick={() => setReady(false)}
            className="text-stone-800 flex items-center justify-center border border-stone-800 p-0.5 rounded-md"
          >
            <ChevronLeft size={12} />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setSeePay(false)}
            className="text-stone-800 flex items-center justify-center border border-stone-800 p-0.5 rounded-md"
          >
            <ChevronLeft size={12} />
          </button>
        )}
        <p className="text-stone-800 text-xs">Payment Method</p>
      </div>
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
        <div className="w-full flex flex-col items-start gap-4">
          <div className="w-full flex items-center justify-between gap-1 border border-gray-200 rounded-md p-2">
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-2">
                <CreditCard size={16} className="text-stone-800" />
                <p className="text-xs text-stone-800 font-medium">
                  xxxx xxxx xxxx {customer?.payment?.lastFour}
                </p>
              </div>
              <p className="text-xs text-stone-800">{customer?.payment?.id}</p>
            </div>
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
          <p className="text-stone-800 text-xs text-left">
            This payment method is charged on a recurring basis. If changed,
            payment will be made next due date.
          </p>
        </div>
      )}
    </div>
  );
};

export default Method;
