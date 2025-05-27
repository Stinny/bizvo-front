import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Info,
  Mail,
} from 'react-feather';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { BiSolidBank } from 'react-icons/bi';
import { BsStripe } from 'react-icons/bs';

const Account = ({ lastUpdated }) => {
  const [seeBank, setSeeBank] = useState(false);
  const [seeStr, setSeeStr] = useState(false);

  return (
    <div className="w-full flex flex-col gap-4 items-start">
      <div className="w-full flex items-start justify-between">
        <div className="flex flex-col items-start">
          <p className="text-md text-stone-800 font-semibold">Bizvo Docs</p>
          <p className="text-xs text-stone-800">Updated on {lastUpdated}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-start w-full text-left">
        <p className="text-sm text-stone-800 font-medium">Account Onboarding</p>
        <p className="text-xs text-stone-800">
          When creating an account you have two options. Choose to signup using
          an email address and password or signup using a Google account:
        </p>
        <div className="flex items-center gap-2">
          <div className="p-1 border border-gray-200 rounded-md flex items-center justify-center gap-1">
            <Mail size={16} className="text-stone-800" />
            <p className="text-xs text-stone-800">Email & Pass</p>
          </div>
          <div className="p-1 border border-gray-200 text-stone-800 rounded-md flex items-center justify-center gap-1">
            <FcGoogle className="text-lg" />{' '}
            <p className="text-xs text-stone-800">Google Account</p>
          </div>
        </div>
        <p className="text-xs text-stone-800">
          Once signed up, you have to complete your account setup before viewing
          your dashboard and having full access. The setup takes less than one
          minute to collect some business details including:
        </p>

        <div className="flex items-center gap-2">
          <div className="p-1 border border-gray-200 rounded-md flex items-center justify-center">
            <p className="text-xs text-stone-800">Name</p>
          </div>
          <div className="p-1 border border-gray-200 rounded-md flex items-center justify-center">
            <p className="text-xs text-stone-800">Location</p>
          </div>
          <div className="p-1 border border-gray-200 rounded-md flex items-center justify-center">
            <p className="text-xs text-stone-800">Description</p>
          </div>
          <div className="p-1 border border-gray-200 rounded-md flex items-center justify-center">
            <p className="text-xs text-stone-800">Logo</p>
          </div>
        </div>
        <p className="text-xs text-stone-800">
          After your account setup is complete you are sent to your dashboard.
          You will now have full access to features. From there you can connect
          a payout option, create customers, and start sending invoices.
        </p>
        <p className="text-xs text-stone-800">
          Create an{' '}
          <span className="font-semibold">
            <Link to="/signup">account</Link>
          </span>{' '}
          and start collecting today!
        </p>
        <p className="text-sm text-stone-800 font-medium">Payouts</p>
        <p className="text-xs text-stone-800">
          You have two payout options to choose from, a bank account or a Stripe
          account. You will only receive payouts from successful invoices that
          have been paid by a customer.
        </p>
        <div className="p-1 border border-gray-200 rounded-md flex items-center justify-center gap-1">
          <Info size={12} className="text-blue-400" />
          <p className="text-xs text-stone-800">
            A payout option must be connected to send invoices
          </p>
        </div>
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
              {seeBank ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
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
                Removing your bank is not allowed if you have an available or
                pending balance.
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
              {seeStr ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
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
                This will provide an easier experience if you already have a
                Stripe account set up.
              </p>
              <p className="text-stone-800 text-xs text-left font-semibold">
                You can disconnect a Stripe account at any time.
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
