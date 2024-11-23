import React from 'react';
import Items from './Items';
import DateInput from 'rsuite/DateInput';

const Details = ({
  handleSaveInvoice,
  items,
  setItems,
  title,
  setTitle,
  desc,
  setDesc,
  due,
  setDue,
}) => {
  return (
    <div className="flex justify-center items-center w-full h-72">
      <div className="flex flex-col gap-2 w-72">
        <div className="flex flex-col items-start w-full">
          <p className="text-xs text-stone-700">Title</p>
          <input
            type="text"
            placeholder="Title"
            className="border text-xs border-gray-200 bg-gray-50 focus:border-gray-200 focus:outline-none text-stone-800 hover:bg-gray-200 hover:border-gray-200 focus:bg-gray-200 focus:ring-0 w-full rounded-md p-2"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div className="flex flex-col items-start w-full">
          <p className="text-xs text-stone-700">Description</p>
          <textarea
            placeholder="What is this invoice for.."
            className="border border-gray-200 hover:border-gray-200 hover:bg-gray-200 focus:bg-gray-200 focus:border-gray-200 focus:ring-0 w-full h-24 rounded-md p-2 bg-gray-50 resize-none text-xs"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          />
        </div>
        <div className="flex flex-col items-start w-full">
          <p className="text-xs text-stone-700">Due Date</p>
          <DateInput
            onChange={(date, event) => setDue(date)}
            value={due}
            className="bg-gray-50 text-xs w-full border border-gray-200 rounded-md focus:bg-gray-200 focus:ring-0 focus:border-gray-200 focus-within:outline-0"
          />
        </div>
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={handleSaveInvoice}
            className="p-1 flex items-center border border-stone-800 text-stone-800 text-xs rounded-md"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleSaveInvoice}
            className="p-1 flex items-center border border-stone-800 text-stone-800 text-xs rounded-md"
          >
            Save & Send
          </button>
        </div>
      </div>
      {/* <div className="flex flex-col gap-2 w-6/12">
        <div className="flex flex-col items-start w-full">
          <p className="text-xs text-stone-700">Items</p>
          <Items items={items} setItems={setItems} />
        </div>
      </div> */}
    </div>
  );
};

export default Details;
