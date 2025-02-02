import React, { useState } from 'react';
import BackBtn from '../../../components/BackBtn';
import Select from 'react-select';
import { Spinner } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { AlertOctagon, CheckCircle, Layers } from 'react-feather';

const Mobile = ({
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
    <div className="flex flex-col w-full mx-auto p-4">
      {isLoading ? (
        <div className="w-full h-52 flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="w-full flex flex-col items-start mx-auto mt-10">
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
          <div className="mx-auto flex flex-col w-full gap-4 p-2 border border-gray-200 bg-white rounded-md">
            <div className="flex gap-1 w-full">
              <BackBtn direction={'left'} />
              <div className="flex flex-col items-start w-full">
                <p className="text-md text-stone-800 font-medium">Message</p>
                <p className="text-stone-800 text-xs">Send a message below</p>
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
                    className={`border text-xs text-stone-800 border-gray-200 focus:bg-gray-200 hover:bg-gray-200 focus:border-gray-200 focus:outline-none focus:ring-0 w-full rounded-md p-2 outline-none bg-gray-50`}
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
                      backgroundColor: 'rgb(249 250 251)',
                      color: 'black',
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
                  className={`border text-stone-800 text-xs border-gray-200 focus:bg-gray-200 hover:bg-gray-200 focus:border-gray-200 w-full focus:outline-none focus:ring-0 rounded-md p-2 outline outline-0 bg-gray-50 h-20 resize-none`}
                  placeholder="How can we help?"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  maxLength={100}
                />
              </div>
              <button
                type="submit"
                className="w-full p-2 text-stone-800 font-medium border border-stone-800 rounded-md text-xs"
                disabled={isLoading}
              >
                Send
              </button>
            </form>
          </div>
          <div className="w-full flex justify-end mt-1">
            <p className="text-stone-800 text-xs">
              Email developer{' '}
              <span className="font-semibold">justin@bizvo.io</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mobile;
