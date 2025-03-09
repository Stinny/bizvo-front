import React, { useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Filter,
  MoreVertical,
  Plus,
  Send,
} from 'react-feather';
import { Badge, Dropdown } from 'flowbite-react';
import InvoStatus from '../../../components/InvoStatus';
import { Checkbox } from 'antd';

const Desktop = ({ invoices }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [searchStat, setSearchStat] = useState('all');

  const filteredInvos = useMemo(() => {
    return invoices.filter((invo) => {
      const id = invo._id ? invo._id.toLowerCase() : '';
      const title = invo.title ? invo.title.toLowerCase() : '';
      const term = searchTerm.toLowerCase();

      // Check if searchType matches (or "all" to include everything)
      const matchesType = searchType === 'all' || invo.type === searchType;

      // Check if searchStat matches (or "all" to include everything)
      const matchesStatus = searchStat === 'all' || invo.status === searchStat;

      // Check if ID or title matches search term
      const matchesSearch = id.includes(term) || title.includes(term);

      // Return invoices that match all conditions
      return matchesType && matchesStatus && matchesSearch;
    });
  }, [searchTerm, invoices, searchStat, searchType]);

  //stuff for pagination//
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 12;

  const endOffset = itemOffset + itemsPerPage;
  const currentInvos = filteredInvos.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(invoices.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredInvos.length;

    setItemOffset(newOffset);
  };
  //pagination stuff ends here//

  let content;

  content = invoices?.length ? (
    <div className="w-10/12 flex flex-col items-start gap-2">
      <div className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-md p-2">
        <div className="flex flex-col items-start">
          <p className="text-sm text-stone-800">Invoices</p>
          <p className="text-xs text-stone-800">Viewing all invoices</p>
        </div>

        <div className="flex items-center justify-end gap-2">
          <div className="flex items-center gap-1">
            <Dropdown
              dismissOnClick={true}
              placement="left"
              renderTrigger={() => (
                <Filter
                  size={12}
                  className="text-stone-800 hover:cursor-pointer"
                />
              )}
              className="p-2"
            >
              <div className="flex flex-col items-start w-full">
                <div className="w-full flex items-start gap-4">
                  <div className="w-full flex flex-col items-start gap-1">
                    <p className="text-xs text-stone-800">Status</p>
                    <div className="flex items-center gap-1">
                      <Checkbox
                        checked={searchStat === 'all'}
                        onChange={(e) => {
                          if (e.target.checked) setSearchStat('all');
                        }}
                      />
                      <p className="text-xs text-stone-800">All</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Checkbox
                        checked={searchStat === 'draft'}
                        onChange={(e) => {
                          if (e.target.checked) setSearchStat('draft');
                        }}
                      />
                      <p className="text-xs text-stone-800">Draft</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Checkbox
                        checked={searchStat === 'pending'}
                        onChange={(e) => {
                          if (e.target.checked) setSearchStat('pending');
                        }}
                      />
                      <p className="text-xs text-stone-800">Await</p>
                    </div>
                    {searchType === 'single' || searchType === 'all' ? (
                      <div className="flex items-center gap-1">
                        <Checkbox
                          checked={searchStat === 'paid'}
                          onChange={(e) => {
                            if (e.target.checked) setSearchStat('paid');
                          }}
                        />
                        <p className="text-xs text-stone-800">Paid</p>
                      </div>
                    ) : (
                      ''
                    )}
                    {searchType === 'recurring' || searchType === 'all' ? (
                      <div className="flex items-center gap-1">
                        <Checkbox
                          checked={searchStat === 'live'}
                          onChange={(e) => {
                            if (e.target.checked) setSearchStat('live');
                          }}
                        />
                        <p className="text-xs text-stone-800">Live</p>
                      </div>
                    ) : (
                      ''
                    )}

                    <div className="flex items-center gap-1">
                      <Checkbox
                        checked={searchStat === 'late'}
                        onChange={(e) => {
                          if (e.target.checked) setSearchStat('late');
                        }}
                      />
                      <p className="text-xs text-stone-800">Late</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Checkbox
                        checked={searchStat === 'void'}
                        onChange={(e) => {
                          if (e.target.checked) setSearchStat('void');
                        }}
                      />
                      <p className="text-xs text-stone-800">Void</p>
                    </div>
                  </div>
                  <div className="w-full flex flex-col items-start gap-1">
                    <p className="text-xs text-stone-800">Type</p>
                    <div className="flex items-center gap-1">
                      <Checkbox
                        checked={searchType === 'all'}
                        onChange={(e) => {
                          if (e.target.checked) setSearchType('all');
                        }}
                      />
                      <p className="text-xs text-stone-800">All</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Checkbox
                        checked={searchType === 'recurring'}
                        onChange={(e) => {
                          if (e.target.checked) setSearchType('recurring');
                        }}
                      />
                      <p className="text-xs text-stone-800">Recurring</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Checkbox
                        checked={searchType === 'single'}
                        onChange={(e) => {
                          if (e.target.checked) setSearchType('single');
                        }}
                      />
                      <p className="text-xs text-stone-800">Single</p>
                    </div>
                  </div>
                </div>
              </div>
            </Dropdown>
            <input
              type="text"
              placeholder="Search invoices"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-0.5 pl-1 border border-gray-200 bg-gray-50 hover:bg-gray-200 focus:bg-gray-200 focus:ring-0 focus:border-gray-200 rounded-md"
              style={{ fontSize: '11px' }}
            />
          </div>
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
      {filteredInvos?.length ? (
        <div className="grid grid-cols-3 w-full gap-2">
          {currentInvos?.map((invoice, index) => (
            <Link
              to={`/dashboard/invoices/${invoice?._id}`}
              className="w-full bg-white hover:border-stone-800 border border-gray-200 rounded-md flex flex-col items-start relative"
              key={index}
            >
              <div className="w-full flex flex-col items-start gap-1 p-2">
                <div className="flex flex-col items-start text-left gap-1">
                  <p className="text-stone-800" style={{ fontSize: '10px' }}>
                    #{invoice?._id}
                  </p>
                  <p className="text-xs text-stone-800">{invoice?.title}</p>
                </div>
              </div>
              <div className="w-full flex justify-between border-t border-gray-200 p-2">
                <p className="text-stone-800 text-xs font-semibold">
                  $
                  {parseFloat(invoice?.amount)?.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <InvoStatus status={invoice?.status} />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="w-full flex items-center justify-center h-64">
          <p className="text-xs text-stone-800">No invoices found</p>
        </div>
      )}
    </div>
  ) : (
    <div className="w-10/12 bg-white border rounded-md border-gray-200 p-2 h-96 flex items-center justify-center">
      <div className="flex flex-col items-center text-center">
        <FileText size={16} className="text-stone-800 mb-2" />
        <p className="text-sm text-stone-800">No Invoices</p>
        <p className="text-xs text-stone-800 w-72">
          Create and send invoices to collect payments
        </p>
        <Link
          to="/dashboard/invoices/add"
          className="flex items-center justify-center gap-1 border border-stone-800 rounded-md p-0.5 pl-2 pr-2 mt-2"
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
