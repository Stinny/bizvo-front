import React, { useState } from 'react';
import { ChevronRight, ChevronUp } from 'react-feather';
import { BiSolidBank } from 'react-icons/bi';
import { BsStripe } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Payments = () => {
  const [seeBank, setSeeBank] = useState(false);
  const [seeStr, setSeeStr] = useState(false);

  return (
    <div className="w-10/12 flex flex-col gap-4 items-start border border-gray-200 rounded-md p-2">
      <div className="w-full flex items-start justify-between">
        <div className="flex flex-col items-start">
          <p className="text-sm text-stone-800">Bizvo Docs</p>
          <p className="text-xs text-stone-800">Updated on Jan 12th, 2025</p>
        </div>
        <p className="text-xs text-stone-800 font-semibold">V1.0</p>
      </div>
      <div className="flex flex-col gap-4 items-start w-full text-left">
        <p className="text-sm text-stone-800 font-medium">Payments & Payouts</p>
        <p className="text-xs text-stone-800">
          As a platform, we utilize Stripe to handle everything related to
          payments and payouts. This allows us to operate securely and remain
          compliant while providing invoicing services to online businesses like
          yours.
        </p>

        <p className="text-xs text-stone-800">
          Card payments are accepted in 150+ countries. Any payments that
          originate from outside the U.S. incur an additional 1.5% fee. See
          pricing{' '}
          <Link to="/pricing" className="font-semibold">
            here.
          </Link>
        </p>
        <p className="text-xs text-stone-800">Payout options:</p>
        <div className="flex items-start gap-2 w-full">
          <button
            type="button"
            onClick={() => setSeeBank(!seeBank)}
            className="border border-gray-200 rounded-md flex flex-col p-2 w-6/12"
          >
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center">
                <BiSolidBank className="mr-1 text-stone-800 text-lg" />
                <div className="flex flex-col items-start">
                  <p className="text-xs text-stone-800">Bank Account</p>
                </div>
              </div>
              {seeBank ? <ChevronUp size={14} /> : <ChevronRight size={14} />}
            </div>

            <div
              className={`transition-[max-height] duration-300 ease-in-out overflow-hidden w-full flex flex-col gap-2 ${
                seeBank ? 'max-h-72' : 'max-h-0'
              }`}
            >
              <p className="text-stone-800 text-xs text-left mt-4">
                When receiving payouts to a bank account, you can choose between
                monthly or weekly payouts. Payouts occur when you accumulate a
                balance in your Bizvo account.
              </p>
              <p className="text-stone-800 text-xs text-left">
                Funds appear in your pending balance. As funds become available,
                they move to your available balance and will be paid out.
              </p>
              <p className="text-stone-800 text-xs text-left font-semibold">
                Account deletion or removing your bank is not allowed if you
                have an available or pending balance.
              </p>
            </div>
          </button>
          <button
            type="button"
            onClick={() => setSeeStr(!seeStr)}
            className="border border-gray-200 rounded-md flex flex-col p-2 w-6/12"
          >
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center">
                <BsStripe className="mr-1 text-stone-800 text-lg" />
                <div className="flex flex-col items-start">
                  <p className="text-xs text-stone-800">Stripe Account</p>
                </div>
              </div>
              {seeStr ? <ChevronUp size={14} /> : <ChevronRight size={14} />}
            </div>

            <div
              className={`transition-[max-height] duration-300 ease-in-out overflow-hidden w-full flex flex-col gap-2 ${
                seeStr ? 'max-h-72' : 'max-h-0'
              }`}
            >
              <p className="text-stone-800 text-xs text-left mt-4">
                When receiving payouts to a Stripe account, funds are
                immediately transferred to your connected account after every
                successful payment. You will not accumulate a balance in your
                Bizvo account, only in your Stripe account. What you do with
                your funds is up to you.
              </p>
              <p className="text-stone-800 text-xs text-left">
                This can provide a more straightforward experience if you
                already have a Stripe account set up that has received payments
                in the past.
              </p>
              <p className="text-stone-800 text-xs text-left font-semibold">
                You can disconnect a Stripe account at any time.
              </p>
            </div>
          </button>
        </div>
        <p className="text-sm text-stone-800 font-medium">Taxes</p>
        <p className="text-stone-800 text-xs text-left">
          Taxes are calculated based on the customer location and the invoice
          amount to ensure accuracy. The tax is added ontop of the invoice
          amount and collected from customers at the time of payment.
        </p>
        <p className="text-xs text-stone-800">We collect:</p>
        <div className="flex items-center gap-2">
          <div className="p-1 border border-gray-200 rounded-md flex items-center justify-center">
            <p className="text-xs text-stone-800">Sales Tax</p>
          </div>
          <div className="p-1 border border-gray-200 rounded-md flex items-center justify-center">
            <p className="text-xs text-stone-800">VAT</p>
          </div>
          <div className="p-1 border border-gray-200 rounded-md flex items-center justify-center">
            <p className="text-xs text-stone-800">GST</p>
          </div>
        </div>
        <p className="text-stone-800 text-xs text-left">
          As a platform, we closely monitor tax thresholds for each jurisdiction
          and will collect and remit when required.
        </p>
      </div>
    </div>
  );
};

export default Payments;
