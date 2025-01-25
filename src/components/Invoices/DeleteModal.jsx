import { Spinner } from 'flowbite-react';
import React, { useState } from 'react';
import { AlertOctagon, X } from 'react-feather';
import Modal from 'react-modal';
import { useDeleteInvoiceMutation } from '../../api/invoicesApiSlice';
import { showNotification } from '../../api/toastSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    fontFamily: 'Geist',
    zIndex: 1000,
  },
  overlay: { zIndex: 1000 },
};
Modal.setAppElement('#root');

const DeleteModal = ({ invoId, open, setOpen, refetch }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState('');

  //hook for invoice delete API call
  const [deleteInvoice, { isLoading }] = useDeleteInvoiceMutation();

  const handleDeleteInvo = async () => {
    try {
      const deleteInvoReq = await deleteInvoice({
        invoiceId: invoId,
      }).unwrap();

      if (deleteInvoReq === 'Invoice deleted') {
        dispatch(showNotification('Invoice deleted'));
        navigate('/dashboard/invoices');
      }
    } catch (err) {
      setError('Server error');
      return;
    }
  };

  return (
    <Modal
      isOpen={open}
      onRequestClose={() => setOpen(false)}
      style={customStyles}
      contentLabel="Delete modal"
    >
      {isLoading ? (
        <div className="w-72 h-52 flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="w-72 flex flex-col gap-2 items-start">
          <div className="w-full flex items-start justify-between">
            <div className="flex flex-col items-start">
              <p className="text-sm text-stone-800">Delete Invoice</p>
              <p className="text-xs text-stone-800">Confirm deleting invoice</p>
            </div>
            <X
              size={16}
              className="text-red-400 hover:cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </div>
          <div className="flex flex-col gap-2 items-start w-full">
            <p className="text-xs text-stone-800">
              This is a draft invoice and has not been sent yet. Are you sure
              you want to delete?
            </p>
          </div>
          <div className="w-full flex items-center justify-end">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="border border-red-400 text-red-400 rounded-md p-1 text-xs"
                onClick={handleDeleteInvo}
              >
                Delete Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default DeleteModal;
