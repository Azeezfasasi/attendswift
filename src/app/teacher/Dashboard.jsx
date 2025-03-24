import React from 'react';
import { Helmet } from 'react-helmet';
import TeacherDashHeader from '../../assets/component/TeacherDashHeader';
import TeacherDashLeft from '../../assets/component/TeacherDashLeft';
import DashBreadcrumb from '../../assets/component/DashBreadcrumb';
import DashReport from '../../assets/component/teacher/DashReport';
import DashAttendanceReport from '../../assets/component/teacher/DashAttendanceReport';
import TeacherDashStats from '../../assets/component/teacher/TeacherDashStats';
import AdminDashLeft from '../../assets/component/AdminDashLeft';

function TeacherDashboard() {
  return (
    <>
    <Helmet>
      <title>Teacher Dashboard | AttendSwift</title>
    </Helmet>
    <div className='w-full'>
      <TeacherDashHeader />
      <div className='w-full bg-[#F6F6FE] flex flex-col lg:flex-row items-start justify-between gap-0 lg:gap-[100px]'>
        <div className='w-[18%]'>
          <AdminDashLeft />
        </div>
        <div className='w-[95%] lg:w-[80%] h-screen mt-[10px] lg:mt-[40px] overflow-x-hidden overflow-y-scroll mx-auto'>
          <TeacherDashStats />
          <DashReport />
          <DashAttendanceReport />
        </div>
      </div>
    </div>
    </>
  )
}

export default TeacherDashboard;