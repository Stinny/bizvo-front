import { Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import {
  AlertOctagon,
  CheckCircle,
  ChevronRight,
  ExternalLink,
  FileText,
  Send,
  Users,
  X,
  XSquare,
} from 'react-feather';
import Modal from 'react-modal';
import DateFormat from './DateFormat';
import { Link } from 'react-router-dom';

const customStyles = {
  content: {
    top: '30%',
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
  let evIcon;

  switch (even?.type) {
    case 'sent':
      evIcon = <Send size={12} className="text-stone-800" />;
      break;
    case 'cancel':
      evIcon = <XSquare size={12} className="text-red-400" />;
      break;
    case 'paid':
      evIcon = <CheckCircle size={12} className="text-green-400" />;
      break;
    case 'fail':
      evIcon = <AlertOctagon size={12} className="text-red-400" />;
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
      <div className="w-80 flex flex-col gap-2 items-start relative">
        <div className="w-full flex items-start justify-between">
          <div className="flex gap-1">
            <div className="flex flex-col items-start">
              <p className="text-sm text-stone-800">Viewing Event</p>

              <p className="text-xs text-stone-800">{even?._id}</p>
            </div>
          </div>
          <X
            size={16}
            className="text-red-400 hover:cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>
        <div className="flex flex-col items-start w-full">
          <p className="text-xs text-stone-800 font-medium">When</p>
          <p className="text-stone-800 text-xs dark:text-white">
            <DateFormat createdAt={even?.createdAt} />
          </p>
        </div>
        <div className="flex flex-col items-start w-full">
          <p className="text-xs text-stone-800 font-medium">Details</p>

          {even?.type === 'paid' ? (
            <p className="text-stone-800 dark:text-white text-xs">
              Invoice was paid{' '}
              <span className="font-medium">
                $
                {parseFloat(even?.amount / 100)?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </p>
          ) : even?.type === 'cancel' ? (
            <p className="text-stone-800 dark:text-white text-xs">
              Invoice was canceled
            </p>
          ) : (
            <p className="text-stone-800 dark:text-white text-xs">
              Invoice is overdue
            </p>
          )}
        </div>
        <Link
          to={`/dashboard/invoices/${even?.invoiceId}`}
          className="w-full flex items-center justify-between border border-gray-200 hover:border-stone-800 rounded-md p-2"
        >
          <div className="flex flex-col items-start">
            <p className="text-xs text-stone-800 flex items-center gap-1">
              <FileText size={12} />
              Invoice
            </p>
          </div>
          <ChevronRight size={12} className="text-stone-800" />
        </Link>
      </div>
    </Modal>
  );
};

export default EvModal;
