import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../LoadingSpinner';
import { useTranslation } from 'react-i18next';

const TeacherAttendanceSheetMain = () => {
    const [grade, setGrade] = useState('');
    const [section, setSection] = useState('');
    const [date, setDate] = useState(''); // Use string for date input
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const {t} =useTranslation();

    useEffect(() => {
        // Reset data when grade or section changes
        setAttendanceData(); 
        setDate('');
        setMessage('');
    }, [grade, section]);

    const handleGetAttendance = async () => {
        if (!grade || !section || !date) {
            setMessage('⚠️ Please select class, section, and date.');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const response = await axios.get(`https://attendswift-backend.onrender.com/api/students/filter`, {
                params: { grade, section, date }, // Send parameters in query string
                withCredentials: true
            });

            setAttendanceData(response.data);
        } catch (error) {
            console.error('API Error:', error);
            setMessage(`❌ Error: ${error.response?.data?.message || 'Failed to fetch attendance.'}`);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="container-bg-color container-border border bg-gray-100 p-6 rounded-lg shadow-md w-full">
            {/* Selection Area */}
            <div className="container-bg-color bg-white p-4 rounded-lg shadow-sm flex flex-wrap items-center gap-4 mb-6">
                {/* Class Selection */}
                <div className="flex flex-col">
                    <label className="login-label-text text-sm font-medium text-gray-700">{t("Class")}</label>
                    <select
                        className="input-bg-border border border-gray-300 rounded-md px-3 py-2 text-sm"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                    >
                        <option value="">{t("Select a Class")}</option>
                        {["JSS 1", "JSS 2", "JSS 3", "SSS 1", "SSS 2", "SSS 3"].map((cls) => (
                            <option key={cls} value={cls}>{cls}</option>
                        ))}
                    </select>
                </div>

                {/* Section Selection */}
                <div className="flex flex-col">
                    <label className="login-label-text text-sm font-medium text-gray-700">{t("Section")}</label>
                    <select
                        className="input-bg-border border border-gray-300 rounded-md px-3 py-2 text-sm"
                        value={section}
                        onChange={(e) => setSection(e.target.value)}
                    >
                        <option value="">{t("Select a Section")}</option>
                        {["A", "B"].map((sec) => (
                            <option key={sec} value={sec}>{sec}</option>
                        ))}
                    </select>
                </div>

                {/* Date Selection */}
                <div className="flex flex-col">
                    <label className="login-label-text text-sm font-medium text-gray-700">{t("Date")}</label>
                    <input
                        type="date"
                        className="input-bg-border border border-gray-300 rounded-md px-3 py-2 text-sm"
                        value={date}
                        onChange={(e) => setDate(e.target.value)} 
                    />
                </div>

                {/* Get Attendance Button */}
                <button
                    onClick={handleGetAttendance}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition cursor-pointer mt-[20px]"
                >
                    {t("Get Attendance")}
                </button>
            </div>

            {/* Attendance Table */}
            <h2 className="login-label-text text-lg font-semibold text-[#012970] mb-3">{t("Attendance Preview")}</h2>

            {loading && <p className="text-center text-gray-500">{t("Loading...")}</p>}

            {message && <p className="login-error-message mt-3 text-center text-sm text-red-600">{message}</p>}

            {/* Display attendance data */}
            {attendanceData && attendanceData.length > 0 ? (
                <div className="container-bg-color container-border bg-white rounded-lg shadow-sm overflow-x-auto">
                    <table className="w-full border-collapse">
                        {/* ... table header ... */} 
                        <thead className="bg-blue-50 text-left text-[#012970] text-sm font-medium">
                            <tr>
                                <th className="p-3">{t("Student ID")}</th>
                                <th className="p-3">{t("Student Name")}</th>
                                <th className="p-3">{t("Class")}</th>
                                <th className="p-3">{t("Section")}</th>
                                <th className="p-3">{t("Attendance Status")}</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 text-sm">
                            {attendanceData.map((student) => (
                                <tr key={student._id} className="border-t">
                                    <td className="login-label-text p-3">{student.uniqueId}</td>
                                    <td className="login-label-text p-3">{student.name}</td>
                                    <td className="login-label-text p-3">{student.grade}</td>
                                    <td className="login-label-text p-3">{student.section}</td>
                                    {/* Get the attendance status for the selected date */}
                                    <td className="login-label-text p-3">
                                        {student.attendance.find(att => att.date.split('T')[0] === date)?.status || 'N/A'}
                                    </td> 
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : !loading && !message && (
                <p className="login-label-text text-center text-gray-500"> {t("No attendance records found.")}</p>
            )}
        </div>
    );
};

export default TeacherAttendanceSheetMain;