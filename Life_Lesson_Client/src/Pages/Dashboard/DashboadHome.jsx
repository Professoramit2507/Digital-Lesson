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
import {
  Folder,
  Bookmark,
  Calendar,
  Activity,
  ArrowUpRight,
} from "lucide-react";

const DashboardHome = () => {
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
      const date = new Date(lesson.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      const found = acc.find((item) => item.date === date);

      if (found) found.count += 1;
      else acc.push({ date, count: 1 });

      return acc;
    }, [])
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="space-y-10">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight">
            Overview Performance
          </h1>
          <p className="text-xs font-medium text-zinc-500 mt-1">
            Welcome back, {user?.displayName || "Developer"}. Here is your
            content metrics summary.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-blue-900 border border-zinc-800 rounded-xl px-4 py-2 text-zinc-400 text-xs font-semibold">
          <Calendar className="w-4 h-4 text-teal-500" />
          <span>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Stats Grid Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Total Lessons */}
        <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-6 relative 
        overflow-hidden group shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-2xl transition-all group-hover:bg-teal-500/10" />
          <div className="flex justify-between items-start">
            <div className="p-3 bg-teal-500/10 border border-teal-500/20 rounded-2xl 
            text-teal-400">
              <Folder className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black tracking-wider text-emerald-500 uppercase bg-emerald-500/10 px-2.5 py-1 rounded-lg flex items-center gap-1">
              Active <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
          <div className="mt-5">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
              Total Lessons
            </h3>
            <p className="text-4xl font-serif font-black text-white mt-1.5">
              {lessons.length}
            </p>
          </div>
        </div>

        {/* Card 2: Total Saved */}
        <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-6 relative overflow-hidden group shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-2xl transition-all group-hover:bg-sky-500/10" />
          <div className="flex justify-between items-start">
            <div className="p-3 bg-sky-500/10 border border-sky-500/20 rounded-2xl text-sky-400">
              <Bookmark className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black tracking-wider text-sky-400 uppercase
             bg-sky-500/10 px-2.5 py-1 rounded-lg">
              Saved
            </span>
          </div>
          <div className="mt-5">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
              Total Saved
            </h3>
            <p className="text-4xl font-serif font-black text-white mt-1.5">
              {lessons.length}
            </p>
          </div>
        </div>

        {/* Card 3: Recently Added */}
        <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-6 relative overflow-hidden group shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl transition-all group-hover:bg-amber-500/10" />
          <div className="flex justify-between items-start">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-400">
              <Activity className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black tracking-wider text-amber-400 uppercase bg-amber-500/10 px-2.5 py-1 rounded-lg">
              Velocity
            </span>
          </div>
          <div className="mt-5">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
              Recently Added
            </h3>
            <p className="text-4xl font-serif font-black text-white mt-1.5">
              {recentLessons.length}
            </p>
          </div>
        </div>
      </div>

      {/* Main Panel Content Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Side: Chart Data Analytics */}
        <div className="lg:col-span-3 bg-zinc-950 border border-zinc-900 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-widest mb-1">
              Velocity Metrics
            </h2>
            <p className="text-xs text-zinc-500 mb-6">
              Lessons added over time frequency
            </p>
          </div>

          <div className="w-full overflow-hidden">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#18181b"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  stroke="#52525b"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis
                  allowDecimals={false}
                  stroke="#52525b"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#09090b",
                    borderColor: "#27272a",
                    borderRadius: "16px",
                    color: "#f4f4f5",
                    fontSize: "12px",
                    fontFamily: "sans-serif",
                  }}
                  itemStyle={{ color: "#2dd4bf" }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="url(#gradientColor)"
                  strokeWidth={3}
                  dot={{
                    r: 3,
                    fill: "#000",
                    stroke: "#2dd4bf",
                    strokeWidth: 2,
                  }}
                  activeDot={{
                    r: 6,
                    fill: "#2dd4bf",
                    stroke: "#000",
                    strokeWidth: 2,
                  }}
                />
                <defs>
                  <linearGradient
                    id="gradientColor"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#2dd4bf" />
                    <stop offset="100%" stopColor="#0ea5e9" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Side: List Stream Data */}
        <div className="lg:col-span-2 bg-zinc-950 border border-zinc-900 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-widest mb-1">
              Recent Activity
            </h2>
            <p className="text-xs text-zinc-500 mb-6">
              Latest 5 documents generated
            </p>

            {recentLessons.length === 0 ? (
              <div className="h-48 flex items-center justify-center text-xs text-zinc-600 border border-dashed border-zinc-900 rounded-2xl">
                No activity records found
              </div>
            ) : (
              <ul className="space-y-3">
                {recentLessons.map((lesson, index) => (
                  <li
                    key={lesson._id || index}
                    className="p-3.5 rounded-2xl bg-zinc-900/30 border border-zinc-900/60 hover:bg-zinc-900/80 hover:border-zinc-800 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-2 h-2 rounded-full bg-teal-500/60 group-hover:bg-teal-400 transition-colors flex-shrink-0" />
                      <span className="text-xs font-semibold text-zinc-300 truncate group-hover:text-white transition-colors">
                        {lesson.title}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-zinc-600 group-hover:text-zinc-500 whitespace-nowrap pl-2">
                      {lesson.createdAt
                        ? new Date(lesson.createdAt).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric" },
                          )
                        : "Recent"}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-900 text-center">
            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
              Live Monitor Node Online
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
