import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import handleLogoutUser from '../../utils/logout';
import { useDispatch } from 'react-redux';
import {
  ChevronRight,
  Layers,
  LogOut,
  Monitor,
  Smartphone,
} from 'react-feather';
import useHandleLogoutUser from '../../utils/logout';

const MobilePlaceholder = ({ currentUser }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = useHandleLogoutUser();

  return (
    <div className="h-screen w-full mx-auto flex items-center justify-center">
      <div className="w-full mx-auto flex flex-col gap-6 items-center justify-center">
        <div className="w-full flex items-center justify-center">
          <Link to="/">
            <p
              className="font-bold text-stone-800 dark:text-white text-sm flex items-center gap-1"
              style={{ fontFamily: 'Geist Mono' }}
            >
              <Layers size={16} className="font-black dark:text-white" />
              Bizvo
            </p>
          </Link>
        </div>

        <div className="flex flex-col gap-1 items-center">
          <p className="text-sm text-stone-800 text-center font-medium">
            Mobile view not available
          </p>
          <p className="text-xs text-stone-800 text-center w-64">
            To access your dashboard login using a desktop browser. A mobile
            view is on the way!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Smartphone size={18} className="text-stone-800" />
          <ChevronRight size={14} className="text-stone-800" />
          <Monitor size={18} className="text-stone-800" />
        </div>

        <button
          type="button"
          onClick={() => logout('logout')}
          className="p-1 bg-white rounded-sm text-stone-800 border border-stone-800 flex items-center justify-center gap-1 text-xs"
        >
          Logout
          <LogOut size={14} />
        </button>
      </div>
    </div>
  );
};

export default MobilePlaceholder;
