import React, { useState } from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import Sidenav from '../../../components/Sidenav/Sidenav';
import Footer from '../../../components/Footer/Footer';
import BackBtn from '../../../components/BackBtn';
import Select from 'react-select';
import Cookies from 'js-cookie';

const Desktop = () => {
  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  const [email, setEmail] = useState(
    currentUser?.email ? currentUser?.email : ''
  );
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [blank, setBlank] = useState({});
  const [about, setAbout] = useState(location?.state?.data || undefined);

  const options = [
    { value: 'invoices', label: 'Invoices' },
    { value: 'customers', label: 'Customers' },
    { value: 'payouts', label: 'Payouts' },
    { value: 'payments', label: 'Payments' },
    { value: 'account', label: 'Account' },
    { value: 'other', label: 'Other' },
  ];

  const handleSubmitMsg = (e) => {};

  return (
    <div className="mx-auto max-w-3xl flex flex-col gap-2 h-screen relative">
      <Navbar />
      <div className="w-96 mx-auto flex flex-col items-start mt-32">
        <div className="flex flex-col items-start w-full">
          <p className="text-lg text-stone-800">Message Us</p>
          <p className="text-stone-700 text-sm">Send a message to us below!</p>
        </div>

        <div className="bg-white border rounded-md border-gray-200 p-2 w-full">
          <form
            onSubmit={handleSubmitMsg}
            className="flex flex-col items-start gap-2 w-full"
          >
            {error ? (
              <Alert color="failure" rounded icon={HiInformationCircle}>
                {error}
              </Alert>
            ) : (
              ''
            )}

            {blank.email || blank.name || blank.body ? (
              <div className="w-full flex items-center justify-start gap-2 border border-gray-200 rounded-md p-2">
                <X size={16} className="text-red-500" />
                <p className="text-stone-800 text-xs">
                  Please fill out all required feilds
                </p>
              </div>
            ) : (
              ''
            )}
            <div className="flex flex-col gap-2 items-start w-full">
              <div className="flex flex-col items-start w-full">
                <input
                  type="text"
                  className={`border text-xs ${
                    blank.email ? 'border-red-300' : 'border-gray-200'
                  } focus:bg-gray-200 hover:bg-gray-200 focus:border-gray-200 focus:outline-none focus:ring-0 w-full rounded-md p-2 outline-none bg-gray-50`}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <Select
                options={options}
                onChange={(value) => setAbout(value)}
                value={about}
                placeholder="Messaging about"
                menuPortalTarget={document.body}
                menuPosition={'fixed'}
                isSearchable={false}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: 'rgb(229 231 235)',
                    backgroundColor: 'rgb(249 250 251)',
                    borderWidth: 1,
                    '&:hover': {
                      backgroundColor: 'rgb(229 231 235)', // Keep the same border color on hover
                    },
                    '&:focus': {
                      backgroundColor: 'rgb(229 231 235)', // Keep the same border color on hover
                    },
                    fontSize: '12px',
                    borderRadius: '.375rem',
                    boxShadow: 'none',
                    zIndex: 999,
                    position: 'relative',
                    height: 35,
                    minHeight: 35,
                  }),
                  indicatorsContainer: (provided) => ({
                    ...provided,
                    height: 35,
                  }),
                  menuPortal: (provided) => ({
                    ...provided,
                    zIndex: 999,
                    fontSize: '12px',
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected
                      ? 'rgb(229 231 235)'
                      : state.isFocused
                      ? 'rgb(249 250 251)'
                      : '',
                    color: 'black',
                  }),
                }}
                className="w-full text-left"
              />
            </div>

            <div className="flex flex-col items-start w-full">
              <textarea
                type="text"
                className={`border text-xs ${
                  blank.body ? 'border-red-300' : 'border-gray-200'
                } focus:bg-gray-200 hover:bg-gray-200 focus:border-gray-200 w-full focus:outline-none focus:ring-0 rounded-md p-2 outline outline-0 bg-gray-50 h-24 resize-none`}
                placeholder="How can we help?"
                onChange={(e) => setBody(e.target.value)}
                maxLength={350}
              />
              <div className="w-full flex justify-end">
                <p className="text-xs text-stone-600">{body.length}/350</p>
              </div>
            </div>
            <button
              type="submit"
              className="w-full p-2 text-stone-800 font-bold border border-stone-800 rounded-md text-xs"
              disabled={submitting}
            >
              {submitting ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>
        <div className="flex justify-start text-left w-full">
          <p className="text-xs text-stone-700">
            Or email the builder{' '}
            <span className="font-bold">justin@bizvo.io</span>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Desktop;
