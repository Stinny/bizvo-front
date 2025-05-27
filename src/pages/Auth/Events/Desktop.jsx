import React, { useEffect, useMemo, useState } from 'react';
import InvoEvent from './InvoEvent';
import { ChevronLeft, ChevronRight, Clock, X } from 'react-feather';
import ReactPaginate from 'react-paginate';
import EvModal from './EvModal';
import { useMarkAsSeenMutation } from '../../../api/eventsApiSlice';
import Cookies from 'js-cookie';
import { io } from 'socket.io-client';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tooltip } from 'flowbite-react';

const Desktop = ({
  events,
  evId,
  setEvId,
  invoId,
  setInvoId,
  currentUser,
  setForceUpdate,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [allEvents, setAllEvents] = useState(events);
  const [markAsSeen, { isLoading }] = useMarkAsSeenMutation();

  const [evToView, setEvToView] = useState({});
  const [openEv, setOpenEv] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvs = useMemo(() => {
    return allEvents.filter((even) => {
      const id = even?.invoiceId ? even?.invoiceId.toLowerCase() : '';

      const term = searchTerm.toLowerCase();

      // Check if ID or title matches search term
      const matchesSearch = id.includes(term);

      // Return invoices that match all conditions
      return matchesSearch;
    });
  }, [searchTerm, allEvents]);

  //stuff for pagination//
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  const endOffset = itemOffset + itemsPerPage;
  const currentEvents = filteredEvs.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(allEvents.length / itemsPerPage);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % filteredEvs.length;

    setItemOffset(newOffset);
  };

  //opens event in modal and marks as seen if needed
  const handleOpenEvent = async (even) => {
    if (!even?.seen) {
      currentUser.events -= 1;
      const updatedUser = JSON.stringify(currentUser);
      Cookies.set('currentUser', updatedUser, { sameSite: 'Lax' });
      setAllEvents((prevEvents) =>
        prevEvents.map((ev) =>
          ev._id === even._id ? { ...ev, seen: true } : ev
        )
      );

      setForceUpdate((prevState) => !prevState);

      const seenReq = await markAsSeen({
        eventId: even?._id,
      }).unwrap();
    }

    setEvToView(even);
    setEvId(even?._id);
    setOpenEv(true);
  };

  const handleClearInvoFilter = () => {
    setSearchTerm('');
    navigate(location.pathname, { replace: true, state: null });
  };

  useEffect(() => {
    if (evId) {
      const foundEvent = allEvents.find((ev) => ev._id === evId); // Find event in allEvents

      if (foundEvent) {
        handleOpenEvent(foundEvent);
      }
    } else if (invoId) {
      setSearchTerm(invoId);
    }
  }, []);

  return allEvents?.length ? (
    <div className="dark:border-white dark:bg-neutral-800 flex flex-col w-full gap-2 items-start">
      <EvModal open={openEv} setOpen={setOpenEv} even={evToView} />
      <div className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-sm p-2">
        <div className="flex flex-col items-start">
          <p className="text-sm text-stone-800">Events</p>
          <p className="text-xs text-stone-800">
            {searchTerm ? `For invoice: ${searchTerm}` : 'Viewing all events'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {searchTerm ? (
              <Tooltip
                arrow={false}
                style="light"
                content={<p className="text-xs text-stone-800">Clear search</p>}
              >
                <X
                  size={12}
                  className="text-red-400 hover:cursor-pointer"
                  onClick={handleClearInvoFilter}
                />
              </Tooltip>
            ) : (
              ''
            )}
            <input
              type="text"
              placeholder="Search by invoice ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-1 pl-1 border border-gray-200 hover:bg-gray-50 focus:bg-gray-50 focus:outline-0 focus:border-gray-200 rounded-sm"
              style={{ fontSize: '11px' }}
            />
          </div>

          <div className="flex items-center justify-end">
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
          </div>
        </div>
      </div>
      {currentEvents?.length ? (
        <>
          {currentEvents?.map((even) => (
            <InvoEvent
              even={even}
              handleOpenEvent={handleOpenEvent}
              key={even?._id}
            />
          ))}
        </>
      ) : (
        <div className="w-full h-80 flex items-center justify-center border border-gray-200 rounded-sm">
          <div className="flex flex-col items-center text-center gap-1">
            <p className="text-xs text-stone-800">
              No events found for invoice
            </p>
            <p className="text-xs text-stone-800">#{searchTerm}</p>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="w-full bg-white border rounded-sm border-gray-200 p-2 h-96 flex items-center justify-center">
      <div className="flex flex-col items-center text-center">
        <Clock size={16} className="text-stone-800 mb-2" />
        <p className="text-sm text-stone-800">No events</p>
        <p className="text-xs text-stone-800 w-72">
          View events related to your account
        </p>
      </div>
    </div>
  );
};

export default Desktop;
