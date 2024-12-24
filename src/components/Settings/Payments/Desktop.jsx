import React from 'react';
import { CreditCard, ExternalLink } from 'react-feather';
import { BiSolidBank } from 'react-icons/bi';
import { BsStripe } from 'react-icons/bs';
import {
  useGetBankUrlMutation,
  useGetStripeUrlMutation,
} from '../../../api/stripeApiSlice';
import { Badge, Spinner } from 'flowbite-react';
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
    <div className="w-full flex flex-col gap-4 pb-6">
      <div className="w-full flex items-start justify-between">
        <div className="flex flex-col items-start">
          <p className="text-sm text-stone-800">Payment Settings</p>
          <p className="text-xs text-stone-700">
            Connect and manage how you get paid
          </p>
        </div>
        {currentUser?.bankAdded || currentUser?.stripeOnboard ? (
          <Badge color="success">Connected</Badge>
        ) : (
          ''
        )}
        {currentUser?.bankPending || currentUser?.stripePending ? (
          <Badge color="warning">Pending</Badge>
        ) : (
          ''
        )}
        {!currentUser?.bankPending &&
        !currentUser?.stripePending &&
        !currentUser?.bankAdded &&
        !currentUser?.stripeOnboard ? (
          <Badge color="pink">Disabled</Badge>
        ) : (
          ''
        )}
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
                <div className="flex items-center gap-1">
                  <BiSolidBank className="text-stone-800" />
                  <p className="text-sm text-stone-800">Bank Account</p>
                </div>
                <p className="text-xs text-stone-600">
                  Payouts via bank account
                </p>

                <button
                  type="button"
                  onClick={handleGetBankUrl}
                  className="border rounded-md border-stone-800 hover:outline-none p-0.5 pl-1 pr-1 text-xs mt-2"
                >
                  Connect
                </button>
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
                <div className="flex items-center gap-1">
                  <BsStripe className="text-stone-800" />
                  <p className="text-sm text-stone-800">Stripe Account</p>
                </div>

                <p className="text-xs text-stone-600">
                  Payouts via Stripe account
                </p>

                <button
                  type="button"
                  onClick={handleGetStripeUrl}
                  disabled={gettingBank}
                  className="border rounded-md border-stone-800 hover:outline-none p-0.5 pl-1 pr-1 text-xs mt-2"
                >
                  Connect
                </button>
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
      <div className="w-full flex items-center justify-center text-center mt-4">
        <p
          className="text-stone-600 text-center w-64"
          style={{ fontSize: '11px' }}
        >
          All payments will incur a 2.9% + 30¢ Stripe fee and a 2% Bizvo fee
        </p>
      </div>
    </div>
  );
};

export default Desktop;
