import { Timeline } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import {
  Check,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CornerLeftUp,
  CornerUpLeft,
  CreditCard,
  Percent,
  Send,
} from 'react-feather';
import ReactPaginate from 'react-paginate';

const Trxs = ({ trxs, setView }) => {
  const [seeTx, setSeeTx] = useState('');

  //stuff for pagination//
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  const endOffset = itemOffset + itemsPerPage;
  const currentTrxs = trxs.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(trxs?.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % trxs?.length;

    setItemOffset(newOffset);
  };
  //pagination stuff ends here//

  const handleSeeTx = (tx) => {
    if (seeTx === tx) {
      setSeeTx('');
    } else {
      setSeeTx(tx);
    }
  };
  return (
    <div className="flex flex-col gap-2 min-h-28 w-full">
      <div className="w-full flex items-center gap-1">
        <button
          type="button"
          onClick={() => setView('details')}
          className="text-stone-800 flex items-center justify-center border border-stone-800 p-0.5 rounded-md"
        >
          <CornerUpLeft size={12} />
        </button>
        <p className="text-stone-800 text-xs">Transactions</p>
      </div>
      <div className="w-full flex flex-col gap-2 min-h-52">
        {' '}
        {currentTrxs?.map((trx) => (
          <button
            type="button"
            onClick={() => handleSeeTx(`tx${trx?._id}`)}
            key={`trx${trx?._id}`}
            className="border border-gray-200 rounded-md flex flex-col p-2 w-full"
          >
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex flex-col items-start">
                  <p
                    className="text-stone-800 font-medium"
                    style={{ fontSize: '11px' }}
                  >
                    $
                    {parseFloat(trx?.total / 100)?.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
              {seeTx === `tx${trx?._id}` ? (
                <ChevronDown size={14} />
              ) : (
                <ChevronRight size={14} />
              )}
            </div>

            <div
              className={`transition-[max-height] duration-300 ease-in-out overflow-hidden w-full ${
                seeTx === `tx${trx?._id}` ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <Timeline
                className="text-left ml-1 mt-4"
                items={[
                  {
                    dot: <Send size={12} className="text-stone-800" />,
                    children: (
                      <p className="text-xs text-stone-800 pt-1">
                        Invoiced for{' '}
                        <span className="font-semibold">
                          $
                          {parseFloat(trx?.amount / 100)?.toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )}
                        </span>
                      </p>
                    ),
                  },
                  {
                    dot: <Percent size={12} className="text-stone-800" />,
                    children: (
                      <p className="text-xs text-stone-800 pt-1">
                        Added tax{' '}
                        <span className="font-semibold">
                          ${(trx?.tax?.amount / 100).toFixed(2)}
                        </span>
                      </p>
                    ),
                  },
                  {
                    dot: <CreditCard size={12} className="text-stone-800" />,
                    children: (
                      <p className="text-xs text-stone-800 pt-1">
                        Total paid{' '}
                        <span className="font-semibold">
                          $
                          {parseFloat(trx?.total / 100)?.toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )}
                        </span>
                      </p>
                    ),
                  },
                  {
                    dot: <CheckCircle size={12} className="text-stone-800" />,
                    children: (
                      <p className="text-xs text-stone-800 pt-1">
                        Transaction done{' '}
                        <span className="font-medium">
                          {moment(trx?.doneOn).format('MMMM Do, yyyy')}
                        </span>
                      </p>
                    ),
                  },
                ]}
              />
            </div>
          </button>
        ))}
      </div>
      <div className="w-full flex items-center justify-end">
        {trxs?.length > 5 ? (
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
  );
};

export default Trxs;
