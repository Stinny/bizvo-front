import React, { useEffect, useState } from 'react';
import Desktop from './Desktop';
import { useParams, useSearchParams } from 'react-router-dom';
import { useGetInvoiceToPayQuery } from '../../../api/invoicesApiSlice';
import Cookies from 'js-cookie';
import { isMobile } from 'react-device-detect';
import Mobile from './Mobile';
import { Spin } from 'antd';

const Pay = () => {
  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  //get invo ID from url params
  //get invo tkn from url query params
  const [searchParams] = useSearchParams();
  const token = searchParams.get('iat');
  const uid = searchParams.get('uid');
  const { invoId } = useParams();

  //view
  const [view, setView] = useState('details');

  //track paid status for success alert display
  const [succ, setSucc] = useState(false);
  const [added, setAdded] = useState(false);
  const [rem, setRem] = useState(false);

  //hook to getting invo from API
  const { data, isLoading, isSuccess, isFetching, refetch } =
    useGetInvoiceToPayQuery({
      invoId: invoId,
      invoTkn: token,
      uid: uid ? uid : '',
    });

  useEffect(() => {
    if (succ || added || rem) {
      const timer = setTimeout(() => {
        setSucc(false);
        setAdded(false);
        setRem(false);
      }, 5000); // 5 seconds

      // Cleanup the timer if the component unmounts
      return () => clearTimeout(timer);
    }

    if (added || rem) {
      setView('payMeth');
    }
  }, [succ, added, rem]);

  useEffect(() => {
    refetch();
  }, []);

  let content;
  if (isLoading || isFetching) {
    content = isMobile ? (
      <div className="w-full flex flex-col items-center justify-center h-96 mt-16">
        <Spin size="small" />
      </div>
    ) : (
      <div
        className="mx-auto h-96 mt-20 bg-white flex items-center justify-center"
        style={{ width: '370px' }}
      >
        <Spin size="small" />
      </div>
    );
  } else if (isSuccess) {
    content = isMobile ? (
      <Mobile
        data={data}
        invoId={invoId}
        token={token}
        refetch={refetch}
        currentUser={currentUser}
        succ={succ}
        setSucc={setSucc}
        added={added}
        setAdded={setAdded}
        rem={rem}
        setRem={setRem}
        view={view}
        setView={setView}
        uid={uid}
      />
    ) : (
      <Desktop
        data={data}
        invoId={invoId}
        token={token}
        refetch={refetch}
        currentUser={currentUser}
        succ={succ}
        setSucc={setSucc}
        added={added}
        setAdded={setAdded}
        rem={rem}
        setRem={setRem}
        view={view}
        setView={setView}
        uid={uid}
      />
    );
  }

  return content;
};

export default Pay;
