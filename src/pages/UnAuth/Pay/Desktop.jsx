import { Avatar, Badge, Spinner } from 'flowbite-react';
import React, { useState } from 'react';
import {
  AlertOctagon,
  Briefcase,
  ChevronDown,
  ChevronRight,
  Info,
  Layers,
  User,
} from 'react-feather';
import { Link } from 'react-router-dom';
import Payment from './Payment/Payment';
import Paid from './Paid';
import ReactCountryFlag from 'react-country-flag';
import moment from 'moment';
import { useUpdateInvoForPayMutation } from '../../../api/invoicesApiSlice';

const Desktop = ({ data, invoId, refetch, currentUser, succ, setSucc }) => {
  const [view, setView] = useState('');
  const [readyForPayment, setReadyForPayment] = useState(false);
  const [updatingInvo, setUpdatingInvo] = useState(false);
  const [updatedInvo, setUpdatedInvo] = useState({});

  // const isOwner = data?.invoice?.sellerId === currentUser?._id;
  const isOwner = false;

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

  let content;

  if (data?.msg === 'Not found' || data?.msg === 'Invalid token') {
    content = (
      <div
        className="mx-auto flex flex-col gap-2 items-start mt-16"
        style={{ width: '370px' }}
      >
        <div className="w-full bg-white border border-gray-200 rounded-md flex flex-col gap-2 items-center justify-center h-72">
          <AlertOctagon size={16} className="text-red-400" />
          <div className="flex flex-col items-center text-center gap-2">
            <p className="text-stone-800 text-xs">#{invoId}</p>
            <p className="text-stone-800 text-xs font-bold">
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
    content = data?.invoice?.paid ? (
      <Paid
        invoice={data?.invoice}
        currentUser={currentUser}
        succ={succ}
        setSucc={setSucc}
      />
    ) : (
      <>
        {updatingInvo || updating ? (
          <div
            className="mx-auto flex flex-col items-center justify-center h-72 mt-16"
            style={{ width: '370px' }}
          >
            <Spinner />
          </div>
        ) : (
          <div
            className="mx-auto flex flex-col gap-2 items-start mt-16"
            style={{ width: '370px' }}
          >
            <div className="w-full flex justify-center items-center text-center">
              <p className="text-stone-900" style={{ fontSize: '12px' }}>
                Due by {moment(data?.invoice?.dueDate).format('MMMM Do, YYYY')}
              </p>
            </div>
            {isOwner ? (
              <div className="w-full flex items-center justify-start gap-2 border border-gray-200 bg-white rounded-md p-2">
                <Info size={14} className="text-blue-400" />
                <p className="text-xs text-stone-800">
                  Created by you, payment unavailable!
                </p>
              </div>
            ) : (
              ''
            )}
            <div className="w-full bg-white border border-gray-200 rounded-md flex flex-col gap-4 items-start p-2">
              <div className="w-full flex justify-between items-start">
                <div className="flex flex-col items-start">
                  <p className="text-stone-800 text-sm">Invoice</p>
                  <p className="text-stone-600 text-xs">#{invoId}</p>
                </div>
                <Badge size="xs" color="pink">
                  Unpaid
                </Badge>
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
                        <div className="flex items-center gap-1">
                          <Briefcase size={16} className="text-stone-800" />
                          <p className="text-xs text-stone-800">Business</p>
                        </div>
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
                          <div className="w-full flex flex-col gap-1 items-start">
                            <div className="flex flex-col gap-2 items-start w-full">
                              <p className="text-xs text-stone-800">
                                {data?.invoice?.seller?.name}
                              </p>
                              <p className="text-xs text-stone-800">
                                {data?.invoice?.seller?.email}
                              </p>
                              <p className="text-stone-800 flex items-center gap-1">
                                <ReactCountryFlag
                                  countryCode={
                                    data?.invoice?.seller?.country?.value
                                  }
                                />{' '}
                                <span className="text-xs">
                                  {data?.invoice?.seller?.country?.label}
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
                        <div className="flex items-center gap-1">
                          <User size={16} className="text-stone-800" />
                          <p className="text-xs text-stone-800">Customer</p>
                        </div>
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
                          <div className="flex flex-col gap-1 items-start w-full">
                            <div className="flex flex-col items-start gap-2 w-full">
                              <p className="text-xs text-stone-800">
                                {data?.invoice?.customer?.name}
                              </p>
                              <p className="text-xs text-stone-800">
                                {data?.invoice?.customer?.email}
                              </p>
                              <p className="text-stone-800 flex items-center gap-1">
                                <ReactCountryFlag
                                  countryCode={
                                    data?.invoice?.customer?.country?.value
                                  }
                                />{' '}
                                <span className="text-xs">
                                  {data?.invoice?.customer?.country?.label}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                  <div className="w-full flex justify-between items-end">
                    <div className="flex flex-col items-start">
                      <p className="text-stone-600 text-xs">Amount:</p>
                      {/* <p className="text-stone-800 text-sm font-bold">
                        ${data?.invoice?.amount?.toFixed(2)}
                      </p> */}
                      <p className="text-stone-800 text-sm font-semibold">
                        $
                        {parseFloat(data?.invoice?.amount)?.toLocaleString(
                          undefined,
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )}
                      </p>
                    </div>
                    {readyForPayment ? (
                      ''
                    ) : (
                      <button
                        type="button"
                        onClick={handleMoveToPayment}
                        className="p-2 border border-stone-800 text-stone-800 rounded-md text-xs"
                        disabled={isOwner || updating}
                      >
                        Pay Now
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
            <div className="w-full bg-white border border-gray-200 rounded-md p-2 flex flex-col items-center text-center mb-12">
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
        )}
      </>
    );
  }

  return content;
};

export default Desktop;
