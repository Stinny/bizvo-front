import { Badge, Spinner } from 'flowbite-react';
import React, { useState } from 'react';
import { Calendar, Edit, ExternalLink, Save, Trash, X } from 'react-feather';
import {
  useChangeSchedMutation,
  useGetUpdateUrlMutation,
  useRemoveBankMutation,
} from '../../../api/stripeApiSlice';
import { showNotification } from '../../../api/toastSlice';
import { useDispatch } from 'react-redux';
import { Spin } from 'antd';

const Bank = ({ currentUser, refetch }) => {
  const dispatch = useDispatch();

  const [schedule, setSchedule] = useState(currentUser?.schedule);
  const [sched, setSched] = useState(false);
  const [del, setDel] = useState(false);

  const [getUpdateUrl, { isLoading }] = useGetUpdateUrlMutation();
  const [removeBank, { isLoading: removing }] = useRemoveBankMutation();
  const [changeSched, { isLoading: changingSched }] = useChangeSchedMutation();

  const handleGetUpdateUrl = async () => {
    try {
      const urlReq = await getUpdateUrl().unwrap();
      window.location.href = urlReq;
    } catch (err) {
      return;
    }
  };

  const handleRemoveBank = async () => {
    try {
      const req = await removeBank().unwrap();

      if (req === 'Bank deleted') {
        dispatch(showNotification('Bank disconnected'));
        refetch();
      }
    } catch (err) {
      return;
    }
  };

  const handleSaveSched = async () => {
    try {
      const req = await changeSched({ sched: schedule }).unwrap();

      if (req === 'Sched updated') {
        dispatch(showNotification('Payout schedule updated'));
        setSched(false);
        refetch();
      }
    } catch (err) {
      return;
    }
  };

  const handleSchedCancel = () => {
    setSchedule(currentUser?.schedule);
    setSched(false);
  };

  return (
    <div className="w-full flex flex-col items-start">
      {removing || changingSched ? (
        <div className="flex items-center justify-center w-7/12 h-32">
          <Spin size="small" />
        </div>
      ) : (
        <div className="flex flex-col items-start gap-4 w-7/12">
          <div className="flex flex-col gap-4 items-start w-full">
            <div className="flex flex-col gap-1 w-full items-start">
              <p className="text-xs text-stone-800">Bank ID</p>
              <input
                type="text"
                placeholder="--------"
                className="text-xs border border-gray-200 focus:outline-none text-stone-800 ring-0 w-full rounded-sm p-2"
                disabled
                value={currentUser?.bankId}
              />
            </div>
            <div className="flex flex-col w-full items-start gap-1">
              <p className="text-xs text-stone-800">Bank Name</p>
              <input
                type="text"
                placeholder="--------"
                className="text-xs  border border-gray-200 focus:outline-none text-stone-800 ring-0 w-full rounded-sm p-2"
                disabled
                value={currentUser?.bankName}
              />
            </div>
          </div>
          <div className="flex justify-between items-center w-full">
            {del || sched ? (
              ''
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setSched(!sched)}
                  style={{ fontSize: '10px' }}
                  className="text-stone-800 p-0.5 pr-2 pl-2 border border-stone-800 rounded-sm flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Calendar size={12} />
                  {schedule === 'Monthly' ? 'Monthly' : 'Weekly'}
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setDel(!del)}
                    className="text-red-400 cursor-pointer"
                  >
                    <Trash size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={handleGetUpdateUrl}
                    className="text-stone-800 cursor-pointer"
                  >
                    <ExternalLink size={14} />
                  </button>
                </div>
              </>
            )}
            {del ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="border border-red-400 text-red-400 rounded-sm p-0.5 pl-2 pr-2 cursor-pointer"
                  style={{ fontSize: '10px' }}
                  onClick={handleRemoveBank}
                >
                  Remove Bank
                </button>
                <button
                  type="button"
                  className=" text-stone-800 rounded-sm border border-stone-800 p-0.5 pl-2 pr-2 cursor-pointer"
                  style={{ fontSize: '10px' }}
                  onClick={() => setDel(false)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              ''
            )}
            {sched ? (
              <div className="w-full flex items-center justify-between gap-1">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className=" text-red-400 cursor-pointer"
                    onClick={handleSchedCancel}
                  >
                    <X size={14} />
                  </button>
                  <button
                    type="button"
                    className=" text-stone-800 cursor-pointer"
                    onClick={handleSaveSched}
                  >
                    <Save size={14} />
                  </button>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className={`${
                      schedule === 'Weekly'
                        ? 'border-stone-800'
                        : 'border-white'
                    } text-stone-800 border rounded-sm hover:border-stone-800 p-0.5 pl-2 pr-2 cursor-pointer`}
                    style={{ fontSize: '11px' }}
                    onClick={() => setSchedule('Weekly')}
                  >
                    Weekly
                  </button>
                  <button
                    type="button"
                    className={`${
                      schedule === 'Monthly'
                        ? 'border-stone-800'
                        : 'border-white'
                    } text-stone-800 border rounded-sm hover:border-stone-800 p-0.5 pl-2 pr-2 cursor-pointer`}
                    style={{ fontSize: '11px' }}
                    onClick={() => setSchedule('Monthly')}
                  >
                    Monthly
                  </button>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Bank;
