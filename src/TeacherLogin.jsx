import React from 'react';
import {Helmet} from 'react-helmet';
import LoginMain from './assets/component/TeacherLoginMain';
import LoginSignUpHeader from './assets/component/LoginSignUpHeader';


function TeacherLogin() {
  return (
    <>
    <Helmet>
        <title>Login | AttendSwift</title>
    </Helmet>
    <LoginSignUpHeader />
    <LoginMain />
    </>
  )
}

export default TeacherLogin