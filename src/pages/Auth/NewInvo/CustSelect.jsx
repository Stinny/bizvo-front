import React from 'react';
import { Plus } from 'react-feather';
import { Link } from 'react-router-dom';
import Select from 'react-select';

const CustSelect = ({
  custOpts,
  setCustomer,
  customer,
  custSelected,
  amount,
  setAmount,
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-64">
      <div className="flex flex-col items-start w-52">
        <p className="text-xs text-stone-700">Amount to charge:</p>
        <div className="w-full flex items-center gap-0.5">
          <p className="text-sm text-stone-800">$</p>
          <input
            type="number"
            placeholder="Amount"
            className="text-xs bg-gray-50 border border-gray-200 focus:outline-none hover:bg-gray-200 focus:bg-gray-200 hover:border-gray-200 focus:border-gray-200 focus:ring-0 text-stone-800 ring-0 w-full rounded-md p-2 pl-0.5"
            onChange={(e) => setAmount(e.target.value)}
            value={amount > 0 ? amount : null}
          />
        </div>
      </div>
      <div className="flex flex-col items-start w-52">
        <p className="text-xs text-stone-700">Sending to:</p>
        <div className="flex gap-1 items-center w-full">
          <div className="flex flex-col items-start w-10/12">
            <Select
              options={custOpts}
              onChange={(value) => setCustomer(value)}
              value={custSelected ? customer : null}
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
                  height: 33,
                  minHeight: 33,
                }),
                indicatorsContainer: (provided) => ({
                  ...provided,
                  height: 33,
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
            className="p-2 flex justify-center items-center w-2/12 text-xs text-stone-800 bg-white border border-stone-800 rounded-md"
          >
            <Plus size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustSelect;
