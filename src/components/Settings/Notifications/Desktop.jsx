import { Checkbox, Switch } from 'antd';
import React, { useState } from 'react';
import { Edit as EditIcon, Save, X } from 'react-feather';

const Desktop = ({
  handleSaveNotis,
  handleCancel,
  news,
  setNews,
  paid,
  setPaid,
  late,
  setLate,
  currentUser,
  revCol,
  setRevCol,
  edit,
  setEdit,
  error,
}) => {
  return edit ? (
    <div className="w-full flex flex-col items-start gap-4">
      <div className="w-full flex items-start justify-between">
        <div className="flex flex-col items-start">
          <p className="text-sm text-stone-800">Notification Settings</p>
          <p className="text-xs text-stone-800">
            Editing what email notifications you receive
          </p>
        </div>
        {error ? (
          <div className="flex items-center justify-start gap-2 border border-gray-200 rounded-md p-2">
            <AlertOctagon size={14} className="text-red-400" />
            <p className="text-stone-800 text-xs">{error}</p>
          </div>
        ) : (
          ''
        )}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSaveNotis}
            className="text-stone-800 cursor-pointer"
          >
            <Save size={16} />
          </button>
        </div>
      </div>
      <div className="flex flex-col items-start w-full gap-4">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={news}
            onChange={(e) => setNews(e.target.checked)}
          />
          <div className="flex flex-col items-start">
            <p className="text-xs text-stone-800 font-medium">Newsletter</p>
            <p className="text-xs text-stone-800">
              Stay updated with the latest from Bizvo
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Checkbox
            checked={paid}
            onChange={(e) => setPaid(e.target.checked)}
          />
          <div className="flex flex-col items-start">
            <p className="text-xs text-stone-800 font-medium">Payments</p>
            <p className="text-xs text-stone-800">
              Whenever an invoice is paid successfully
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Checkbox
            checked={late}
            onChange={(e) => setLate(e.target.checked)}
          />
          <div className="flex flex-col items-start">
            <p className="text-xs text-stone-800 font-medium">Overdue</p>
            <p className="text-xs text-stone-800">
              Whenever an invoice is overdue
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Checkbox
            checked={late}
            onChange={(e) => setLate(e.target.checked)}
          />
          <div className="flex flex-col items-start">
            <p className="text-xs text-stone-800 font-medium">Authentication</p>
            <p className="text-xs text-stone-800">
              Whenever a new device is used to log in
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full flex flex-col items-start gap-4">
      <div className="w-full flex items-start justify-between">
        <div className="flex flex-col items-start">
          <p className="text-sm text-stone-800">Notification Settings</p>
          <p className="text-xs text-stone-800">
            Viewing what email notifications you receive
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setEdit(!edit)}
            className="text-stone-800 cursor-pointer"
          >
            <EditIcon size={14} />
          </button>
        </div>
      </div>
      <div className="flex flex-col items-start w-full gap-4">
        <div className="flex items-start gap-3">
          <Checkbox defaultChecked={news} disabled={true} />
          <div className="flex flex-col items-start">
            <p className="text-xs text-stone-800 font-medium">Newsletter</p>
            <p className="text-xs text-stone-800">
              Receive the monthly Bizvo newsletter
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Checkbox checked={paid} disabled />
          <div className="flex flex-col items-start">
            <p className="text-xs text-stone-800 font-medium">Payments</p>
            <p className="text-xs text-stone-800">
              Whenever an invoice payment is successful
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Checkbox checked={late} disabled />
          <div className="flex flex-col items-start">
            <p className="text-xs text-stone-800 font-medium">Overdue</p>
            <p className="text-xs text-stone-800">
              Whenever an invoice is overdue
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Checkbox checked={late} disabled />
          <div className="flex flex-col items-start">
            <p className="text-xs text-stone-800 font-medium">Authentication</p>
            <p className="text-xs text-stone-800">
              Whenever a new device is used to log in
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Desktop;
