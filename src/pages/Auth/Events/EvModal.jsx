import { Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import {
  AlertOctagon,
  ChevronRight,
  ExternalLink,
  FileText,
  Users,
  X,
} from 'react-feather';
import Modal from 'react-modal';
import DateFormat from './DateFormat';
import { Link } from 'react-router-dom';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    fontFamily: 'Geist',
    padding: '8px',
  },
};
Modal.setAppElement('#root');

const EvModal = ({ open, setOpen, even }) => {
  let evTxt;

  switch (even?.type) {
    case 'sent':
      evTxt = 'Invoice was sent';
      break;
    case 'create':
      evTxt =
        even?.source === 'invoice'
          ? 'Invoice was created'
          : 'Customer was created';
      break;
    case 'edit':
      evTxt =
        even?.source === 'invoice'
          ? 'Invoice was updated'
          : 'Customer was updated';
      break;
    case 'cancel':
      evTxt = 'Invoice was canceled';
      break;
    case 'paid':
      evTxt = (
        <span className="font-medium">${(even?.value / 100).toFixed(2)}</span>
      );

      break;
    default:
      break;
  }

  return (
    <Modal
      isOpen={open}
      onRequestClose={() => setOpen(false)}
      style={customStyles}
      contentLabel="Event modal"
    >
      <div className="w-80 flex flex-col gap-3 items-start relative">
        <div className="w-full flex items-start justify-between">
          <div className="flex gap-1">
            <div className="flex flex-col items-start">
              <p className="text-sm text-stone-800">Viewing Event</p>

              <p className="text-xs text-stone-700">#{even?._id}</p>
            </div>
          </div>
          <X
            size={16}
            className="text-red-400 hover:cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>
        <div className="flex flex-col items-start gap-1 w-full">
          <p className="text-xs text-stone-800 font-medium">When</p>
          <p className="text-stone-800 text-xs dark:text-white">
            <DateFormat createdAt={even?.createdAt} />
          </p>
        </div>
        <div className="flex flex-col items-start gap-1 w-full">
          <p className="text-xs text-stone-800 font-medium">Details</p>

          {even?.type === 'paid' ? (
            <p className="text-stone-800 dark:text-white text-xs">
              Invoice was paid {evTxt}
            </p>
          ) : (
            <p className="text-stone-800 dark:text-white text-xs">{evTxt}</p>
          )}
          {even?.source === 'invoice' ? (
            <Link
              to={`/dashboard/invoices/${even?.invoiceId}`}
              state={{ tab: 2 }}
              className="w-full flex items-center justify-between border border-gray-200 rounded-md p-2"
            >
              <div className="flex flex-col items-start">
                <p className="text-xs text-stone-800 flex items-center gap-1">
                  <FileText size={12} />
                  Invoice
                </p>
                <p className="text-stone-800" style={{ fontSize: '11px' }}>
                  #{even?.invoiceId}
                </p>
              </div>
              <ChevronRight size={12} className="text-stone-800" />
            </Link>
          ) : (
            <Link
              to={`/dashboard/customers/${even?.customerId}`}
              className="w-full flex items-center justify-between border border-gray-200 rounded-md p-2"
            >
              <div className="flex flex-col items-start">
                <p className="text-xs text-stone-800 flex items-center gap-1">
                  <Users size={12} />
                  Customer
                </p>
                <p className="text-stone-800" style={{ fontSize: '11px' }}>
                  #{even?.customerId}
                </p>
              </div>
              <ChevronRight size={12} className="text-stone-800" />
            </Link>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default EvModal;
