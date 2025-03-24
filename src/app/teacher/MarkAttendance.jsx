import React from 'react';
import { Helmet } from 'react-helmet';
import TeacherDashLeft from '../../assets/component/TeacherDashLeft';
import TeacherDashHeader from '../../assets/component/TeacherDashHeader';
import DashBreadcrumb from '../../assets/component/DashBreadcrumb';
import MarkAttendanceMain from '../../assets/component/teacher/MarkAttendanceMain';
import AdminDashLeft from '../../assets/component/AdminDashLeft';

function MarkAttendance() {
  return (
    <>
    <Helmet>
      <title>Mark Attendance | AttendSwift</title>
    </Helmet>
    <div className='w-full'>
      <TeacherDashHeader />
      <div className='w-full bg-[#F6F6FE] flex flex-col lg:flex-row items-start justify-between gap-0 lg:gap-[100px]'>
        <div className='w-[18%]'>
          <AdminDashLeft />
        </div>
        <div className='w-[95%] lg:w-[80%] mt-[60px] lg:mt-[40px] overflow-hidden mx-auto'>
          <DashBreadcrumb />
          <MarkAttendanceMain />
        </div>
      </div>
    </div>
    </>
  )
}

export default MarkAttendance;
