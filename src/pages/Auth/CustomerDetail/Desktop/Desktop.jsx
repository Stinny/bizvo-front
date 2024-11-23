import React, { useState } from 'react';
import Navbar from '../../../../components/Navbar/Navbar';
import Sidenav from '../../../../components/Sidenav/Sidenav';
import Footer from '../../../../components/Footer/Footer';
import Edit from './Edit';
import { Spinner } from 'flowbite-react';
import { AlertOctagon, Edit as EditIcon } from 'react-feather';
import { useEditCustomerMutation } from '../../../../api/customersApiSlice';
import { showNotification } from '../../../../api/toastSlice';
import { useDispatch } from 'react-redux';

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

  //edit customer API hook
  const [editCustomer, { isLoading: editing }] = useEditCustomerMutation();

  //hanlder function to save edits
  const handleSaveEdits = async () => {
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
        refetch();
        setEdit(false);
      }
    } catch (err) {
      setError('Server error');
      return;
    }
  };

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
    <div className="w-10/12 bg-white border rounded-md border-gray-200 p-2 flex flex-col gap-4 items-start">
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col items-start">
          <p className="text-sm text-stone-800">Customer: {customer?._id}</p>
          <p className="text-xs text-stone-700">View and edit this customer</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setEdit(!edit)}
            className="text-stone-800"
          >
            <EditIcon size={16} />
          </button>
        </div>
      </div>
      <form className="flex items-start gap-2 w-full">
        <div className="flex flex-col gap-2 items-start w-full">
          <div className="flex flex-col items-start w-full">
            <p className="text-xs text-stone-700">Name</p>
            <input
              type="text"
              placeholder="Name"
              className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2"
              disabled
              value={name}
            />
          </div>
          <div className="flex flex-col items-start w-full">
            <p className="text-xs text-stone-700">Email</p>
            <input
              type="email"
              placeholder="Email"
              className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2"
              disabled
              value={email}
            />
          </div>
          <div className="flex flex-col items-start w-full">
            <p className="text-xs text-stone-700">Phone</p>
            <input
              type="tel"
              placeholder="(123)-456-7890"
              className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2"
              disabled
              value={phone}
            />
          </div>
          <div className="flex flex-col items-start w-full">
            <p className="text-xs text-stone-700">Description</p>
            {desc ? (
              <textarea
                placeholder="About this customer.."
                className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2 resize-none h-24"
                disabled
                value={desc}
              />
            ) : (
              <div className="bg-gray-50 w-full h-20 flex items-center justify-center border border-gray-50 rounded-md">
                <p className="text-xs text-stone-700">No description</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 items-start w-full">
          <div className="flex flex-col items-start w-full">
            <p className="text-xs text-stone-700">Country</p>
            <input
              type="text"
              placeholder="(123)-456-7890"
              className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2"
              disabled
              value={country?.label}
            />
          </div>
          <div className="flex flex-col items-start w-full">
            <p className="text-xs text-stone-700">Address</p>
            <input
              type="text"
              placeholder="Address"
              className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2"
              disabled
              value={address}
            />
          </div>
          <div className="flex flex-col items-start w-full">
            <p className="text-xs text-stone-700">Postal Code</p>
            <input
              type="text"
              placeholder="Postal code"
              className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2"
              disabled
              value={zip}
            />
          </div>
        </div>
      </form>
    </div>
  );

  return content;
};

export default Desktop;
