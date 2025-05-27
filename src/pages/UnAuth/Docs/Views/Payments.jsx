import { Timeline } from 'antd';
import React, { useState } from 'react';
import {
  ChevronRight,
  ChevronUp,
  CreditCard,
  DollarSign,
  Send,
  X,
} from 'react-feather';
import { BiSolidBank } from 'react-icons/bi';
import { BsStripe } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Payments = ({ lastUpdated }) => {
  const [seeTx1, setSeeTx1] = useState(false);
  const [seeTx2, setSeeTx2] = useState(false);
  const [seeTx3, setSeeTx3] = useState(false);

  return (
    <div className="w-full flex flex-col gap-4 items-start">
      <div className="w-full flex items-start justify-between">
        <div className="flex flex-col items-start">
          <p className="text-md text-stone-800 font-semibold">Bizvo Docs</p>
          <p className="text-xs text-stone-800">Updated on {lastUpdated}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-start w-full text-left">
        <p className="text-sm text-stone-800 font-medium">Fees</p>
        <p className="text-xs text-stone-800">
          As a platform, we aim to keep fees simple and as low as possible.
          These fees allow us to cover operating and processing costs.
        </p>
        <div className="p-1 border border-gray-200 rounded-md flex items-center justify-center gap-1">
          <p className="text-sm text-stone-800 font-medium">2%</p>
          <p className="text-xs text-stone-800">+ processing fees below</p>
        </div>
        <p className="text-xs text-stone-800">
          All successful transactions will incur these fees.
        </p>
        <p className="text-xs text-stone-800 font-medium">Card Fees</p>
        <p className="text-stone-800 text-xs text-left">
          2.9% + $0.30 for domestic cards
        </p>
        <p className="text-stone-800 text-xs text-left">
          3.9% + $0.30 for international cards (customer outside the U.S.)
        </p>
        <p className="text-xs text-stone-800 font-medium">Tax Fees</p>
        <p className="text-stone-800 text-xs text-left">
          0.5% for calculating, collecting, and remitting
        </p>
        <p className="text-xs text-stone-800 font-medium">Payout Fees</p>
        <p className="text-stone-800 text-xs text-left">
          0.25% of total payout
        </p>
        <p className="text-sm text-stone-800 font-medium">Taxes</p>
        <p className="text-stone-800 text-xs text-left">
          Taxes are calculated based on the customer location and the invoice
          amount to ensure accuracy. The tax is added ontop of the invoice
          amount and collected from customers at the time of payment.
        </p>
        <p className="text-stone-800 text-xs text-left">
          Taxes are collected as a fee and remitted to the government.
        </p>
        <p className="text-xs text-stone-800 font-medium">Tax types</p>
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
          We closely monitor tax thresholds for each jurisdiction and will
          collect and remit when required. This is done automatically and there
          is no tax settings to configure as a business. Any taxes on income
          made will be responsible to the business owner.
        </p>
        <p className="text-sm text-stone-800 font-medium">
          Example Transactions
        </p>
        <div className="w-full flex flex-col items-start">
          <div className="flex items-start gap-2 w-full">
            <button
              type="button"
              onClick={() => setSeeTx1(!seeTx1)}
              className="border border-gray-200 rounded-md flex flex-col p-2 w-6/12"
            >
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex flex-col items-start">
                    <p className="text-xs text-stone-800">Ex. Transaction #1</p>
                  </div>
                </div>
                {seeTx1 ? <ChevronUp size={14} /> : <ChevronRight size={14} />}
              </div>

              <div
                className={`transition-[max-height] duration-300 ease-in-out overflow-hidden w-full flex flex-col gap-2 ${
                  seeTx1 ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <Timeline
                  className="text-left mt-4 ml-2"
                  pending={false}
                  items={[
                    {
                      dot: <Send size={14} className="text-stone-800" />,
                      position: 'left',
                      children: (
                        <p className="text-xs text-stone-800 pt-1">
                          Invoice sent{' '}
                          <span className="font-semibold">$125.00</span>
                        </p>
                      ),
                    },
                    {
                      dot: <CreditCard size={14} className="text-stone-800" />,
                      position: 'left',
                      children: (
                        <p className="text-xs text-stone-800 pt-1">
                          Total paid{' '}
                          <span className="font-semibold">$132.94</span>
                        </p>
                      ),
                    },
                    {
                      dot: <X size={14} className="text-red-400" />,
                      position: 'left',
                      children: (
                        <p className="text-xs text-stone-800 pt-1">
                          Tax <span className="font-semibold">$7.94</span>
                        </p>
                      ),
                    },
                    {
                      dot: <X size={14} className="text-red-400" />,
                      position: 'left',
                      children: (
                        <p className="text-xs text-stone-800 pt-1">
                          Bizvo <span className="font-semibold">$2.66</span>
                        </p>
                      ),
                    },
                    {
                      dot: <X size={14} className="text-red-400" />,
                      position: 'left',
                      children: (
                        <p className="text-xs text-stone-800 pt-1">
                          Processing{' '}
                          <span className="font-semibold">$4.16</span>
                        </p>
                      ),
                    },
                    {
                      dot: <DollarSign size={14} className="text-stone-800" />,
                      position: 'left',
                      children: (
                        <p className="text-xs text-stone-800 pt-1">
                          Business earns{' '}
                          <span className="font-semibold">$118.18</span>
                        </p>
                      ),
                    },
                  ]}
                />
              </div>
            </button>
            <button
              type="button"
              onClick={() => setSeeTx2(!seeTx2)}
              className="border border-gray-200 rounded-md flex flex-col p-2 w-6/12"
            >
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex flex-col items-start">
                    <p className="text-xs text-stone-800">Ex. Transaction #2</p>
                  </div>
                </div>
                {seeTx2 ? <ChevronUp size={14} /> : <ChevronRight size={14} />}
              </div>

              <div
                className={`transition-[max-height] duration-300 ease-in-out overflow-hidden w-full flex flex-col gap-2 ${
                  seeTx2 ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <Timeline
                  className="text-left mt-4 ml-2"
                  pending={false}
                  items={[
                    {
                      dot: <Send size={14} className="text-stone-800" />,
                      position: 'left',
                      children: (
                        <p className="text-xs text-stone-800 pt-1">
                          Invoice sent{' '}
                          <span className="font-semibold">$125.00</span>
                        </p>
                      ),
                    },
                    {
                      dot: <CreditCard size={14} className="text-stone-800" />,
                      position: 'left',
                      children: (
                        <p className="text-xs text-stone-800 pt-1">
                          Total paid{' '}
                          <span className="font-semibold">$132.94</span>
                        </p>
                      ),
                    },
                    {
                      dot: <X size={14} className="text-red-400" />,
                      position: 'left',
                      children: (
                        <p className="text-xs text-stone-800 pt-1">
                          Tax <span className="font-semibold">$7.94</span>
                        </p>
                      ),
                    },
                    {
                      dot: <X size={14} className="text-red-400" />,
                      position: 'left',
                      children: (
                        <p className="text-xs text-stone-800 pt-1">
                          Bizvo <span className="font-semibold">$2.66</span>
                        </p>
                      ),
                    },
                    {
                      dot: <X size={14} className="text-red-400" />,
                      position: 'left',
                      children: (
                        <p className="text-xs text-stone-800 pt-1">
                          Processing{' '}
                          <span className="font-semibold">$4.16</span>
                        </p>
                      ),
                    },
                    {
                      dot: <DollarSign size={14} className="text-stone-800" />,
                      position: 'left',
                      children: (
                        <p className="text-xs text-stone-800 pt-1">
                          Business earns{' '}
                          <span className="font-semibold">$118.18</span>
                        </p>
                      ),
                    },
                  ]}
                />
              </div>
            </button>
            <button
              type="button"
              onClick={() => setSeeTx3(!seeTx3)}
              className="border border-gray-200 rounded-md flex flex-col p-2 w-6/12"
            >
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex flex-col items-start">
                    <p className="text-xs text-stone-800">Ex. Transaction #3</p>
                  </div>
                </div>
                {seeTx3 ? <ChevronUp size={14} /> : <ChevronRight size={14} />}
              </div>

              <div
                className={`transition-[max-height] duration-300 ease-in-out overflow-hidden w-full flex flex-col gap-2 ${
                  seeTx3 ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <Timeline
                  className="text-left mt-4 ml-2"
                  pending={false}
                  items={[
                    {
                      dot: <Send size={14} className="text-stone-800" />,
                      position: 'left',
                      children: (
                        <p className="text-xs text-stone-800 pt-1">
                          Invoice sent{' '}
                          <span className="font-semibold">$125.00</span>
                        </p>
                      ),
                    },
                    {
                      dot: <CreditCard size={14} className="text-stone-800" />,
                      position: 'left',
                      children: (
                        <p className="text-xs text-stone-800 pt-1">
                          Total paid{' '}
                          <span className="font-semibold">$132.94</span>
                        </p>
                      ),
                    },
                    {
                      dot: <X size={14} className="text-red-400" />,
                      position: 'left',
                      children: (
                        <p className="text-xs text-stone-800 pt-1">
                          Tax <span className="font-semibold">$7.94</span>
                        </p>
                      ),
                    },
                    {
                      dot: <X size={14} className="text-red-400" />,
                      position: 'left',
                      children: (
                        <p className="text-xs text-stone-800 pt-1">
                          Bizvo <span className="font-semibold">$2.66</span>
                        </p>
                      ),
                    },
                    {
                      dot: <X size={14} className="text-red-400" />,
                      position: 'left',
                      children: (
                        <p className="text-xs text-stone-800 pt-1">
                          Processing{' '}
                          <span className="font-semibold">$4.16</span>
                        </p>
                      ),
                    },
                    {
                      dot: <DollarSign size={14} className="text-stone-800" />,
                      position: 'left',
                      children: (
                        <p className="text-xs text-stone-800 pt-1">
                          Business earns{' '}
                          <span className="font-semibold">$118.18</span>
                        </p>
                      ),
                    },
                  ]}
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
