import { Checkbox } from 'antd';
import { Tooltip } from 'flowbite-react';
import React, { useState } from 'react';
import {
  AlertOctagon,
  BarChart,
  ChevronDown,
  ChevronRight,
  CreditCard,
  FileText,
  Info,
  Send,
} from 'react-feather';
import Select from 'react-select';
import GraphView from './GraphView';
import { Link } from 'react-router-dom';

const Desktop = ({ data, currentUser, filter, setFilter }) => {
  const [view, setView] = useState(false);

  const options = [
    { label: 'Last 7 days', value: 'week' },
    { label: 'Last 30 days', value: 'month' },
    { label: 'Last 12 months', value: 'year' },
  ];

  const invoInfo = (
    <div className="flex flex-col items-start gap-4 w-48">
      <div className="flex items-center gap-1">
        <FileText size={14} className="text-stone-800" />
        <p className="text-xs text-stone-800">Total invoices created</p>
      </div>
      <div className="flex items-center gap-1">
        <Send size={14} className="text-stone-800" />
        <p className="text-xs text-stone-800">Total invoices sent</p>
      </div>
      <div className="flex items-center gap-1">
        <CreditCard size={14} className="text-stone-800" />
        <p className="text-xs text-stone-800">Total invoices paid</p>
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col gap-2">
      {!currentUser?.bankAdded && !currentUser?.stripeOnboard ? (
        <div className="w-full text-left flex items-center gap-1 p-2 border border-gray-200 bg-gray-50 rounded-sm">
          <AlertOctagon size={14} className="text-red-400" />
          <p className="text-stone-800 text-left" style={{ fontSize: '12px' }}>
            Connect a bank in{' '}
            <span>
              <Link
                to="/settings"
                state={{ index: 1 }}
                className="font-bold text-stone-800"
              >
                settings
              </Link>{' '}
              to send invoices and get paid
            </span>
          </p>
        </div>
      ) : (
        ''
      )}
      <div className="w-full grid grid-cols-10 gap-2">
        <div className="col-span-2 flex flex-col gap-2">
          <Select
            options={options}
            onChange={(value) => setFilter(value)}
            value={filter}
            placeholder="Filter"
            menuPortalTarget={document.body}
            menuPosition={'fixed'}
            isSearchable
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: 'rgb(229 231 235)',
                backgroundColor: '#fff',
                borderWidth: 1,
                '&:hover': {
                  backgroundColor: 'rgb(249 250 251)', // Keep the same border color on hover
                },
                '&:focus': {
                  backgroundColor: 'rgb(249 250 251)', // Keep the same border color on hover
                },
                fontSize: '11px',
                borderRadius: '4px',
                boxShadow: 'none',
                zIndex: 999,
                position: 'relative',
                height: 33,
                minHeight: 33,
              }),
              indicatorsContainer: (provided) => ({
                ...provided,
                height: 33,
              }),
              menuPortal: (provided) => ({
                ...provided,
                zIndex: 999,
                fontSize: '11px',
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected
                  ? 'rgb(249 250 251)'
                  : state.isFocused
                  ? 'rgb(249 250 251)'
                  : '',
                color: 'black',
              }),
            }}
            className="w-full text-left outline-none ring-0"
          />
          <div className="border rounded-sm border-gray-200 dark:border-white bg-white dark:bg-neutral-800 flex flex-col gap-1 items-start text-left p-2 relative">
            <div className="absolute top-0 right-0 mr-2 mt-2">
              <Tooltip
                style="light"
                arrow={false}
                content={
                  <p className="text-xs text-stone-800 w-48">
                    Total revenue generated from paid invoices
                  </p>
                }
              >
                <Info size={12} className="text-stone-800 dark:text-white" />
              </Tooltip>
            </div>
            <p className="text-xs text-stone-800 dark:text-white">Revenue</p>
            <p className="text-stone-900 dark:text-white text-sm">
              $
              {parseFloat(data?.revenue)?.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className="border rounded-sm border-gray-200 dark:border-white bg-white dark:bg-neutral-800 flex flex-col gap-1 items-start text-left p-2 relative">
            <div className="absolute top-0 right-0 mr-2 mt-2">
              <Tooltip
                style="light"
                arrow={false}
                content={
                  <p className="text-xs text-stone-800 w-48">
                    Total number of customers created
                  </p>
                }
              >
                <Info size={12} className="text-stone-800 dark:text-white" />
              </Tooltip>
            </div>
            <p className="text-xs text-stone-800 dark:text-white">Customers</p>
            <p className="text-stone-800 dark:text-white text-sm">
              {parseFloat(data?.numOfCusts)?.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </p>
          </div>
          <div className="border rounded-sm border-gray-200 dark:border-white bg-white dark:bg-neutral-800 flex flex-col items-start gap-1 p-2 relative">
            <div className="absolute top-0 right-0 mr-2 mt-2">
              <Tooltip style="light" arrow={false} content={invoInfo}>
                <Info size={12} className="text-stone-800 dark:text-white" />
              </Tooltip>
            </div>
            <p className="text-xs text-stone-800 dark:text-white">Invoices</p>
            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center gap-1">
                <FileText
                  size={12}
                  className="text-stone-800 dark:text-white"
                />
                <p className="text-stone-800 dark:text-white text-sm">
                  {parseFloat(data?.numOfInvos)?.toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Send size={12} className="text-stone-800 dark:text-white" />
                <p className="text-stone-800 dark:text-white text-sm">
                  {parseFloat(data?.invoSent)?.toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <CreditCard
                  size={12}
                  className="text-stone-800 dark:text-white"
                />
                <p className="text-stone-800 text-sm dark:text-white">
                  {parseFloat(data?.invoPaid)?.toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full border border-gray-200 rounded-sm col-span-8">
          <GraphView dataSet={data?.dataSet} filter={filter?.value} />
        </div>
      </div>
      <button
        type="button"
        onClick={() => setView(!view)}
        className="w-full flex flex-col bg-white items-start text-left border border-gray-200 rounded-sm p-2 cursor-pointer"
      >
        <div className="w-full flex items-center justify-between">
          <p className="text-xs text-stone-800">Ready to collect?</p>

          {view ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </div>

        <div
          className={`transition-[max-height] duration-300 ease-in-out overflow-hidden w-full ${
            view ? 'max-h-fit' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col items-start w-full h-full gap-2 justify-between mt-2">
            <div className="w-full flex items-center gap-2">
              <Checkbox disabled checked={currentUser?.emailConfirmed} />
              <p className="text-xs text-stone-800 text-left dark:text-white">
                Account email confirmed
              </p>
            </div>
            <div className="w-full flex items-center gap-2">
              <Checkbox
                disabled
                checked={currentUser?.bankAdded || currentUser?.stripeOnboard}
              />
              <p className="text-xs text-stone-800 text-left dark:text-white">
                Bank account connected
              </p>
            </div>
            <div className="w-full flex items-center gap-2">
              <Checkbox disabled checked={currentUser?.custAdded} />
              <p className="text-xs text-stone-800 text-left dark:text-white">
                First customer created
              </p>
            </div>
            <div className="w-full flex items-center gap-2">
              <Checkbox disabled checked={currentUser?.invoSent} />
              <p className="text-xs text-stone-800 text-left dark:text-white">
                First invoice sent
              </p>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default Desktop;
