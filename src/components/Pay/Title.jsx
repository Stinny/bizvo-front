import React, { useState } from 'react';
import BizModal from '../../pages/UnAuth/Pay/BizModal';
import { Avatar } from 'flowbite-react';

const Title = ({ invoice, biz }) => {
  const [seeBiz, setSeeBiz] = useState(false);

  return (
    <div className="w-full grid grid-cols-7 border border-gray-200 rounded-sm p-2">
      <BizModal open={seeBiz} setOpen={setSeeBiz} biz={biz} />
      <div className="flex items-center justify-start">
        <Avatar
          size="md"
          img={biz?.logo}
          onClick={() => setSeeBiz(!seeBiz)}
          className="hover:cursor-pointer"
        />
      </div>
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
