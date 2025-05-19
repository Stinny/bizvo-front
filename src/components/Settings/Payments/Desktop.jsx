import React from 'react';
import { CreditCard, ExternalLink } from 'react-feather';
import { RiBankLine } from 'react-icons/ri';
import { BsStripe } from 'react-icons/bs';
import {
  useGetBankUrlMutation,
  useGetStripeUrlMutation,
} from '../../../api/stripeApiSlice';
import { Badge, Spinner } from 'flowbite-react';
import Bank from './Bank';
import Stripe from './Stripe';
import { Spin } from 'antd';

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
    <div className="w-full flex flex-col items-start gap-2">
      <div className="w-full flex items-start justify-between">
        <div className="flex flex-col items-start">
          <p className="text-sm text-stone-800">Payout Settings</p>
          <p className="text-xs text-stone-800">
            Manage bank connection and payout schedule
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
          <Badge color="pink">Disconnected</Badge>
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
        <div className="p-2 border border-gray-200 rounded-sm flex flex-col items-start gap-1 w-7/12">
          {gettingBank ? (
            <div className="w-full h-16 flex items-center justify-center">
              <Spin size="small" />
            </div>
          ) : (
            <>
              <div className="flex items-center gap-1">
                <RiBankLine className="text-stone-800" />
                <p className="text-sm text-stone-800">Bank Account</p>
              </div>
              <p className="text-xs text-stone-800">
                Be paid directly to your bank account on a weekly or monthly
                basis.
              </p>

              <button
                type="button"
                onClick={handleGetBankUrl}
                className="border rounded-sm border-stone-800 hover:outline-none p-1 pl-2 pr-2 text-xs self-end hover:cursor-pointer"
              >
                Connect
              </button>
            </>
          )}
        </div>

        // <div className="w-full grid grid-cols-2 gap-2">
        //   <div className="p-2 border border-gray-200 rounded-sm flex flex-col items-start">
        //     {gettingBank ? (
        //       <div className="w-full h-full flex items-center justify-center">
        //         <Spinner />
        //       </div>
        //     ) : (
        //       <>
        //         <div className="flex items-center gap-1">
        //           <RiBankLine className="text-stone-800" />
        //           <p className="text-sm text-stone-800">Bank Account</p>
        //         </div>
        //         <p className="text-xs text-stone-800">
        //           Payouts via bank account
        //         </p>

        //         <button
        //           type="button"
        //           onClick={handleGetBankUrl}
        //           className="border rounded-sm border-stone-800 hover:outline-none p-1 pl-2 pr-2 text-xs mt-2"
        //         >
        //           Connect
        //         </button>
        //       </>
        //     )}
        //   </div>
        //   <div className="p-2 border border-gray-200 rounded-sm flex flex-col items-start">
        //     {gettingStripe ? (
        //       <div className="w-full h-full flex items-center justify-center">
        //         <Spinner />
        //       </div>
        //     ) : (
        //       <>
        //         <div className="flex items-center gap-1">
        //           <BsStripe className="text-stone-800" />
        //           <p className="text-sm text-stone-800">Stripe Account</p>
        //         </div>

        //         <p className="text-xs text-stone-800">
        //           Payouts via Stripe account
        //         </p>

        //         <button
        //           type="button"
        //           onClick={handleGetStripeUrl}
        //           disabled={gettingBank}
        //           className="border rounded-sm border-stone-800 hover:outline-none p-1 pl-2 pr-2 text-xs mt-2"
        //         >
        //           Connect
        //         </button>
        //       </>
        //     )}
        //   </div>
        // </div>
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
      <div className="w-full flex items-center text-left">
        <p className="text-stone-800 text-center text-xs">
          All payments incur a 2% Bizvo fee + processing fees
        </p>
      </div>
    </div>
  );
};

export default Desktop;
