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
          <button type="button" onClick={handleCancel} className="text-red-400">
            <X size={16} />
          </button>
          <button
            type="button"
            onClick={handleSaveNotis}
            className="text-stone-800"
          >
            <Save size={16} />
          </button>
        </div>
      </div>
      <div className="flex flex-col items-start w-full gap-4">
        <div className="flex items-center gap-3">
          <Checkbox
            checked={news}
            onChange={(e) => setNews(e.target.checked)}
          />
          <div className="flex flex-col items-start">
            <p className="text-xs text-stone-800">Newsletter</p>
            <p className="text-xs text-stone-800">
              Receive the monthly Bizvo newsletter
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox
            checked={paid}
            onChange={(e) => setPaid(e.target.checked)}
          />
          <div className="flex flex-col items-start">
            <p className="text-xs text-stone-800">Payments</p>
            <p className="text-xs text-stone-800">
              Whenever an invoice payment is successful
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox
            checked={late}
            onChange={(e) => setLate(e.target.checked)}
          />
          <div className="flex flex-col items-start">
            <p className="text-xs text-stone-800">Overdue</p>
            <p className="text-xs text-stone-800">
              Whenever an invoice is overdue
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
            className="text-stone-800"
          >
            <EditIcon size={16} />
          </button>
        </div>
      </div>
      <div className="flex flex-col items-start w-full gap-4">
        <div className="flex items-center gap-3">
          <Checkbox checked={news} disabled />
          <div className="flex flex-col items-start">
            <p className="text-xs text-stone-800">Newsletter</p>
            <p className="text-xs text-stone-800">
              Receive the monthly Bizvo newsletter
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox checked={paid} disabled />
          <div className="flex flex-col items-start">
            <p className="text-xs text-stone-800">Payments</p>
            <p className="text-xs text-stone-800">
              Whenever an invoice payment is successful
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox checked={late} disabled />
          <div className="flex flex-col items-start">
            <p className="text-xs text-stone-800">Overdue</p>
            <p className="text-xs text-stone-800">
              Whenever an invoice is overdue
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Desktop;
