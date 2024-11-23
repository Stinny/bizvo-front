import React from 'react';
import { ChevronLeft, ChevronRight, Save, Trash } from 'react-feather';
import EditCust from './EditCust';
import EditDetails from './EditDetails';

const Edit = ({
  handleSaveEdits,
  custOpts,
  invoiceId,
  items,
  setItems,
  step,
  setStep,
  customer,
  setCustomer,
  title,
  setTitle,
  desc,
  setDesc,
  amount,
  setAmount,
  dueDate,
  setDueDate,
  error,
}) => {
  return (
    <div className="w-10/12 bg-white border rounded-md border-gray-200 p-2 flex flex-col gap-4 items-start">
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col items-start">
          <p className="text-sm text-stone-800">Editing invoice: {invoiceId}</p>
          <p className="text-xs text-stone-700">
            Edit details for this invoice before it is paid
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            // onClick={() => setDel(!del)}
            className="text-red-400 font-bold"
          >
            <Trash size={16} />
          </button>
          <div className="w-full flex justify-end">
            {step === 'cust' ? (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled
                  className="p-1 border border-gray-200 rounded-md text-gray-200"
                >
                  <ChevronLeft size={12} />
                </button>

                <button
                  type="button"
                  onClick={() => setStep('dets')}
                  className="p-1 border border-stone-800 rounded-md text-stone-800"
                >
                  <ChevronRight size={12} />
                </button>
              </div>
            ) : (
              ''
            )}
            {step === 'dets' ? (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setStep('cust')}
                  className="p-1 border border-stone-800 rounded-md text-stone-800"
                >
                  <ChevronLeft size={12} />
                </button>
                <button
                  type="button"
                  className="p-1 border border-gray-200 rounded-md text-gray-200"
                  disabled
                >
                  <ChevronRight size={12} />
                </button>
              </div>
            ) : (
              ''
            )}
          </div>
          {/* <button
            type="button"
            onClick={handleSaveEdits}
            className="text-stone-800 font-bold"
          >
            <Save size={16} />
          </button> */}
        </div>
      </div>

      {step === 'cust' ? (
        <EditCust
          custOpts={custOpts}
          customer={customer}
          setCustomer={setCustomer}
          amount={amount}
          setAmount={setAmount}
        />
      ) : (
        ''
      )}

      {step === 'dets' ? (
        <EditDetails
          items={items}
          setItems={setItems}
          title={title}
          setTitle={setTitle}
          desc={desc}
          setDesc={setDesc}
          dueDate={dueDate}
          setDueDate={setDueDate}
          handleSaveEdits={handleSaveEdits}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default Edit;
