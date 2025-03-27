import React, { useState } from "react";
import { Check, X } from "lucide-react";
import { useAbsence } from "../../contextAPI/AbsenseContext"; // Import context

const AbsenceRecords = () => {
    const { absences, updateAbsenceRequest } = useAbsence();

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    if (!absences || absences.length === 0) {
        return <p>No absence requests found.</p>;
    }

    // Calculate pagination values
    const totalPages = Math.ceil(absences.length / recordsPerPage);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = absences.slice(indexOfFirstRecord, indexOfLastRecord);

    // Pagination handlers
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // const { absences, updateAbsenceRequest } = useAbsence();
    const pendingApplications = absences ? absences.filter((app) => app.status === "pending") : [];
    const approvedApplications = absences ? absences.filter((app) => app.status === "approved") : [];
    const declinedApplications = absences ? absences.filter((app) => app.status === "rejected") : [];

    return (
        <>
        <div className="container-bg-color bg-white p-4 rounded-lg shadow-md w-full">
            {/* Title */}
            <h2 className="login-label-text text-lg font-semibold text-[#012970] mb-3">Absence Applications</h2>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse mb-6">
                    <thead className="bg-blue-50 text-left text-[#012970] text-sm font-medium">
                        <tr>
                            <th className="p-3">#</th>
                            <th className="p-3">Student Name</th>
                            <th className="p-3">Grade</th>
                            <th className="p-3">Section</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Absence for</th>
                            <th className="p-3">Reason</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        {currentRecords.map((app, index) => (
                            <tr key={app._id} className="border-t">
                                <td className="login-label-text p-3">{indexOfFirstRecord + index + 1}</td>
                                <td className="login-label-text p-3">{app.studentName}</td>
                                <td className="login-label-text p-3">{app.studentGrade}</td>
                                <td className="login-label-text p-3">{app.studentSection}</td>
                                <td className="login-label-text p-3">{app.date}</td>
                                <td className="login-label-text p-3">{app.days} day(s)</td>
                                <td className="login-label-text p-3">{app.reason}</td>
                                <td
                                    className={`p-3 font-semibold ${
                                        app.status === "approved"
                                            ? "text-green-500"
                                            : app.status === "rejected"
                                                ? "text-red-500"
                                                : "text-gray-500"
                                    }`}
                                >
                                    {app.status}
                                </td>
                                <td className="p-3 flex gap-2">
                                    {/* Approve Button */}
                                    <button
                                        onClick={() => updateAbsenceRequest(app.studentId, app._id, "approved")}
                                        disabled={app.status !== "pending"}
                                        className={`p-2 rounded-full cursor-pointer ${
                                            app.status === "approved"
                                                ? "bg-green-300 cursor-not-allowed"
                                                : "bg-green-500 hover:bg-green-600 text-white"
                                        }`}
                                    >
                                        <Check size={16} />
                                    </button>
                                    {/* Decline Button */}
                                    <button
                                        onClick={() => updateAbsenceRequest(app.studentId, app._id, "rejected")}
                                        disabled={app.status !== "pending"}
                                        className={`p-2 rounded-full cursor-pointer ${
                                            app.status === "rejected"
                                                ? "bg-red-300 cursor-not-allowed"
                                                : "bg-red-500 hover:bg-red-600 text-white"
                                        }`}
                                    >
                                        <X size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
                <button 
                    onClick={prevPage} 
                    disabled={currentPage === 1} 
                    className="pagination-bg-text px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Back
                </button>
                <span className="text-sm font-medium text-gray-700">
                    Page {currentPage} of {totalPages}
                </span>
                <button 
                    onClick={nextPage} 
                    disabled={currentPage === totalPages} 
                    className="pagination-bg-text px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>

        <div className="container-bg-color container-border border bg-white p-4 rounded-lg shadow-md flex flex-col self-center w-[90%] lg:w-[70%] mx-auto mt-3">
            {/* Status Tables */}
            <h2 className="login-label-text text-lg font-semibold text-[#012970] mb-3">Application Status</h2>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead className="bg-gray-100 text-left text-[#012970] text-sm font-medium">
                        <tr>
                            <th className="p-3">Status</th>
                            <th className="p-3">Total</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        <tr className="border-t">
                            <td className="login-label-text p-3 text-gray-500">Pending</td>
                            <td className="login-label-text p-3">{pendingApplications.length}</td>
                        </tr>
                        <tr className="border-t">
                            <td className="p-3 text-green-500">Approved</td>
                            <td className="login-label-text p-3">{approvedApplications.length}</td>
                        </tr>
                        <tr className="border-t">
                            <td className="p-3 text-red-500">Declined</td>
                            <td className="login-label-text p-3">{declinedApplications.length}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
};

export default AbsenceRecords;
