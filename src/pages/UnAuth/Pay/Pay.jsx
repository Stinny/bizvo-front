import React, { useEffect } from 'react';
import Desktop from './Desktop';
import { useParams, useSearchParams } from 'react-router-dom';
import { useGetInvoiceToPayQuery } from '../../../api/invoicesApiSlice';
import { Spinner } from 'flowbite-react';
import Cookies from 'js-cookie';

const Pay = () => {
  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  //get invo ID from url params
  //get invo tkn from url query params
  const [searchParams] = useSearchParams();
  const token = searchParams.get('iat');
  const { invoId } = useParams();

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
    content = (
      <Desktop
        data={data}
        invoId={invoId}
        refetch={refetch}
        currentUser={currentUser}
      />
    );
  }

  return content;
};

export default Pay;
