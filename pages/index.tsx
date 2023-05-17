import React from 'react';
import LoginForm from './login/LoginForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Index = () => {
  return (
    <>
      <LoginForm />
      <ToastContainer />
    </>
  );
};

export default Index;
