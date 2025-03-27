import React from 'react';
import { Helmet } from 'react-helmet';
import AdminHeader from '../../assets/component/AdminHeader';
import AdminDashLeft from '../../assets/component/AdminDashLeft';
import TeacherReport from '../../assets/component/teacher/TeacherReport';

function AdminReport() {
  return (
    <>
    <Helmet>
        <title>Report | AttendSwift</title>
    </Helmet>
    <div className='container-bg-color w-full'>
      <AdminHeader />
      <div className='container-bg-color w-full bg-[#F6F6FE] flex flex-col lg:flex-row items-start justify-between gap-0 lg:gap-[100px]'>
        <div className='container-bg-color w-[18%]'>
          <AdminDashLeft />
        </div>
        <div className='container-bg-color w-[95%] lg:w-[80%] h-screen mt-[10px] lg:mt-[40px] overflow-x-hidden overflow-y-scroll mx-auto'>
          <TeacherReport />
        </div>
      </div>
    </div>
    </>
  )
}

export default AdminReport;