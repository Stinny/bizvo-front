import React from 'react';
import { ChevronRight } from 'react-feather';
import img from '../../assets/girl.svg';
import { isMobile } from 'react-device-detect';

const Why = () => {
  return isMobile ? (
    <div className="w-full flex flex-col gap-1 items-end">
      <div className="flex flex-col gap-8 items-start w-full">
        <div className="w-full bg-white rounded-md flex flex-col gap-3 items-start">
          <p className="text-3xl font-bold text-stone-800">
            Why collect with Bizvo?
          </p>
          <p className="text-md text-stone-800 text-left">
            Collecting with Bizvo will help if your big OR small. Spend more
            time growing your business and less time handling transactions.
          </p>
          <div className="flex flex-col gap-2">
            <p className="text-xs text-stone-800 flex items-center gap-1">
              <ChevronRight size={14} />
              Instant legal compliance
            </p>
            <p className="text-xs text-stone-800 flex items-center gap-1">
              <ChevronRight size={14} />
              Mobile friendly payment links
            </p>
            <p className="text-xs text-stone-800 flex items-center gap-1">
              <ChevronRight size={14} />
              Automated tax collection
            </p>
            <p className="text-xs text-stone-800 flex items-center gap-1">
              <ChevronRight size={14} />
              Simple and intuitive UI
            </p>
          </div>
          <p className="text-xs text-stone-800 font-medium">
            A platform that supports you.
          </p>
        </div>
        <div className="w-full flex justify-start">
          <img src={img} className="w-full" />
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full flex flex-col gap-1 items-end">
      <div className="flex items-center w-full gap-12">
        <div className="w-6/12 flex justify-start">
          <img src={img} className="w-full" />
        </div>
        <div className="w-6/12 bg-white rounded-md flex flex-col gap-3 items-start">
          <p className="text-2xl font-bold text-stone-800">
            Why collect with Bizvo?
          </p>
          <p className="text-md text-stone-800 text-left">
            Collecting with Bizvo will help if your big OR small. Spend more
            time growing your business and less time handling transactions.
          </p>
          <div className="flex flex-col gap-2">
            <p className="text-xs text-stone-800 flex items-center gap-1">
              <ChevronRight size={14} />
              Instant legal compliance
            </p>
            <p className="text-xs text-stone-800 flex items-center gap-1">
              <ChevronRight size={14} />
              Mobile friendly payment links
            </p>
            <p className="text-xs text-stone-800 flex items-center gap-1">
              <ChevronRight size={14} />
              Automated tax collection
            </p>
            <p className="text-xs text-stone-800 flex items-center gap-1">
              <ChevronRight size={14} />
              Simple and intuitive UI
            </p>
          </div>
          <p className="text-xs text-stone-800 font-medium">
            A platform that supports you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Why;
