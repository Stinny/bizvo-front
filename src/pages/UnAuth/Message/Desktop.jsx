import React, { useState } from 'react';
import BackBtn from '../../../components/BackBtn';
import Select from 'react-select';
import { Spinner } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { AlertOctagon, CheckCircle, Layers } from 'react-feather';

const Desktop = ({
  email,
  body,
  about,
  setEmail,
  setBody,
  setAbout,
  error,
  isLoading,
  sent,
  handleSubmitMsg,
}) => {
  const options = [
    { value: 'invoices', label: 'Invoices' },
    { value: 'customers', label: 'Customers' },
    { value: 'payouts', label: 'Payouts' },
    { value: 'payments', label: 'Payments' },
    { value: 'account', label: 'Account' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="flex flex-col max-w-3xl mx-auto mt-32">
      {isLoading ? (
        <div className="w-full h-52 flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="w-80 flex flex-col items-start mx-auto">
          <div className="w-full flex items-center justify-center mb-4">
            <Link to="/">
              <p
                className="font-bold text-stone-800 dark:text-white text-sm flex items-center gap-1"
                style={{ fontFamily: 'Geist Mono' }}
              >
                <Layers size={16} className="font-black dark:text-white" />
                Bizvo
              </p>
            </Link>
          </div>
          <div className="mx-auto flex flex-col w-80 gap-4 p-2 border border-gray-200 bg-white rounded-sm">
            <div className="flex gap-1 w-full">
              <BackBtn direction={'left'} />
              <div className="flex flex-col items-start w-full">
                <p className="text-md text-stone-800 font-medium">Need Help?</p>
                <p className="text-stone-800 text-xs">Message us below</p>
              </div>
            </div>
            {error ? (
              <div className="w-full flex items-center justify-start gap-2 border border-gray-200 rounded-md p-2">
                <AlertOctagon size={16} className="text-red-400" />
                <p className="text-stone-800 text-xs">{error}</p>
              </div>
            ) : (
              ''
            )}
            {sent && (
              <div className="w-full flex items-center justify-start gap-2 bg-white border border-gray-200 rounded-md p-2">
                <CheckCircle size={16} className="text-green-500" />
                <p className="text-stone-800 text-xs">Message was sent</p>
              </div>
            )}
            <form
              onSubmit={handleSubmitMsg}
              className="flex flex-col items-start gap-2 w-full"
            >
              <div className="flex flex-col gap-2 items-start w-full">
                <div className="flex flex-col items-start w-full">
                  <input
                    type="text"
                    className={`border text-xs border-gray-200 focus:bg-gray-50 hover:bg-gray-50 focus:border-gray-200 focus:outline-none focus:ring-0 w-full rounded-sm p-2 outline-none`}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <Select
                  options={options}
                  onChange={(value) => setAbout(value)}
                  value={about}
                  placeholder="About"
                  menuPortalTarget={document.body}
                  menuPosition={'fixed'}
                  isSearchable={false}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderColor: 'rgb(229 231 235)',
                      backgroundColor: '#ffffff',
                      borderWidth: 1,
                      '&:hover': {
                        backgroundColor: 'rgb(249 250 251)', // Keep the same border color on hover
                      },
                      '&:focus': {
                        backgroundColor: 'rgb(249 250 251)', // Keep the same border color on hover
                      },
                      fontSize: '12px',
                      borderRadius: '.250rem',
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
                  className={`border text-xs border-gray-200 focus:bg-gray-50 hover:bg-gray-50 focus:border-gray-200 w-full focus:outline-none focus:ring-0 rounded-sm p-2 outline-0  h-20 resize-none`}
                  placeholder="How can we help?"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  maxLength={100}
                />
              </div>
              <button
                type="submit"
                className="w-full p-2 text-stone-800 font-medium border border-stone-800 rounded-sm text-xs"
                disabled={isLoading}
              >
                Send
              </button>
            </form>
          </div>
          <div className="w-full flex justify-end mt-1">
            <p className="text-stone-800 text-xs">
              Or email <span className="font-medium">justin@bizvo.io</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Desktop;
