import React, { useState } from 'react';
import Navbar from '../../../../components/Navbar/Navbar';
import Sidenav from '../../../../components/Sidenav/Sidenav';
import Footer from '../../../../components/Footer/Footer';
import Edit from './Edit';
import { Badge, Spinner } from 'flowbite-react';
import { Edit as EditIcon, Send } from 'react-feather';
import { useGetCustomerOptsQuery } from '../../../../api/customersApiSlice';
import { useEditInvoiceMutation } from '../../../../api/invoicesApiSlice';

const Desktop = ({ invoice, refetch }) => {
  //form state
  const [title, setTitle] = useState(invoice?.title);
  const [desc, setDesc] = useState(invoice?.description);
  const [customer, setCustomer] = useState({
    value: invoice?.customerId,
    label: invoice?.customer?.name,
  });
  const [items, setItems] = useState(invoice?.items);
  const [step, setStep] = useState('cust');
  const [error, setError] = useState('');
  const [edit, setEdit] = useState(false);

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
        items: items,
        invoiceId: invoice?._id,
      }).unwrap();

      if (editReq === 'Invoice updated') {
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
        error={error}
      />
    ) : (
      <div className="w-10/12 bg-white border rounded-md border-gray-200 p-2 flex flex-col gap-4 items-start">
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col items-start">
            <p className="text-sm text-stone-800">Invoice: {invoice?._id}</p>
            <p className="text-xs text-stone-700">View and edit this invoice</p>
          </div>
          <div className="flex items-center gap-2">
            {invoice?.paid ? (
              <Badge size="xs" color="success">
                Paid
              </Badge>
            ) : (
              <Badge size="xs" color="pink">
                Unpaid
              </Badge>
            )}
            {invoice?.sent ? (
              <Send size={16} className="text-stone-800" />
            ) : (
              <Send size={16} className="text-gray-200" />
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

        <div className="flex items-start gap-2 w-full">
          <div className="flex flex-col gap-2 w-full items-start">
            <div className="flex flex-col items-start w-full">
              <p className="text-xs text-stone-700">Customer</p>
              <div className="flex flex-col gap-1 items-start w-full bg-gray-50 p-2">
                <p className="text-xs text-stone-800">
                  {invoice?.customer?.name}
                </p>
                <p className="text-xs text-stone-800">
                  {invoice?.customer?.email}
                </p>
                <p className="text-xs text-stone-800">
                  {invoice?.customer?.address}
                </p>
              </div>
            </div>
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
                className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2 resize-none h-24"
                disabled
                value={desc}
              />
            </div>
          </div>
          <div className="flex flex-col w-full">
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
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl flex flex-col gap-2 relative h-screen">
      <Navbar />
      <div className="flex items-start gap-2">
        <Sidenav />
        {content}
      </div>
      <Footer />
    </div>
  );
};

export default Desktop;
