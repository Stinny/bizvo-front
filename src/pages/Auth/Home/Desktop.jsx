import { Checkbox } from 'antd';
import { Tooltip } from 'flowbite-react';
import React from 'react';
import { BarChart, CreditCard, FileText, Info, Send } from 'react-feather';
import DashEvents from '../../../components/Events/DashEvents';

const Desktop = ({ data, currentUser }) => {
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
    <div className="w-10/12 flex flex-col gap-2">
      <div className="w-full grid grid-cols-8 gap-2">
        <div className="col-span-2 flex flex-col gap-2">
          <div className="border rounded-md border-gray-200 dark:border-white bg-white dark:bg-neutral-800 flex flex-col gap-1 items-start text-left p-2 relative">
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
          <div className="border rounded-md border-gray-200 dark:border-white bg-white dark:bg-neutral-800 flex flex-col items-start gap-1 p-2 relative">
            <div className="absolute top-0 right-0 mr-2 mt-2">
              <Tooltip style="light" arrow={false} content={invoInfo}>
                <Info size={12} className="text-stone-800 dark:text-white" />
              </Tooltip>
            </div>
            <p className="text-xs text-stone-800 dark:text-white">Invoices</p>
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-1">
                <FileText
                  size={14}
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
                <Send size={14} className="text-stone-800 dark:text-white" />
                <p className="text-stone-800 dark:text-white text-sm">
                  {parseFloat(data?.invoSent)?.toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <CreditCard
                  size={14}
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
          <div className="border rounded-md border-gray-200 dark:border-white bg-white dark:bg-neutral-800 flex flex-col gap-1 items-start text-left p-2 relative">
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
          <div className="border rounded-md border-gray-200 dark:border-white bg-white dark:bg-neutral-800 flex flex-col gap-1 items-start text-left p-2 relative">
            <div className="absolute top-0 right-0 mr-2 mt-2">
              <Tooltip
                style="light"
                arrow={false}
                content={
                  <p className="text-xs text-stone-800 w-48">
                    Total number of payouts received
                  </p>
                }
              >
                <Info size={12} className="text-stone-800 dark:text-white" />
              </Tooltip>
            </div>
            <p className="text-xs text-stone-800 dark:text-white">Payouts</p>
            <p className="text-stone-800 text-sm dark:text-white">
              {parseFloat(data?.numOfPayouts)?.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </p>
          </div>
        </div>
        <div className="col-span-6 flex flex-grow">
          <DashEvents />
        </div>
      </div>
      <div className="border rounded-md border-gray-200 dark:border-white bg-white dark:bg-neutral-800 flex flex-col gap-1 items-start p-2 w-full">
        <p className="text-xs text-stone-800 dark:text-white">Checklist</p>
        <div className="flex items-center w-full h-full justify-between">
          <div className="w-full flex items-center gap-2">
            <Checkbox disabled checked={currentUser?.emailConfirmed} />
            <p className="text-xs text-stone-800 text-left dark:text-white">
              Email confirmed
            </p>
          </div>
          <div className="w-full flex items-center gap-2">
            <Checkbox
              disabled
              checked={currentUser?.bankAdded || currentUser?.stripeOnboard}
            />
            <p className="text-xs text-stone-800 text-left dark:text-white">
              Payouts ready
            </p>
          </div>
          <div className="w-full flex items-center gap-2">
            <Checkbox disabled checked={currentUser?.custAdded} />
            <p className="text-xs text-stone-800 text-left dark:text-white">
              Customer added
            </p>
          </div>
          <div className="w-full flex items-center gap-2">
            <Checkbox disabled checked={currentUser?.invoSent} />
            <p className="text-xs text-stone-800 text-left dark:text-white">
              Invoice sent
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Desktop;
