import React, { useState } from 'react';
import BizModal from '../../pages/UnAuth/Pay/BizModal';
import { Avatar } from 'flowbite-react';

const Title = ({ invoice, biz }) => {
  return (
    <div className="w-full grid grid-cols-7 border border-gray-200 rounded-sm p-2">
      <div className="flex flex-col items-start col-span-6">
        <p className="text-stone-800 text-sm text-left">{invoice?.title}</p>
        <p className="text-stone-800 text-xs text-left">
          {invoice?.description}
        </p>
      </div>
    </div>
  );
};

export default Title;
