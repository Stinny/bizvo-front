import React from 'react';
import { CreditCard, ExternalLink } from 'react-feather';
import { BiSolidBank } from 'react-icons/bi';
import { BsStripe } from 'react-icons/bs';
import {
  useGetBankUrlMutation,
  useGetStripeUrlMutation,
} from '../../../api/stripeApiSlice';
import { Spinner } from 'flowbite-react';
import Bank from './Bank';
import Stripe from './Stripe';

const Desktop = ({ currentUser, refetch }) => {
  const [getBankUrl, { isLoading: gettingBank }] = useGetBankUrlMutation();
  const [getStripeUrl, { isLoading: gettingStripe }] =
    useGetStripeUrlMutation();

  const handleGetBankUrl = async () => {
    try {
      const urlReq = await getBankUrl().unwrap();
      window.location.href = urlReq;
    } catch (err) {
      return;
    }
  };

  const handleGetStripeUrl = async () => {
    try {
      const urlReq = await getStripeUrl().unwrap();
      window.location.href = urlReq;
    } catch (err) {
      return;
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col items-start">
          <p className="text-sm text-stone-800">Payment Settings</p>
          <p className="text-xs text-stone-700">
            Select how you want to be paid
          </p>
        </div>
      </div>
      {currentUser?.bankPending ||
      currentUser?.bankAdded ||
      currentUser?.stripePending ||
      currentUser?.stripeOnboard ? (
        ''
      ) : (
        <div className="w-full grid grid-cols-2 gap-2">
          <div className="p-2 border border-gray-200 rounded-md flex flex-col items-start">
            {gettingBank ? (
              <div className="w-full h-full flex items-center justify-center">
                <Spinner />
              </div>
            ) : (
              <>
                <BiSolidBank className="text-stone-800" />
                <p className="text-sm text-stone-800">Bank Account</p>
                <p className="text-xs text-stone-700">
                  Be paid out to a bank account
                </p>
                <div className="flex justify-end w-full">
                  {/* <ExternalLink size={16} className="text-stone-800" /> */}
                  <button
                    type="button"
                    onClick={handleGetBankUrl}
                    className="border rounded-md border-stone-800 hover:outline-none p-0.5 pl-1 pr-1 text-xs"
                  >
                    Connect
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="p-2 border border-gray-200 rounded-md flex flex-col items-start">
            {gettingStripe ? (
              <div className="w-full h-full flex items-center justify-center">
                <Spinner />
              </div>
            ) : (
              <>
                <BsStripe className="text-stone-800" />
                <p className="text-sm text-stone-800">Stripe Account</p>
                <p className="text-xs text-stone-700">
                  Be paid out to a Stripe account
                </p>
                <div className="flex justify-end w-full">
                  {/* <ExternalLink size={16} className="text-stone-800" /> */}
                  <button
                    type="button"
                    onClick={handleGetStripeUrl}
                    disabled={gettingBank}
                    className="border rounded-md border-stone-800 hover:outline-none p-0.5 pl-1 pr-1 text-xs"
                  >
                    Connect
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {currentUser?.bankPending || currentUser?.bankAdded ? (
        <Bank currentUser={currentUser} refetch={refetch} />
      ) : (
        ''
      )}

      {currentUser?.stripePending || currentUser?.stripeOnboard ? (
        <Stripe currentUser={currentUser} refetch={refetch} />
      ) : (
        ''
      )}
    </div>
  );
};

export default Desktop;
