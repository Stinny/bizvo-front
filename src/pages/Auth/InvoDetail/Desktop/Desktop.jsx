import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Edit from './Edit';
import { Badge, Spinner, Tooltip } from 'flowbite-react';
import {
  AlertOctagon,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Clipboard,
  Edit as EditIcon,
  ExternalLink,
  Send,
} from 'react-feather';
import { useGetCustomerOptsQuery } from '../../../../api/customersApiSlice';
import {
  useEditInvoiceMutation,
  useSendInvoiceMutation,
} from '../../../../api/invoicesApiSlice';
import { showNotification } from '../../../../api/toastSlice';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    fontFamily: 'Roboto Mono',
    padding: '8px',
  },
};
Modal.setAppElement('#root');

const Desktop = ({ invoice, refetch }) => {
  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

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
  const [dueDate, setDueDate] = useState(new Date(invoice?.dueDate));
  const [step, setStep] = useState('cust');
  const [error, setError] = useState('');
  const [edit, setEdit] = useState(false);
  const [viewCust, setViewCust] = useState(false);
  const [send, setSend] = useState(false);
  const [sendMod, setSendMod] = useState(false);
  const [sendConfirm, setSendConfirm] = useState(false);
  const [confirmMod, setConfirmMod] = useState(false);

  //hook for getting cust select options
  const {
    data: custOpts,
    isLoading: gettingCustOpts,
    isSuccess: gotCustOpts,
    refetch: getCustOpts,
  } = useGetCustomerOptsQuery();

  //hook for saving edits
  const [editInvoice, { isLoading: savingInvo }] = useEditInvoiceMutation();
  //hook for sending invoice
  const [sendInvoice, { isLoading: isSending }] = useSendInvoiceMutation();

  // Function to wait for user confirmation
  const waitForConfirmation = () => {
    return new Promise((resolve) => {
      // When user confirms, call resolve
      const handleConfirm = () => {
        setSendConfirm(true);
        setConfirmMod(false); // Close modal
        resolve(); // Resolve the promise
      };

      // Show modal and attach the confirmation handler
      setConfirmMod(true);
      // Save the handler so modal can call it later
      setModalConfirmHandler(() => handleConfirm);
    });
  };

  const [modalConfirmHandler, setModalConfirmHandler] = useState(null);

  //hanlder function to save edits
  const handleSaveEdits = async (quickSend) => {
    setError('');

    if (!title.trim()) {
      setError('Invoice title missing');
      return;
    }

    if (send && !sendConfirm && !invoice?.sent) {
      await waitForConfirmation();
    }

    try {
      const editReq = await editInvoice({
        title: title,
        description: desc,
        customerId: customer?.value,
        amount: parseFloat(amount),
        dueDate: dueDate,
        invoiceId: invoice?._id,
        send: send,
      }).unwrap();

      if (editReq === 'Invoice updated') {
        const toastMsg = send ? 'Invoice updated & sent' : 'Invoice updated';
        dispatch(showNotification(toastMsg));
        refetch();
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

  //hanlder function to send invoice
  const handleSendInvo = async () => {
    try {
      const sendReq = await sendInvoice({
        invoiceId: invoice?._id,
      }).unwrap();

      if (sendReq === 'Invoice sent') {
        dispatch(showNotification('Invoice sent'));
        setSendMod(false);
        refetch();
        return;
      } else {
        setError('There was an error');
        return;
      }
    } catch (err) {
      setError('Server error');
      return;
    }
  };

  useEffect(() => {
    setError('');
  }, [title]);

  let content;

  if (gettingCustOpts || savingInvo || isSending) {
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
        invoice={invoice}
        send={send}
        setSend={setSend}
        confirmMod={confirmMod}
        setConfirmMod={setConfirmMod}
        modalConfirmHandler={modalConfirmHandler}
      />
    ) : (
      <div className="w-10/12 bg-white border rounded-md border-gray-200 p-2 pb-6 flex flex-col gap-6 items-start">
        <Modal
          isOpen={sendMod}
          onRequestClose={() => setSendMod(false)}
          style={customStyles}
          contentLabel="Send invo modal"
        >
          {false ? (
            <div className="w-80 h-52 flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <div className="w-80 flex flex-col gap-4 items-start">
              <div className="flex flex-col items-start">
                <p className="text-sm text-stone-800">Sending Invoice</p>

                <p className="text-xs text-stone-700">#{invoice?._id}</p>
              </div>
              <div className="flex flex-col items-start gap-2 w-full">
                <div className="flex flex-col items-start w-full">
                  <p className="text-xs text-stone-600">Sending to:</p>
                  <p className="text-xs text-stone-800">
                    {invoice?.customer?.email}
                  </p>
                </div>
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
                    className="border border-red-400 text-red-400 rounded-md p-1 text-xs"
                    onClick={() => setSendMod(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className=" text-stone-800 rounded-md border border-stone-800 p-1 text-xs"
                    onClick={handleSendInvo}
                  >
                    Send Invoice
                  </button>
                </div>
              </div>
            </div>
          )}
        </Modal>
        <div className="w-full flex items-center justify-between relative">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-1">
              <p className="text-sm text-stone-800">Viewing Invoice</p>
              <Link
                to={`http://localhost:5173/pay/${invoice?._id}?iat=${invoice?.token}`}
                target="_blank"
              >
                <ExternalLink size={14} className="text-stone-800" />
              </Link>
            </div>
            <p className="text-xs text-stone-700">#{invoice?._id}</p>
          </div>
          <div className="flex items-center justify-center gap-3 w-44">
            {invoice?.sent ? (
              <Tooltip
                content={
                  <p className="text-xs text-stone-800 text-left">
                    This invoice was sent to the customer
                  </p>
                }
                style="light"
                className="w-52"
                arrow={false}
              >
                <button
                  type="button"
                  disabled
                  className="p-0.5 pl-1 pr-1  text-xs  text-stone-800 flex items-center justify-center gap-1"
                >
                  <Send size={12} />
                  Sent
                </button>
              </Tooltip>
            ) : (
              <>
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
                    <button
                      type="button"
                      disabled
                      className="p-0.5 pl-1 pr-1 border text-xs border-gray-100 rounded-md text-gray-100 flex items-center justify-center gap-1"
                    >
                      <Send size={12} />
                      Send
                    </button>
                  </Tooltip>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSendMod(true)}
                    className="p-0.5 pl-1 pr-1 border text-xs border-stone-800 rounded-md text-stone-800 flex items-center justify-center gap-1"
                  >
                    <Send size={12} />
                    Send
                  </button>
                )}
              </>
            )}
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
          </div>
          <div className="w-24 flex justify-end"></div>
          <div className="absolute top-0 right-0 mt-1 mr-1">
            <button type="button" onClick={() => setEdit(!edit)}>
              <EditIcon size={16} className="text-stone-800" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center w-72 mx-auto">
          <div className="flex flex-col gap-4 w-full items-start">
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
            <div className="flex flex-col items-start w-full">
              <p className="text-xs text-stone-700">Title</p>
              <input
                type="text"
                placeholder="Title"
                className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2"
                disabled
                value={title}
              />
            </div>
            <div className="flex flex-col items-start w-full">
              <p className="text-xs text-stone-700">Description</p>
              <textarea
                placeholder="About this invoice.."
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
        </div>
      </div>
    );
  }

  return content;
};

export default Desktop;
