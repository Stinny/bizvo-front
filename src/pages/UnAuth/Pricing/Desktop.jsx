import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  DollarSign,
  Layers,
  Send,
  X,
} from 'react-feather';
import { BsStripe } from 'react-icons/bs';
import { Timeline } from 'antd';
import BackBtn from '../../../components/BackBtn';
import { RiBankLine } from 'react-icons/ri';

const Desktop = () => {
  return (
    <div className="flex flex-col max-w-3xl mx-auto mt-32">
      <div className="w-80 flex flex-col gap-2 items-start mx-auto">
        <div className="w-full flex items-center justify-center">
          <Link to="/">
            <p
              className="font-bold text-stone-800 dark:text-white text-sm flex items-center gap-1"
              style={{ fontFamily: 'Geist Mono' }}
            >
              <Layers size={16} className="font-black dark:text-white" />
              Bizvo
            </p>
          </Link>
        </div>
        <div className="w-full flex flex-col gap-4 p-2 border border-gray-200 rounded-sm mt-4">
          <div className="flex gap-1 w-full">
            <BackBtn direction={'left'} />
            <div className="mx-auto flex flex-col items-start w-full">
              <p className="text-md text-stone-800 font-semibold">Pricing</p>
              <p className="text-xs text-stone-800 text-left">
                No monthly fees or card needed
              </p>
            </div>
          </div>
          <div className="w-full flex items-center gap-2">
            <div className="p-2 rounded-sm border border-gray-200 flex flex-col items-center justify-center">
              <p className="text-lg text-stone-800 font-semibold">2%</p>
            </div>
            <div className="flex flex-col text-left items-start">
              <p className="text-sm text-stone-800">Transaction Fee</p>
              <p className="text-xs text-stone-800">
                Only taken when an invoivce is paid. Helps us cover expenses and
                be paid.
              </p>
            </div>
          </div>
          <div className="p-2 rounded-sm border border-gray-200 flex flex-col items-center justify-center w-full">
            <p className="text-xs text-stone-800 flex items-center gap-1">
              additional fee of 2.9% + 30¢ by{' '}
              <a href="https://stripe.com/pricing" target="_blank">
                <BsStripe className="text-sm" />
              </a>
            </p>
          </div>
        </div>

        <div className="flex flex-col w-full items-start">
          <p className="text-xs text-stone-800 mb-4">Ex. Transaction</p>

          <Timeline
            className="text-left"
            style={{ marginBottom: 0 }}
            items={[
              {
                dot: <Send size={14} className="text-stone-800" />,
                position: 'left',
                children: (
                  <p className="text-md text-stone-800">
                    Invoice sent for{' '}
                    <span className="font-semibold">$125.00</span>
                  </p>
                ),
              },
              {
                dot: <CreditCard size={14} className="text-stone-800" />,
                position: 'left',
                children: (
                  <p className="text-md text-stone-800">
                    Total after taxes{' '}
                    <span className="font-semibold">$132.94</span>
                  </p>
                ),
              },
              {
                dot: <X size={14} className="text-red-400" />,
                position: 'left',
                children: (
                  <p className="text-md text-stone-800">
                    Taxes <span className="font-semibold">$7.94</span>
                  </p>
                ),
              },
              {
                dot: <X size={14} className="text-red-400" />,
                position: 'left',
                children: (
                  <p className="text-md text-stone-800">
                    Bizvo fee <span className="font-semibold">$2.66</span>
                  </p>
                ),
              },
              {
                dot: <X size={14} className="text-red-400" />,
                position: 'left',
                children: (
                  <p className="text-md text-stone-800">
                    Processing fee <span className="font-semibold">$4.16</span>
                  </p>
                ),
              },
              {
                dot: <RiBankLine className="text-stone-800" />,
                position: 'left',
                children: (
                  <p className="text-md text-stone-800">
                    Business earns{' '}
                    <span className="font-semibold">$118.18</span>
                  </p>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Desktop;
