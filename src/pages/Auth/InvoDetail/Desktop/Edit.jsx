import React, { useEffect, useRef, useState } from 'react';
import {
  AlertOctagon,
  ChevronDown,
  ChevronRight,
  Save,
  Send,
  Trash,
} from 'react-feather';
import Modal from 'react-modal';
import moment from 'moment';
import { useDeleteInvoiceMutation } from '../../../../api/invoicesApiSlice';
import { showNotification } from '../../../../api/toastSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Badge, Datepicker, Spinner, Tooltip } from 'flowbite-react';
import { Checkbox } from 'antd';
import Cookies from 'js-cookie';
import EditDraft from './EditDraft';
import { dateTheme } from '../../../../utils/dateTheme';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    fontFamily: 'Space Mono',
    zIndex: 1000,
  },
  overlay: { zIndex: 1000 },
};
Modal.setAppElement('#root');

const Edit = ({
  handleSaveEdits,
  custOpts,
  invoiceId,
  customer,
  setCustomer,
  title,
  setTitle,
  desc,
  setDesc,
  amount,
  setAmount,
  dueDate,
  setDueDate,
  error,
  invoice,
  send,
  setSend,
  confirmMod,
  setConfirmMod,
  modalConfirmHandler,
}) => {
  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [del, setDel] = useState(false);
  const [delErr, setDelErr] = useState('');
  const [viewCust, setViewCust] = useState(false);

  //hook for invoice delete API call
  const [deleteInvoice, { isLoading }] = useDeleteInvoiceMutation();

  const handleDeleteInvo = async () => {
    try {
      const deleteInvoReq = await deleteInvoice({
        invoiceId: invoiceId,
      }).unwrap();

      if (deleteInvoReq === 'Invoice deleted') {
        dispatch(showNotification('Invoice deleted'));
        navigate('/dashboard/invoices');
      }
    } catch (err) {
      setDelErr('Server error');
      return;
    }
  };

  //for date picker
  const [selDate, setSelDate] = useState(false);
  const datepickerRef = useRef(null);

  //date picker min date
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const handleSetDate = (date) => {
    setDueDate(date);
    setSelDate(false);
  };

  // Handle clicks outside of the Datepicker
  const handleClickOutside = (event) => {
    if (
      datepickerRef.current &&
      !datepickerRef.current.contains(event.target)
    ) {
      setSelDate(false); // Hide Datepicker when clicking outside
    }
  };

  useEffect(() => {
    // Add event listener when the Datepicker is visible
    if (selDate) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selDate]);

  return (
    <div className="w-10/12 bg-white border rounded-md border-gray-200 p-2 pb-6 flex flex-col gap-6 items-start">
      <Modal
        isOpen={del}
        onRequestClose={() => setDel(false)}
        style={customStyles}
        contentLabel="Delete modal"
      >
        {isLoading ? (
          <div className="w-72 h-52 flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="w-72 flex flex-col gap-4 items-start">
            <div className="flex flex-col items-start">
              <p className="text-sm text-stone-800">Invoice: {invoiceId}</p>
              <p className="text-xs text-stone-700">
                Are you sure you want to delete this invoice?
              </p>
            </div>
            <div className="flex flex-col gap-2 items-start w-full">
              <div className="flex flex-col items-start w-full">
                <p className="text-xs text-stone-700">Customer</p>
                <button
                  type="button"
                  onClick={() => setViewCust(!viewCust)}
                  className="w-full flex flex-col bg-gray-50 items-start text-left border border-gray-50 rounded-md p-2"
                >
                  <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-stone-800">
                        {invoice?.customer?.name}
                      </p>
                    </div>
                    {viewCust ? (
                      <ChevronDown size={14} />
                    ) : (
                      <ChevronRight size={14} />
                    )}
                  </div>

                  <div
                    className={`transition-[max-height] duration-300 ease-in-out overflow-hidden ${
                      viewCust ? 'max-h-40' : 'max-h-0'
                    }`}
                  >
                    <p className="text-xs text-stone-800 mt-4">
                      {invoice?.customer?.email}
                    </p>
                    <p className="text-xs text-stone-800 mt-2">
                      {invoice?.customer?.country?.label}
                    </p>
                  </div>
                </button>
              </div>
              <div className="w-full flex items-center justify-center gap-2">
                <div className="flex flex-col items-start w-4/12 gap-1">
                  <p className="text-xs text-stone-600">Amount</p>
                  <div className="w-full flex items-center gap-0.5">
                    <p className="text-sm text-stone-800">$</p>
                    <input
                      type="text"
                      placeholder="Amount"
                      className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2 pl-0"
                      disabled
                      value={amount}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-start w-8/12 gap-1">
                  <p className="text-xs text-stone-600">Due By</p>
                  <input
                    type="text"
                    placeholder="Due Date"
                    className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2"
                    disabled
                    value={`${moment(dueDate).format('MMMM D, YYYY')}`}
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex items-center justify-end">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className=" text-stone-800 rounded-md border border-stone-800 p-1 text-xs"
                  onClick={() => setDel(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="border border-red-400 text-red-400 rounded-md p-1 text-xs"
                  onClick={handleDeleteInvo}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <div className="w-full flex items-center justify-between relative">
        <div className="flex flex-col items-start">
          <p className="text-sm text-stone-800">Editing Invoice</p>
          <p className="text-xs text-stone-700">#{invoiceId}</p>
        </div>

        <div className="flex items-center justify-center gap-3 w-44">
          {invoice?.paid ? (
            <Badge size="xs" color="success">
              Paid
            </Badge>
          ) : (
            <>
              {invoice?.sent ? (
                <Badge size="xs" color="pink">
                  Unpaid
                </Badge>
              ) : (
                <Badge size="xs" color="info">
                  Draft
                </Badge>
              )}
            </>
          )}

          {invoice?.sent ? (
            <button
              type="button"
              disabled
              className="p-0.5 pl-1 pr-1  text-xs  text-stone-800 flex items-center justify-center gap-1"
            >
              <Send size={12} />
              Sent
            </button>
          ) : (
            ''
          )}
        </div>

        <div className="flex items-center justify-end w-24 gap-3"></div>
        <div className="flex items-center justify-end w-24 gap-3 absolute top-0 right-0 mr-1 mt-1">
          <button
            type="button"
            onClick={() => setDel(!del)}
            className="text-red-400 font-bold"
          >
            <Trash size={16} />
          </button>

          <button
            type="button"
            onClick={handleSaveEdits}
            className="text-stone-800"
          >
            <Save size={16} />
          </button>
        </div>
      </div>

      {invoice?.sent ? (
        <div className="flex items-center justify-center w-72 mx-auto">
          <div className="flex flex-col gap-4 w-full items-start">
            <div className="flex flex-col items-start w-full gap-1">
              <p className="text-xs text-stone-600">Customer</p>
              <button
                type="button"
                onClick={() => setViewCust(!viewCust)}
                className="w-full flex flex-col bg-gray-50 items-start text-left border border-gray-50 rounded-md p-2"
              >
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-stone-800">
                      {invoice?.customer?.name}
                    </p>
                  </div>
                  {viewCust ? (
                    <ChevronDown size={14} />
                  ) : (
                    <ChevronRight size={14} />
                  )}
                </div>

                <div
                  className={`transition-[max-height] duration-300 ease-in-out overflow-hidden ${
                    viewCust ? 'max-h-40' : 'max-h-0'
                  }`}
                >
                  <p className="text-xs text-stone-800 mt-4">
                    {invoice?.customer?.email}
                  </p>
                  <p className="text-xs text-stone-800 mt-2">
                    {invoice?.customer?.country?.label}
                  </p>
                </div>
              </button>
            </div>
            <div className="flex flex-col items-start w-full gap-1">
              <p className="text-xs text-stone-600">Title</p>
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Title"
                  className="border text-xs border-gray-200 bg-gray-50 focus:border-gray-200 focus:outline-none text-stone-800 hover:bg-gray-200 hover:border-gray-200 focus:bg-gray-200 focus:ring-0 w-full rounded-md p-2 pr-10"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  maxLength={25}
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <p className="text-stone-700" style={{ fontSize: '10px' }}>
                    {title?.length}/25
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start w-full gap-1">
              <p className="text-xs text-stone-600">Description</p>
              <textarea
                placeholder="What is this invoice for.."
                className="border border-gray-200 hover:border-gray-200 hover:bg-gray-200 focus:bg-gray-200 focus:border-gray-200 focus:ring-0 w-full h-16 rounded-md p-2 bg-gray-50 resize-none text-xs"
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
              />
            </div>
            <div className="w-full flex items-center justify-center gap-2">
              <div className="flex flex-col items-start w-4/12 gap-1">
                <p className="text-xs text-stone-600">Amount</p>
                <div className="w-full flex items-center gap-0.5">
                  <p className="text-sm text-stone-800">$</p>
                  <input
                    type="text"
                    placeholder="Amount"
                    className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2 pl-0"
                    disabled
                    value={parseFloat(amount)?.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  />
                </div>
              </div>
              <div className="flex flex-col items-start w-8/12 gap-1">
                <p className="text-xs text-stone-600">Due By</p>
                <div className="relative w-full">
                  <button
                    type="button"
                    onClick={() => setSelDate(!selDate)}
                    className="text-xs w-full flex items-center justify-start bg-gray-50 border border-gray-200 focus:outline-none hover:bg-gray-200 focus:bg-gray-200 hover:border-gray-200 focus:border-gray-200 focus:ring-0 text-stone-800 ring-0 rounded-md p-2"
                  >
                    {dueDate
                      ? moment(dueDate).format('MMMM D, YYYY')
                      : 'Due date'}
                  </button>
                  {selDate ? (
                    <div ref={datepickerRef} className="absolute">
                      <Datepicker
                        theme={dateTheme}
                        minDate={tomorrow}
                        onChange={(date) => handleSetDate(date)}
                        value={dueDate}
                        onMouseOut={() => setSelDate(false)}
                        inline
                      />
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
            {invoice?.sent ? (
              ''
            ) : (
              <div className="flex items-center justify-start w-full">
                {!currentUser?.bankAdded && !currentUser?.stripeOnboard ? (
                  <Tooltip
                    content={
                      <p className="text-xs text-stone-800 text-left">
                        Connect a payout option before sending invoices
                      </p>
                    }
                    style="light"
                    className="w-52"
                    arrow={false}
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox disabled />
                      <p className="text-xs text-stone-800">Send to customer</p>
                    </div>
                  </Tooltip>
                ) : (
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={send}
                      onChange={(e) => setSend(e.target.checked)}
                    />
                    <p className="text-xs text-stone-800">Send to customer</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <EditDraft
          custOpts={custOpts}
          customer={customer}
          setCustomer={setCustomer}
          amount={amount}
          setAmount={setAmount}
          title={title}
          setTitle={setTitle}
          desc={desc}
          setDesc={setDesc}
          dueDate={dueDate}
          setDueDate={setDueDate}
          handleSaveEdits={handleSaveEdits}
          error={error}
          send={send}
          setSend={setSend}
          currentUser={currentUser}
          confirmMod={confirmMod}
          setConfirmMod={setConfirmMod}
          modalConfirmHandler={modalConfirmHandler}
        />
      )}
    </div>
  );
};

export default Edit;
