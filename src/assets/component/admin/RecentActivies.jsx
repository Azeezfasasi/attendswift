import React from "react";

const RecentActivities = () => {
  const activities = [
    { time: "32 min", text: "New teacher created" },
    { time: "56 min", text: "JSS 1 A attendance taken" },
    { time: "2 hrs", text: "Absence application" },
    { time: "6 hrs", text: "Sick Leave application" },
  ];

  return (
    <div className="box bg-white p-4 rounded-lg shadow-md w-[350px] mt-[15px] mx-auto lg:mx-0">
      {/* Title */}
      <h2 className="text-lg font-semibold text-blue-700">
        Recent Activities
        <span className="text-gray-400 text-sm font-normal"> | Today</span>
      </h2>

      {/* Activities List */}
      <div className="mt-3">
        {activities.map((activity, index) => (
          <div key={index} className="flex flex-row items-start justify-start relative">
            {/* Time */}
            <div className="text-gray-500 text-sm w-16">{activity.time}</div>

            {/* Vertical Line */}
            <div className="flex flex-col items-center mt-2">
              <div className="w-1 h-1 bg-blue-300 rounded-full mb-1"></div>
              {index !== activities.length - 1 && (
                <div className="w-[2px] h-8 bg-blue-100"></div>
              )}
            </div>

            {/* Activity Text */}
            <div className="ml-4 text-gray-700 text-sm">{activity.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;
