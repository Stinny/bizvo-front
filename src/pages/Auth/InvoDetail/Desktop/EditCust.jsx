import React from 'react';
import Select from 'react-select';
import { Plus } from 'react-feather';
import { Link } from 'react-router-dom';

const EditCust = ({ custOpts, setCustomer, customer, amount, setAmount }) => {
  return (
    // <div className="w-full flex flex-col items-center justify-center h-52">
    //   <div className="flex flex-col items-start text-left w-72">
    //     <p className="text-xs text-stone-700">Who will this be sent to?</p>
    //     <div className="flex flex-col gap-2 items-center w-full">
    //       <Select
    //         options={custOpts}
    //         onChange={(value) => setCustomer(value)}
    //         value={customer}
    //         placeholder="Customer"
    //         menuPortalTarget={document.body}
    //         menuPosition={'fixed'}
    //         isSearchable
    //         styles={{
    //           control: (baseStyles, state) => ({
    //             ...baseStyles,
    //             borderColor: 'rgb(229 231 235)',
    //             backgroundColor: 'rgb(249 250 251)',
    //             borderWidth: 1,
    //             '&:hover': {
    //               backgroundColor: 'rgb(229 231 235)', // Keep the same border color on hover
    //             },
    //             '&:focus': {
    //               backgroundColor: 'rgb(229 231 235)', // Keep the same border color on hover
    //             },
    //             fontSize: '12px',
    //             borderRadius: '.375rem',
    //             boxShadow: 'none',
    //             zIndex: 999,
    //             position: 'relative',
    //             height: 34,
    //             minHeight: 34,
    //           }),
    //           indicatorsContainer: (provided) => ({
    //             ...provided,
    //             height: 34,
    //           }),
    //           menuPortal: (provided) => ({
    //             ...provided,
    //             zIndex: 999,
    //             fontSize: '12px',
    //           }),
    //           option: (provided, state) => ({
    //             ...provided,
    //             backgroundColor: state.isSelected
    //               ? 'rgb(229 231 235)'
    //               : state.isFocused
    //               ? 'rgb(249 250 251)'
    //               : '',
    //             color: 'black',
    //           }),
    //         }}
    //         className="w-full text-left"
    //       />
    //       <p className="text-xs text-stone-800 font-bold">or</p>
    //       <Link
    //         to="/dashboard/customers/add"
    //         className="p-1 flex gap-1 text-xs text-stone-800 items-center bg-white border border-stone-800 rounded-md"
    //       >
    //         New Customer <Plus size={12} />
    //       </Link>
    //     </div>
    //   </div>
    // </div>
    <div className="flex flex-col items-center justify-center gap-4 h-72 w-full">
      <div className="flex flex-col items-start w-52">
        <p className="text-xs text-stone-700">Who will this be sent to?</p>
        <div className="flex gap-2 items-center w-full">
          <div className="flex flex-col items-start w-9/12">
            <Select
              options={custOpts}
              onChange={(value) => setCustomer(value)}
              value={customer}
              placeholder="Customer"
              menuPortalTarget={document.body}
              menuPosition={'fixed'}
              isSearchable
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
                  height: 34,
                  minHeight: 34,
                }),
                indicatorsContainer: (provided) => ({
                  ...provided,
                  height: 34,
                }),
                menuPortal: (provided) => ({
                  ...provided,
                  zIndex: 999,
                  fontSize: '12px',
                }),
                input: (base) => ({
                  ...base,
                  'input:focus': {
                    boxShadow: 'none',
                  },
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

          <Link
            to="/dashboard/customers/add"
            className="p-2 flex justify-center items-center w-3/12 text-xs text-stone-800 bg-white border border-stone-800 rounded-md"
          >
            <Plus size={12} />
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-start w-52">
        <p className="text-xs text-stone-700">Amount to charge:</p>
        <input
          type="number"
          placeholder="Amount"
          className="border text-xs border-gray-200 bg-gray-50 focus:border-gray-200 focus:outline-none text-stone-800 hover:bg-gray-200 hover:border-gray-200 focus:bg-gray-200 focus:ring-0 w-full rounded-md p-2"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
        />
      </div>
    </div>
  );
};

export default EditCust;
