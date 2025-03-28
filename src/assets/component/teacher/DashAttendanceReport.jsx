import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const data = [
  { category: "Sales", budget: 80, spending: 90 },
  { category: "Marketing", budget: 70, spending: 85 },
  { category: "Development", budget: 90, spending: 78 },
  { category: "Customer Support", budget: 60, spending: 70 },
  { category: "Technology", budget: 50, spending: 85 },
  { category: "Administration", budget: 75, spending: 80 },
];

const DashAttendanceReport = () => {
  return (
    <div className="container-bg-color stats-border-color border bg-white shadow-lg rounded-lg p-6 w-[90%] mt-[20px] mb-[20px] mx-auto lg:mx-0">
      <h2 className="text-lg font-semibold text-blue-700">
        Attendance Report <span className="stats-label text-[#899BBD]">| This Month</span>
      </h2>


      <ResponsiveContainer width="100%" height={400}>
        
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>

          {/* Move Legend to Top */}
          <Legend 
            layout="horizontal" 
            verticalAlign="top" 
            align="center"
            wrapperStyle={{ paddingBottom: "20px", marginTop: "10px", width: "100%" }} 
          />

          <PolarGrid stroke="#ddd" />
          <PolarAngleAxis dataKey="category" tick={{ fill: "#bbb", fontSize: 12 }} />
          
          {/* Blue Line - Allocated Budget */}
          <Radar
            name="Allocated Budget"
            dataKey="budget"
            stroke="#2F55D4"
            fill="#2F55D4"
            fillOpacity={0.2}
          />
          
          {/* Green Line - Actual Spending */}
          <Radar
            name="Actual Spending"
            dataKey="spending"
            stroke="#28A745"
            fill="#28A745"
            fillOpacity={0.2}
          />

          {/* Add Tooltip for Hover Interaction */}
          <Tooltip
            formatter={(value, name) => [`${value}`, name]}
            contentStyle={{ backgroundColor: "white", borderRadius: "8px", padding: "8px" }}
          />

          {/* <Legend /> */}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashAttendanceReport;

