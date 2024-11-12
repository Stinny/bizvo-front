import './App.css';
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import NoAuth from './components/NoAuth';
import AuthRequired from './components/AuthRequired';
import Landing from './pages/UnAuth/Landing/Landing';
import Login from './pages/UnAuth/Login/Login';
import Signup from './pages/UnAuth/Signup/Signup';
import Home from './pages/Auth/Home/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NoAuth />}>
          <Route index element={<Landing />} />

          <Route path="login" element={<Login />} />

          <Route path="signup" element={<Signup />} />

          {/* routes require user to be logged in */}
          <Route element={<AuthRequired />}>
            <Route path="dashboard" element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};
export default App;
