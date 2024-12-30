import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import Sidenav from '../../../components/Sidenav/Sidenav';
import Footer from '../../../components/Footer/Footer';
import { useGetStatsTempQuery } from '../../../api/accountApiSlice';
import Loading from '../../../components/Loading';
import Desktop from './Desktop';
import Cookies from 'js-cookie';

const Home = () => {
  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  const { data, isLoading, isSuccess, refetch } = useGetStatsTempQuery();

  let content;

  if (isLoading) {
    content = <Loading />;
  } else if (isSuccess) {
    content = <Desktop data={data} currentUser={currentUser} />;
  }

  return (
    <div className="mx-auto max-w-3xl flex flex-col items-start gap-2 h-screen relative">
      <Navbar />
      <div className="flex items-start gap-2 w-full">
        <Sidenav />
        {content}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
