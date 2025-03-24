import React from 'react'
import { Helmet } from 'react-helmet';
import TeacherDashHeader from '../../assets/component/TeacherDashHeader';
import TeacherDashLeft from '../../assets/component/TeacherDashLeft';
import DashBreadcrumb from '../../assets/component/DashBreadcrumb';
import StudentReport from '../../assets/component/teacher/StudentReport';
import TeacherCurrentSubjects from '../../assets/component/teacher/TeacherCurrentSubjects';
import AdminDashLeft from '../../assets/component/AdminDashLeft';

function TeacherSubjects() {
  return (
    <>
    <Helmet>
      <title>Subjects | AttendSwift</title>
    </Helmet>
    <div className='w-full'>
      <TeacherDashHeader />
      <div className='w-full bg-[#F6F6FE] flex flex-col lg:flex-row items-start justify-between gap-0 lg:gap-[100px]'>
        <div className='w-[18%]'>
          <AdminDashLeft />
        </div>
        <div className='w-[95%] lg:w-[80%] mt-[60px] lg:mt-[40px] overflow-hidden mx-auto'>
          <DashBreadcrumb />
          <TeacherCurrentSubjects />
        </div>
      </div>
    </div>
    </>
  )
}

export default TeacherSubjects;