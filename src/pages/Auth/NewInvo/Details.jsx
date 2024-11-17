import React from 'react';
import Items from './Items';

const Details = () => {
  return (
    <div className="flex gap-2 items-start w-full">
      <div className="flex flex-col gap-2 w-6/12">
        <div className="flex flex-col items-start w-full">
          <p className="text-xs text-stone-700">Title</p>
          <input
            type="text"
            placeholder="Title"
            className="border text-xs border-gray-200 bg-gray-50 focus:border-gray-200 focus:outline-none text-stone-800 hover:bg-gray-200 hover:border-gray-200 focus:bg-gray-200 focus:ring-0 w-full rounded-md p-2"
            //   onChange={(e) => setName(e.target.value)}
            //   value={name}
          />
        </div>
        <div className="flex flex-col items-start w-full">
          <p className="text-xs text-stone-700">Description</p>
          <textarea
            placeholder="What is this invoice for.."
            className="border border-gray-200 hover:border-gray-200 hover:bg-gray-200 focus:bg-gray-200 focus:border-gray-200 focus:ring-0 w-full h-24 rounded-md p-2 bg-gray-50 resize-none text-xs"
            //   onChange={(e) => setDesc(e.target.value)}
            //   value={desc}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 w-6/12">
        <div className="flex flex-col items-start w-full">
          <p className="text-xs text-stone-700">Items</p>
          <Items />
        </div>
      </div>
    </div>
  );
};

export default Details;
