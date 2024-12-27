import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  MoreVertical,
  Plus,
  Send,
} from 'react-feather';
import { Badge } from 'flowbite-react';

const Desktop = ({ invoices }) => {
  //stuff for pagination//
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 12;

  const endOffset = itemOffset + itemsPerPage;
  const currentInvos = invoices.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(invoices.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % invoices.length;

    setItemOffset(newOffset);
  };
  //pagination stuff ends here//

  let content;

  content = invoices?.length ? (
    <div className="w-10/12 flex flex-col items-start gap-2">
      <div className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-md p-2">
        <div className="flex flex-col items-start">
          <p className="text-sm text-stone-800">Invoices</p>
          <p className="text-xs text-stone-600">View all invoices</p>
        </div>

        <div className="w-24 flex items-center justify-end">
          {invoices?.length > 12 ? (
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
      <div className="grid grid-cols-3 w-full gap-2">
        {currentInvos?.map((invoice, index) => (
          <Link
            to={`/dashboard/invoices/${invoice?._id}`}
            className="w-full bg-white hover:border-stone-800 border border-gray-200 rounded-md flex flex-col items-start relative"
            key={index}
          >
            <div className="w-full flex flex-col items-start gap-1 p-2">
              <div className="flex flex-col items-start text-left">
                <p className="text-stone-600" style={{ fontSize: '10px' }}>
                  #{invoice?._id}
                </p>
                <p className="text-xs text-stone-900">{invoice?.title}</p>
              </div>
            </div>
            <div className="w-full flex justify-between border-t border-gray-200 p-2">
              <p className="text-xs text-stone-800 font-bold">
                ${invoice?.amount?.toFixed(2)}
              </p>
              {invoice?.paid ? (
                <Badge size="xs" color="success">
                  Paid
                </Badge>
              ) : (
                <>
                  {invoice?.sent ? (
                    <Badge size="xs" color="pink">
                      Unpaid
                    </Badge>
                  ) : (
                    <Badge size="xs" color="info">
                      Draft
                    </Badge>
                  )}
                </>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  ) : (
    <div className="w-10/12 bg-white border rounded-md border-gray-200 p-2 h-96 flex items-center justify-center">
      <div className="flex flex-col items-center text-center">
        <FileText size={18} className="text-stone-800 mb-2" />
        <p className="text-sm text-stone-800">No Invoices</p>
        <p className="text-xs text-stone-600 w-72">
          Create an invoice to collect payment
        </p>
        <Link
          to="/dashboard/invoices/add"
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
