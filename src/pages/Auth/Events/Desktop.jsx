import React, { useEffect, useState } from 'react';
import CustEvent from './CustEvent';
import InvoEvent from './InvoEvent';
import { ChevronLeft, ChevronRight, Clock } from 'react-feather';
import ReactPaginate from 'react-paginate';
import EvModal from './EvModal';
import { useMarkAsSeenMutation } from '../../../api/eventsApiSlice';

const Desktop = ({ events, evId }) => {
  const [allEvents, setAllEvents] = useState(events);
  const [markAsSeen, { isLoading }] = useMarkAsSeenMutation();

  const [evToView, setEvToView] = useState({});
  const [openEv, setOpenEv] = useState(false);

  //stuff for pagination//
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  const endOffset = itemOffset + itemsPerPage;
  const currentEvents = allEvents.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(allEvents.length / itemsPerPage);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % allEvents.length;

    setItemOffset(newOffset);
  };

  //opens event in modal and marks as seen if needed
  const handleOpenEvent = async (even) => {
    setEvToView(even);
    setOpenEv(true);
    if (!even?.seen) {
      setAllEvents((prevEvents) =>
        prevEvents.map((ev) =>
          ev._id === even._id ? { ...ev, seen: true } : ev
        )
      );

      const seenReq = await markAsSeen({
        eventId: even?._id,
      }).unwrap();
    }
  };

  useEffect(() => {
    if (evId) {
      const foundEvent = allEvents.find((ev) => ev._id === evId); // Find event in allEvents

      if (foundEvent) {
        handleOpenEvent(foundEvent);
      }
    }
  }, []);

  return (
    <div className="dark:border-white bg-white dark:bg-neutral-800 flex flex-col w-10/12 gap-2 items-start">
      <EvModal open={openEv} setOpen={setOpenEv} even={evToView} />
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
              <InvoEvent even={even} handleOpenEvent={handleOpenEvent} />
            ) : (
              <CustEvent even={even} handleOpenEvent={handleOpenEvent} />
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
