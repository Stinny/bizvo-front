import { Badge, Spinner } from 'flowbite-react';
import React, { useState } from 'react';
import { Calendar, Edit, Save, Trash, X } from 'react-feather';
import { BiSolidBank } from 'react-icons/bi';
import {
  useGetStripeUrlMutation,
  useGetUpdateUrlMutation,
  useRemoveBankMutation,
  useRemoveStripeMutation,
} from '../../../api/stripeApiSlice';
import { showNotification } from '../../../api/toastSlice';
import { useDispatch } from 'react-redux';
import { BsStripe } from 'react-icons/bs';

const Stripe = ({ currentUser, refetch }) => {
  const dispatch = useDispatch();

  const [del, setDel] = useState(false);

  const [getStripeUrl, { isLoading }] = useGetStripeUrlMutation();
  const [removeStripe, { isLoading: removing }] = useRemoveStripeMutation();

  const handleGetUpdateUrl = async () => {
    try {
      const urlReq = await getStripeUrl().unwrap();
      window.location.href = urlReq;
    } catch (err) {
      return;
    }
  };

  const handleRemoveStripe = async () => {
    try {
      const req = await removeStripe().unwrap();

      if (req === 'Stripe deleted') {
        dispatch(showNotification('Stripe disconnected'));
        refetch();
      }
    } catch (err) {
      return;
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center pb-6 mt-2">
      {removing ? (
        <div className="flex items-center justify-center w-96 h-44">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col items-start gap-2 w-80">
          <div className="w-full flex flex-col items-start">
            <div className="flex items-center gap-1">
              <BsStripe className="text-stone-800" />
              <p className="text-sm text-stone-800">Stripe Account</p>
            </div>
            <p className="text-xs text-stone-600">Payouts via Stripe account</p>
          </div>

          <div className="flex flex-col items-start w-full">
            <div className="flex flex-col w-full items-start gap-1">
              <p className="text-xs text-stone-600">Stripe ID</p>
              <input
                type="text"
                placeholder="Pending"
                className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2"
                disabled
                value={currentUser?.stripeId}
              />
            </div>
          </div>
          {del ? (
            ''
          ) : (
            <div className="flex justify-end w-full">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDel(!del)}
                  disabled={removing || isLoading}
                  className="text-red-400"
                >
                  <Trash size={16} />
                </button>
                <button
                  type="button"
                  onClick={handleGetUpdateUrl}
                  disabled={removing || isLoading}
                  className="text-stone-800"
                >
                  <Edit size={16} />
                </button>
              </div>
            </div>
          )}
          {del ? (
            <div className="w-full flex items-center justify-start">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="border border-red-400 text-red-400 rounded-md p-0.5 pl-2 pr-2 text-xs"
                  onClick={handleRemoveStripe}
                  disabled={removing || isLoading}
                >
                  Remove Stripe
                </button>
                <button
                  type="button"
                  className=" text-stone-800 rounded-md border border-stone-800 p-0.5 pl-2 pr-2 text-xs"
                  onClick={() => setDel(false)}
                  disabled={removing || isLoading}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      )}
    </div>
  );
};

export default Stripe;
