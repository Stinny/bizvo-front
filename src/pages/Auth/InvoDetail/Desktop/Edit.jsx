import React, { useEffect, useRef, useState } from 'react';
import {
  AlertOctagon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  ExternalLink,
  Repeat,
  Save,
  Send,
  Trash,
  X,
} from 'react-feather';
import Modal from 'react-modal';
import moment from 'moment';
import { useDeleteInvoiceMutation } from '../../../../api/invoicesApiSlice';
import { showNotification } from '../../../../api/toastSlice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Badge, Datepicker, Spinner, Tooltip } from 'flowbite-react';
import { Checkbox } from 'antd';
import Cookies from 'js-cookie';
import { dateTheme } from '../../../../utils/dateTheme';
import BackBtn from '../../../../components/BackBtn';
import InvoStatus from '../../../../components/InvoStatus';
import DeleteModal from '../../../../components/Invoices/DeleteModal';
import { NumericFormat } from 'react-number-format';
import Select from 'react-select';

const customStyles = {
  content: {
    top: '30%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    fontFamily: 'Geist',
    zIndex: 1000,
    padding: '8px',
  },
  overlay: { zIndex: 1000 },
};
Modal.setAppElement('#root');

const Edit = ({
  handleSaveEdits,
  handleCancelEdits,
  setEdit,
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
  type,
  setType,
  int,
  setInt,
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
  const [viewCust, setViewCust] = useState(false);

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
    <div className="w-full bg-white border rounded-md border-gray-200 p-2 pb-6 flex flex-col gap-6 items-start">
      <DeleteModal invoId={invoice?._id} open={del} setOpen={setDel} />
      <Modal
        isOpen={confirmMod}
        onRequestClose={() => setConfirmMod(false)}
        style={customStyles}
        contentLabel="Send invo confirm modal"
      >
        <div className="w-80 flex flex-col gap-2 items-start">
          <div className="w-full flex items-start justify-between">
            <div className="flex flex-col items-start">
              <p className="text-sm text-stone-800">Sending Invoice</p>
              <p className="text-xs text-stone-800">
                Are you sure you want to send?
              </p>
            </div>
            <X
              size={14}
              className="text-red-400 hover:cursor-pointer"
              onClick={() => setConfirmMod(false)}
            />
          </div>
          <div className="flex flex-col items-start gap-2 w-full">
            <div className="w-full text-left flex items-center gap-1 p-2 border border-gray-200 rounded-md">
              <AlertOctagon size={16} className="text-red-400" />
              <p className="text-xs text-stone-800">Permanent action</p>
            </div>
            <p className="text-xs text-stone-800">
              Limited edits can be made once sent. A payment link will be sent
              to the customer.
            </p>
          </div>
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Checkbox
                checked={send}
                onChange={(e) => setSend(e.target.checked)}
              />
              <p className="text-xs text-stone-800">Send to customer</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className=" text-stone-800 rounded-sm border cursor-pointer border-stone-800 p-1 pl-2 pr-2 text-xs"
                onClick={modalConfirmHandler}
                disabled={!send}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <div className="w-full flex items-center justify-between relative">
        <div className="flex flex-col items-start">
          <p className="text-sm text-stone-800">Editing Invoice</p>

          <p className="text-xs text-stone-800">{invoice?._id}</p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <InvoStatus status={invoice?.status} full={true} />
        </div>
        <div className="w-24"></div>
        <div className="flex gap-1 absolute top-0 right-0 mr-1 mt-1">
          <button
            type="button"
            onClick={handleCancelEdits}
            className="cursor-pointer flex items-center justify-center border border-stone-800 dark:border-white rounded-sm p-1"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            type="button"
            onClick={handleSaveEdits}
            className="w-full cursor-pointer flex items-center justify-center gap-1 border border-stone-800 dark:border-white rounded-sm p-0.5 pl-1.5 pr-1.5"
          >
            <p
              className="text-stone-800 dark:text-white"
              style={{ fontSize: '11px' }}
            >
              Save
            </p>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center w-72 mx-auto">
        <div className="flex flex-col gap-4 w-full items-start">
          <div className="flex flex-col items-start w-full gap-1">
            <p className="text-xs text-stone-800">Customer</p>
            {invoice?.sent ? (
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
            ) : (
              <Select
                options={custOpts}
                onChange={(value) => setCustomer(value)}
                value={customer}
                placeholder="Customer"
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
                    fontSize: '12px',
                    borderRadius: '.250rem',
                    boxShadow: 'none',
                    zIndex: 10,
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
                    zIndex: 40,
                    fontSize: '12px',
                  }),
                  input: (base) => ({
                    ...base,
                    'input:focus': {
                      boxShadow: 'none',
                    },
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected
                      ? 'rgb(229 231 235)'
                      : state.isFocused
                      ? 'rgb(249 250 251)'
                      : '',
                    color: 'black',
                  }),
                }}
                className="w-full text-left"
              />
            )}

            {invoice?.sent ? (
              ''
            ) : (
              <div className="flex items-center justify-start w-full">
                {!currentUser?.bankAdded && !currentUser?.stripeOnboard ? (
                  <Tooltip
                    content={
                      <p className="text-xs text-stone-800 text-left">
                        You need to connect a bank account to send invoices
                      </p>
                    }
                    style="light"
                    className="w-52"
                    arrow={false}
                  >
                    <div className="flex items-center gap-1">
                      <Checkbox disabled />
                      <p className="text-xs text-stone-800">Send to customer</p>
                    </div>
                  </Tooltip>
                ) : (
                  <div className="flex items-center gap-1">
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
          <div className="flex flex-col items-start w-full gap-1">
            <p className="text-xs text-stone-800">Title</p>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Title"
                className="border text-xs border-gray-200 outline-none text-stone-800 hover:bg-gray-50 focus:bg-gray-50 focus:ring-0 w-full rounded-sm p-2 pr-10"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                maxLength={25}
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <p className="text-stone-800" style={{ fontSize: '10px' }}>
                  {title?.length}/25
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start w-full gap-1">
            <p className="text-xs text-stone-800">Description</p>

            <div className="relative w-full">
              <textarea
                placeholder="What is this invoice for.."
                className="border border-gray-200 hover:bg-gray-50 focus:bg-gray-50 outline-none w-full h-20 rounded-sm p-2 resize-none text-xs"
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
                maxLength={100}
              />
              <div className="absolute right-2 bottom-2 transform -translate-y-1/2">
                <p className="text-stone-800" style={{ fontSize: '10px' }}>
                  {desc?.length}/100
                </p>
              </div>
            </div>
          </div>

          <div className="w-full flex items-center justify-center gap-2">
            {invoice?.sent ? (
              <div className="flex flex-col items-start w-4/12 gap-1">
                <p className="text-xs text-stone-800">Amount</p>
                <NumericFormat
                  value={amount}
                  disabled
                  thousandSeparator=","
                  decimalSeparator="."
                  placeholder="$95.00"
                  decimalScale={2}
                  fixedDecimalScale={true}
                  prefix="$"
                  allowNegative={false}
                  onValueChange={(values) => {
                    const { value } = values;
                    setAmount(value); // Update the state
                  }}
                  className="text-xs w-full border border-gray-50 focus:outline-none bg-gray-50 focus:bg-gray-50  focus:ring-0 text-stone-800 ring-0 rounded-sm p-2 pl-0.5"
                />
              </div>
            ) : (
              <div className="flex flex-col items-start w-4/12 gap-1">
                <p className="text-xs text-stone-800">Amount</p>
                <NumericFormat
                  value={amount}
                  thousandSeparator=","
                  decimalSeparator="."
                  placeholder="$95.00"
                  decimalScale={2}
                  fixedDecimalScale={true}
                  prefix="$"
                  allowNegative={false}
                  onValueChange={(values) => {
                    const { value } = values;
                    setAmount(value); // Update the state
                  }}
                  className="text-xs w-full border border-gray-200 focus:outline-none hover:bg-gray-50 focus:bg-gray-50  focus:ring-0 text-stone-800 ring-0 rounded-sm p-2 pl-0.5"
                />
              </div>
            )}
            <div className="flex flex-col items-start w-8/12 gap-1">
              <p className="text-xs text-stone-800">Due By</p>
              <div className="relative w-full">
                <button
                  type="button"
                  onClick={() => setSelDate(!selDate)}
                  className="text-xs w-full flex items-center justify-start border border-gray-200 focus:outline-none hover:bg-gray-50 focus:bg-gray-50  focus:ring-0 text-stone-800 ring-0 rounded-sm p-2"
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
        </div>
      </div>
    </div>
  );
};

export default Edit;
