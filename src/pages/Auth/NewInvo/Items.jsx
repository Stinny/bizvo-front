import React, { useState } from 'react';
import { Plus } from 'react-feather';

const Items = ({ items, setItems }) => {
  const [itemTitle, setItemTitle] = useState('');
  const [itemPrice, setItemPrice] = useState(0);
  const [itemQty, setItemQty] = useState(0);

  //handler function to add item to items array
  const handleAddItem = () => {};

  return (
    <div className="w-full flex flex-col">
      <div className="flex gap-1">
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Title"
            className="border text-xs border-gray-200 bg-gray-50 focus:border-gray-200 focus:outline-none text-stone-800 hover:bg-gray-200 hover:border-gray-200 focus:bg-gray-200 focus:ring-0 w-full rounded-md p-2"
            //   onChange={(e) => setPhone(e.target.value)}
            //   value={phone}
          />
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Qty"
              className="border text-xs border-gray-200 bg-gray-50 focus:border-gray-200 focus:outline-none text-stone-800 hover:bg-gray-200 hover:border-gray-200 focus:bg-gray-200 focus:ring-0 w-full rounded-md p-2"
              //   onChange={(e) => setPhone(e.target.value)}
              //   value={phone}
            />
            <input
              type="number"
              placeholder="Price"
              className="border text-xs border-gray-200 bg-gray-50 focus:border-gray-200 focus:outline-none text-stone-800 hover:bg-gray-200 hover:border-gray-200 focus:bg-gray-200 focus:ring-0 w-full rounded-md p-2"
              // onChange={(e) => setPhone(e.target.value)}
              // value={phone}
            />
          </div>
        </div>
        <button
          type="button "
          className="w-14 flex-grow border border-stone-800 rounded-md flex items-center justify-center"
        >
          <Plus size={12} />
        </button>
      </div>
    </div>
  );
};

export default Items;
