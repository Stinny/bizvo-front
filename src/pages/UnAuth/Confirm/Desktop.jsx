import React from 'react';
import { Check, CheckCircle, ChevronRight, Layers, X } from 'react-feather';
import { Link } from 'react-router-dom';

const Desktop = ({ confirmed, handleSendConfirmLink, sent }) => {
  return confirmed ? (
    <div className="w-full mx-auto">
      <div className="w-72 mx-auto mt-16">
        <div className="flex flex-col items-center w-full text-center gap-2">
          <Link to="/" className="flex gap-1 items-center mb-2">
            <Layers size={18} className="font-black" />
            <p
              className="font-bold text-stone-800 text-lg"
              style={{ fontFamily: 'Space Mono, monospace' }}
            >
              Bizvo
            </p>
          </Link>
          <p className="text-stone-800 text-sm flex items-center gap-1">
            <CheckCircle size={18} className="text-green-400" />
            Email confirmed
          </p>
          <p className="text-stone-600 text-xs">
            You can now return to your dashboard to continue with your account
            setup.
          </p>
          <Link
            to="/dashboard"
            className="mt-2 flex items-center justify-center gap-1 border border-stone-800 rounded-md p-1 text-xs text-stone-800 w-24"
          >
            Dashboard <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full mx-auto">
      <div className="w-72 mx-auto mt-16">
        {sent ? (
          <div className="flex flex-col items-center w-full text-center gap-2">
            <Link to="/" className="flex gap-1 items-center mb-2">
              <Layers size={18} className="font-black" />
              <p
                className="font-bold text-stone-800 text-lg"
                style={{ fontFamily: 'Space Mono, monospace' }}
              >
                Bizvo
              </p>
            </Link>
            <p className="text-stone-800 text-sm flex items-center gap-1">
              <X size={18} className="text-red-400" />
              Email not confirmed
            </p>
            <p className="text-stone-600 text-xs">
              A new confirmation link has been sent to your email. It will
              expire in 12 hours.
            </p>

            <button
              type="button"
              className="mt-2 border border-stone-800 rounded-md p-1 text-xs text-stone-800 flex items-center justify-center gap-1"
              disabled
            >
              Sent <Check size={14} className="text-green-400" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center w-full text-center gap-2">
            <Link to="/" className="flex gap-1 items-center mb-2">
              <Layers size={18} className="font-black" />
              <p
                className="font-bold text-stone-800 text-lg"
                style={{ fontFamily: 'Space Mono, monospace' }}
              >
                Bizvo
              </p>
            </Link>
            <p className="text-stone-800 text-sm flex items-center gap-1">
              <X size={18} className="text-red-400" />
              Email not confirmed
            </p>
            <p className="text-stone-600 text-xs">
              Your link has expired or is invalid. Send another confirmation
              link below.
            </p>

            <button
              type="button"
              onClick={handleSendConfirmLink}
              className="mt-2 border border-stone-800 rounded-md p-1 text-xs text-stone-800"
            >
              Send Link
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Desktop;
