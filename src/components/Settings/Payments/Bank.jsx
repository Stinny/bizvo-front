import { Badge, Spinner } from 'flowbite-react';
import React, { useState } from 'react';
import { Calendar, Edit, Save, Trash, X } from 'react-feather';
import { BiSolidBank } from 'react-icons/bi';
import {
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

  const handleSaveSched = async () => {};

  return (
    <div className="w-full flex flex-col items-start">
      {/* Bank pending display */}
      {currentUser?.bankPending ? (
        <div className="p-2 border border-gray-200 rounded-md flex flex-col items-start gap-2 w-72 relative">
          {isLoading || removing ? (
            <div className="w-full h-32 flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <>
              <div className="absolute right-0 top-0 mr-1 mt-1">
                <Badge color="info">Pending</Badge>
              </div>
              <div className="w-full flex flex-col items-start">
                <BiSolidBank className="text-stone-800" />
                <p className="text-sm text-stone-800">Bank Account</p>
                <p className="text-xs text-stone-700">
                  Payouts via bank account
                </p>
              </div>
              <div className="flex flex-col items-start w-full">
                <div className="flex flex-col w-full items-start">
                  <p className="text-xs text-stone-700">Bank ID</p>
                  <input
                    type="text"
                    placeholder="Pending"
                    className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2"
                    disabled
                  />
                </div>
                <div className="flex flex-col w-full items-start">
                  <p className="text-xs text-stone-700">Bank Name</p>
                  <input
                    type="text"
                    placeholder="Pending"
                    className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2"
                    disabled
                  />
                </div>
              </div>
              <div className="flex justify-end w-full">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleRemoveBank}
                    className="text-red-400"
                  >
                    <Trash size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={handleGetUpdateUrl}
                    className="text-stone-800"
                  >
                    <Edit size={16} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        ''
      )}

      {/* Bank connected display */}
      {currentUser?.bankAdded && !del && !sched ? (
        <div className="p-2 border border-gray-200 rounded-md flex flex-col items-start gap-2 w-6/12 relative">
          <div className="absolute right-0 top-0 mr-1 mt-1">
            <Badge color="success">Connected</Badge>
          </div>
          <div className="w-full flex flex-col items-start">
            <BiSolidBank className="text-stone-800" />
            <p className="text-sm text-stone-800">Bank Account</p>
            <p className="text-xs text-stone-700">Payouts via bank account</p>
          </div>

          <div className="flex flex-col items-start w-full">
            <div className="flex flex-col w-full items-start">
              <p className="text-xs text-stone-700">Bank ID</p>
              <input
                type="text"
                placeholder="Pending"
                className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2"
                disabled
                value={currentUser?.bankId}
              />
            </div>
            <div className="flex flex-col w-full items-start">
              <p className="text-xs text-stone-700">Bank Name</p>
              <input
                type="text"
                placeholder="Pending"
                className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2"
                disabled
                value={currentUser?.bankName}
              />
            </div>
          </div>
          <div className="flex justify-between w-full">
            <button
              type="button"
              onClick={() => setSched(!sched)}
              className="text-stone-800 text-xs p-0.5 pr-2 pl-2 border border-stone-800 rounded-md flex items-center justify-center gap-1"
            >
              {schedule === 'monthly' ? 'Monthly' : 'Weekly'}
              <Calendar size={12} />
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setDel(!del)}
                className="text-red-400"
              >
                <Trash size={16} />
              </button>
              <button
                type="button"
                onClick={handleGetUpdateUrl}
                className="text-stone-800"
              >
                <Edit size={16} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}

      {/* Remove bank display */}
      {del ? (
        <div className="p-2 border border-gray-200 rounded-md flex flex-col items-start gap-2 w-6/12 relative">
          <div className="absolute right-0 top-0 mr-1 mt-1">
            <Badge color="success">Connected</Badge>
          </div>
          <div className="w-full flex flex-col items-start">
            <BiSolidBank className="text-stone-800" />
            <p className="text-sm text-stone-800">Bank Account</p>
            <p className="text-xs text-stone-700">Payouts via bank</p>
          </div>
          {removing ? (
            <div className="w-full h-32 flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <div className="w-full flex flex-col items-start gap-2">
              <p className="text-xs text-stone-700">
                Are you sure you want to remove your connected bank account?
              </p>
              <div className="flex items-center justify-end w-full gap-2">
                <button
                  type="button"
                  className=" text-stone-800 rounded-md border border-stone-800 p-1 text-xs"
                  onClick={() => setDel(false)}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="border border-red-400 text-red-400 rounded-md p-1 text-xs"
                  onClick={handleRemoveBank}
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        ''
      )}

      {/* View/edit payout sched display */}
      {sched ? (
        <div className="p-2 border border-gray-200 rounded-md flex flex-col items-start gap-2 w-6/12 relative">
          <div className="absolute right-0 top-0 mr-1 mt-1">
            <Badge color="success">Connected</Badge>
          </div>
          <div className="w-full flex flex-col items-start">
            <BiSolidBank className="text-stone-800" />
            <p className="text-sm text-stone-800">Bank Account</p>
            <p className="text-xs text-stone-700">Payouts via bank</p>
          </div>
          <div className="w-full flex flex-col items-start gap-2">
            <p className="text-xs text-stone-700">
              Change your payout schedule
            </p>
            <div className="flex items-center gap-2">
              {false ? (
                <Spinner />
              ) : (
                <>
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
                </>
              )}
            </div>
            <div className="flex items-center justify-end w-full gap-2">
              <button
                type="button"
                className=" text-red-400"
                onClick={() => setSched(false)}
              >
                <X size={16} />
              </button>
              <button
                type="button"
                className=" text-stone-800"
                onClick={handleSaveSched}
              >
                <Save size={16} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Bank;
