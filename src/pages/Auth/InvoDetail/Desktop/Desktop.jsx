import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Edit from './Edit';
import { Badge, Dropdown, Spinner, Tooltip } from 'flowbite-react';
import {
  AlertOctagon,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  ChevronsRight,
  ChevronUp,
  Clipboard,
  Clock,
  CreditCard,
  DollarSign,
  Edit as EditIcon,
  ExternalLink,
  MoreVertical,
  Repeat,
  Send,
  Trash,
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
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Timeline } from 'antd';
import DeleteModal from '../../../../components/Invoices/DeleteModal';

const Desktop = ({
  invoice,
  trxs,
  events,
  refetch,
  setActiveTabIndex,
  activeTabIndex,
}) => {
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
  const [type, setType] = useState(invoice?.type);
  const [int, setInt] = useState(invoice?.interval);
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
  const [del, setDel] = useState(false);
  const [seeTx, setSeeTx] = useState('');

  const handleSeeTx = (tx) => {
    if (seeTx === tx) {
      setSeeTx('');
    } else {
      setSeeTx(tx);
    }
  };

  //for display
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
        type: type,
        interval: int,
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

  const handleCancelEdits = () => {
    setTitle(invoice?.title);
    setAmount(invoice?.amount);
    setDesc(invoice?.description);
    setType(invoice?.type);
    setInt(invoice?.interval);
    setDueDate(invoice?.dueDate);
    setSend(invoice?.sent);
    setEdit(false);
  };

  useEffect(() => {
    setError('');
  }, [title]);

  let content;

  if (gettingCustOpts || savingInvo) {
    content = (
      <div className="w-10/12 h-96 flex items-center justify-center">
        <Spinner />
      </div>
    );
  } else if (gotCustOpts) {
    content = edit ? (
      <Edit
        handleSaveEdits={handleSaveEdits}
        handleCancelEdits={handleCancelEdits}
        setEdit={setEdit}
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
        type={type}
        setType={setType}
        int={int}
        setInt={setInt}
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
      <div className="w-10/12 bg-white border rounded-md border-gray-200 p-2 pb-6 flex flex-col gap-6 items-center">
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
        <DeleteModal
          open={del}
          setOpen={setDel}
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
            {invoice?.status === 'draft' ? (
              <button
                type="button"
                onClick={() => setEdit(!edit)}
                className="w-full h-full outline-none border-none"
              >
                <Dropdown.Item
                  as="div"
                  className="w-full flex items-center gap-1 text-xs text-stone-800 hover:bg-white"
                >
                  <EditIcon size={12} className="text-stone-800" />
                  Edit
                </Dropdown.Item>
              </button>
            ) : (
              ''
            )}

            {invoice?.sent ? (
              <Link
                to={`http://localhost:5173/pay/${invoice?._id}?iat=${invoice?.token}&uid=${currentUser?._id}`}
                target="_blank"
              >
                <Dropdown.Item
                  as="div"
                  className="text-xs text-stone-800 flex items-center gap-1 hover:bg-white"
                >
                  <ExternalLink size={12} />
                  View
                </Dropdown.Item>
              </Link>
            ) : (
              ''
            )}

            <Link to="/dashboard/events" state={{ invoId: invoice?._id }}>
              <Dropdown.Item
                as="div"
                className="text-xs text-stone-800 flex items-center gap-1 hover:bg-white"
              >
                <Clock size={12} />
                Events
              </Dropdown.Item>
            </Link>

            {invoice?.status === 'draft' ? (
              <button
                type="button"
                onClick={() => setDel(!del)}
                className="w-full h-full"
              >
                <Dropdown.Item
                  as="div"
                  className="text-xs text-stone-800 flex items-center gap-1 hover:bg-white"
                >
                  <Trash size={12} className="text-red-400" />
                  Delete
                </Dropdown.Item>
              </button>
            ) : (
              ''
            )}
            {invoice?.status === 'pending' || invoice?.status === 'live' ? (
              <button
                type="button"
                onClick={() => setCancelMod(!cancelMod)}
                className="w-full h-full"
              >
                <Dropdown.Item
                  as="div"
                  className="text-xs text-stone-800 flex items-center gap-1 hover:bg-white"
                >
                  <XSquare size={12} className="text-red-400" />
                  Cancel
                </Dropdown.Item>
              </button>
            ) : (
              ''
            )}
          </Dropdown>
        </div>
        <Tabs
          selectedIndex={activeTabIndex}
          onSelect={(index) => setActiveTabIndex(index)}
          className="w-72 text-left"
        >
          <TabList>
            <Tab>Details</Tab>
            <Tab>Transactions</Tab>
          </TabList>

          <TabPanel>
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
                <div className="flex items-center w-full gap-2">
                  <button
                    type="button"
                    disabled
                    className={`flex items-center justify-center gap-1 w-3/6 p-2 border ${
                      type === 'single' ? 'border-stone-800' : 'border-gray-200'
                    } rounded-md`}
                  >
                    <CreditCard size={14} className="text-stone-800" />
                    <p className="text-xs text-stone-800">Single</p>
                  </button>
                  <button
                    type="button"
                    disabled
                    className={`flex items-center justify-center gap-1 w-3/6 p-2 border ${
                      type === 'recurring'
                        ? 'border-stone-800'
                        : 'border-gray-200'
                    } rounded-md`}
                  >
                    <Repeat size={14} className="text-stone-800" />
                    <p className="text-xs text-stone-800">Recurring</p>
                  </button>
                </div>
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
                    className="text-xs bg-white border border-gray-200 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2"
                    disabled
                    value={title}
                  />
                </div>
                <div className="flex flex-col items-start w-full gap-1">
                  <p className="text-xs text-stone-800">Description</p>
                  <textarea
                    placeholder="About this invoice.."
                    className="text-xs bg-white border border-gray-200 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2 resize-none h-20"
                    disabled
                    value={desc}
                  />
                </div>
                {type === 'recurring' ? (
                  <div className="flex flex-col items-start w-full gap-1">
                    <div className="flex items-center w-full gap-2">
                      <button
                        type="button"
                        disabled
                        className={`text-xs text-stone-800 p-1 w-3/6 border ${
                          int === 'monthly'
                            ? 'border-stone-800'
                            : 'border-gray-200'
                        } rounded-md`}
                      >
                        Monthly
                      </button>
                      <button
                        type="button"
                        disabled
                        className={`text-xs text-stone-800 p-1 w-3/6 border ${
                          int === 'weekly'
                            ? 'border-stone-800'
                            : 'border-gray-200'
                        } rounded-md`}
                      >
                        Weekly
                      </button>
                    </div>
                  </div>
                ) : (
                  ''
                )}
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
                        value={`${moment(invoice?.paidOn).format(
                          'MMMM D, YYYY'
                        )}`}
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
              </div>
            </div>
          </TabPanel>

          <TabPanel>
            {trxs?.length ? (
              <div className="flex flex-col items-start gap-2 min-h-64">
                {trxs?.map((trx) => (
                  <button
                    type="button"
                    onClick={() => handleSeeTx(`tx${trx?._id}`)}
                    className="border border-gray-200 rounded-md flex flex-col p-2 w-full"
                  >
                    <div className="w-full flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex flex-col items-start">
                          <p
                            className="text-stone-800 font-medium"
                            style={{ fontSize: '11px' }}
                          >
                            $
                            {parseFloat(trx?.total / 100)?.toLocaleString(
                              undefined,
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )}
                          </p>
                        </div>
                      </div>
                      {seeTx === `tx${trx?._id}` ? (
                        <ChevronDown size={14} />
                      ) : (
                        <ChevronRight size={14} />
                      )}
                    </div>

                    <div
                      className={`transition-[max-height] duration-300 ease-in-out overflow-hidden w-full ${
                        seeTx === `tx${trx?._id}` ? 'max-h-96' : 'max-h-0'
                      }`}
                    >
                      <Timeline
                        className="text-left mt-4 ml-1"
                        pending={false}
                        items={[
                          {
                            dot: <Send size={12} className="text-stone-800" />,
                            position: 'left',
                            children: (
                              <p className="text-xs text-stone-800 pt-1">
                                Invoice sent{' '}
                                <span className="font-semibold">
                                  $
                                  {parseFloat(
                                    trx?.amount / 100
                                  )?.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}
                                </span>
                              </p>
                            ),
                          },
                          {
                            dot: (
                              <CreditCard
                                size={12}
                                className="text-stone-800"
                              />
                            ),
                            position: 'left',
                            children: (
                              <p className="text-xs text-stone-800 pt-1">
                                Total paid{' '}
                                <span className="font-semibold">
                                  $
                                  {parseFloat(trx?.total / 100)?.toLocaleString(
                                    undefined,
                                    {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    }
                                  )}
                                </span>
                              </p>
                            ),
                          },
                          {
                            dot: (
                              <CheckCircle
                                size={12}
                                className="text-stone-800"
                              />
                            ),
                            children: (
                              <p className="text-xs text-stone-800 pt-1">
                                Transaction done{' '}
                                <span className="font-medium">
                                  {moment(trx?.doneOn).format('MMMM Do, yyyy')}
                                </span>
                              </p>
                            ),
                          },
                          {
                            dot: <X size={12} className="text-red-400" />,
                            position: 'left',
                            children: (
                              <p className="text-xs text-stone-800 pt-1">
                                {taxType}{' '}
                                <span className="font-semibold">
                                  ${(trx?.tax?.amount / 100).toFixed(2)}
                                </span>
                              </p>
                            ),
                          },
                          {
                            dot: <X size={12} className="text-red-400" />,
                            position: 'left',
                            children: (
                              <p className="text-xs text-stone-800 pt-1">
                                Bizvo fee{' '}
                                <span className="font-semibold">
                                  ${(trx?.bizvoFee / 100).toFixed(2)}
                                </span>
                              </p>
                            ),
                          },
                          {
                            dot: <X size={12} className="text-red-400" />,
                            position: 'left',
                            children: (
                              <p className="text-xs text-stone-800 pt-1">
                                Processing fee{' '}
                                <span className="font-semibold">
                                  ${(trx?.stripeFee / 100).toFixed(2)}
                                </span>
                              </p>
                            ),
                          },
                          {
                            dot: (
                              <DollarSign
                                size={12}
                                className="text-stone-800"
                              />
                            ),
                            position: 'left',
                            children: (
                              <p className="text-xs text-stone-800 pt-1">
                                You earn{' '}
                                <span className="font-semibold">
                                  $
                                  {parseFloat(
                                    trx?.earned / 100
                                  )?.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}
                                </span>
                              </p>
                            ),
                          },
                        ]}
                      />
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="h-64 w-full flex items-center justify-center">
                <p className="text-xs text-stone-800">No transactions</p>
              </div>
            )}
          </TabPanel>
        </Tabs>
      </div>
    );
  }

  return content;
};

export default Desktop;
