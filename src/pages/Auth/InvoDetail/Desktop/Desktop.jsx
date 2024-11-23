import React, { useState } from 'react';
import Navbar from '../../../../components/Navbar/Navbar';
import Sidenav from '../../../../components/Sidenav/Sidenav';
import Footer from '../../../../components/Footer/Footer';
import Edit from './Edit';
import { Badge, Spinner } from 'flowbite-react';
import {
  ChevronDown,
  ChevronRight,
  Edit as EditIcon,
  Send,
} from 'react-feather';
import { useGetCustomerOptsQuery } from '../../../../api/customersApiSlice';
import { useEditInvoiceMutation } from '../../../../api/invoicesApiSlice';
import { showNotification } from '../../../../api/toastSlice';
import { useDispatch } from 'react-redux';
import moment from 'moment';

const Desktop = ({ invoice, refetch }) => {
  const dispatch = useDispatch();

  //form state
  const [title, setTitle] = useState(invoice?.title);
  const [desc, setDesc] = useState(invoice?.description);
  const [customer, setCustomer] = useState({
    value: invoice?.customerId,
    label: invoice?.customer?.name,
  });
  const [items, setItems] = useState(invoice?.items);
  const [amount, setAmount] = useState(invoice?.amount);
  const [dueDate, setDueDate] = useState(invoice?.dueDate);
  const [step, setStep] = useState('cust');
  const [error, setError] = useState('');
  const [edit, setEdit] = useState(false);
  const [viewCust, setViewCust] = useState(false);

  //hook for getting cust select options
  const {
    data: custOpts,
    isLoading: gettingCustOpts,
    isSuccess: gotCustOpts,
    refetch: getCustOpts,
  } = useGetCustomerOptsQuery();

  //hook for saving edits
  const [editInvoice, result] = useEditInvoiceMutation();

  //hanlder function to save edits
  const handleSaveEdits = async () => {
    try {
      const editReq = await editInvoice({
        title: title,
        description: desc,
        customerId: customer?.value,
        amount: parseFloat(amount),
        dueDate: dueDate,
        invoiceId: invoice?._id,
      }).unwrap();

      if (editReq === 'Invoice updated') {
        dispatch(showNotification('Invoice updated'));
        refetch();
        setStep('cust');
        setEdit(false);
      } else {
        setError('There was an error');
        return;
      }
    } catch (err) {
      setError('Server error');
      return;
    }
  };

  let content;

  if (gettingCustOpts) {
    content = (
      <div className="w-full h-96 flex items-center justify-center">
        <Spinner />
      </div>
    );
  } else if (gotCustOpts) {
    content = edit ? (
      <Edit
        handleSaveEdits={handleSaveEdits}
        custOpts={custOpts}
        invoiceId={invoice?._id}
        items={items}
        setItems={setItems}
        step={step}
        setStep={setStep}
        customer={customer}
        setCustomer={setCustomer}
        title={title}
        setTitle={setTitle}
        desc={desc}
        setDesc={setDesc}
        dueDate={dueDate}
        setDueDate={setDueDate}
        amount={amount}
        setAmount={setAmount}
        error={error}
      />
    ) : (
      <div className="w-10/12 bg-white border rounded-md border-gray-200 p-2 flex flex-col gap-4 items-start">
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col items-start">
            <p className="text-sm text-stone-800">Invoice: {invoice?._id}</p>
            <p className="text-xs text-stone-700">View and edit this invoice</p>
          </div>
          <div className="flex items-center gap-3">
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
              <button
                type="button"
                // onClick={() => setStep('cust')}
                className="p-0.5 pl-1 pr-1 border text-xs border-stone-800 rounded-md text-stone-800 flex items-center justify-center gap-1"
              >
                <Send size={12} />
                Send
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => setEdit(!edit)}
            className="text-stone-800"
          >
            <EditIcon size={16} />
          </button>
        </div>

        <div className="flex items-center justify-center w-72 mx-auto">
          <div className="flex flex-col gap-2 w-full items-start">
            <button
              type="button"
              onClick={() => setViewCust(!viewCust)}
              className="w-full flex flex-col bg-gray-50 items-start text-left border border-gray-50 rounded-md p-2"
            >
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <p className="text-xs text-stone-800">Customer</p>
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
                  {invoice?.customer?.name}
                </p>
                <p className="text-xs text-stone-800 mt-2">
                  {invoice?.customer?.email}
                </p>
              </div>
            </button>
            <div className="flex flex-col items-start w-full">
              <p className="text-xs text-stone-700">Title</p>
              <input
                type="text"
                placeholder="(123)-456-7890"
                className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2"
                disabled
                value={title}
              />
            </div>
            <div className="flex flex-col items-start w-full">
              <p className="text-xs text-stone-700">Description</p>
              <textarea
                placeholder="About this customer.."
                className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2 resize-none h-16"
                disabled
                value={desc}
              />
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
          {/* <div className="flex flex-col w-full">
            <div className="flex flex-col items-start w-full">
              <p className="text-xs text-stone-700">Items</p>
              <div className="flex flex-col w-full gap-1">
                {invoice?.items?.map((item) => (
                  <div className="w-full flex items-center gap-1">
                    <div className="w-full p-2 bg-gray-50 border border-gray-50 rounded-md flex items-center">
                      <div className="w-7/12 text-left">
                        <p className="text-xs text-stone-800">{item?.title}</p>
                      </div>
                      <div className="w-2/12 flex justify-end">
                        <p className="text-xs text-stone-800">x{item?.qty}</p>
                      </div>
                      <div className="w-3/12 flex justify-end">
                        <p className="text-xs text-stone-800">${item?.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div> */}
        </div>
      </div>
    );
  }

  return content;
};

export default Desktop;
