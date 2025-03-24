import React from 'react';
import {Helmet} from 'react-helmet';
import LoginSignUpHeader from './assets/component/LoginSignUpHeader';
import ForgetPasswordMain from './assets/component/ForgetPasswordMain';


function ForgetPassword() {
  return (
    <>
    <Helmet>
        <title>Forget Password | AttendSwift</title>
    </Helmet>
    <LoginSignUpHeader />
    <ForgetPasswordMain />
    </>
  )
}

export default ForgetPassword