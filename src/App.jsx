import React from "react";
import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import TeacherLogin from "./TeacherLogin";
import SignUp from "./SignUp";
import TeacherDashboard from "./app/teacher/Dashboard";
import AttendanceSheets from "./app/teacher/AttendanceSheets";
import AdminAttendance from "./app/admin/Attendance";
import AdminReport from "./app/admin/Report";
import Students from "./app/admin/Students";
import Absense from "./app/admin/Absense";
import Teacher from "./app/admin/Teacher";
import Subjects from "./app/admin/Subjects";
import AddTeacher from "./app/admin/AddTeacher";
import AddSubject from "./app/admin/AddSubject";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./app/Dashboard";
import TeacherReport from "./app/teacher/Report";
import TeacherStudents from "./app/teacher/Students";
import AddStudent from "./app/admin/AddStudent";
import AbsentApplication from "./app/teacher/AbsentApplication";
import MarkAttendance from "./app/teacher/MarkAttendance";
import AdminMarkAttendance from "./app/admin/MarkAttendance";
import { TeacherProvider, UserProvider } from "./assets/contextAPI/TeacherContext";
import { SubjectProvider } from "./assets/contextAPI/SubjectContext";
import { AttendanceProvider } from "./assets/contextAPI/AttendanceContext";
import { SchoolProvider } from "./assets/contextAPI/SchoolContext";
import { AbsenceProvider } from "./assets/contextAPI/AbsenseContext";
import AdminAbsenseApplication from "./app/admin/AbsenseApplication";
import TeacherSubjects from "./app/teacher/Subject";
import { ProfileProvider } from "./assets/contextAPI/ProfileContext";
import ForgetPassword from "./ForgetPassword";
import PrivateRoute from "./assets/component/PrivateRoutes";
import NotFound from "./assets/component/NotFound";
import { StudentsProvider } from "./assets/contextAPI/StudentContext";
import AcademicSection from "./app/admin/AcademicSection";
import GradePromotion from "./app/admin/GradePromotion";
import AdminProfile from "./app/admin/Profile";
import AdminSettings from "./app/admin/Settings";
import TranslationProvider from "./assets/component/translation/TranslationProvider";
import ScrollToTop from "./assets/component/ScrollToTop";

function App() {
  return (
    <>
    <TranslationProvider>
    <SchoolProvider>
      <UserProvider>
        <TeacherProvider>
          <SubjectProvider>
          <AbsenceProvider>
            <ProfileProvider>
              <StudentsProvider>
                <AttendanceProvider>
                  <Router>
                    <ScrollToTop />
                    <Routes>
                      {/* Login Routes */}
                      <Route path="/adminlogin" element={<AdminLogin />} />
                      <Route path="/" element={<TeacherLogin />} />
                      <Route path="/app/signup" element={<SignUp />} />
                      <Route path="/ForgetPassword" element={<ForgetPassword />} />

                      {/* Admin Routes */}
                      <Route element={<PrivateRoute />}>
                        <Route path="/app/dashboard" element={<AdminDashboard />} />
                        <Route path="/app/admin/report" element={<AdminReport />} />
                        <Route path="/app/admin/students" element={<Students />} />
                        <Route path="/app/admin/absense" element={<Absense />} />
                        <Route path="/app/admin/attendance" element={<AdminAttendance />} />
                        <Route path="/app/admin/subjects" element={<Subjects />} />
                        <Route path="/app/admin/teacher" element={<Teacher />} />
                        <Route path="/app/admin/addteacher" element={<AddTeacher />} />
                        <Route path="/app/admin/AddStudent" element={<AddStudent />} />
                        <Route path="/app/admin/addsubject" element={<AddSubject />} />
                        <Route path="/app/admin/markattendance" element={<AdminMarkAttendance />} />
                        <Route path="/app/admin/absenseapplication" element={<AdminAbsenseApplication />} />
                        <Route path="/app/admin/profile" element={<AdminProfile />} />
                        <Route path="/app/admin/settings" element={<AdminSettings />} />

                        {/* Teacher Routes */}
                        <Route path="/app/teacher/dashboard" element={<TeacherDashboard />} />
                        <Route path="/app/teacher/AttendanceSheets" element={<AttendanceSheets />} />
                        <Route path="/app/teacher" element={<Teacher />} />
                        <Route path="/app/teacher/report" element={<TeacherReport />} />
                        <Route path="/app/teacher/students" element={<TeacherStudents />} />
                        <Route path="/app/teacher/absentapplication" element={<AbsentApplication />} />
                        <Route path="/app/teacher/markattendance" element={<MarkAttendance />} />
                        <Route path="/app/teacher/Subject" element={<TeacherSubjects />} />
                        <Route path="/app/admin/academicsection" element={<AcademicSection />} />
                        <Route path="/app/admin/gradepromotion" element={<GradePromotion />} />
                      </Route>

                      {/* Catch-all route */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Router>
                  </AttendanceProvider>
                </StudentsProvider>
              </ProfileProvider>
            </AbsenceProvider>
          </SubjectProvider>
        </TeacherProvider>
      </UserProvider>
    </SchoolProvider>
    </TranslationProvider>
    </>
  )
}

export default App
