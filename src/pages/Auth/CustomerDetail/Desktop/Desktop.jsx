import React, { useEffect, useState } from 'react';
import Navbar from '../../../../components/Navbar/Navbar';
import Sidenav from '../../../../components/Sidenav/Sidenav';
import Footer from '../../../../components/Footer/Footer';
import Edit from './Edit';
import {
  AlertOctagon,
  ChevronDown,
  ChevronRight,
  CreditCard,
  Edit as EditIcon,
  Send,
} from 'react-feather';
import { useEditCustomerMutation } from '../../../../api/customersApiSlice';
import { showNotification } from '../../../../api/toastSlice';
import { useDispatch } from 'react-redux';
import ReactCountryFlag from 'react-country-flag';
import { Tooltip } from 'flowbite-react';
import BackBtn from '../../../../components/BackBtn';

const Desktop = ({ customer, refetch }) => {
  const dispatch = useDispatch();
  //form state
  const [name, setName] = useState(customer?.name);
  const [email, setEmail] = useState(customer?.email);
  const [phone, setPhone] = useState(customer?.phone);
  const [country, setCountry] = useState(customer?.country);
  const [address, setAddress] = useState(customer?.address);
  const [zip, setZip] = useState(customer?.zipcode);
  const [desc, setDesc] = useState(customer?.description);
  const [error, setError] = useState('');
  const [edit, setEdit] = useState(false);
  const [viewPay, setViewPay] = useState(false);

  //edit customer API hook
  const [editCustomer, { isLoading: editing }] = useEditCustomerMutation();

  //hanlder function to save edits
  const handleSaveEdits = async (e) => {
    e.preventDefault();

    //clear any errors
    setError('');

    try {
      const editCustomerReq = await editCustomer({
        email: email,
        name: name,
        phone: phone,
        country: country,
        address: address,
        zip: zip,
        desc: desc,
        customerId: customer?._id,
      }).unwrap();

      if (editCustomerReq === 'Customer edited') {
        dispatch(showNotification('Customer updated'));
        setEdit(false);
        refetch();
      } else if (editCustomerReq === 'Invalid address') {
        setError('Invalid address details');
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
  }, [name, email, address, zip, country, phone]);

  let content;

  content = edit ? (
    <Edit
      name={name}
      setName={setName}
      email={email}
      setEmail={setEmail}
      phone={phone}
      setPhone={setPhone}
      country={country}
      setCountry={setCountry}
      address={address}
      setAddress={setAddress}
      zip={zip}
      setZip={setZip}
      desc={desc}
      setDesc={setDesc}
      error={error}
      edit={edit}
      setEdit={setEdit}
      customerId={customer?._id}
      handleSaveEdits={handleSaveEdits}
    />
  ) : (
    <div className="w-10/12 bg-white border rounded-md border-gray-200 p-2 pb-6 flex flex-col gap-4 items-center justify-center">
      <div className="w-full flex items-center justify-between relative">
        <div className="flex gap-1">
          <BackBtn direction={'left'} />
          <div className="flex flex-col items-start">
            <p className="text-sm text-stone-800">Viewing Customer</p>

            <p className="text-xs text-stone-700">#{customer?._id}</p>
          </div>
        </div>
        <Tooltip
          content={
            <p className="text-xs text-stone-800 text-left">
              {customer?.totalSent === 1
                ? '1 invoice has been sent to this customer'
                : `${customer?.totalSent} invoices have been sent to this customer`}
            </p>
          }
          style="light"
          className="w-52"
          arrow={false}
        >
          <button
            type="button"
            disabled
            className="text-xs text-stone-800 flex items-center justify-center gap-1"
          >
            {customer?.totalSent}
            <Send size={12} />
          </button>
        </Tooltip>
        <div className="w-24"></div>
        <div className="absolute top-0 right-0 mr-1 mt-1">
          <button
            type="button"
            onClick={() => setEdit(!edit)}
            className="text-stone-800"
          >
            <EditIcon size={14} />
          </button>
        </div>
      </div>
      <form className="w-72">
        <div className="flex flex-col gap-4 items-start w-full">
          <div className="flex flex-col items-start w-full gap-1">
            <p className="text-xs text-stone-800">Name</p>
            <input
              type="text"
              placeholder="Name"
              className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2"
              disabled
              value={name}
            />
          </div>
          <div className="flex flex-col items-start w-full gap-1">
            <p className="text-xs text-stone-800">
              {phone?.length ? 'Email & Phone' : 'Email'}
            </p>
            <input
              type="email"
              placeholder="Email"
              className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2"
              disabled
              value={email}
            />
            {phone ? (
              <div className="flex flex-col items-start w-full">
                <input
                  type="tel"
                  placeholder="(123)-456-7890"
                  className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2"
                  disabled
                  value={phone}
                />
              </div>
            ) : (
              ''
            )}
          </div>
          <div className="flex flex-col items-start w-full gap-1">
            <p className="text-xs text-stone-800">Address</p>
            <input
              type="text"
              placeholder="Address"
              className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2"
              disabled
              value={address}
            />
          </div>
          <div className="flex items-center gap-2 w-full">
            <div className="flex flex-col items-start w-8/12 gap-1">
              <p className="text-xs text-stone-800">Country</p>

              <div className="flex w-full">
                <input
                  type="text"
                  className="border w-full text-xs bg-gray-50 border-gray-50 rounded-tl-md rounded-bl-md p-2 flex-1 overflow-hidden"
                  value={country?.label}
                  disabled
                />
                <div className="rounded-tr-md rounded-br-md bg-gray-50 border border-l-0 border-gray-50 flex items-center justify-center p-1 pr-2">
                  <Tooltip
                    arrow={false}
                    style="light"
                    content={
                      <p className="text-xs text-stone-800">{country?.label}</p>
                    }
                  >
                    <ReactCountryFlag countryCode={country?.value} />
                  </Tooltip>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start w-4/12 gap-1">
              <p className="text-xs text-stone-800">Postal</p>
              <input
                type="text"
                placeholder="Postal code"
                className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2"
                disabled
                value={zip}
              />
            </div>
          </div>
          {desc?.length ? (
            <div className="flex flex-col items-start w-full gap-1">
              <p className="text-xs text-stone-800">Description</p>
              <textarea
                placeholder="About this customer.."
                className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2 resize-none h-16"
                disabled
                value={desc}
              />
            </div>
          ) : (
            ''
          )}
          {customer?.payment?.id ? (
            <div className="flex flex-col gap-1 items-start w-full">
              <p className="text-xs text-stone-800">Payment Method</p>
              <button
                type="button"
                onClick={() => setViewPay(!viewPay)}
                className="w-full flex flex-col bg-gray-50 items-start text-left border border-gray-50 rounded-md p-2"
              >
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-stone-800">
                      {customer?.payment?.id}
                    </p>
                  </div>
                  {viewPay ? (
                    <ChevronDown size={14} />
                  ) : (
                    <ChevronRight size={14} />
                  )}
                </div>

                <div
                  className={`transition-[max-height] duration-300 ease-in-out overflow-hidden ${
                    viewPay ? 'max-h-40' : 'max-h-0'
                  }`}
                >
                  <p className="text-xs text-stone-800 mt-4">Type</p>
                  <p className="text-xs text-stone-800 flex items-center gap-1 mt-1">
                    <CreditCard size={12} />
                    {customer?.payment?.brand}
                  </p>
                  <p className="text-xs text-stone-800 mt-2">Last 4</p>
                  <p className="text-xs text-stone-800">
                    xxxx xxxx xxxx {customer?.payment?.lastFour}
                  </p>
                </div>
              </button>
            </div>
          ) : (
            ''
          )}
        </div>
      </form>
    </div>
  );

  return content;
};

export default Desktop;
