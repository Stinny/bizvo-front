import React from 'react';
import Status from '../Payouts/Status';
import StripeAmount from '../../../utils/stripeAmount';

const Desktop = ({ payout }) => {
  return (
    <div className="w-10/12 bg-white border rounded-md border-gray-200 p-2 pb-6 flex flex-col gap-6 items-center">
      <div className="w-full flex items-start justify-between">
        <div className="flex flex-col items-start">
          <p className="text-sm text-stone-800">Viewing Payout</p>
          <p className="text-xs text-stone-700">#{payout?._id}</p>
        </div>
        <Status status={payout?.status} />
      </div>
      <form className="w-72 mx-auto">
        <div className="flex flex-col gap-4 items-start w-full">
          <div className="flex flex-col items-start w-full">
            <p className="text-xs text-stone-700">Bank Name</p>
            <input
              type="text"
              placeholder="Name"
              className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2"
              disabled
              value={payout?.bankName}
            />
          </div>
          <div className="flex flex-col items-start w-full">
            <p className="text-xs text-stone-700">Currency</p>
            <input
              type="text"
              placeholder="Name"
              className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2"
              disabled
              value={payout?.currency}
            />
          </div>
          <div className="flex items-center gap-2 w-full">
            <div className="flex flex-col items-start w-8/12">
              <p className="text-xs text-stone-700">Amount</p>

              <div className="text-xs bg-gray-50 border border-gray-50 flex items-center justify-start focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2">
                <StripeAmount
                  amount={payout?.amount}
                  currency={payout?.currency}
                />
              </div>
            </div>
            <div className="flex flex-col items-start w-4/12">
              <p className="text-xs text-stone-700">Currency</p>
              <input
                type="text"
                placeholder="Postal code"
                className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2"
                disabled
                value={payout?.currency}
              />
            </div>
          </div>
        </div>

        {/* <div className="flex items-center gap-2 w-full">
            <div className="flex flex-col items-start w-8/12">
              <p className="text-xs text-stone-700">Country</p>

              <div className="flex w-full">
                <input
                  type="text"
                  className="border w-full text-xs bg-gray-50 border-gray-50 rounded-tl-md rounded-bl-md p-2 flex-1 overflow-hidden"
                  value={country?.label}
                  disabled
                />
                <div className="rounded-tr-md rounded-br-md bg-gray-50 border border-l-0 border-gray-50 flex items-center justify-center p-1 pr-2">
                  <Tooltip
                    arrow={false}
                    style="light"
                    content={
                      <p className="text-xs text-stone-800">{country?.label}</p>
                    }
                  >
                    <ReactCountryFlag countryCode={country?.value} />
                  </Tooltip>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start w-4/12">
              <p className="text-xs text-stone-700">Postal</p>
              <input
                type="text"
                placeholder="Postal code"
                className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2"
                disabled
                value={zip}
              />
            </div>
          </div> */}

        <div className="flex flex-col gap-2 items-start w-full"></div>
      </form>
    </div>
  );
};

export default Desktop;
