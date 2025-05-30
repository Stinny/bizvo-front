import { Avatar } from 'flowbite-react';
import React from 'react';
import { AlertOctagon, ExternalLink, X } from 'react-feather';
import Modal from 'react-modal';

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

const BizModal = ({ open, setOpen, biz }) => {
  return (
    <Modal
      isOpen={open}
      onRequestClose={() => setOpen(false)}
      style={customStyles}
      contentLabel="Biz profile modal"
    >
      <div className="w-80 flex flex-col gap-4 items-start">
        <div className="w-full flex items-start justify-between">
          <p className="text-stone-800 text-sm text-left">More on the sender</p>
          <X
            size={16}
            className="text-red-400 hover:cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>
        <div className="w-full flex items-start justify-between">
          <div className="w-full flex items-center gap-2">
            <div className="flex items-center justify-start">
              <Avatar size="md" img={biz?.logo} />
            </div>
            <div className="flex flex-col items-start">
              <p className="text-stone-800 text-sm text-left">{biz?.name}</p>
              <p className="text-stone-800 text-xs text-left">
                {biz?.paid} payments
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <div className="flex flex-col items-start gap-1 w-full">
            <p className="text-stone-800 text-xs text-left font-medium">
              Description
            </p>
            <p className="text-stone-800 text-xs text-left">{biz?.about}</p>
          </div>
          {biz?.link ? (
            <div className="flex flex-col items-start gap-1 w-full">
              <p className="text-stone-800 text-xs text-left font-medium">
                Link
              </p>
              <p className="text-stone-800 text-xs text-left flex items-center gap-1">
                https://bizvo.io <ExternalLink size={12} />
              </p>
            </div>
          ) : (
            ''
          )}
          <div className="flex flex-col items-start gap-1 w-full">
            <p className="text-stone-800 text-xs text-left font-medium">
              Location
            </p>
            <p className="text-stone-800 text-xs text-left">{biz?.country}</p>
          </div>
          <div className="flex flex-col items-start gap-1 w-full">
            <p className="text-stone-800 text-xs text-left font-medium">
              Contact
            </p>
            <p className="text-stone-800 text-xs text-left">{biz?.email}</p>
            <p className="text-stone-800 text-xs text-left">{biz?.phone}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BizModal;
