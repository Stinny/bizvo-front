import './App.css';
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import NoAuth from './components/NoAuth';
import AuthRequired from './components/AuthRequired';
import Landing from './pages/UnAuth/Landing/Landing';
import Login from './pages/UnAuth/Login/Login';
import Signup from './pages/UnAuth/Signup/Signup';
import Home from './pages/Auth/Home/Home';
import Invoices from './pages/Auth/Invoices/Invoices';
import Customers from './pages/Auth/Customers/Customers';
import Payouts from './pages/Auth/Payouts/Payouts';
import Settings from './pages/Auth/Settings/Settings';
import NewInvo from './pages/Auth/NewInvo/NewInvo';
import Message from './pages/UnAuth/Message/Message';
import Reviews from './pages/Auth/Reviews/Reviews';
import NewCustomer from './pages/Auth/NewCustomer/NewCustomer';
import CustomerDetail from './pages/Auth/CustomerDetail/CustomerDetail';
import Add from './pages/Auth/Add/Add';
import InvoDetail from './pages/Auth/InvoDetail/InvoDetail';
import Pay from './pages/UnAuth/Pay/Pay';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NoAuth />}>
          <Route index element={<Landing />} />

          <Route path="login" element={<Login />} />

          <Route path="signup" element={<Signup />} />

          <Route path="contact" element={<Message />} />

          <Route path="pay/:invoId" element={<Pay />} />

          {/* routes require user to be logged in */}
          <Route element={<AuthRequired />}>
            <Route path="settings" element={<Settings />} />

            <Route path="dashboard" element={<Home />} />

            <Route path="dashboard/add" element={<Add />} />

            <Route path="dashboard/invoices" element={<Invoices />} />

            <Route path="dashboard/invoices/add" element={<NewInvo />} />

            <Route
              path="dashboard/invoices/:invoiceId"
              element={<InvoDetail />}
            />

            <Route path="dashboard/customers" element={<Customers />} />

            <Route path="dashboard/customers/add" element={<NewCustomer />} />

            <Route
              path="dashboard/customers/:customerId"
              element={<CustomerDetail />}
            />

            <Route path="dashboard/reviews" element={<Reviews />} />

            <Route path="dashboard/payouts" element={<Payouts />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};
export default App;
