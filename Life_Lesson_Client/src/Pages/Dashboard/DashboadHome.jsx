import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import useAxios from "../../hooks/useAxios";

const DashboadHome = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/my-lesson?email=${user.email}`)
        .then((res) => setLessons(res.data));
    }
  }, [user, axiosSecure]);

  const recentLessons = [...lessons]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const chartData = lessons
    .reduce((acc, lesson) => {
      const date = new Date(lesson.createdAt).toLocaleDateString();
      const found = acc.find((item) => item.date === date);

      if (found) found.count += 1;
      else acc.push({ date, count: 1 });

      return acc;
    }, [])
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-indigo-700">
         Dashboard Overview
      </h1>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <h3 className="text-sm opacity-80">Total Lessons</h3>
          <p className="text-4xl font-bold mt-2">{lessons.length}</p>
        </div>

        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <h3 className="text-sm opacity-80">Total Saved</h3>
          <p className="text-4xl font-bold mt-2">{lessons.length}</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <h3 className="text-sm opacity-80">Recently Added</h3>
          <p className="text-4xl font-bold mt-2">
            {recentLessons.length}
          </p>
        </div>
      </div>

      {/* RECENT LESSONS */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
          📝 Recent Lessons
        </h2>

        <ul className="space-y-3">
          {recentLessons.map((lesson) => (
            <li
              key={lesson._id}
              className="p-3 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition"
            >
              {lesson.title}
            </li>
          ))}
        </ul>
      </div>

      {/* CHART */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-purple-600">
          📈 Lessons Added Over Time
        </h2>

        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#8b5cf6"
              strokeWidth={4}
              dot={{ r: 4 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboadHome;
