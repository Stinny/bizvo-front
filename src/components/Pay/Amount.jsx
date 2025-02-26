import { Dropdown } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react';
import { AlignRight, Clock, CreditCard, MoreVertical } from 'react-feather';

const Amount = ({ handleMoveToPayment, updating, invoice, setView, trx }) => {
  const interval = invoice?.interval === 'weekly' ? '/week' : '/month';
  let isLive;

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setOpen((prev) => !prev);
  };

  //for handling when a user clicks away from the dropdown menu
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false); // Close the dropdown if clicking outside
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  switch (invoice?.status) {
    case 'live':
      isLive = true;
      break;
    case 'paid':
      isLive = true;
      break;
    case 'void':
      isLive = true;
      break;
    default:
      break;
  }

  //handlemove to payment needs to set
  //a view or something to differetiate between
  //new payment, exisiting payment, adding new payment

  return (
    <div className="w-full flex justify-between items-end relative">
      {invoice?.status === 'paid' ? (
        <div className="flex flex-col items-start">
          <p className="text-stone-800 text-xs">Total</p>
          <p className="text-stone-800 text-sm font-medium">
            $
            {parseFloat(trx?.total / 100)?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            {invoice?.type === 'recurring' ? (
              <span className="font-medium" style={{ fontSize: '10px' }}>
                {interval}
              </span>
            ) : (
              ''
            )}
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-start">
          <p className="text-stone-800 text-xs">Amount</p>
          <p className="text-stone-800 text-sm font-medium">
            $
            {parseFloat(invoice?.amount)?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            {invoice?.type === 'recurring' ? (
              <span className="font-medium" style={{ fontSize: '10px' }}>
                {interval}
              </span>
            ) : (
              ''
            )}
          </p>
        </div>
      )}

      {isLive ? (
        <>
          {' '}
          <AlignRight
            size={16}
            onClick={toggleDropdown}
            className="text-stone-800 hover:cursor-pointer"
          />
          {open ? (
            <div
              ref={dropdownRef}
              className="w-full flex justify-end absolute top-full z-50 right-0"
            >
              <div className="bg-white border border-gray-200 rounded-md flex flex-col items-center gap-2 p-2">
                <button
                  type="button"
                  onClick={() => setView('trxs')}
                  className="w-full flex items-center gap-2 text-xs text-stone-800 hover:bg-white p-1"
                >
                  <Clock size={12} className="text-stone-800" />
                  History
                </button>
                <button
                  type="button"
                  onClick={() => setView('paymeth')}
                  className="w-full flex items-center gap-2 text-xs text-stone-800 hover:bg-white p-1"
                >
                  <CreditCard size={12} className="text-stone-800" />
                  Payment
                </button>
              </div>
            </div>
          ) : (
            ''
          )}
        </>
      ) : (
        <button
          type="button"
          onClick={handleMoveToPayment}
          className="p-2 pl-2.5 pr-2.5 border border-stone-800 text-stone-800 rounded-md text-xs font-medium"
          // disabled={isOwner || updating}
          disabled={updating}
        >
          Pay Now
        </button>
      )}
    </div>
  );
};

export default Amount;
