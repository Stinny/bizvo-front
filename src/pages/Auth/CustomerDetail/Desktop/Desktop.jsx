import React, { useEffect, useState } from 'react';
import Navbar from '../../../../components/Navbar/Navbar';
import Sidenav from '../../../../components/Sidenav/Sidenav';
import Footer from '../../../../components/Footer/Footer';
import Edit from './Edit';
import { Edit as EditIcon, Send, Trash, X } from 'react-feather';
import { useEditCustomerMutation } from '../../../../api/customersApiSlice';
import { showNotification } from '../../../../api/toastSlice';
import { useDispatch } from 'react-redux';
import ReactCountryFlag from 'react-country-flag';
import { Tooltip } from 'flowbite-react';
import BackBtn from '../../../../components/BackBtn';
import { Spin } from 'antd';
import Modal from 'react-modal';
import Delete from './Delete';

const customStyles = {
  content: {
    top: '30%',
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
  const [del, setDel] = useState(false);

  //edit customer API hook
  const [editCustomer, { isLoading: editing }] = useEditCustomerMutation();

  const handleCancelEdits = (e) => {
    setEdit(false);
    setName(customer?.name);
    setCountry(customer?.country);
    setEmail(customer?.email);
    setPhone(customer?.phone);
    setAddress(customer?.address);
    setZip(customer?.zipcode);
    setDesc(customer?.description);
  };

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
      handleCancelEdits={handleCancelEdits}
    />
  ) : (
    <div className="w-full bg-white border rounded-sm border-gray-200 p-2 pb-6 flex flex-col gap-4 items-center justify-center">
      <Delete customer={customer} del={del} setDel={setDel} refetch={refetch} />
      <div className="w-full flex items-center justify-between relative">
        <div className="flex gap-1">
          <BackBtn direction={'left'} />
          <div className="flex flex-col items-start">
            <p className="text-sm text-stone-800">Viewing Customer</p>

            <p className="text-xs text-stone-800">{customer?._id}</p>
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
            className="text-xs text-stone-800 flex items-center justify-center gap-1 border border-gray-200 rounded-sm p-0.5 pl-1 pr-1"
          >
            <Send size={12} />
            {customer?.totalSent}
          </button>
        </Tooltip>
        <div className="w-24"></div>
        <div className="absolute top-0 right-0 mr-1 mt-1 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setDel(true)}
            className="text-red-400 hover:cursor-pointer"
          >
            <Trash size={14} />
          </button>
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
              className="text-xs border border-gray-200 focus:outline-none text-stone-800 ring-0 w-full rounded-sm p-2"
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
              className="text-xs border border-gray-200 focus:outline-none text-stone-800 ring-0 w-full rounded-sm p-2"
              disabled
              value={email}
            />
            {phone ? (
              <div className="flex flex-col items-start w-full">
                <input
                  type="tel"
                  placeholder="(123)-456-7890"
                  className="text-xs border border-gray-200 focus:outline-none text-stone-800 ring-0 w-full rounded-sm p-2"
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
              className="text-xs border border-gray-200 focus:outline-none text-stone-800 ring-0 w-full rounded-sm p-2"
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
                  className="border w-full text-xs border-gray-200 border-r-0 rounded-tl-sm rounded-bl-sm p-2 flex-1 overflow-hidden"
                  value={country?.label}
                  disabled
                />
                <div className="rounded-tr-sm rounded-br-sm border border-l-0 border-gray-200 flex items-center justify-center p-1 pr-2">
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
                className="text-xs border border-gray-200 focus:outline-none text-stone-800 ring-0 w-full rounded-sm p-2"
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
                className="text-xs border border-gray-200 focus:outline-none text-stone-800 ring-0 w-full rounded-sm p-2 resize-none h-16"
                disabled
                value={desc}
              />
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
