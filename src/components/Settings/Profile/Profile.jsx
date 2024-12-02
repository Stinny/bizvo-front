import React, { useState } from 'react';
import { Edit as EditIcon, Globe, Instagram, Linkedin } from 'react-feather';
import { FaMedium } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Edit from './Edit';
import { useEditProfileMutation } from '../../../api/accountApiSlice';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../../api/toastSlice';

const Profile = ({ currentUser, refetch }) => {
  const dispatch = useDispatch();

  const [edit, setEdit] = useState(false);

  //form state
  const [name, setName] = useState(currentUser?.name);
  const [about, setAbout] = useState(currentUser?.about);
  const [slug, setSlug] = useState(currentUser?.slug);
  const [linked, setLinked] = useState(currentUser?.links?.linked);
  const [x, setX] = useState(currentUser?.links?.x);
  const [insta, setInsta] = useState(currentUser?.links?.insta);
  const [link, setLink] = useState(currentUser?.links?.link);
  const [medium, setMedium] = useState(currentUser?.links?.medium);
  const [error, setError] = useState('');

  //hook for making API call
  const [editProfile, result] = useEditProfileMutation();

  //handler for sending edit req
  const handleSaveEdits = async () => {
    try {
      const editReq = await editProfile({
        name: name,
        desc: about,
        slug: slug,
        linked: linked,
        medium: medium,
        insta: insta,
        x: x,
        link: link,
      }).unwrap();

      if (editReq === 'Updated') {
        dispatch(showNotification('Profile updated'));
        refetch();
        setEdit(false);
      }
    } catch (err) {
      setError('Server error');
      return;
    }
  };

  return edit ? (
    <Edit
      handleSaveEdits={handleSaveEdits}
      name={name}
      setName={setName}
      about={about}
      setAbout={setAbout}
      slug={slug}
      setSlug={setSlug}
      linked={linked}
      setLinked={setLinked}
      x={x}
      setX={setX}
      medium={medium}
      setMedium={setMedium}
      link={link}
      setLink={setLink}
      insta={insta}
      setInsta={setInsta}
      setEdit={setEdit}
    />
  ) : (
    <div className="w-full flex flex-col gap-4 items-start">
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col items-start">
          <p className="text-sm text-stone-800">Profile Settings</p>
          <p className="text-xs text-stone-700">
            View and edit your profile details
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
      <div className="flex items-start w-full gap-2">
        <div className="flex flex-col w-full gap-2">
          <div className="flex flex-col items-start w-full">
            <p className="text-xs text-stone-700">Profile Slug</p>
            <div className="flex w-full">
              <div className="rounded-tl-md rounded-bl-md bg-gray-50 border border-r-0 border-gray-50 flex items-center p-2 pr-1">
                <p className="text-xs text-stone-800">bizvo.com/</p>
              </div>
              <input
                type="text"
                placeholder="Slug"
                className="border text-xs border-gray-50 bg-gray-50 border-l-0 rounded-tr-md text-stone-800 rounded-br-md p-2 pl-1 flex-1"
                disabled
                value={currentUser?.slug}
              />
            </div>
          </div>
          <div className="flex flex-col items-start w-full">
            <p className="text-xs text-stone-700">About</p>
            {currentUser?.about ? (
              <textarea
                placeholder="About this customer.."
                className="text-xs bg-gray-50 border border-gray-50 focus:outline-none text-stone-800 ring-0 w-full rounded-md p-2 resize-none h-16"
                disabled
                value={currentUser?.about}
              />
            ) : (
              <div className="bg-gray-50 w-full h-16 flex items-center justify-center border border-gray-50 rounded-md">
                <p className="text-xs text-stone-700">No about</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-col items-start w-full">
            <p className="text-xs text-stone-700">Links</p>
            <div className="flex flex-col items-start gap-2 w-full">
              <div className="flex w-full">
                <div className="rounded-tl-md rounded-bl-md bg-gray-50 border border-r-0 border-gray-50 flex items-center p-2 pr-1">
                  <FaXTwitter className="text-xs" />
                </div>
                <input
                  type="text"
                  placeholder="X"
                  className="border text-xs border-gray-50 bg-gray-50 border-l-0 text-stone-800 rounded-tr-md rounded-br-md p-2 pl-1 flex-1"
                  disabled
                  value={currentUser?.links?.x}
                />
              </div>
              <div className="flex w-full">
                <div className="rounded-tl-md rounded-bl-md bg-gray-50 border border-r-0 text-stone-800 border-gray-50 flex items-center p-2 pr-1">
                  <FaMedium className="text-xs text-stone-800" />
                </div>
                <input
                  type="text"
                  placeholder="Medium"
                  className="border text-xs border-gray-50 bg-gray-50 border-l-0 text-stone-800 rounded-tr-md rounded-br-md p-2 pl-1 flex-1"
                  disabled
                  value={currentUser?.links?.medium}
                />
              </div>
              <div className="flex w-full">
                <div className="rounded-tl-md rounded-bl-md bg-gray-50 border  border-r-0 border-gray-50 flex items-center p-2 pr-1">
                  <Linkedin size={14} className="text-stone-800" />
                </div>
                <input
                  type="text"
                  placeholder="Linkedin"
                  className="border text-xs border-gray-50 bg-gray-50 border-l-0 rounded-tr-md rounded-br-md p-2 pl-1 flex-1"
                  disabled
                  value={currentUser?.links?.linkedin}
                />
              </div>

              <div className="flex w-full">
                <div className="rounded-tl-md rounded-bl-md bg-gray-50 border border-r-0 border-gray-50 flex items-center p-2 pr-1">
                  <Instagram size={14} className="text-stone-800" />
                </div>
                <input
                  type="text"
                  placeholder="Instagram"
                  className="border text-xs border-gray-50 bg-gray-50 border-l-0 rounded-tr-md rounded-br-md p-2 pl-1 flex-1"
                  disabled
                  value={currentUser?.links?.insta}
                />
              </div>
              <div className="flex w-full">
                <div className="rounded-tl-md rounded-bl-md bg-gray-50 border border-r-0 border-gray-50 flex items-center p-2 pr-1">
                  <Globe size={14} className="text-stone-800" />
                </div>
                <input
                  type="text"
                  placeholder="Website"
                  className="border text-xs border-gray-50 bg-gray-50 border-l-0 rounded-tr-md rounded-br-md p-2 pl-1 flex-1"
                  disabled
                  value={currentUser?.links?.link}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
