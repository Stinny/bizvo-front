import React, { useState } from 'react';
import CustEvent from './CustEvent';
import InvoEvent from './InvoEvent';
import { ChevronLeft, ChevronRight, Clock } from 'react-feather';
import ReactPaginate from 'react-paginate';

const Desktop = ({ events }) => {
  //stuff for pagination//
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  const endOffset = itemOffset + itemsPerPage;
  const currentEvents = events.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(events.length / itemsPerPage);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % events.length;

    setItemOffset(newOffset);
  };
  //pagination stuff ends here//

  return (
    <div className="dark:border-white bg-white dark:bg-neutral-800 flex flex-col w-10/12 gap-2 items-start">
      <div className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-md p-2">
        <div className="flex flex-col items-start">
          <p className="text-sm text-stone-800">Events</p>
          <p className="text-xs text-stone-800">Viewing all events</p>
        </div>

        <div className="w-24 flex items-center justify-end">
          {events?.length > 10 ? (
            <ReactPaginate
              breakLabel="..."
              nextLabel={<ChevronRight size={12} />}
              onPageChange={handlePageClick}
              marginPagesDisplayed={0}
              pageRangeDisplayed={0}
              pageCount={pageCount}
              renderOnZeroPageCount={null}
              previousLabel={<ChevronLeft size={12} />}
              className="flex items-center gap-1"
              activeLinkClassName="activePage"
              pageLinkClassName="notActivePage"
              breakLinkClassName="breakLink"
            />
          ) : (
            ''
          )}
        </div>
      </div>
      {events?.length ? (
        <>
          {currentEvents?.map((even) =>
            even?.source === 'invoice' ? (
              <InvoEvent even={even} />
            ) : (
              <CustEvent even={even} />
            )
          )}
        </>
      ) : (
        <div className="w-full h-96 flex items-center justify-center border border-gray-200 rounded-md">
          <div className="flex flex-col items-center text-center">
            <Clock size={16} className="text-stone-800 mb-2" />
            <p className="text-xs text-stone-800">No recent events</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Desktop;
