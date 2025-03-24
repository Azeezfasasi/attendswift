import React, { useState, useEffect } from "react";
import { useAbsence } from "../../contextAPI/AbsenseContext";

const AdminAbsenceApplicationMain = () => {
    const { submitAbsenceRequest, students } = useAbsence();
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedStudentId, setSelectedStudentId] = useState("");
    const [reason, setReason] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [absenceDate, setAbsenceDate] = useState("");
    const [numberOfDays, setNumberOfDays] = useState(1); // Default to 1 day

    const [filteredStudents, setFilteredStudents] = useState();

    useEffect(() => {
        // Filter students based on selected class
        const filtered = students.filter((student) => student.grade === selectedClass);
        setFilteredStudents(filtered);
    }, [selectedClass, students]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedClass || !selectedStudentId || !reason || !absenceDate || !numberOfDays) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            await submitAbsenceRequest(selectedStudentId, reason, absenceDate, numberOfDays);
            // Optionally clear the form or show a success message
            setSelectedClass("");
            setSelectedStudentId("");
            setReason("");
            setAbsenceDate("");
            setNumberOfDays(1);
            setSuccessMessage("Absence application submitted successfully!");
        } catch (error) {
            console.error("Error submitting absence application:", error);
            alert("Failed to submit absence application.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-md">
            <h2 className="text-lg font-semibold mb-4">Submit Absence Application</h2>

            {successMessage && <div className="text-green-600">{successMessage}</div>}

            {/* Class Selection */}
            <div className="mb-4">
                <label htmlFor="class" className="block text-sm font-medium text-gray-700">
                    Select Class
                </label>
                <select
                    id="class"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                >
                    <option value="">Select a class</option>
                    {["JSS 1", "JSS 2", "JSS 3", "SSS 1", "SSS 2", "SSS 3"].map((grade) => (
                        <option key={grade} value={grade}>
                            {grade}
                        </option>
                    ))}
                </select>
            </div>

            {/* Student Selection (Filtered) */}
            <div className="mb-4">
                <label htmlFor="student" className="block text-sm font-medium text-gray-700">
                    Select Student
                </label>
                <select
                    id="student"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    value={selectedStudentId}
                    onChange={(e) => setSelectedStudentId(e.target.value)}
                    disabled={!selectedClass}
                >
                    <option value="">Select a student</option>
                    {filteredStudents &&
                        filteredStudents.length > 0 &&
                        filteredStudents.map((student) => (
                            <option key={student._id} value={student._id}>
                                {student.name} ({student.section})
                            </option>
                        ))}
                </select>
            </div>

            {/* Absence Date */}
            <div className="mb-4">
                <label htmlFor="absenceDate" className="block text-sm font-medium text-gray-700">
                    Absence Start Date
                </label>
                <input
                    type="date"
                    id="absenceDate"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    value={absenceDate}
                    onChange={(e) => setAbsenceDate(e.target.value)}
                    required
                />
            </div>

            {/* Number of Days */}
            <div className="mb-4">
                <label htmlFor="numberOfDays" className="block text-sm font-medium text-gray-700">
                    Number of Days
                </label>
                <input
                    type="number"
                    id="numberOfDays"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    value={numberOfDays}
                    onChange={(e) => setNumberOfDays(parseInt(e.target.value, 10))} // Parse to integer
                    min="1" // Set minimum value to 1
                    required
                />
            </div>

            {/* Reason for Absence */}
            <div className="mb-4">
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                    Reason for Absence
                </label>
                <textarea
                    id="reason"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    rows="3"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                Submit Application
            </button>
        </form>
    );
};

export default AdminAbsenceApplicationMain;