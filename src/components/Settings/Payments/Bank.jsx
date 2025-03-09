import { Badge, Spinner } from 'flowbite-react';
import React, { useState } from 'react';
import { Calendar, Edit, Save, Trash, X } from 'react-feather';
import { BiSolidBank } from 'react-icons/bi';
import {
  useChangeSchedMutation,
  useGetUpdateUrlMutation,
  useRemoveBankMutation,
} from '../../../api/stripeApiSlice';
import { showNotification } from '../../../api/toastSlice';
import { useDispatch } from 'react-redux';

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
    <div className="w-full flex flex-col items-center justify-center mt-2">
      {removing || changingSched ? (
        <div className="flex items-center justify-center w-96 h-52">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col items-start gap-2 w-80">
          <div className="w-full flex flex-col items-start">
            <div className="flex items-center gap-1">
              <BiSolidBank className="text-stone-800" />
              <p className="text-sm text-stone-800">Bank Account</p>
            </div>
            <p className="text-xs text-stone-800">Payouts via bank account</p>
          </div>

          <div className="flex flex-col gap-2 items-start w-full">
            <div className="flex flex-col gap-1 w-full items-start">
              <p className="text-xs text-stone-800">Bank ID</p>
              <input
                type="text"
                placeholder="Pending"
                className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2"
                disabled
                value={currentUser?.bankId}
              />
            </div>
            <div className="flex flex-col w-full items-start gap-1">
              <p className="text-xs text-stone-800">Bank Name</p>
              <input
                type="text"
                placeholder="Pending"
                className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2"
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
                  className="text-stone-800 p-0.5 pr-2 pl-2 border border-stone-800 rounded-md flex items-center justify-center gap-1"
                >
                  <Calendar size={14} />
                  {schedule === 'Monthly' ? 'Monthly' : 'Weekly'}
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setDel(!del)}
                    className="text-red-400"
                  >
                    <Trash size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={handleGetUpdateUrl}
                    className="text-stone-800"
                  >
                    <Edit size={14} />
                  </button>
                </div>
              </>
            )}
            {del ? (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="border border-red-400 text-red-400 rounded-md p-0.5 pl-2 pr-2"
                  style={{ fontSize: '10px' }}
                  onClick={handleRemoveBank}
                >
                  Disconnect
                </button>
                <button
                  type="button"
                  className=" text-stone-800 rounded-md border border-stone-800 p-0.5 pl-2 pr-2"
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
              <div className="w-full flex items-center gap-1">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className={`${
                      schedule === 'Weekly'
                        ? 'border-stone-800'
                        : 'border-white'
                    } text-stone-800 border rounded-md hover:border-stone-800 p-0.5 pl-2 pr-2 text-xs`}
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
                    } text-stone-800 border rounded-md hover:border-stone-800 p-0.5 pl-2 pr-2 text-xs`}
                    onClick={() => setSchedule('Monthly')}
                  >
                    Monthly
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className=" text-red-400"
                    onClick={handleSchedCancel}
                  >
                    <X size={14} />
                  </button>
                  <button
                    type="button"
                    className=" text-stone-800"
                    onClick={handleSaveSched}
                  >
                    <Save size={14} />
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
