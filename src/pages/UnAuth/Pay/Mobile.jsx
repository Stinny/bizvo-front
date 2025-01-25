import { Avatar, Badge, Spinner } from 'flowbite-react';
import React, { useState } from 'react';
import {
  AlertOctagon,
  Briefcase,
  ChevronDown,
  ChevronRight,
  Info,
  Layers,
  Send,
  User,
  XSquare,
  Percent,
} from 'react-feather';
import { Link } from 'react-router-dom';
import ReactCountryFlag from 'react-country-flag';
import moment from 'moment';
import { useUpdateInvoForPayMutation } from '../../../api/invoicesApiSlice';
import MobilePaid from './MobilePaid';
import Payment from './Payment/Payment';
import InvoStatus from '../../../components/InvoStatus';
import { Timeline } from 'antd';

const Mobile = ({
  data,
  invoId,
  refetch,
  currentUser,
  succ,
  setSucc,
  added,
  setAdded,
  customer,
}) => {
  const [view, setView] = useState('');
  const [readyForPayment, setReadyForPayment] = useState(false);
  const [updatingInvo, setUpdatingInvo] = useState(false);
  const [updatedInvo, setUpdatedInvo] = useState({});
  const [updatedTrx, setUpdatedTrx] = useState({});

  // const isOwner = data?.invoice?.sellerId === currentUser?._id;
  const isOwner = false;
  const interval = data?.invoice?.interval === 'weekly' ? '/week' : '/month';

  //hook for updating invo
  const [updateInvoForPay, { isLoading: updating }] =
    useUpdateInvoForPayMutation();

  const handleMoveToPayment = async () => {
    setUpdatingInvo(true);

    try {
      const updateReq = await updateInvoForPay({ invoiceId: invoId }).unwrap();

      if (updateReq?.msg === 'Tax added') {
        //need to do something with updateReq.invoice
        setUpdatedInvo(updateReq?.invoice);
        setUpdatedTrx(updateReq?.trx);
        setUpdatingInvo(false);
        setReadyForPayment(true);
      }
    } catch (err) {
      console.log(err);
      setUpdatingInvo(false);
      return;
    }
  };

  const handleView = (newView) => {
    if (newView === view) {
      setView('');
    } else {
      setView(newView);
    }
  };

  let taxType;
  switch (data?.trx?.tax?.type) {
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
  let trxItems = [
    {
      dot: <Send size={12} className="text-stone-800" />,
      children: (
        <p className="text-xs text-stone-800 pt-1">
          Invoice sent{' '}
          <span className="font-semibold">
            ${(data?.invoice?.amountInCents / 100).toFixed(2)}
          </span>
        </p>
      ),
    },
  ];

  if (data?.trx?.tax?.id) {
    trxItems.push({
      dot: <Percent size={12} className="text-stone-800" />,
      children: (
        <p className="text-xs text-stone-800">
          {taxType} added{' '}
          <span className="font-semibold">
            ${(data?.trx?.tax?.amount / 100).toFixed(2)}
          </span>
        </p>
      ),
    });
    trxItems.push({
      dot: <Spinner size="xs" />,
      children: <p className="text-xs text-stone-800 pt-1">Awaiting payment</p>,
    });
  } else {
    trxItems.push({
      dot: <Spinner size="xs" />,
      children: (
        <p className="text-xs text-stone-800 pt-1">
          Awaiting payment and taxes
        </p>
      ),
    });
  }

  let content;

  if (data?.msg === 'Not found' || data?.msg === 'Invalid token') {
    content = (
      <div className="mx-auto flex flex-col gap-2 items-start mt-16 w-full p-4">
        <div className="w-full bg-white border border-gray-200 rounded-md flex flex-col gap-2 items-center justify-center h-72">
          <AlertOctagon size={16} className="text-red-400" />
          <div className="flex flex-col items-center text-center gap-2">
            <p className="text-stone-800 text-xs">#{invoId}</p>
            <p className="text-stone-800 text-xs font-semibold">
              Invoice does not exist
            </p>
          </div>
        </div>
        <div className="w-full bg-white border border-gray-200 rounded-md p-2 flex flex-col items-center text-center">
          <Link to="/" className="h-full flex gap-1">
            <Layers size={18} className="font-black" />
            <p
              className="font-bold text-stone-800 text-sm"
              style={{ fontFamily: 'Space Mono, monospace' }}
            >
              Bizvo
            </p>
          </Link>
          <p className="text-stone-800" style={{ fontSize: '11px' }}>
            Online Invoicing Made Easier
          </p>
        </div>
      </div>
    );
  } else if (data?.msg === 'Found') {
    content =
      data?.invoice?.status === 'paid' || data?.invoice?.status === 'live' ? (
        <MobilePaid
          invoice={data?.invoice}
          trx={data?.trx}
          trxs={data?.trxs}
          currentUser={currentUser}
          succ={succ}
          setSucc={setSucc}
          added={added}
          setAdded={setAdded}
          customer={data?.customer}
          refetch={refetch}
        />
      ) : (
        <>
          {updatingInvo || updating ? (
            <div className="mx-auto flex flex-col items-center justify-center h-72 mt-16">
              <Spinner />
            </div>
          ) : (
            <div className="flex flex-col gap-2 items-start w-full p-4">
              <div className="w-full flex justify-center items-center text-center">
                {data?.invoice?.status === 'void' ? (
                  <p
                    className="text-stone-800 font-medium"
                    style={{ fontSize: '11px' }}
                  >
                    Canceled on{' '}
                    {moment(data?.invoice?.canceledOn).format('MMMM Do, YYYY')}
                  </p>
                ) : (
                  <p
                    className="text-stone-800 font-medium"
                    style={{ fontSize: '11px' }}
                  >
                    Due by{' '}
                    {moment(data?.invoice?.dueDate).format('MMMM Do, YYYY')}
                  </p>
                )}
              </div>
              <div className="w-full bg-white border border-gray-200 rounded-md flex flex-col gap-4 items-start p-2">
                <div className="w-full flex justify-between items-start">
                  <div className="flex flex-col items-start">
                    <p className="text-stone-800 text-sm">
                      {data?.invoice?.type === 'single'
                        ? 'Invoice'
                        : 'Recurring Invoice'}
                    </p>
                    <p className="text-stone-800 text-xs">#{invoId}</p>
                  </div>
                  <InvoStatus status={data?.invoice?.status} />
                </div>
                <div className="w-full grid grid-cols-7">
                  <div className="flex items-center justify-start">
                    <Avatar size="md" img={data?.invoice?.seller?.logo} />
                  </div>
                  <div className="flex flex-col items-start col-span-6">
                    <p className="text-stone-800 text-sm text-left">
                      {data?.invoice?.title}
                    </p>
                    <p className="text-stone-600 text-xs text-left">
                      {data?.invoice?.description}
                    </p>
                  </div>
                </div>
                {readyForPayment ? (
                  <Payment
                    setReadyForPayment={setReadyForPayment}
                    invoice={updatedInvo}
                    trx={updatedTrx}
                    refetch={refetch}
                    setSucc={setSucc}
                  />
                ) : (
                  <>
                    <div className="flex flex-col gap-2 items-start w-full">
                      <button
                        type="button"
                        onClick={() => handleView('bus')}
                        className="w-full flex flex-col bg-white items-start text-left border border-gray-200 rounded-md p-2"
                      >
                        <div className="w-full flex items-center justify-between">
                          <p className="text-xs text-stone-800">Participants</p>

                          {view === 'bus' ? (
                            <ChevronDown size={14} />
                          ) : (
                            <ChevronRight size={14} />
                          )}
                        </div>

                        <div
                          className={`transition-[max-height] duration-300 ease-in-out overflow-hidden w-full ${
                            view === 'bus' ? 'max-h-fit' : 'max-h-0'
                          }`}
                        >
                          <div className="w-full flex flex-col gap-4 items-start text-left p-2 mt-1">
                            <div className="flex flex-col items-start w-full gap-1">
                              <p className="text-xs text-stone-800 font-medium">
                                Sender
                              </p>
                              <div className="flex flex-col gap-1 items-start w-full">
                                <p className="text-xs text-stone-800">
                                  {data?.invoice?.seller?.name}
                                </p>
                                <p className="text-xs text-stone-800">
                                  {data?.invoice?.seller?.email}
                                </p>
                                <p className="text-stone-800 flex items-center gap-1">
                                  <span className="text-xs">
                                    {data?.invoice?.seller?.country?.label}
                                  </span>
                                </p>
                              </div>
                            </div>
                            <div className="w-full flex flex-col items-start gap-1">
                              <p className="text-xs text-stone-800 font-medium">
                                Receiver
                              </p>
                              <div className="flex flex-col gap-1 items-start w-full">
                                <p className="text-xs text-stone-800">
                                  {data?.invoice?.customer?.name}
                                </p>
                                <p className="text-xs text-stone-800">
                                  {data?.invoice?.customer?.email}
                                </p>
                                <p className="text-stone-800 flex items-center gap-1">
                                  <span className="text-xs">
                                    {data?.invoice?.customer?.country?.label}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </button>
                      <div className="w-full flex flex-col items-start border border-gray-200 rounded-md p-2 relative">
                        <Timeline
                          className="text-left ml-1 mt-2"
                          items={trxItems}
                        />
                      </div>
                    </div>

                    {data?.invoice?.status === 'void' ? (
                      <div className="w-full flex flex-col items-center justify-center h-16 border border-gray-200 rounded-md bg-gray-50">
                        <XSquare size={14} className="text-red-400" />
                        <p className="text-stone-800 text-xs">
                          Invoice was canceled
                        </p>
                      </div>
                    ) : (
                      <div className="w-full flex justify-between items-end">
                        <div className="flex flex-col items-start">
                          <p className="text-stone-800 text-xs">Amount:</p>
                          <p className="text-stone-800 text-sm font-semibold">
                            $
                            {parseFloat(
                              data?.trx?.amount / 100
                            )?.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                            {data?.invoice?.type === 'recurring' ? (
                              <span
                                className="text-xs"
                                style={{ fontSize: '11px' }}
                              >
                                {interval}
                              </span>
                            ) : (
                              ''
                            )}
                          </p>
                        </div>
                        {readyForPayment ? (
                          ''
                        ) : (
                          <button
                            type="button"
                            onClick={handleMoveToPayment}
                            className="p-1 pl-2 pr-2 border border-stone-800 text-stone-800 rounded-md text-xs"
                            disabled={isOwner || updating}
                          >
                            Pay Now
                          </button>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="w-full bg-white border border-gray-200 rounded-md p-2 flex flex-col items-center text-center mb-12">
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
          )}
        </>
      );
  }

  return content;
};

export default Mobile;
