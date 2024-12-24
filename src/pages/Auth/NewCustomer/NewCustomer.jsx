import React, { useEffect, useState } from 'react';
import Desktop from './Desktop';
import { useCreateCustomerMutation } from '../../../api/customersApiSlice';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../components/Loading';
import { showNotification } from '../../../api/toastSlice';
import { useDispatch } from 'react-redux';
import Navbar from '../../../components/Navbar/Navbar';
import Sidenav from '../../../components/Sidenav/Sidenav';
import Footer from '../../../components/Footer/Footer';

const NewCustomer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //create customer API hook
  const [createCustomer, { isLoading }] = useCreateCustomerMutation();

  //form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState(undefined);
  const [address, setAddress] = useState('');
  const [zip, setZip] = useState('');
  const [desc, setDesc] = useState('');
  const [error, setError] = useState('');

  //handles create customer req/res
  const handleCreateCustomer = async (e) => {
    e.preventDefault();

    //clear any errors
    setError('');

    if (!name.trim() || !email.trim() || !address.trim() || !zip.trim()) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const newCustomerReq = await createCustomer({
        email: email,
        name: name,
        phone: phone,
        country: country,
        address: address,
        zip: zip,
        desc: desc,
      }).unwrap();

      if (newCustomerReq === 'Customer created') {
        dispatch(showNotification('Customer created'));
        navigate('/dashboard/customers');
      } else if (newCustomerReq === 'Invalid address') {
        setError('Invalid address details');
        return;
      } else {
        setError('There was an error');
        return;
      }
    } catch (err) {
      setError('Server error');
      return;
    }
  };

  useEffect(() => {
    setError('');
  }, [name, email, address, zip, country, phone]);

  let content;

  if (isLoading) {
    content = <Loading />;
  } else {
    content = (
      <Desktop
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        phone={phone}
        setPhone={setPhone}
        country={country}
        setCountry={setCountry}
        address={address}
        setAddress={setAddress}
        zip={zip}
        setZip={setZip}
        desc={desc}
        setDesc={setDesc}
        error={error}
        handleCreateCustomer={handleCreateCustomer}
        isLoading={isLoading}
      />
    );
  }

  return (
    <div className="mx-auto max-w-3xl flex flex-col gap-2 h-screen relative">
      <Navbar />
      <div className="flex items-start gap-2">
        <Sidenav />
        {content}
      </div>
      <Footer />
    </div>
  );
};

export default NewCustomer;
