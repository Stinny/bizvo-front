import React, { useState } from 'react';
import { CheckCircle, Layers, XSquare } from 'react-feather';
import { Link } from 'react-router-dom';
import { useUpdateInvoForPayMutation } from '../../../api/invoicesApiSlice';
import Invalid from './Invalid';
import Amount from '../../../components/Pay/Amount';
import Status from '../../../components/Pay/Status';
import Title from '../../../components/Pay/Title';
import Content from '../../../components/Pay/Content';
import Payment from '../../../components/Pay/Payment';
import Method from './Method';
import { Spin } from 'antd';
import { Avatar } from 'flowbite-react';
import BizModal from './BizModal';

const Desktop = ({
  data,
  invoId,
  token,
  refetch,
  currentUser,
  succ,
  setSucc,
  added,
  setAdded,
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

      if (updateReq?.valid) {
        //need to do something with updateReq.invoice
        setUpdatedInvo(updateReq?.invoice);
        setUpdatedTrx(updateReq?.trx);
        setUpdatingInvo(false);
        setReadyForPayment(true);
      } else {
        refetch();
        setUpdatingInvo(false);
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
      <div
        className="mx-auto flex flex-col items-center justify-center h-96 mt-16"
        style={{ width: '370px' }}
      >
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
      <div
        className="mx-auto flex flex-col items-center mt-16"
        style={{ width: '370px' }}
      >
        <div className="flex items-center justify-center w-full mb-6">
          <BizModal open={seeBiz} setOpen={setSeeBiz} biz={data?.biz} />
          <Avatar
            size="md"
            img={data?.biz?.logo}
            onClick={() => setSeeBiz(!seeBiz)}
            className="hover:cursor-pointer border border-gray-200"
          />
        </div>
        {succ ? (
          <div className="w-full flex items-center justify-start gap-2 border border-gray-200 bg-white rounded-sm p-2 mb-2">
            <CheckCircle size={14} className="text-green-400" />
            <p className="text-xs text-stone-800">Payment was successful</p>
          </div>
        ) : (
          ''
        )}
        <div className="w-full bg-white border border-gray-200 rounded-sm flex flex-col items-start gap-4 p-2">
          <Status invoice={data?.invoice} />
          {view === 'details' ? (
            <>
              {readyForPayment ? (
                <Payment
                  setReadyForPayment={setReadyForPayment}
                  invoice={updatedInvo}
                  biz={data?.biz}
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

          {view === 'trxs' ? <Trxs setView={setView} trxs={data?.trxs} /> : ''}
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

export default Desktop;
