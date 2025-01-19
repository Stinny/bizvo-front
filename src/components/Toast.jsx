import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideNotification } from '../api/toastSlice';
import { X } from 'react-feather';

const Toast = () => {
  const toast = useSelector((state) => state.toast);
  const dispatch = useDispatch();

  useEffect(() => {
    if (toast.isOpen) {
      const timeout = setTimeout(() => {
        dispatch(hideNotification());
      }, 4000); // 5 seconds timeout

      return () => clearTimeout(timeout);
    }
  }, [toast.isOpen]);

  return toast.isOpen ? (
    <div className="flex items-center justify-start gap-1 bg-gray-50 border border-gray-200 rounded-md p-0.5 pr-1 pl-1">
      <X
        size={14}
        onClick={() => dispatch(hideNotification())}
        className="hover:cursor-pointer text-stone-800"
      />
      <p className="text-stone-800 text-xs font-semibold">{toast.message}</p>
    </div>
  ) : (
    ''
  );
};

export default Toast;
