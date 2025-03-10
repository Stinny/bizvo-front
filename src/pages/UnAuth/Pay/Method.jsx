import React, { useState } from 'react';
import {
  ChevronLeft,
  CornerUpLeft,
  CreditCard,
  Edit,
  Trash,
} from 'react-feather';
import Payment from './Method/Payment';
import {
  useGetPaySetupMutation,
  useRemovePayMethodMutation,
} from '../../../api/customersApiSlice';

const Method = ({
  setView,
  customer,
  invoice,
  refetch,
  added,
  setAdded,
  setRem,
}) => {
  const [ready, setReady] = useState(false);
  const [del, setDel] = useState(false);
  const [sec, setSec] = useState('');

  //hook for getting setup intent
  const [getPaySetup, { isLoading }] = useGetPaySetupMutation();
  //hook for removing pay method
  const [removePayMethod, { isLoading: removing }] =
    useRemovePayMethodMutation();

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

  const removePaymentMeth = async (e) => {
    e.preventDefault();

    try {
      const removeReq = await removePayMethod({
        customerId: customer?._id,
        paymentMeth: customer?.payment?.id,
      }).unwrap();

      if (removeReq === 'Removed') {
        refetch();
        setRem(true);
      } else {
        return;
      }
    } catch (err) {
      console.log(err);
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
        ''
      )}

      {del ? (
        <div className="w-full flex flex-col items-start gap-2">
          <div className="w-full flex items-center gap-1">
            <button
              type="button"
              onClick={() => setView('details')}
              className="text-stone-800 flex items-center justify-center border border-stone-800 p-0.5 rounded-md"
            >
              <CornerUpLeft size={12} />
            </button>

            <p className="text-stone-800 text-xs">Payment Method</p>
          </div>
          <div className="w-full flex flex-col items-center justify-center gap-4 border border-gray-200 rounded-md p-2 h-56">
            <p className="text-sm text-stone-800 w-64">
              Remove saved payment method? This may impact other received
              invoices.
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setDel(false)}
                className="p-1 border border-stone-800 rounded-md font-medium"
                style={{ fontSize: '11px' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={removePaymentMeth}
                className="p-1 border border-red-400 text-red-400 rounded-md font-medium"
                style={{ fontSize: '11px' }}
                disabled={removing}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}

      {!ready && !del ? (
        <div className="w-full flex flex-col gap-2">
          <div className="w-full flex items-center gap-1">
            <button
              type="button"
              onClick={() => setView('details')}
              className="text-stone-800 flex items-center justify-center border border-stone-800 p-0.5 rounded-md"
            >
              <CornerUpLeft size={12} />
            </button>

            <p className="text-stone-800 text-xs">Payment Method</p>
          </div>
          {customer?.payment?.id ? (
            <div className="w-full flex flex-col items-start gap-4">
              <div className="w-full flex flex-col items-center justify-center gap-4 border border-gray-200 rounded-md p-2 h-56 relative">
                <p className="text-xs text-stone-800 font-medium">
                  xxxx xxxx xxxx {customer?.payment?.lastFour}
                </p>
                <p className="text-sm text-stone-800 w-64">
                  Saved payment method. This can be used for any future invoice
                  payments.
                </p>
                <button
                  type="button"
                  onClick={() => setDel(true)}
                  className="text-red-400"
                >
                  <Trash size={14} />
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col items-start gap-4">
              <div className="w-full flex flex-col items-center justify-center gap-4 border border-gray-200 rounded-md p-2 h-56 relative">
                <p className="text-xs text-stone-800 w-64">
                  Add a payment method to use for future transactions. Make
                  payments quicker with one click.
                </p>
                <button
                  type="button"
                  onClick={handleMoveToMethod}
                  className="p-1 border border-stone-800 text-stone-800 rounded-md font-medium"
                  style={{ fontSize: '10px' }}
                  disabled={isLoading}
                >
                  Add +
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Method;
