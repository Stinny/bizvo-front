import { Checkbox } from 'antd';
import { Datepicker, Tooltip } from 'flowbite-react';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import { DateInput } from 'rsuite';
import { dateTheme } from '../../../../utils/dateTheme';
import Modal from 'react-modal';
import { AlertOctagon, CreditCard, Repeat, X } from 'react-feather';
import { NumericFormat } from 'react-number-format';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    fontFamily: 'Geist',
    zIndex: 1000,
  },
  overlay: { zIndex: 1000 },
};
Modal.setAppElement('#root');

const EditDraft = ({
  custOpts,
  setCustomer,
  customer,
  amount,
  setAmount,
  title,
  setTitle,
  desc,
  setDesc,
  dueDate,
  setDueDate,
  send,
  setSend,
  type,
  setType,
  int,
  setInt,
  invoice,
  currentUser,
  confirmMod,
  setConfirmMod,
  modalConfirmHandler,
}) => {
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
    <div className="flex items-center justify-center w-72 mx-auto">
      <Modal
        isOpen={confirmMod}
        onRequestClose={() => setConfirmMod(false)}
        style={customStyles}
        contentLabel="Send invo confirm modal"
      >
        <div className="w-80 flex flex-col gap-4 items-start">
          <div className="w-full flex items-start justify-between">
            <div className="flex flex-col items-start">
              <p className="text-sm text-stone-800">Sending Invoice</p>

              <p className="text-xs text-stone-800">
                Are you sure you want to send?
              </p>
            </div>
            <X
              size={16}
              className="text-red-400 hover:cursor-pointer"
              onClick={() => setConfirmMod(false)}
            />
          </div>
          <div className="flex flex-col items-start gap-2 w-full">
            <div className="w-full text-left flex flex-col items-start gap-1 p-2 border border-gray-200 rounded-md">
              <AlertOctagon size={16} className="text-red-400" />
              <p className="text-xs text-stone-800">
                After sending only title, description, and due date can be
                changed
              </p>
            </div>
          </div>
          <div className="w-full flex items-center justify-end">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className=" text-stone-800 rounded-md border border-stone-800 p-1 text-xs"
                onClick={modalConfirmHandler}
              >
                Save & Send
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <div className="flex flex-col gap-4 w-full items-start">
        <div className="flex flex-col items-start w-full gap-1">
          <p className="text-xs text-stone-800">Customer</p>
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
                backgroundColor: 'rgb(249 250 251)',
                borderWidth: 1,
                '&:hover': {
                  backgroundColor: 'rgb(229 231 235)', // Keep the same border color on hover
                },
                '&:focus': {
                  backgroundColor: 'rgb(229 231 235)', // Keep the same border color on hover
                },
                fontSize: '12px',
                borderRadius: '.375rem',
                boxShadow: 'none',
                zIndex: 40,
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
        </div>
        <div className="flex flex-col items-start w-full gap-1">
          <p className="text-xs text-stone-800">Title</p>
          <input
            type="text"
            placeholder="Title"
            className="border text-xs border-gray-200 bg-gray-50 focus:border-gray-200 focus:outline-none text-stone-800 hover:bg-gray-200 hover:border-gray-200 focus:bg-gray-200 focus:ring-0 w-full rounded-md p-2 pr-10"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            maxLength={25}
          />
        </div>
        <div className="flex flex-col items-start w-full gap-1">
          <p className="text-xs text-stone-800">Description</p>
          <textarea
            placeholder="What is this invoice for.."
            className="border border-gray-200 hover:border-gray-200 hover:bg-gray-200 focus:bg-gray-200 focus:border-gray-200 focus:ring-0 w-full h-20 rounded-md p-2 bg-gray-50 resize-none text-xs"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            maxLength={100}
          />
        </div>
        <div className="flex items-center w-full gap-2">
          <button
            type="button"
            onClick={() => setType('single')}
            className={`flex items-center justify-center gap-1 w-3/6 p-2 border ${
              type === 'single' ? 'border-stone-800' : 'border-gray-200'
            } rounded-md hover:border-stone-800`}
          >
            <CreditCard size={14} className="text-stone-800" />
            <p className="text-xs text-stone-800">Single</p>
          </button>
          <button
            type="button"
            onClick={() => setType('recurring')}
            className={`flex items-center justify-center gap-1 w-3/6 p-2 border ${
              type === 'recurring' ? 'border-stone-800' : 'border-gray-200'
            } rounded-md hover:border-stone-800`}
          >
            <Repeat size={14} className="text-stone-800" />
            <p className="text-xs text-stone-800">Recurring</p>
          </button>
        </div>
        {type === 'recurring' ? (
          <div className="flex flex-col items-start w-full gap-1">
            <div className="flex items-center w-full gap-2">
              <button
                type="button"
                onClick={() => setInt('monthly')}
                className={`text-xs text-stone-800 p-1 w-3/6 border ${
                  int === 'monthly' ? 'border-stone-800' : 'border-gray-200'
                } rounded-md hover:border-stone-800`}
              >
                Every 30 days
              </button>
              <button
                type="button"
                onClick={() => setInt('weekly')}
                className={`text-xs text-stone-800 p-1 w-3/6 border ${
                  int === 'weekly' ? 'border-stone-800' : 'border-gray-200'
                } rounded-md hover:border-stone-800`}
              >
                Every 7 days
              </button>
            </div>
          </div>
        ) : (
          ''
        )}
        <div className="flex items-center gap-2">
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
              className="text-xs w-full bg-gray-50 border border-gray-200 focus:outline-none hover:bg-gray-200 focus:bg-gray-200 hover:border-gray-200 focus:border-gray-200 focus:ring-0 text-stone-800 ring-0 rounded-md p-2 pl-0.5"
            />
          </div>
          <div className="flex flex-col items-start w-8/12 gap-1">
            <p className="text-xs text-stone-800">Due By</p>
            <div className="relative w-full">
              <button
                type="button"
                onClick={() => setSelDate(!selDate)}
                className="text-xs w-full flex items-center justify-start bg-gray-50 border border-gray-200 focus:outline-none hover:bg-gray-200 focus:bg-gray-200 hover:border-gray-200 focus:border-gray-200 focus:ring-0 text-stone-800 ring-0 rounded-md p-2"
              >
                {dueDate ? moment(dueDate).format('MMMM D, YYYY') : 'Due date'}
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
  );
};

export default EditDraft;
