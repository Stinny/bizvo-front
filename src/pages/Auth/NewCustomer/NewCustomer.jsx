import React, { useState } from 'react';
import Desktop from './Desktop';
import { useCreateCustomerMutation } from '../../../api/customersApiSlice';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../components/Loading';

const NewCustomer = () => {
  const navigate = useNavigate();

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
        //TO-DO dispatch toast notification
        //refetch customers
        navigate('/dashboard/customers');
      } else {
        setError('There was an error');
        return;
      }
    } catch (err) {
      setError('Server error');
      return;
    }
  };

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

  return content;
};

export default NewCustomer;
