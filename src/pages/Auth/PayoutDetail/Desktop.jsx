import React, { useState } from 'react';
import Status from '../Payouts/Status';
import StripeAmount from '../../../utils/StripeAmount';
import { Check, Clipboard, Copy } from 'react-feather';
import { Tooltip } from 'flowbite-react';
import { PayoutDate } from '../../../utils/PayoutDate';
import BackBtn from '../../../components/BackBtn';

const Desktop = ({ payout }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(payout?.refNumber)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
      })
      .catch((err) => {
        console.error('Failed to copy!', err);
      });
  };

  return (
    <div className="w-10/12 bg-white border rounded-sm border-gray-200 p-2 pb-6 flex flex-col gap-6 items-center">
      <div className="w-full flex items-start justify-between">
        <div className="flex gap-1">
          <BackBtn direction={'left'} />
          <div className="flex flex-col items-start">
            <p className="text-sm text-stone-800">Viewing Payout</p>

            <p className="text-xs text-stone-800">#{payout?._id}</p>
          </div>
        </div>
        <Status status={payout?.status} />
      </div>
      <form className="w-72 mx-auto">
        <div className="flex flex-col gap-4 items-start w-full">
          <div className="flex flex-col items-start w-full gap-1">
            <p className="text-xs text-stone-800">Bank Name</p>
            <input
              type="text"
              placeholder="Name"
              className="text-xs border border-gray-200 focus:outline-none text-stone-800 ring-0 w-full rounded-sm p-2"
              disabled
              value={payout?.bankName}
            />
          </div>
          {payout?.refNumber ? (
            <div className="flex flex-col items-start w-full gap-1">
              <p className="text-xs text-stone-800">Reference Number</p>
              <div className="flex items-center w-full gap-1">
                <input
                  type="text"
                  placeholder="Name"
                  className="text-xs border border-gray-200 focus:outline-none text-stone-800 ring-0 w-full rounded-sm p-2"
                  disabled
                  value={payout?.refNumber}
                />

                <Tooltip
                  content={
                    copied ? (
                      <p className="text-xs text-stone-800 flex items-center gap-1">
                        <Check size={14} className="text-green-400" /> Copied
                      </p>
                    ) : (
                      <p className="text-xs text-stone-800">
                        Copy reference number
                      </p>
                    )
                  }
                  style="light"
                  arrow={false}
                >
                  <Copy
                    size={14}
                    className="text-stone-800 hover:cursor-pointer"
                    onClick={copyToClipboard}
                  />
                </Tooltip>
              </div>
            </div>
          ) : (
            ''
          )}
          <div className="flex flex-col items-start w-full gap-1">
            <p className="text-xs text-stone-800">Arriving On</p>
            <div className="text-xs border border-gray-200 w-full rounded-sm p-2 flex items-center justify-start text-left">
              <p className="text-xs text-stone-800">
                <PayoutDate payoutDate={payout?.arrivalDate} detail={true} />
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full">
            <div className="flex flex-col items-start w-8/12 gap-1">
              <p className="text-xs text-stone-800">Amount</p>

              <div className="text-xs border border-gray-200 flex items-center justify-start focus:outline-none text-stone-800 ring-0 w-full rounded-sm p-2">
                <StripeAmount
                  amount={payout?.amount}
                  currency={payout?.currency}
                />
              </div>
            </div>
            <div className="flex flex-col items-start gap-1 w-4/12">
              <p className="text-xs text-stone-800">Currency</p>
              <input
                type="text"
                placeholder="Postal code"
                className="text-xs border border-gray-200 focus:outline-none text-stone-800 ring-0 w-full rounded-sm p-2"
                disabled
                value={payout?.currency}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Desktop;
