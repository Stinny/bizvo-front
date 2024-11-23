import React from 'react';
import { useDeleteCustomerMutation } from '../../../../api/customersApiSlice';
import { useNavigate } from 'react-router-dom';
import { showNotification } from '../../../../api/toastSlice';
import { useDispatch } from 'react-redux';

const Delete = ({ customerId, customerName, customerEmail, setDel }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //delete customer API hook
  const [deleteCustomer, { isLoading }] = useDeleteCustomerMutation();

  //handler function for deleting customer
  const handleDelete = async () => {
    try {
      const deleteCustomerReq = await deleteCustomer({
        customerId: customerId,
      }).unwrap();

      if (deleteCustomerReq === 'Customer deleted') {
        dispatch(showNotification('Customer deleted'));
        navigate('/dashboard/customers');
      }
    } catch (err) {
      setError('Server error');
      return;
    }
  };

  return (
    <div className="w-10/12 bg-white border rounded-md border-gray-200 p-2 flex flex-col gap-2 items-start">
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col items-start">
          <p className="text-sm text-stone-800">
            Deleting customer: {customerId}
          </p>
          <p className="text-xs text-stone-700">
            Are you sure you want to delete this customer?
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <div className="flex flex-col items-start">
          <p className="text-xs text-stone-700">Name</p>
          <p className="text-xs text-stone-800">{customerName}</p>
        </div>
        <div className="flex flex-col items-start">
          <p className="text-xs text-stone-700">Email</p>
          <p className="text-xs text-stone-800">{customerEmail}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setDel(false)}
          className="text-stone-800 font-bold text-xs border border-stone-800 rounded-md p-1"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={isLoading}
          className="text-red-400 font-bold p-1 text-xs border border-red-400 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Delete;
