import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Plus, Send, Users } from 'react-feather';
import ReactPaginate from 'react-paginate';
import ReactCountryFlag from 'react-country-flag';

const Desktop = ({ customers }) => {
  //stuff for pagination//
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 15;

  const endOffset = itemOffset + itemsPerPage;
  const currentCusts = customers.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(customers.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % customers.length;

    setItemOffset(newOffset);
  };
  //pagination stuff ends here//

  let content;

  content = customers?.length ? (
    <div className="w-10/12 flex flex-col items-start gap-2">
      <div className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-md p-2">
        <div className="flex flex-col items-start">
          <p className="text-sm text-stone-800">Customers</p>
          <p className="text-xs text-stone-800">Viewing all customers</p>
        </div>
        <div className="w-24 flex items-center justify-end">
          {customers?.length > 15 ? (
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
      <div className="w-full grid grid-cols-3 gap-2">
        {currentCusts?.map((customer, index) => (
          <Link
            to={`/dashboard/customers/${customer?._id}`}
            className="w-full bg-white hover:border-stone-800 border border-gray-200 rounded-md flex items-center justify-start relative p-2"
            key={index}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col items-start text-left overflow-hidden gap-1">
                <p
                  className="text-stone-800 overflow-hidden"
                  style={{ fontSize: '10px' }}
                >
                  {customer?.email}
                </p>
                <p className="text-xs text-stone-800 text-left">
                  {customer?.name}
                </p>
              </div>
              <ReactCountryFlag countryCode={customer?.country?.value} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  ) : (
    <div className="w-10/12 bg-white border rounded-md border-gray-200 p-2 h-96 flex items-center justify-center">
      <div className="flex flex-col items-center text-center">
        <Users size={18} className="text-stone-800 mb-2" />
        <p className="text-sm text-stone-800">No Customers</p>
        <p className="text-xs text-stone-800 w-72">
          Create customers to send invoices to
        </p>
        <Link
          to="/dashboard/customers/add"
          className="flex items-center justify-center gap-1 border border-stone-800 rounded-md p-1 mt-2"
        >
          <p className="text-xs text-stone-800">New</p>
          <Plus size={12} className="text-stone-800 font-bold" />
        </Link>
      </div>
    </div>
  );

  return content;
};

export default Desktop;
