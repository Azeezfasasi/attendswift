import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area
} from "recharts";

const data = [
  { time: "00:00", attendance: 30, present: 20, absent: 10 },
  { time: "01:00", attendance: 40, present: 30, absent: 15 },
  { time: "02:00", attendance: 35, present: 45, absent: 25 },
  { time: "03:00", attendance: 50, present: 35, absent: 20 },
  { time: "04:00", attendance: 45, present: 40, absent: 18 },
  { time: "05:00", attendance: 90, present: 55, absent: 30 },
  { time: "06:00", attendance: 70, present: 50, absent: 20 },
];

const DashReport = () => {
  return (
    <div className="container-bg-color stats-border-color border bg-white shadow-lg rounded-lg p-4 w-[95%] mx-auto lg:mx-0">
      <h2 className="text-lg font-bold text-blue-700">
        Reports <span className="stats-label text-gray-400">/ Today</span>
      </h2>
      <ResponsiveContainer width="90%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ebebeb" />
          <XAxis dataKey="time" tick={{ fill: "#999" }} />
          <YAxis tick={{ fill: "#999" }} />
          <Tooltip />
          
          {/* Attendance Line */}
          <Area type="monotone" dataKey="attendance" stroke="#2F55D4" fill="rgba(47, 85, 212, 0.1)" />
          <Line
            type="monotone"
            dataKey="attendance"
            stroke="#2F55D4"
            strokeWidth={2}
            dot={{ fill: "#2F55D4", r: 4 }}
          />

          {/* Present Line */}
          <Area type="monotone" dataKey="present" stroke="#28A745" fill="rgba(40, 167, 69, 0.1)" />
          <Line
            type="monotone"
            dataKey="present"
            stroke="#28A745"
            strokeWidth={2}
            dot={{ fill: "#28A745", r: 4 }}
          />

          {/* absent Line */}
          <Area type="monotone" dataKey="absent" stroke="#F97316" fill="rgba(249, 115, 22, 0.1)" />
          <Line
            type="monotone"
            dataKey="absent"
            stroke="#F97316"
            strokeWidth={2}
            dot={{ fill: "#F97316", r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashReport;