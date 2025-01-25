import React, { useEffect, useState } from 'react';
import Desktop from './Desktop';
import { useParams, useSearchParams } from 'react-router-dom';
import { useGetInvoiceToPayQuery } from '../../../api/invoicesApiSlice';
import { Spinner } from 'flowbite-react';
import Cookies from 'js-cookie';
import { isMobile } from 'react-device-detect';
import Mobile from './Mobile';

const Pay = () => {
  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  //get invo ID from url params
  //get invo tkn from url query params
  const [searchParams] = useSearchParams();
  const token = searchParams.get('iat');
  const { invoId } = useParams();

  //track paid status for success alert display
  const [succ, setSucc] = useState(false);
  const [added, setAdded] = useState(false);

  //hook to getting invo from API
  const { data, isLoading, isSuccess, isFetching, refetch } =
    useGetInvoiceToPayQuery({
      invoId: invoId,
      invoTkn: token,
    });

  useEffect(() => {
    refetch();
  }, []);

  let content;
  if (isLoading || isFetching) {
    content = (
      <div className="mx-auto w-96 h-72 mt-16 bg-white border border-gray-200 rounded-md flex items-center justify-center">
        <Spinner />
      </div>
    );
  } else if (isSuccess) {
    content = isMobile ? (
      <Mobile
        data={data}
        invoId={invoId}
        refetch={refetch}
        currentUser={currentUser}
        succ={succ}
        setSucc={setSucc}
        added={added}
        setAdded={setAdded}
      />
    ) : (
      <Desktop
        data={data}
        invoId={invoId}
        refetch={refetch}
        currentUser={currentUser}
        succ={succ}
        setSucc={setSucc}
        added={added}
        setAdded={setAdded}
      />
    );
  }

  return content;
};

export default Pay;
