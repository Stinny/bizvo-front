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
    <div className="w-full flex flex-col items-start">
      {/* Bank pending display */}
      {currentUser?.stripePending ? (
        <div className="p-2 border border-gray-200 rounded-md flex flex-col items-start gap-2 w-72 relative">
          {isLoading || removing ? (
            <div className="w-full h-24 flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <>
              <div className="absolute right-0 top-0 mr-1 mt-1">
                <Badge color="info">Pending</Badge>
              </div>
              <div className="w-full flex flex-col items-start">
                <BiSolidBank className="text-stone-800" />
                <p className="text-sm text-stone-800">Stripe Account</p>
                <p className="text-xs text-stone-700">Payouts via Stripe</p>
              </div>
              <div className="flex flex-col items-start w-full">
                <div className="flex flex-col w-full items-start">
                  <p className="text-xs text-stone-700">Stripe ID</p>
                  <input
                    type="text"
                    placeholder="Pending"
                    className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2"
                    disabled
                  />
                </div>
              </div>
              <div className="flex justify-end w-full">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleRemoveStripe}
                    disabled={removing || isLoading}
                    className="text-red-400"
                  >
                    <Trash size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={handleGetUpdateUrl}
                    className="text-stone-800"
                    disabled={removing || isLoading}
                  >
                    <Edit size={16} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        ''
      )}

      {/* Bank connected display */}
      {currentUser?.stripeOnboard && !del ? (
        <div className="p-2 border border-gray-200 rounded-md flex flex-col items-start gap-2 w-6/12 relative">
          <div className="absolute right-0 top-0 mr-1 mt-1">
            <Badge color="success">Connected</Badge>
          </div>
          <div className="w-full flex flex-col items-start">
            <BiSolidBank className="text-stone-800" />
            <p className="text-sm text-stone-800">Stripe Account</p>
            <p className="text-xs text-stone-700">Payouts via Stripe</p>
          </div>

          <div className="flex flex-col items-start w-full">
            <div className="flex flex-col w-full items-start">
              <p className="text-xs text-stone-700">Stripe ID</p>
              <input
                type="text"
                placeholder="Pending"
                className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2"
                disabled
                value={currentUser?.stripeId}
              />
            </div>
          </div>
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
        </div>
      ) : (
        ''
      )}

      {/* Remove stripe display */}
      {del ? (
        <div className="p-2 border border-gray-200 rounded-md flex flex-col items-start gap-2 w-6/12 relative">
          <div className="absolute right-0 top-0 mr-1 mt-1">
            <Badge color="success">Connected</Badge>
          </div>
          <div className="w-full flex flex-col items-start">
            <BiSolidBank className="text-stone-800" />
            <p className="text-sm text-stone-800">Stripe Account</p>
            <p className="text-xs text-stone-700">Payouts via Stripe</p>
          </div>
          {removing ? (
            <div className="w-full h-24 flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <div className="w-full flex flex-col items-start gap-2">
              <p className="text-xs text-stone-700">
                Are you sure you want to remove your connected Stripe account?
              </p>
              <div className="flex items-center justify-end w-full gap-2">
                <button
                  type="button"
                  className=" text-stone-800 rounded-md border border-stone-800 p-1 text-xs"
                  onClick={() => setDel(false)}
                  disabled={removing || isLoading}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="border border-red-400 text-red-400 rounded-md p-1 text-xs"
                  onClick={handleRemoveStripe}
                  disabled={removing || isLoading}
                >
                  Remove
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

export default Stripe;
