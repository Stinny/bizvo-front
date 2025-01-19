import { Spinner } from 'flowbite-react';
import React, { useState } from 'react';
import { AlertOctagon, X } from 'react-feather';
import Modal from 'react-modal';
import { useSendInvoiceMutation } from '../../api/invoicesApiSlice';
import { showNotification } from '../../api/toastSlice';
import { useDispatch } from 'react-redux';

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

const SendModal = ({
  invoId,
  invoEmail,
  open,
  setOpen,
  refetch,
  currentUser,
}) => {
  const dispatch = useDispatch();

  const [error, setError] = useState('');

  //hook for sending invoice
  const [sendInvoice, { isLoading: isSending }] = useSendInvoiceMutation();

  //hanlder function to send invoice
  const handleSendInvo = async () => {
    try {
      const sendReq = await sendInvoice({
        invoiceId: invoId,
      }).unwrap();

      if (sendReq === 'Invoice sent') {
        dispatch(showNotification('Invoice sent'));
        setOpen(false);
        refetch();
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

  return (
    <Modal
      isOpen={open}
      onRequestClose={() => setOpen(false)}
      style={customStyles}
      contentLabel="Send invo modal"
    >
      {isSending ? (
        <div className="w-80 h-52 flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          {!currentUser?.bankAdded && !currentUser?.stripeOnboard ? (
            <div className="w-80 flex flex-col gap-4 items-start">
              <div className="w-full flex items-start justify-between">
                <div className="flex flex-col items-start">
                  <p className="text-sm text-stone-800">Send Invoice</p>

                  <p className="text-xs text-stone-800">#{invoId}</p>
                </div>
                <X
                  size={16}
                  className="text-red-400 hover:cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="w-full text-center flex flex-col items-center gap-1 p-2 border border-gray-200 rounded-md">
                <AlertOctagon size={16} className="text-red-400" />
                <p className="text-xs text-stone-800">
                  You need to connect a payout option in settings before sending
                  invoices.
                </p>
              </div>
            </div>
          ) : (
            <div className="w-80 flex flex-col gap-4 items-start">
              <div className="w-full flex items-start justify-between">
                <div className="flex flex-col items-start">
                  <p className="text-sm text-stone-800">Send Invoice</p>

                  <p className="text-xs text-stone-800">#{invoId}</p>
                </div>
                <X
                  size={16}
                  className="text-red-400 hover:cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="flex flex-col items-start gap-2 w-full">
                <div className="flex flex-col items-start w-full">
                  <p className="text-xs text-stone-800">Sending to:</p>
                  <p className="text-xs text-stone-800">{invoEmail}</p>
                </div>
                <div className="w-full text-left flex flex-col items-start gap-1 p-2 border border-gray-200 rounded-md">
                  <AlertOctagon size={16} className="text-red-400" />
                  <p className="text-xs text-stone-800">
                    After sending only title, description, and due date can be
                    changed
                  </p>
                </div>
              </div>
              <div className="w-full flex items-center justify-end">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className=" text-stone-800 rounded-md border border-stone-800 p-1 text-xs"
                    onClick={handleSendInvo}
                  >
                    Send Invoice
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </Modal>
  );
};

export default SendModal;
