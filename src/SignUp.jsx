import React from 'react';
import {Helmet} from 'react-helmet';
import LoginMain from './assets/component/TeacherLoginMain';
import LoginSignUpHeader from './assets/component/LoginSignUpHeader';
import SignUpMain from './assets/component/SignUpMain';


function SignUp() {
  return (
    <>
    <Helmet>
        <title>Teacher Login | AttendSwift</title>
    </Helmet>
    <LoginSignUpHeader />
    <SignUpMain />
    </>
  )
}

export default SignUp