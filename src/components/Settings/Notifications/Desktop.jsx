import { Switch } from 'antd';
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
          <Switch
            size="small"
            checked={news}
            onChange={(checked) => setNews(checked)}
            style={{
              backgroundColor: news ? 'rgb(41 37 36)' : 'rgb(229 231 235)',
              borderColor: '#000000',
            }}
          />
          <div className="flex flex-col items-start">
            <p className="text-xs text-stone-800">Newsletter</p>
            <p className="text-xs text-stone-800">
              Receive the monthly Bizvo newsletter
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Switch
            size="small"
            checked={paid}
            onChange={(checked) => setPaid(checked)}
            style={{
              backgroundColor: paid ? 'rgb(41 37 36)' : 'rgb(229 231 235)',
              borderColor: '#000000',
            }}
          />
          <div className="flex flex-col items-start">
            <p className="text-xs text-stone-800">Paid Invoices</p>
            <p className="text-xs text-stone-800">
              Receive an email whenever an invoice is paid
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Switch
            size="small"
            checked={late}
            onChange={(checked) => setLate(checked)}
            style={{
              backgroundColor: late ? 'rgb(41 37 36)' : 'rgb(229 231 235)',
              borderColor: '#000000',
            }}
          />
          <div className="flex flex-col items-start">
            <p className="text-xs text-stone-800">Overdue Invoices</p>
            <p className="text-xs text-stone-800">
              Receive an email whenever an invoice is overdue
            </p>
          </div>
        </div>
        {/* <div className="flex items-center gap-3">
          <Switch
            size="small"
            checked={revCol}
            onChange={(checked) => setRevCol(checked)}
            style={{
              backgroundColor: revCol ? 'rgb(41 37 36)' : 'rgb(229 231 235)',
              borderColor: '#000000',
            }}
          />
          <div className="flex flex-col items-start">
            <p className="text-xs text-stone-800">Review Collected</p>
            <p className="text-xs text-stone-600">
              Receive an email whenever a customer leaves a review
            </p>
          </div>
        </div> */}
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
      <div className="flex flex-col items-start w-full gap-6">
        <div className="flex items-center gap-3">
          <Switch
            size="small"
            disabled
            checked={currentUser?.news}
            style={{
              backgroundColor: currentUser?.news
                ? 'rgb(41 37 36)'
                : 'rgb(229 231 235)',
              borderColor: '#000000',
            }}
          />
          <p className="text-xs text-stone-800">Newsletter</p>
        </div>
        <div className="flex items-center gap-3">
          <Switch
            size="small"
            disabled
            checked={currentUser?.invoPaid}
            style={{
              backgroundColor: currentUser?.invoPaid
                ? 'rgb(41 37 36)'
                : 'rgb(229 231 235)',
              borderColor: '#000000',
            }}
          />
          <p className="text-xs text-stone-800">Paid Invoices</p>
        </div>
        <div className="flex items-center gap-3">
          <Switch
            size="small"
            disabled
            checked={currentUser?.invoLate}
            style={{
              backgroundColor: currentUser?.invoLate
                ? 'rgb(41 37 36)'
                : 'rgb(229 231 235)',
              borderColor: '#000000',
            }}
          />
          <p className="text-xs text-stone-800">Overdue Invoices</p>
        </div>
        {/* <div className="flex items-center gap-3">
          <Switch
            size="small"
            disabled
            checked={currentUser?.revCol}
            style={{
              backgroundColor: currentUser?.revCol
                ? 'rgb(41 37 36)'
                : 'rgb(229 231 235)',
              borderColor: '#000000',
            }}
          />
          <p className="text-xs text-stone-800">Review Collected</p>
        </div> */}
      </div>
    </div>
  );
};

export default Desktop;
