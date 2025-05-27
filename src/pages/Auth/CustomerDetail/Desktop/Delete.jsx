import React from 'react';
import { useDeleteCustomerMutation } from '../../../../api/customersApiSlice';
import { useNavigate } from 'react-router-dom';
import { showNotification } from '../../../../api/toastSlice';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { Spin } from 'antd';
import { X } from 'react-feather';

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

const Delete = ({ customer, del, setDel }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //delete customer API hook
  const [deleteCustomer, { isLoading }] = useDeleteCustomerMutation();

  //handler function for deleting customer
  const handleDelete = async () => {
    try {
      const deleteCustomerReq = await deleteCustomer({
        customerId: customer?._id,
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
    <Modal
      isOpen={del}
      onRequestClose={() => setDel(false)}
      style={customStyles}
      contentLabel="Cust Delete modal"
    >
      {isLoading ? (
        <div className="w-80 h-52 flex items-center justify-center">
          <Spin size="small" />
        </div>
      ) : (
        <div className="w-80 flex flex-col gap-2 items-start">
          <div className="w-full flex items-start justify-between">
            <div className="flex flex-col items-start">
              <p className="text-sm text-stone-800">Delete Customer</p>
              <p className="text-xs text-stone-800">
                Are you sure you want to delete this customer?
              </p>
            </div>
            <X
              size={16}
              className="text-red-400 hover:cursor-pointer"
              onClick={() => setDel(false)}
            />
          </div>
          <div className="flex flex-col items-start gap-1 w-full">
            <p className="text-xs text-stone-800">{customer?.name}</p>
            <p className="text-xs text-stone-800">{customer?.email}</p>
            <p className="text-xs text-stone-800">{customer?.country?.label}</p>
          </div>

          <div className="w-full flex items-center justify-end">
            <button
              type="button"
              className="border border-red-400 text-red-400 rounded-sm p-1 text-xs cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default Delete;
