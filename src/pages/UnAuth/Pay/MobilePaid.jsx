import { Avatar, Badge, Tooltip } from 'flowbite-react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import {
  Briefcase,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  CreditCard,
  Download,
  Info,
  Layers,
  MoreVertical,
  Percent,
  Send,
  User,
} from 'react-feather';
import { Link } from 'react-router-dom';
import Trxs from './Trxs';
import { Timeline } from 'antd';

const MobilePaid = ({ invoice, currentUser, succ, setSucc, trx, trxs }) => {
  const [seeTrx, setSeeTrx] = useState(false);
  const [view, setView] = useState('');

  const isOwner = invoice?.sellerId === currentUser?._id;

  //for display
  const taxAmount = trx?.tax?.amount / 100;
  let taxType;
  switch (trx?.tax?.type) {
    case 'vat':
      taxType = 'VAT';
      break;
    case 'gst':
      taxType = 'GST';
      break;
    default:
      taxType = 'Sales Tax';
      break;
  }

  const handleView = (newView) => {
    if (newView === view) {
      setView('');
    } else {
      setView(newView);
    }
  };

  useEffect(() => {
    if (succ) {
      const timer = setTimeout(() => {
        setSucc(false);
      }, 5000); // 5 seconds

      // Cleanup the timer if the component unmounts
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="flex flex-col gap-2 items-start w-full p-4">
      <div className="w-full flex justify-center items-center text-center">
        <p className="text-stone-800 font-medium" style={{ fontSize: '12px' }}>
          Paid on {moment(invoice?.paidOn).format('MMMM Do, YYYY')}
        </p>
      </div>
      {succ ? (
        <div className="w-full flex items-center justify-start gap-2 border border-gray-200 bg-white rounded-md p-2">
          <CheckCircle size={14} className="text-green-400" />
          <p className="text-xs text-stone-800">Payment was successful!</p>
        </div>
      ) : (
        ''
      )}
      <div className="w-full bg-white border border-gray-200 rounded-md flex flex-col gap-4 items-start p-2">
        <div className="w-full flex justify-between items-start relative">
          <div className="flex flex-col items-start">
            <p className="text-stone-800 text-sm">Invoice</p>
            <p className="text-stone-600 text-xs">#{invoice?._id}</p>
          </div>

          <Badge size="xs" color="success">
            Paid
          </Badge>
        </div>
        <div className="w-full grid grid-cols-7">
          <div className="flex items-center justify-start">
            <Avatar size="md" img={invoice?.seller?.logo} />
          </div>
          <div className="flex flex-col items-start col-span-6">
            <p className="text-stone-800 text-sm text-left">{invoice?.title}</p>
            <p className="text-stone-600 text-xs text-left">
              {invoice?.description}
            </p>
          </div>
        </div>

        {seeTrx ? (
          <Trxs trxs={trxs} setSeeTrx={setSeeTrx} />
        ) : (
          <>
            <div className="flex flex-col gap-2 items-start w-full">
              <button
                type="button"
                onClick={() => handleView('bus')}
                className="w-full flex flex-col bg-white items-start text-left border border-gray-200 rounded-md p-2"
              >
                <div className="w-full flex items-center justify-between">
                  <p className="text-xs text-stone-800">Sender</p>

                  {view === 'bus' ? (
                    <ChevronDown size={14} />
                  ) : (
                    <ChevronRight size={14} />
                  )}
                </div>

                <div
                  className={`transition-[max-height] duration-300 ease-in-out overflow-hidden w-full ${
                    view === 'bus' ? 'max-h-40' : 'max-h-0'
                  }`}
                >
                  <div className="w-full flex flex-col gap-2 items-start text-left p-2 mt-1">
                    <div className="flex flex-col items-start w-full gap-1">
                      <div className="flex flex-col gap-2 items-start w-full">
                        <p className="text-xs text-stone-800">
                          {invoice?.seller?.name}
                        </p>
                        <p className="text-xs text-stone-800">
                          {invoice?.seller?.email}
                        </p>
                        <p className="text-stone-800 flex items-center gap-1">
                          <ReactCountryFlag
                            countryCode={invoice?.seller?.country?.value}
                          />{' '}
                          <span className="text-xs">
                            {invoice?.seller?.country?.label}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => handleView('cus')}
                className="w-full flex flex-col bg-white items-start text-left border border-gray-200 rounded-md p-2"
              >
                <div className="w-full flex items-center justify-between">
                  <p className="text-xs text-stone-800">Receiver</p>
                  {view === 'cus' ? (
                    <ChevronDown size={14} />
                  ) : (
                    <ChevronRight size={14} />
                  )}
                </div>

                <div
                  className={`transition-[max-height] duration-300 ease-in-out overflow-hidden w-full ${
                    view === 'cus' ? 'max-h-40' : 'max-h-0'
                  }`}
                >
                  <div className="w-full flex flex-col gap-2 items-start text-left p-2 mt-1">
                    <div className="w-full flex flex-col items-start gap-1">
                      <div className="flex flex-col gap-2 items-start w-full">
                        <p className="text-xs text-stone-800">
                          {invoice?.customer?.name}
                        </p>
                        <p className="text-xs text-stone-800">
                          {invoice?.customer?.email}
                        </p>
                        <p className="text-stone-800 flex items-center gap-1">
                          <ReactCountryFlag
                            countryCode={invoice?.customer?.country?.value}
                          />{' '}
                          <span className="text-xs">
                            {invoice?.customer?.country?.label}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
              <button
                type="button"
                disabled={invoice?.type === 'single'}
                onClick={() => setSeeTrx(!seeTrx)}
                className="w-full flex flex-col items-start border border-gray-200 rounded-md p-2 relative"
              >
                <Timeline
                  className="text-left ml-1 mt-2"
                  items={[
                    {
                      dot: <Send size={12} className="text-stone-800" />,
                      children: (
                        <p className="text-xs text-stone-800">
                          Invoice sent{' '}
                          <span className="font-semibold">
                            ${(trx?.amount / 100).toFixed(2)}
                          </span>
                        </p>
                      ),
                    },
                    {
                      dot: <Percent size={12} className="text-stone-800" />,
                      children: (
                        <p className="text-xs text-stone-800">
                          {taxType} added{' '}
                          <span className="font-semibold">
                            ${(trx?.tax?.amount / 100).toFixed(2)}
                          </span>
                        </p>
                      ),
                    },
                    {
                      dot: <CreditCard size={12} className="text-stone-800" />,
                      children: (
                        <p className="text-xs text-stone-800">
                          Paid after taxes{' '}
                          <span className="font-semibold">
                            $
                            {parseFloat(trx?.total / 100)?.toLocaleString(
                              undefined,
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )}
                          </span>
                        </p>
                      ),
                    },
                  ]}
                />
                {invoice?.type === 'recurring' ? (
                  <div className="absolute bottom-2 right-2">
                    <ChevronRight size={14} className="text-stone-800" />
                  </div>
                ) : (
                  ''
                )}
              </button>
            </div>
            <div className="w-full flex justify-between items-end">
              <div className="flex flex-col items-start">
                <p className="text-stone-600 text-xs">Total:</p>
                <p className="text-stone-800 text-sm font-semibold">
                  $
                  {parseFloat(trx?.total / 100)?.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <Tooltip
                arrow={false}
                style="light"
                content={<p className="text-stone-800 text-xs">Download PDF</p>}
              >
                {' '}
                <button
                  type="button"
                  //   onClick={handleMoveToPayment}
                  className="text-stone-800 rounded-md text-xs flex items-center justify-center"
                >
                  <Download size={14} />
                </button>
              </Tooltip>
            </div>
          </>
        )}
      </div>
      <div className="w-full bg-white border border-gray-200 rounded-md p-2 flex flex-col items-center text-center">
        <Link to="/">
          <p
            className="font-bold text-stone-800 dark:text-white text-sm flex items-center gap-1"
            style={{ fontFamily: 'Geist Mono' }}
          >
            <Layers size={16} className="font-black dark:text-white" />
            Bizvo
          </p>
        </Link>
        <p className="text-stone-800" style={{ fontSize: '11px' }}>
          Online Invoicing Made Easier
        </p>
      </div>
    </div>
  );
};

export default MobilePaid;
