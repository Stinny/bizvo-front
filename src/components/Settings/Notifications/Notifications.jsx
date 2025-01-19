import React, { useState } from 'react';
import Desktop from './Desktop';
import { useEditNotisMutation } from '../../../api/accountApiSlice';
import { showNotification } from '../../../api/toastSlice';
import { useDispatch } from 'react-redux';

const Notifications = ({ currentUser, refetch, setActiveTabIndex }) => {
  const dispatch = useDispatch();

  const [news, setNews] = useState(currentUser?.news);
  const [paid, setPaid] = useState(currentUser?.invoPaid);
  const [late, setLate] = useState(currentUser?.invoLate);
  const [revCol, setRevCol] = useState(currentUser?.revCol);
  const [error, setError] = useState('');

  //form view
  const [edit, setEdit] = useState(false);

  //hook for making API req
  const [editNotis, result] = useEditNotisMutation();

  const handleSaveNotis = async () => {
    setError('');
    try {
      const editReq = await editNotis({
        news: news,
        paid: paid,
        late: late,
        revCol: revCol,
      }).unwrap();

      if (editReq === 'Updated') {
        dispatch(showNotification('Notifications updated'));
        refetch();
        setActiveTabIndex(2);
        setEdit(false);
      }
    } catch (err) {
      setError('There was an error');
      return;
    }
  };

  const handleCancel = () => {
    setError('');
    setNews(currentUser?.news);
    setPaid(currentUser?.invoPaid);
    setLate(currentUser?.invoLate);
    setEdit(false);
  };

  return (
    <Desktop
      handleSaveNotis={handleSaveNotis}
      handleCancel={handleCancel}
      news={news}
      setNews={setNews}
      paid={paid}
      setPaid={setPaid}
      late={late}
      setLate={setLate}
      currentUser={currentUser}
      revCol={revCol}
      setRevCol={setRevCol}
      edit={edit}
      setEdit={setEdit}
      error={error}
    />
  );
};

export default Notifications;
