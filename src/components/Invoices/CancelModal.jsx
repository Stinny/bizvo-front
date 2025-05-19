import { Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { AlertOctagon, X } from 'react-feather';
import Modal from 'react-modal';
import { useCancelInvoiceMutation } from '../../api/invoicesApiSlice';
import { showNotification } from '../../api/toastSlice';
import { useDispatch } from 'react-redux';

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

const CancelModal = ({ open, setOpen, invoId, refetch }) => {
  const dispatch = useDispatch();

  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const [cancelInvoice, { isLoading }] = useCancelInvoiceMutation();

  //hanlder function to send invoice
  const handleCancelInvo = async () => {
    setError('');

    if (!msg.trim()) {
      setError('Missing a reason');
      return;
    }

    try {
      const cancelReq = await cancelInvoice({
        invoId: invoId,
        msg: msg,
      }).unwrap();

      if (cancelReq === 'Invoice cancelled') {
        dispatch(showNotification('Invoice cancelled'));
        setOpen(false);
        refetch();
        return;
      } else {
        setError('There was an error');
        return;
      }
    } catch (err) {
      setError('There was an error');
      return;
    }
  };

  useEffect(() => {
    setError('');
  }, [msg]);

  return (
    <Modal
      isOpen={open}
      onRequestClose={() => setOpen(false)}
      style={customStyles}
      contentLabel="Cancel invo modal"
    >
      {isLoading ? (
        <div className="w-80 h-52 flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="w-80 flex flex-col gap-2 items-start">
          <div className="w-full flex items-start justify-between">
            <div className="flex flex-col items-start">
              <p className="text-sm text-stone-800">Cancel Invoice</p>
              <p className="text-xs text-stone-800">#{invoId}</p>
            </div>
            <X
              size={16}
              className="text-red-400 hover:cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </div>
          <div className="flex flex-col items-start gap-2 w-full">
            {error ? (
              <div className="w-full flex items-center justify-start gap-2 border border-gray-200 rounded-md p-2">
                <AlertOctagon size={16} className="text-red-400" />
                <p className="text-stone-800 text-xs">{error}</p>
              </div>
            ) : (
              ''
            )}
            <p className="text-xs text-stone-800">
              This invoice will not be able to accept payment. Are you sure you
              want to cancel?
            </p>
            <textarea
              placeholder="Reason for canceling"
              className="text-xs bg-white border border-gray-200 focus:ring-0 focus:border-gray-200 focus:outline-none focus:bg-gray-50 text-stone-800 ring-0 w-full rounded-sm p-2 resize-none h-16"
              onChange={(e) => setMsg(e.target.value)}
              value={msg}
            />
          </div>
          <div className="w-full flex items-center justify-end">
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={isLoading}
                onClick={handleCancelInvo}
                className=" text-stone-800 rounded-sm border border-stone-800 p-1 text-xs"
              >
                Cancel Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default CancelModal;
