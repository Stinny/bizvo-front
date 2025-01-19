import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Edit from './Edit';
import { Badge, Dropdown, Spinner, Tooltip } from 'flowbite-react';
import {
  AlertOctagon,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Clipboard,
  Edit as EditIcon,
  ExternalLink,
  MoreVertical,
  Send,
  X,
  XSquare,
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
import BackBtn from '../../../../components/BackBtn';
import InvoStatus from '../../../../components/InvoStatus';
import CancelModal from '../../../../components/Invoices/CancelModal';
import SendModal from '../../../../components/Invoices/SendModal';

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
  const [viewCan, setViewCan] = useState(false);
  const [send, setSend] = useState(false);
  const [sendMod, setSendMod] = useState(false);
  const [sendConfirm, setSendConfirm] = useState(false);
  const [confirmMod, setConfirmMod] = useState(false);
  const [cancelMod, setCancelMod] = useState(false);
  const [more, setMore] = useState(false);

  //for display
  const taxAmount = invoice?.tax?.amount / 100;
  const bizFee = invoice?.fees?.bizvo / 100;
  const strFee = invoice?.fees?.stripe / 100;
  const trsFee = invoice?.fees?.transfer / 100;
  let taxType;
  switch (invoice?.tax?.type) {
    case 'vat':
      taxType = 'VAT';
      break;
    case 'gst':
      taxType = 'GST';
      break;
    default:
      taxType = 'Sales Tax';
      break;
  }

  //hook for getting cust select options
  const {
    data: custOpts,
    isLoading: gettingCustOpts,
    isSuccess: gotCustOpts,
    refetch: getCustOpts,
  } = useGetCustomerOptsQuery();

  //hook for saving edits
  const [editInvoice, { isLoading: savingInvo }] = useEditInvoiceMutation();

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

  useEffect(() => {
    setError('');
  }, [title]);

  let content;

  if (gettingCustOpts || savingInvo) {
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
        <SendModal
          open={sendMod}
          setOpen={setSendMod}
          invoId={invoice?._id}
          invoEmail={invoice?.customer?.email}
          refetch={refetch}
          currentUser={currentUser}
        />
        <CancelModal
          open={cancelMod}
          setOpen={setCancelMod}
          invoId={invoice?._id}
          refetch={refetch}
        />
        <div className="w-full flex items-center justify-between relative">
          <div className="flex gap-1">
            <BackBtn direction={'left'} />
            <div className="flex flex-col items-start">
              <p className="text-sm text-stone-800">Viewing Invoice</p>

              <p className="text-xs text-stone-800">#{invoice?._id}</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 w-44">
            <InvoStatus status={invoice?.status} />
          </div>
          <div className="w-24"></div>
          <Dropdown
            dismissOnClick={true}
            renderTrigger={() => (
              <MoreVertical size={16} className="hover:cursor-pointer" />
            )}
            className="w-24"
          >
            {invoice?.status === 'paid' || invoice?.status === 'void' ? (
              ''
            ) : (
              <Dropdown.Item
                as="div"
                className="text-xs text-stone-800 flex items-center justify-between w-full"
              >
                <button
                  type="button"
                  onClick={() => setEdit(!edit)}
                  className="text-xs text-stone-800 flex items-center w-full gap-1"
                >
                  <EditIcon size={14} className="text-stone-800" />
                  Edit
                </button>
              </Dropdown.Item>
            )}
            {invoice?.sent ? (
              ''
            ) : (
              <Dropdown.Item
                as="div"
                className="text-xs text-stone-800 flex items-center justify-between w-full"
              >
                <button
                  type="button"
                  onClick={() => setSendMod(true)}
                  className="text-xs text-stone-800 flex items-center w-full gap-1"
                >
                  <Send size={12} />
                  Send
                </button>
              </Dropdown.Item>
            )}

            {invoice?.sent ? (
              <Link
                to={`http://localhost:5173/pay/${invoice?._id}?iat=${invoice?.token}`}
                target="_blank"
              >
                <Dropdown.Item
                  as="div"
                  className="text-xs text-stone-800 flex items-center gap-1"
                >
                  <ExternalLink size={14} />
                  Open
                </Dropdown.Item>
              </Link>
            ) : (
              ''
            )}
            {invoice?.status === 'pending' ? (
              <Dropdown.Item
                as="div"
                className="text-xs text-stone-800 flex items-center justify-between w-full"
              >
                <button
                  type="button"
                  onClick={() => setCancelMod(!cancelMod)}
                  className="text-xs text-stone-800 flex items-center w-full gap-1"
                >
                  <XSquare size={14} className="text-red-400" />
                  Cancel
                </button>
              </Dropdown.Item>
            ) : (
              ''
            )}
          </Dropdown>
        </div>

        <div className="flex items-center justify-center w-72 mx-auto">
          <div className="flex flex-col gap-4 w-full items-start">
            {invoice?.status === 'void' ? (
              <div className="flex flex-col gap-1 items-start w-full">
                <button
                  type="button"
                  onClick={() => setViewCan(!viewCan)}
                  className="w-full flex flex-col bg-white items-start text-left border border-gray-200 rounded-md p-2"
                >
                  <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="flex items-center gap-1 text-xs text-stone-800">
                        <XSquare size={14} className="text-red-400" />
                        Canceled on{' '}
                        {moment(invoice?.canceledOn).format('MMMM D, YYYY')}
                      </p>
                    </div>
                    {viewCan ? (
                      <ChevronDown size={14} />
                    ) : (
                      <ChevronRight size={14} />
                    )}
                  </div>

                  <div
                    className={`transition-[max-height] duration-300 ease-in-out overflow-hidden w-full ${
                      viewCan ? 'max-h-40' : 'max-h-0'
                    }`}
                  >
                    <p className="text-xs text-stone-800 mt-2">Reason</p>
                    <input
                      type="text"
                      placeholder="Reason"
                      className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 rounded-md p-2 w-full"
                      disabled
                      value={invoice?.cancelMsg}
                    />
                  </div>
                </button>
              </div>
            ) : (
              ''
            )}

            <div className="flex flex-col gap-1 items-start w-full">
              <p className="text-xs text-stone-800">Customer</p>
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
                  <p className="text-xs text-stone-800 mt-2">
                    {invoice?.customer?.email}
                  </p>
                  <p className="text-xs text-stone-800 mt-2">
                    {invoice?.customer?.country?.label}
                  </p>
                </div>
              </button>
            </div>
            <div className="flex flex-col items-start w-full gap-1">
              <p className="text-xs text-stone-800">Title</p>
              <input
                type="text"
                placeholder="Title"
                className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2"
                disabled
                value={title}
              />
            </div>
            <div className="flex flex-col items-start w-full gap-1">
              <p className="text-xs text-stone-800">Description</p>
              <textarea
                placeholder="About this invoice.."
                className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2 resize-none h-20"
                disabled
                value={desc}
              />
            </div>
            <div className="w-full flex items-center justify-center gap-2">
              <div className="flex flex-col items-start w-4/12 gap-1">
                <p className="text-xs text-stone-800">Amount</p>
                <div className="w-full p-2 bg-gray-50 text-left rounded-md">
                  <p className="text-xs text-stone-800">
                    $
                    {parseFloat(amount)?.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
              {invoice?.paid ? (
                <div className="flex flex-col items-start w-8/12 gap-1">
                  <p className="text-xs text-stone-800">Paid On</p>
                  <input
                    type="text"
                    placeholder="Due Date"
                    className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2"
                    disabled
                    value={`${moment(invoice?.paidOn).format('MMMM D, YYYY')}`}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-start w-8/12 gap-1">
                  <p className="text-xs text-stone-800">Due By</p>
                  <input
                    type="text"
                    placeholder="Due Date"
                    className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2"
                    disabled
                    value={`${moment(dueDate).format('MMMM D, YYYY')}`}
                  />
                </div>
              )}
            </div>
            {invoice?.paid ? (
              <div className="flex flex-col w-full items-start gap-1">
                <p className="text-xs text-stone-800">Total</p>
                <button
                  type="button"
                  onClick={() => setMore(!more)}
                  className="w-full flex flex-col bg-gray-50 items-start text-left border border-gray-50 rounded-md p-2"
                >
                  <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="text-stone-800 text-xs">
                        $
                        {parseFloat(
                          invoice?.amount + taxAmount
                        )?.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                    {more ? (
                      <ChevronDown size={14} />
                    ) : (
                      <ChevronRight size={14} />
                    )}
                  </div>

                  <div
                    className={`transition-[max-height] duration-300 ease-in-out w-full flex flex-col gap-2 overflow-hidden ${
                      more ? 'max-h-40' : 'max-h-0'
                    }`}
                  >
                    <div className="w-full flex justify-between items-center mt-2">
                      <p className="text-stone-700 text-xs">
                        {taxType}({invoice?.tax?.rate}%):
                      </p>
                      <p className="text-stone-700 text-xs">
                        -${taxAmount?.toFixed(2)}
                      </p>
                    </div>
                    <div className="w-full flex justify-between items-center">
                      <p className="text-stone-700 text-xs">Bizvo:</p>
                      <p className="text-stone-700 text-xs">
                        -${bizFee?.toFixed(2)}
                      </p>
                    </div>
                    <div className="w-full flex justify-between items-center">
                      <p className="text-stone-700 text-xs">Stripe:</p>
                      <p className="text-stone-700 text-xs">
                        -${strFee?.toFixed(2)}
                      </p>
                    </div>
                    <div className="w-full flex justify-between items-center">
                      <p className="text-stone-700 text-xs font-bold">
                        Earnings:
                      </p>
                      <p className="text-stone-700 text-xs font-bold">
                        $
                        {parseFloat(trsFee)?.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    );
  }

  return content;
};

export default Desktop;
