import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';
import Home from './MobileViews/Home';
import Account from './MobileViews/Account';
import Features from './MobileViews/Features';
import Payments from './MobileViews/Payments';
import Invoices from './MobileViews/Invoices';
import Customers from './MobileViews/Customers';
import Tos from './MobileViews/Tos';
import Privacy from './MobileViews/Privacy';
import Select from 'react-select';

const Mobile = ({ view, setView }) => {
  const lastUpdated = 'January 18th, 2025';
  const polUpdated = 'January 24th, 2025';

  const options = [
    { value: 'home', label: 'Home' },
    { value: 'account', label: 'Account' },
    { value: 'features', label: 'Features' },
    { value: 'payments', label: 'Payments' },
    { value: 'invos', label: 'Invoices' },
    { value: 'custs', label: 'Customers' },
    { value: 'tos', label: 'Terms of Service' },
    { value: 'priv', label: 'Privacy Policy' },
  ];

  const ViewSelect = () => (
    <Select
      options={options}
      onChange={(value) => setView(value)}
      value={view}
      placeholder="View"
      menuPortalTarget={document.body}
      menuPosition={'fixed'}
      isSearchable
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderColor: 'rgb(229 231 235)',
          backgroundColor: 'rgb(249 250 251)',
          borderWidth: 1,
          '&:hover': {
            backgroundColor: 'rgb(229 231 235)', // Keep the same border color on hover
          },
          '&:focus': {
            backgroundColor: 'rgb(229 231 235)', // Keep the same border color on hover
          },
          fontSize: '12px',
          borderRadius: '.375rem',
          boxShadow: 'none',
          zIndex: 40,
          position: 'relative',
          height: 33,
          minHeight: 33,
        }),
        indicatorsContainer: (provided) => ({
          ...provided,
          height: 33,
        }),
        menuPortal: (provided) => ({
          ...provided,
          zIndex: 40,
          fontSize: '12px',
        }),
        input: (base) => ({
          ...base,
          'input:focus': {
            boxShadow: 'none',
          },
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected
            ? 'rgb(229 231 235)'
            : state.isFocused
            ? 'rgb(249 250 251)'
            : '',
          color: 'black',
        }),
      }}
      className="w-full text-left"
    />
  );

  return (
    <div className="flex flex-col w-full gap-2 p-4">
      <Navbar />
      <div className="w-full">
        {view?.value === 'home' ? (
          <Home ViewSelect={ViewSelect} lastUpdated={lastUpdated} />
        ) : (
          ''
        )}
        {view?.value === 'account' ? (
          <Account ViewSelect={ViewSelect} lastUpdated={lastUpdated} />
        ) : (
          ''
        )}
        {view?.value === 'features' ? (
          <Features ViewSelect={ViewSelect} lastUpdated={lastUpdated} />
        ) : (
          ''
        )}
        {view?.value === 'payments' ? (
          <Payments ViewSelect={ViewSelect} lastUpdated={lastUpdated} />
        ) : (
          ''
        )}
        {view?.value === 'invos' ? (
          <Invoices ViewSelect={ViewSelect} lastUpdated={lastUpdated} />
        ) : (
          ''
        )}
        {view?.value === 'custs' ? (
          <Customers ViewSelect={ViewSelect} lastUpdated={lastUpdated} />
        ) : (
          ''
        )}
        {view?.value === 'tos' ? (
          <Tos ViewSelect={ViewSelect} lastUpdated={polUpdated} />
        ) : (
          ''
        )}
        {view?.value === 'priv' ? (
          <Privacy ViewSelect={ViewSelect} lastUpdated={polUpdated} />
        ) : (
          ''
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Mobile;
