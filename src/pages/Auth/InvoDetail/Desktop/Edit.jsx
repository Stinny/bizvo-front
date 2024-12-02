import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Save,
  Trash,
} from 'react-feather';
import EditCust from './EditCust';
import EditDetails from './EditDetails';
import Modal from 'react-modal';
import moment from 'moment';
import { useDeleteInvoiceMutation } from '../../../../api/invoicesApiSlice';
import { showNotification } from '../../../../api/toastSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'flowbite-react';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    fontFamily: 'Space Mono',
  },
};
Modal.setAppElement('#root');

const Edit = ({
  handleSaveEdits,
  custOpts,
  invoiceId,
  items,
  setItems,
  step,
  setStep,
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
}) => {
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

  return (
    <div className="w-10/12 bg-white border rounded-md border-gray-200 p-2 flex flex-col gap-4 items-start">
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
                <div className="flex flex-col items-start w-4/12">
                  <p className="text-xs text-stone-700">Amount</p>
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
                <div className="flex flex-col items-start w-8/12">
                  <p className="text-xs text-stone-700">Due By</p>
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
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col items-start">
          <p className="text-sm text-stone-800">Editing invoice: {invoiceId}</p>
          <p className="text-xs text-stone-700">
            Edit details for this invoice before it is paid
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setDel(!del)}
            className="text-red-400 font-bold"
          >
            <Trash size={16} />
          </button>
          <div className="w-full flex justify-end">
            {step === 'cust' ? (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled
                  className="p-1 border border-gray-200 rounded-md text-gray-200"
                >
                  <ChevronLeft size={12} />
                </button>

                <button
                  type="button"
                  onClick={() => setStep('dets')}
                  className="p-1 border border-stone-800 rounded-md text-stone-800"
                >
                  <ChevronRight size={12} />
                </button>
              </div>
            ) : (
              ''
            )}
            {step === 'dets' ? (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setStep('cust')}
                  className="p-1 border border-stone-800 rounded-md text-stone-800"
                >
                  <ChevronLeft size={12} />
                </button>
                <button
                  type="button"
                  className="p-1 border border-gray-200 rounded-md text-gray-200"
                  disabled
                >
                  <ChevronRight size={12} />
                </button>
              </div>
            ) : (
              ''
            )}
          </div>
          {/* <button
            type="button"
            onClick={handleSaveEdits}
            className="text-stone-800 font-bold"
          >
            <Save size={16} />
          </button> */}
        </div>
      </div>

      {step === 'cust' ? (
        <EditCust
          custOpts={custOpts}
          customer={customer}
          setCustomer={setCustomer}
          amount={amount}
          setAmount={setAmount}
        />
      ) : (
        ''
      )}

      {step === 'dets' ? (
        <EditDetails
          items={items}
          setItems={setItems}
          title={title}
          setTitle={setTitle}
          desc={desc}
          setDesc={setDesc}
          dueDate={dueDate}
          setDueDate={setDueDate}
          handleSaveEdits={handleSaveEdits}
          error={error}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default Edit;
