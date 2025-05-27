import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Plus, Send, Users } from 'react-feather';
import ReactPaginate from 'react-paginate';
import ReactCountryFlag from 'react-country-flag';

const Desktop = ({ customers }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCusts = useMemo(() => {
    return customers.filter((cust) => {
      const id = cust?._id ? cust?._id.toLowerCase() : '';
      const name = cust?.name ? cust?.name.toLowerCase() : '';
      const email = cust?.email ? cust?.email.toLowerCase() : '';
      const term = searchTerm.toLowerCase();

      // Check if ID or title matches search term
      const matchesSearch =
        id.includes(term) || name.includes(term) || email.includes(term);

      // Return invoices that match all conditions
      return matchesSearch;
    });
  }, [searchTerm, customers]);

  //stuff for pagination//
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 15;

  const endOffset = itemOffset + itemsPerPage;
  const currentCusts = filteredCusts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(customers?.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredCusts.length;

    setItemOffset(newOffset);
  };
  //pagination stuff ends here//

  let content;

  content = customers?.length ? (
    <div className="w-full flex flex-col items-start gap-2">
      <div className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-sm p-2">
        <div className="flex flex-col items-start w-52">
          <p className="text-sm text-stone-800">Customers</p>
          <p className="text-xs text-stone-800">Viewing all customers</p>
        </div>
        <Link
          to="/dashboard/customers/add"
          className="flex items-center justify-center gap-1 border border-stone-800 dark:border-white rounded-sm p-0.5 pl-2 pr-2"
        >
          <p
            className="text-stone-800 dark:text-white"
            style={{ fontSize: '11px' }}
          >
            New +
          </p>
        </Link>
        <div className="flex items-center justify-end gap-2 w-64">
          <div className="flex items-center gap-1">
            <input
              type="text"
              placeholder="Search customers"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-1 border border-gray-200 hover:bg-gray-50 focus:bg-gray-50 focus:ring-0 focus:border-gray-200 rounded-sm outline-none"
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
              renderOnZeroPageCount={true}
              previousLabel={<ChevronLeft size={12} />}
              className="flex items-center gap-1"
              activeLinkClassName="activePage"
              pageLinkClassName="notActivePage"
              breakLinkClassName="breakLink"
            />
          </div>
        </div>
      </div>
      {currentCusts?.length ? (
        <div className="w-full grid grid-cols-3 gap-2">
          {currentCusts?.map((customer, index) => (
            <Link
              to={`/dashboard/customers/${customer?._id}`}
              className="w-full bg-white hover:border-stone-800 border border-gray-200 rounded-sm flex items-center justify-start relative p-2"
              key={index}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col items-start text-left overflow-hidden gap-1">
                  <p
                    className="text-stone-800 overflow-hidden"
                    style={{ fontSize: '11px' }}
                  >
                    {customer?.email}
                  </p>
                  <p className="text-xs text-stone-800 text-left">
                    {customer?.name}
                  </p>
                </div>
                {/* <ReactCountryFlag countryCode={customer?.country?.value} /> */}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="w-full h-80 flex items-center justify-center">
          <div className="flex flex-col items-center text-center gap-1">
            <p className="text-xs text-stone-800">No customers found</p>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="w-full bg-white border rounded-md border-gray-200 p-2 h-96 flex items-center justify-center">
      <div className="flex flex-col items-center text-center">
        <Users size={16} className="text-stone-800 mb-2" />
        <p className="text-sm text-stone-800">No Customers</p>
        <p className="text-xs text-stone-800 w-72">
          Create and save customers to attach to invoices
        </p>
        <Link
          to="/dashboard/customers/add"
          className="flex items-center justify-center gap-1 border border-stone-800 rounded-sm p-0.5 pl-2 pr-2 mt-2"
        >
          <p className="text-stone-800" style={{ fontSize: '11px' }}>
            New +
          </p>
        </Link>
      </div>
    </div>
  );

  return content;
};

export default Desktop;
