import { Avatar, Badge, Spinner, Tooltip } from 'flowbite-react';
import React, { useState } from 'react';
import {
  AlertOctagon,
  Briefcase,
  ChevronDown,
  ChevronRight,
  Info,
  Layers,
  Send,
  User,
  XSquare,
  Percent,
  CheckCircle,
} from 'react-feather';
import { Link } from 'react-router-dom';
import { useUpdateInvoForPayMutation } from '../../../api/invoicesApiSlice';
import LinkExp from '../../../components/Pay/LinkExp';
import Invalid from './Invalid';
import Content from '../../../components/Pay/Content';
import Amount from '../../../components/Pay/Amount';
import Title from '../../../components/Pay/Title';
import Status from '../../../components/Pay/Status';
import Method from './Method';
import Payment from '../../../components/Pay/Payment';
import { Spin } from 'antd';
import BizModal from './BizModal';

const Mobile = ({
  data,
  invoId,
  refetch,
  currentUser,
  succ,
  setSucc,
  added,
  setAdded,
  token,
  rem,
  setRem,
  view,
  setView,
  uid,
}) => {
  const [readyForPayment, setReadyForPayment] = useState(false);
  const [updatingInvo, setUpdatingInvo] = useState(false);
  const [updatedInvo, setUpdatedInvo] = useState({});
  const [updatedTrx, setUpdatedTrx] = useState({});
  const [seeBiz, setSeeBiz] = useState(false);

  const isOwner = data?.invoice?.sellerId === currentUser?._id && uid;

  //hook for updating invo
  const [updateInvoForPay, { isLoading: updating }] =
    useUpdateInvoForPayMutation();

  const handleMoveToPayment = async () => {
    setUpdatingInvo(true);

    try {
      const updateReq = await updateInvoForPay({ invoiceId: invoId }).unwrap();

      if (updateReq?.msg === 'Tax added') {
        //need to do something with updateReq.invoice
        setUpdatedInvo(updateReq?.invoice);
        setUpdatedTrx(updateReq?.trx);
        setUpdatingInvo(false);
        setReadyForPayment(true);
      }
    } catch (err) {
      console.log(err);
      setUpdatingInvo(false);
      return;
    }
  };

  let content;

  if (updatingInvo || updating) {
    content = (
      <div className="w-full flex flex-col items-center justify-center h-96 mt-16">
        <Spin size="small" />
      </div>
    );
  } else {
    content = !data?.valid ? (
      <Invalid
        invoId={invoId}
        token={token}
        exp={data?.exp}
        customer={data?.customer}
        invoice={data?.invoice}
      />
    ) : (
      <div className="flex flex-col items-start mt-4 p-4">
        {succ ? (
          <div className="w-full flex items-center justify-start gap-2 border border-gray-200 bg-white rounded-md p-2 mb-2">
            <CheckCircle size={14} className="text-green-400" />
            <p className="text-xs text-stone-800">Payment was successful</p>
          </div>
        ) : (
          ''
        )}
        {added ? (
          <div className="w-full flex items-center justify-start gap-2 border border-gray-200 bg-white rounded-md p-2 mb-2">
            <CheckCircle size={14} className="text-green-400" />
            <p className="text-xs text-stone-800">Payment method added</p>
          </div>
        ) : (
          ''
        )}
        {rem ? (
          <div className="w-full flex items-center justify-start gap-2 border border-gray-200 bg-white rounded-md p-2 mb-2">
            <XSquare size={14} className="text-red-400" />
            <p className="text-xs text-stone-800">Payment method removed</p>
          </div>
        ) : (
          ''
        )}

        <div className="flex items-center justify-center w-full mb-6">
          <BizModal open={seeBiz} setOpen={setSeeBiz} biz={data?.biz} />
          <Avatar
            size="md"
            img={data?.biz?.logo}
            onClick={() => setSeeBiz(!seeBiz)}
            className="hover:cursor-pointer border border-gray-200"
          />
        </div>

        <div className="w-full bg-white border border-gray-200 rounded-md flex flex-col items-start gap-4 p-2">
          <Status invoice={data?.invoice} />
          {view === 'details' ? (
            <>
              {readyForPayment ? (
                <Payment
                  setReadyForPayment={setReadyForPayment}
                  invoice={updatedInvo}
                  trx={updatedTrx}
                  customer={data?.customer}
                  refetch={refetch}
                  setSucc={setSucc}
                />
              ) : (
                <>
                  <Title invoice={data?.invoice} biz={data?.biz} />
                  <Content
                    invoice={data?.invoice}
                    customer={data?.customer}
                    biz={data?.biz}
                    trx={data?.trx}
                  />
                  <Amount
                    invoice={data?.invoice}
                    handleMoveToPayment={handleMoveToPayment}
                    updating={updating}
                    setView={setView}
                    trx={data?.trx}
                  />
                </>
              )}
            </>
          ) : (
            ''
          )}

          {view === 'paymeth' ? (
            <Method
              invoice={updatedInvo}
              trx={updatedTrx}
              customer={data?.customer}
              setView={setView}
              added={added}
              setAdded={setAdded}
              rem={rem}
              setRem={setRem}
              refetch={refetch}
            />
          ) : (
            ''
          )}
        </div>

        <div className="w-full flex items-center justify-center text-center mt-8">
          <Link to="/" className="flex items-center gap-1">
            <p
              className="text-stone-800 dark:text-white flex items-center"
              style={{ fontSize: '11px' }}
            >
              Powered by
            </p>
            <p
              className="font-bold text-stone-800 dark:text-white text-sm flex items-center gap-1"
              style={{ fontFamily: 'Geist Mono' }}
            >
              <Layers size={16} className="font-black dark:text-white" />
              Bizvo
            </p>
          </Link>
        </div>
      </div>
    );
  }

  return content;
};

export default Mobile;
