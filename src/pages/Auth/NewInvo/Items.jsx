import React, { useState } from 'react';
import { Plus, Trash, X } from 'react-feather';
import { PiClipboard } from 'react-icons/pi';

const Items = ({ items, setItems }) => {
  const [itemTitle, setItemTitle] = useState('');
  const [itemPrice, setItemPrice] = useState(0);
  const [itemQty, setItemQty] = useState(0);
  const [add, setAdd] = useState(false);

  //handler function to add item to items array
  const handleAddItem = () => {
    if (!itemTitle.trim() || itemQty === 0 || itemPrice === 0) {
      return;
    }
    const newItem = {
      id: Date.now(),
      title: itemTitle,
      price: parseFloat(itemPrice), // Ensure price is a number
      qty: parseInt(itemQty, 10), // Ensure quantity is a number
    };

    // Add the new item to the items array
    setItems((prevItems) => [...prevItems, newItem]);

    // Clear input fields after adding the item
    setItemTitle('');
    setItemPrice(0);
    setItemQty(0);
    setAdd(false);
  };

  const handleDeleteItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="w-full flex flex-col gap-1">
      {items?.length ? (
        <div className="flex flex-col w-full gap-1">
          {items?.map((item) => (
            <div className="w-full flex items-center gap-1">
              <div className="w-full p-2 bg-gray-50 border border-gray-200 rounded-md flex items-center">
                <div className="w-7/12 text-left">
                  <p className="text-xs text-stone-800">{item?.title}</p>
                </div>
                <div className="w-2/12 flex justify-end">
                  <p className="text-xs text-stone-800">x{item?.qty}</p>
                </div>
                <div className="w-3/12 flex justify-end">
                  <p className="text-xs text-stone-800">${item?.price}</p>
                </div>
              </div>
              <Trash
                onClick={() => handleDeleteItem(item?.id)}
                size={14}
                className="text-red-400 hover:cursor-pointer"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full bg-gray-50 border border-gray-200 rounded-md flex items-center justify-center h-16">
          <p className="text-xs text-stone-800">No items added</p>
        </div>
      )}
      {add ? (
        <div className="flex gap-1">
          <div className="flex flex-col gap-1">
            <input
              type="text"
              placeholder="Title"
              className="border text-xs border-gray-200 bg-gray-50 focus:border-gray-200 focus:outline-none text-stone-800 hover:bg-gray-200 hover:border-gray-200 focus:bg-gray-200 focus:ring-0 w-full rounded-md p-2"
              onChange={(e) => setItemTitle(e.target.value)}
              value={itemTitle}
            />
            <div className="flex items-center gap-1">
              <input
                type="number"
                placeholder="Qty"
                className="border text-xs border-gray-200 bg-gray-50 focus:border-gray-200 focus:outline-none text-stone-800 hover:bg-gray-200 hover:border-gray-200 focus:bg-gray-200 focus:ring-0 w-full rounded-md p-2"
                onChange={(e) => setItemQty(e.target.value)}
                value={itemQty ? itemQty : ''}
              />
              <input
                type="number"
                placeholder="Price"
                className="border text-xs border-gray-200 bg-gray-50 focus:border-gray-200 focus:outline-none text-stone-800 hover:bg-gray-200 hover:border-gray-200 focus:bg-gray-200 focus:ring-0 w-full rounded-md p-2"
                onChange={(e) => setItemPrice(e.target.value)}
                value={itemPrice ? itemPrice : ''}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 w-14">
            <button
              type="button"
              onClick={() => setAdd(false)}
              className="w-full flex-grow border border-red-400 text-red-400 rounded-md flex items-center justify-center"
            >
              <X size={12} />
            </button>
            <button
              type="button"
              onClick={handleAddItem}
              disabled={!itemTitle.trim() || itemQty === 0 || itemPrice === 0}
              className="w-full h-8 flex-grow border border-stone-800 text-stone-800 rounded-md flex items-center justify-center"
            >
              <Plus size={12} />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setAdd(true)}
          className="w-full border border-stone-800 rounded-md p-1 text-xs flex items-center justify-center gap-1"
        >
          Add item <Plus size={12} />
        </button>
      )}
    </div>
  );
};

export default Items;
