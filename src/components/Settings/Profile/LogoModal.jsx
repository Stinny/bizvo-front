import React, { useRef, useState } from 'react';
import Modal from 'react-modal';
import { useUploadLogoMutation } from '../../../api/accountApiSlice';
import { Avatar, Spinner } from 'flowbite-react';
import { AlertOctagon, Upload } from 'react-feather';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    fontFamily: 'Roboto Mono',
    padding: '8px',
  },
};
Modal.setAppElement('#root');

const LogoModal = ({ open, setOpen, currentUser, refetch }) => {
  const fileInputRef = useRef(null);

  const [logo, setLogo] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState('');

  //hook for API call
  const [uploadLogo, { isLoading }] = useUploadLogoMutation();

  const handleCancel = () => {
    setSelectedImage(null);
    setLogo(null);
    setOpen(false);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  //handler to make req to server
  const handleUpload = async (e) => {
    e.preventDefault();

    setError('');

    try {
      const uploadReq = await uploadLogo(logo).unwrap();

      if (uploadReq === 'Logo updated') {
        setLogo(null);
        setSelectedImage(null);
        setOpen(false);
        refetch();
      } else {
        setError('Failed try again');
        return;
      }
    } catch (err) {
      setError('Failed try again');
      return;
    }
  };

  return (
    <Modal
      isOpen={open}
      onRequestClose={handleCancel}
      style={customStyles}
      contentLabel="Logo modal"
    >
      {isLoading ? (
        <div className="w-80 h-52 flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="w-80 flex flex-col gap-4 items-start">
          <div className="flex flex-col items-start">
            <p className="text-sm text-stone-800">Upload Logo</p>
            <p className="text-xs text-stone-700">Upload new business logo</p>
          </div>
          <div className="flex flex-col items-center gap-2 w-full">
            {error ? (
              <div className="w-full flex items-center justify-start gap-2 border border-gray-200 rounded-md p-2">
                <AlertOctagon size={16} className="text-red-400" />
                <p className="text-stone-800 text-xs">{error}</p>
              </div>
            ) : (
              ''
            )}
            <div className="flex items-center w-full justify-center gap-8">
              <div className="flex flex-col items-start">
                <p className="text-sm text-stone-800">Old</p>
                <Avatar size="md" img={currentUser?.logo?.url} />
              </div>
              <div className="flex flex-col items-start">
                <p className="text-sm text-stone-800">New</p>
                <Avatar size="md" img={selectedImage ? selectedImage : ''} />
              </div>
            </div>
            <div className="file-upload">
              <input
                style={{ display: 'none' }}
                ref={fileInputRef}
                type="file"
                onChange={handleImageChange}
              />
              <button
                onClick={handleButtonClick}
                className="text-xs rounded-md border border-stone-800 text-stone-800 p-0.5 pl-2 pr-2 flex items-center gap-1"
              >
                Upload Logo <Upload size={14} />
              </button>
            </div>
          </div>

          <div className="w-full flex items-center justify-end">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="border border-red-400 text-red-400 rounded-md p-0.5 pl-2 pr-2 text-xs"
                onClick={handleCancel}
              >
                Cancel
              </button>

              {logo ? (
                <button
                  type="button"
                  className=" text-stone-800 rounded-md border border-stone-800 p-0.5 pl-2 pr-2 text-xs"
                  onClick={handleUpload}
                >
                  Save
                </button>
              ) : (
                <button
                  type="button"
                  className=" text-gray-100 rounded-md border border-gray-100 p-0.5 pl-2 pr-2 text-xs"
                  disabled
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default LogoModal;
