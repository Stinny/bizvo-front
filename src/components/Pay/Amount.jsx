import { Dropdown } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react';
import {
  AlignRight,
  Clock,
  CreditCard,
  Download,
  MoreVertical,
} from 'react-feather';

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
    case 'pending':
      isLive = true;
      break;
    default:
      isLive = false;
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

      {invoice?.status === 'paid' ? (
        <div className="relative">
          <Download size={16} className="text-stone-800" />
        </div>
      ) : (
        ''
      )}

      {isLive ? (
        <button
          type="button"
          onClick={handleMoveToPayment}
          className="p-2 pl-2.5 pr-2.5 border border-stone-800 text-stone-800 rounded-sm cursor-pointer text-xs font-medium"
          // disabled={isOwner || updating}
          disabled={updating}
        >
          Pay Now
        </button>
      ) : (
        ''
      )}
    </div>
  );
};

export default Amount;
