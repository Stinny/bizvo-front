import React from 'react';
import { Globe, Instagram, Linkedin, Save, X } from 'react-feather';
import { FaMedium } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Edit = ({
  setEdit,
  handleSaveEdits,
  name,
  setName,
  about,
  setAbout,
  slug,
  setSlug,
  linked,
  setLinked,
  x,
  setX,
  medium,
  setMedium,
  link,
  setLink,
  insta,
  setInsta,
}) => {
  return (
    <div className="w-full flex flex-col items-start gap-4">
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col items-start">
          <p className="text-sm text-stone-800">Profile Settings</p>
          <p className="text-xs text-stone-700">
            Change and save any details below
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setEdit(false)}
            className="text-red-400"
          >
            <X size={16} />
          </button>
          <button
            type="button"
            onClick={handleSaveEdits}
            className="text-stone-800"
          >
            <Save size={16} />
          </button>
        </div>
      </div>
      <form className="flex items-start w-full gap-2">
        <div className="flex flex-col w-full gap-2">
          <div className="flex flex-col items-start w-full gap-1">
            <p className="text-xs text-stone-700">Profile Slug</p>
            <div className="flex w-full">
              <div className="rounded-tl-md rounded-bl-md bg-gray-50 border border-r-0 border-gray-200 flex items-center p-2 pr-1">
                <p className="text-xs">bizvo.com/</p>
              </div>
              <input
                type="text"
                placeholder="Slug"
                className="border text-xs border-gray-200 bg-gray-50 focus:ring-0 focus:border-gray-200 focus:outline-none focus:bg-gray-200 border-l-0 rounded-tr-md rounded-br-md p-2 pl-1 flex-1"
                onChange={(e) => setSlug(e.target.value)}
                value={slug}
              />
            </div>
          </div>
          <div className="flex flex-col items-start w-full gap-1">
            <p className="text-xs text-stone-700">About</p>
            <textarea
              placeholder="What do you sell.."
              className="text-xs bg-gray-50 border border-gray-200 focus:ring-0 focus:border-gray-200 focus:outline-none focus:bg-gray-200 text-stone-800 ring-0 w-full rounded-md p-2 resize-none h-16"
              onChange={(e) => setAbout(e.target.value)}
              value={about}
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-col items-start w-full gap-1">
            <p className="text-xs text-stone-700">Links</p>
            <div className="w-full flex flex-col items-start gap-2">
              <div className="flex w-full">
                <div className="rounded-tl-md rounded-bl-md bg-gray-50 border border-r-0 border-gray-200 flex items-center p-2 pr-1">
                  <FaXTwitter className="text-xs" />
                </div>
                <input
                  type="text"
                  placeholder="X"
                  className="border text-xs border-gray-200 bg-gray-50 focus:ring-0 focus:border-gray-200 focus:outline-none focus:bg-gray-200 border-l-0 rounded-tr-md rounded-br-md p-2 pl-1 flex-1"
                  onChange={(e) => setX(e.target.value)}
                  value={x}
                />
              </div>
              <div className="flex w-full">
                <div className="rounded-tl-md rounded-bl-md bg-gray-50 border border-r-0 border-gray-200 flex items-center p-2 pr-1">
                  <FaMedium className="text-xs" />
                </div>
                <input
                  type="text"
                  placeholder="Medium"
                  className="border text-xs border-gray-200 bg-gray-50 focus:ring-0 focus:border-gray-200 focus:outline-none focus:bg-gray-200 border-l-0 rounded-tr-md rounded-br-md p-2 pl-1 flex-1"
                  onChange={(e) => setMedium(e.target.value)}
                  value={medium}
                />
              </div>
              <div className="flex w-full">
                <div className="rounded-tl-md rounded-bl-md bg-gray-50 border border-r-0 border-gray-200 flex items-center p-2 pr-1">
                  <Linkedin size={14} className="text-stone-800" />
                </div>
                <input
                  type="text"
                  placeholder="Linkedin"
                  className="border text-xs border-gray-200 bg-gray-50 focus:ring-0 focus:border-gray-200 focus:outline-none focus:bg-gray-200 border-l-0 rounded-tr-md rounded-br-md p-2 pl-1 flex-1"
                  onChange={(e) => setLinked(e.target.value)}
                  value={linked}
                />
              </div>

              <div className="flex w-full">
                <div className="rounded-tl-md rounded-bl-md bg-gray-50 border border-r-0 border-gray-200 flex items-center p-2 pr-1">
                  <Instagram size={14} className="text-stone-800" />
                </div>
                <input
                  type="text"
                  placeholder="Instagram"
                  className="border text-xs border-gray-200 bg-gray-50 focus:ring-0 focus:border-gray-200 focus:outline-none focus:bg-gray-200 border-l-0 rounded-tr-md rounded-br-md p-2 pl-1 flex-1"
                  onChange={(e) => setInsta(e.target.value)}
                  value={insta}
                />
              </div>
              <div className="flex w-full">
                <div className="rounded-tl-md rounded-bl-md bg-gray-50 border border-r-0 border-gray-200 flex items-center p-2 pr-1">
                  <Globe size={14} className="text-stone-800" />
                </div>
                <input
                  type="text"
                  placeholder="Website"
                  className="border text-xs border-gray-200 bg-gray-50 focus:ring-0 focus:border-gray-200 focus:outline-none focus:bg-gray-200 border-l-0 rounded-tr-md rounded-br-md p-2 pl-1 flex-1"
                  onChange={(e) => setLink(e.target.value)}
                  value={link}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Edit;
