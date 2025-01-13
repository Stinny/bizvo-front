import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Layers } from 'react-feather';
import { BsStripe } from 'react-icons/bs';
import { Timeline } from 'antd';
import BackBtn from '../../../components/BackBtn';

const Desktop = () => {
  return (
    <div className="flex flex-col max-w-3xl mx-auto">
      <div className="w-80 flex flex-col items-start mx-auto gap-4 mt-32">
        <div className="w-full flex items-center justify-center">
          <Link to="/" className="h-full flex gap-1 items-center">
            <Layers size={20} className="font-black" />
            <p
              className="font-bold text-stone-800 text-lg"
              style={{ fontFamily: 'Space Mono, monospace' }}
            >
              Bizvo
            </p>
          </Link>
        </div>
        <div className="w-full flex flex-col gap-4 p-2 border border-gray-200 rounded-md">
          <div className="flex gap-1 w-full">
            <BackBtn direction={'left'} />
            <div className="mx-auto flex flex-col items-start w-full">
              <p className="text-md text-stone-800 font-semibold">Pricing</p>
              <p className="text-xs text-stone-700 text-left">
                No monthly fees or card needed
              </p>
            </div>
          </div>
          <div className="w-full flex items-center gap-2">
            <div className="p-2 rounded-md border border-gray-200 flex flex-col items-center justify-center">
              <p className="text-lg text-stone-800 font-semibold">2%</p>
            </div>
            <div className="flex flex-col text-left items-start">
              <p className="text-sm text-stone-800">Transaction Fee</p>
              <p className="text-xs text-stone-700">
                Only taken when an invoivce is paid. Helps us cover expenses and
                be paid.
              </p>
            </div>
          </div>
          <div className="p-2 rounded-md border border-gray-200 flex flex-col items-center justify-center w-full">
            <p className="text-xs text-stone-800 flex items-center gap-1">
              additional fee of 2.9% + 30 ¢ by{' '}
              <a href="https://stripe.com/pricing" target="_blank">
                <BsStripe className="text-sm" />
              </a>
            </p>
          </div>
        </div>
        <div className="flex flex-col w-full items-start p-2">
          <p className="text-xs text-stone-800 mb-4">Ex. Transaction</p>
          <Timeline
            className="text-left"
            style={{ marginBottom: 0 }}
            items={[
              {
                color: 'gray',
                position: 'left',
                children: (
                  <p className="text-md text-stone-800">
                    Invoice total after taxes{' '}
                    <span className="font-semibold">$132.94</span>
                  </p>
                ),
              },
              {
                color: 'gray',
                position: 'left',
                children: (
                  <p className="text-md text-stone-800">
                    Fee taken for taxes{' '}
                    <span className="font-semibold">$7.94</span>
                  </p>
                ),
              },
              {
                color: 'gray',
                position: 'left',
                children: (
                  <p className="text-md text-stone-800">
                    Fee taken by Bizvo{' '}
                    <span className="font-semibold">$2.66</span>
                  </p>
                ),
              },
              {
                color: 'gray',
                position: 'left',
                children: (
                  <p className="text-md text-stone-800">
                    Fee taken by Stripe{' '}
                    <span className="font-semibold">$4.16</span>
                  </p>
                ),
              },
              {
                color: 'gray',
                position: 'left',
                children: (
                  <p className="text-md text-stone-800">
                    Amount earned after fees{' '}
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
