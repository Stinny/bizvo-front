import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, DollarSign, Info } from 'react-feather';
import StripeAmount from '../../../utils/StripeAmount';
import { RiBankLine } from 'react-icons/ri';
import Status from './Status';
import { Tooltip } from 'flowbite-react';

const Desktop = ({ payouts, balance, currentUser }) => {
  //stuff for pagination//
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 8;

  const endOffset = itemOffset + itemsPerPage;
  const currentPayouts = payouts?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(payouts?.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % payouts?.length;

    setItemOffset(newOffset);
  };
  //pagination stuff ends here//

  let content;

  content =
    !payouts?.length && !currentUser.bankAdded ? (
      <div className="w-full bg-white border rounded-sm border-gray-200 p-2 h-96 flex items-center justify-center">
        <div className="flex flex-col items-center text-center">
          <RiBankLine className="text-stone-800" />
          <p className="text-sm text-stone-800">No Payouts</p>
          <p className="text-xs text-stone-800 w-72">
            View payouts from collected payments
          </p>
        </div>
      </div>
    ) : (
      <div className="w-full flex flex-col items-start gap-2">
        <div className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-sm p-2">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-1">
              <p className="text-sm text-stone-800">Payouts</p>
              <Tooltip
                style="light"
                arrow={false}
                content={
                  <p className="text-xs text-stone-800 w-56 text-left">
                    Payouts received when a bank is connected and there is an
                    available balance.
                  </p>
                }
              >
                <Info size={12} className="text-stone-800 dark:text-white" />
              </Tooltip>
            </div>
            <p className="text-xs text-stone-800">View balance and payouts</p>
          </div>
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-start">
                <p className="text-xs text-stone-800">
                  <StripeAmount
                    amount={balance?.available}
                    currency={currentUser?.bankCurrency}
                  />
                </p>
                <p className="text-stone-800" style={{ fontSize: '11px' }}>
                  Available
                </p>
              </div>
              <div className="flex flex-col items-start">
                <p className="text-xs text-stone-800">
                  <StripeAmount
                    amount={balance?.pending}
                    currency={currentUser?.bankCurrency}
                  />
                </p>
                <p
                  className="text-xs text-stone-800"
                  style={{ fontSize: '11px' }}
                >
                  Pending
                </p>
              </div>
            </div>
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
        {payouts?.length ? (
          <div className="w-full flex flex-col items-start gap-2">
            {currentPayouts?.map((payout, index) => (
              <Link
                to={`/dashboard/payouts/${payout?._id}`}
                className="w-full"
                key={index}
              >
                <div
                  className={`grid grid-cols-3 border border-gray-200 bg-white rounded-sm p-2 hover:border-stone-800 w-full`}
                >
                  <div className="flex flex-col items-start">
                    <p className="text-stone-800" style={{ fontSize: '10px' }}>
                      {payout?._id}
                    </p>
                    <p className="text-stone-800 text-xs">{payout?.bankName}</p>
                  </div>

                  <div className="flex items-center justify-center">
                    <Status status={payout?.status} />
                  </div>

                  <div className="flex justify-end">
                    <button
                      disabled
                      className="text-stone-800 text-xs font-semibold"
                    >
                      <StripeAmount
                        amount={payout?.amount}
                        currency={payout?.currency}
                      />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="w-full bg-white border rounded-sm border-gray-200 p-2 h-96 flex items-center justify-center">
            <div className="flex flex-col items-center text-center">
              <RiBankLine className="text-stone-800 mb-2" />
              <p className="text-sm text-stone-800">No Payouts</p>
              <p className="text-xs text-stone-800 w-72">
                Receive a payout when you accumulate a balance
              </p>
            </div>
          </div>
        )}
      </div>
    );

  return content;
};

export default Desktop;
