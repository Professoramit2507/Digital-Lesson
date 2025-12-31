import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  FaUsers,
  FaBook,
  FaFlag,
  FaFire,
} from "react-icons/fa";

const stats = [
  {
    title: "Total Users",
    value: 1280,
    icon: <FaUsers />,
    color: "from-blue-500 to-blue-700",
  },
  {
    title: "Public Lessons",
    value: 542,
    icon: <FaBook />,
    color: "from-green-500 to-green-700",
  },
  {
    title: "Reported Lessons",
    value: 23,
    icon: <FaFlag />,
    color: "from-red-500 to-red-700",
  },
  {
    title: "Top Contributor",
    value: "John Doe",
    icon: <FaFire />,
    color: "from-purple-500 to-purple-700",
  },
];

const lessonGrowthData = [
  { name: "Jan", lessons: 40 },
  { name: "Feb", lessons: 75 },
  { name: "Mar", lessons: 120 },
  { name: "Apr", lessons: 180 },
  { name: "May", lessons: 260 },
];

const userGrowthData = [
  { name: "Jan", users: 120 },
  { name: "Feb", users: 200 },
  { name: "Mar", users: 350 },
  { name: "Apr", users: 520 },
  { name: "May", users: 740 },
];

const AdminDashboardHome = () => {
  return (
    <div className="space-y-8">
      {/* ===== PAGE TITLE ===== */}
      <h1 className="text-3xl font-bold text-gray-800">
        Admin Dashboard Overview
      </h1>

      {/* ===== STAT CARDS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl text-white shadow-lg bg-gradient-to-r ${item.color}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">{item.title}</p>
                <h2 className="text-3xl font-bold mt-2">
                  {item.value}
                </h2>
              </div>
              <div className="text-4xl opacity-80">
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== GRAPHS ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lesson Growth */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Lesson Growth
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={lessonGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="lessons" fill="#10B981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* User Growth */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            User Growth
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#3B82F6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ===== TODAY SUMMARY ===== */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
        <h2 className="text-xl font-semibold mb-2">
          Today’s Activity
        </h2>
        <p className="text-lg">
          📚 12 new lessons added today <br />
          👥 38 new users registered <br />
          🚩 2 lessons reported
        </p>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
