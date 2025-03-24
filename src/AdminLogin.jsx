import React from 'react';
import { Helmet } from 'react-helmet';
// import LoginSignUpHeader from '../../assets/component/LoginSignUpHeader';
import LoginSignUpHeader from './assets/component/LoginSignUpHeader';
import AdminLoginMain from './assets/component/AdminLoginMain';

function AdminLogin() {
  return (
    <>
    <Helmet>
        <title>Admin Login | AttendSwift</title>
    </Helmet>
    <LoginSignUpHeader />
    <AdminLoginMain />
    </>
  )
}

export default AdminLogin