import React from 'react'
import { Helmet } from 'react-helmet'
import AdminHeader from '../../assets/component/AdminHeader'
import AdminDashLeft from '../../assets/component/AdminDashLeft'
import ProfileEdit from '../../assets/component/admin/ProfileDetails'

function AdminSettings() {
  return (
    <>
    <Helmet>
        <title>Settings | AttendSwift</title>
    </Helmet>
    <div className='w-full'>
      <AdminHeader />
      <div className='w-full bg-[#F6F6FE] flex flex-col lg:flex-row items-start justify-between gap-0 lg:gap-[100px]'>
        <div className='w-[18%]'>
          <AdminDashLeft />
        </div>
        <div className='w-[95%] lg:w-[80%] h-screen mt-[10px] lg:mt-[40px] overflow-x-hidden overflow-y-scroll mx-auto'>
          <ProfileEdit />
        </div>
      </div>
    </div>
    </>
  )
}

export default AdminSettings;