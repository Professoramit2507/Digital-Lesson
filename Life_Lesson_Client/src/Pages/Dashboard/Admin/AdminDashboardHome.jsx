import React from "react";
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
  Users,
  BookOpen,
  AlertTriangle,
  Flame,
  Activity,
  CheckCircle2,
  UserPlus,
} from "lucide-react";

const stats = [
  {
    title: "Total Users Registered",
    value: 1280,
    icon: <Users className="w-5 h-5 text-sky-400" />,
    badge: "+14% this month",
    badgeColor: "text-sky-400 bg-sky-500/5 border-sky-500/10",
  },
  {
    title: "Public Lessons Indexes",
    value: 542,
    icon: <BookOpen className="w-5 h-5 text-teal-400" />,
    badge: "+28 nodes today",
    badgeColor: "text-teal-400 bg-teal-500/5 border-teal-500/10",
  },
  {
    title: "Reported Anomalies",
    value: 23,
    icon: <AlertTriangle className="w-5 h-5 text-red-400" />,
    badge: "Requires Review",
    badgeColor: "text-red-400 bg-red-500/5 border-red-500/10",
  },
  {
    title: "Top Contributor Node",
    value: "John Doe",
    icon: <Flame className="w-5 h-5 text-amber-400" />,
    badge: "92 Lesson Shells",
    badgeColor: "text-amber-400 bg-amber-500/5 border-amber-500/10",
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

// Custom Premium Tooltip Component for Charts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-950/90 backdrop-blur-md border border-zinc-800 p-3 rounded-xl shadow-2xl">
        <p className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
          {label}
        </p>
        <p className="text-xs font-mono font-black text-white mt-1">
          Value: <span className="text-teal-400">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

const AdminDashboardHome = () => {
  return (
    <div className="space-y-10 animate-fadeIn">
      {/* ===== PAGE TITLE SUB-HEADER ===== */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight flex items-center gap-3">
          System Overview
        </h1>
        <p className="text-xs font-medium text-gray-700 mt-1">
          Real-time analytics matrix, growth algorithms, and active system
          operations.
        </p>
      </div>

      {/* ===== STAT CARDS GRID ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl bg-zinc-950 border border-zinc-900 shadow-xl relative overflow-hidden group hover:border-zinc-800 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <p className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider">
                  {item.title}
                </p>
                <h2 className="text-2xl sm:text-3xl font-serif font-black text-zinc-100 group-hover:text-white transition-colors truncate max-w-[160px] sm:max-w-none">
                  {item.value}
                </h2>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-900/50 border border-zinc-800/60 shadow-inner">
                {item.icon}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-zinc-900/60">
              <span
                className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border ${item.badgeColor}`}
              >
                {item.badge}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ===== ANALYTICS CHARTS FRAMEWORK ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lesson Growth Chart Container */}
        <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-6 shadow-xl relative">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">
              Lesson Infrastructure Growth
            </h3>
            <span className="text-[10px] font-mono text-zinc-600">
              Metric: Nodes/Month
            </span>
          </div>

          <div className="w-full h-[300px] text-[10px] font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={lessonGrowthData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#18181b"
                  vertical={false}
                />
                <XAxis dataKey="name" stroke="#52525b" tickLine={false} />
                <YAxis stroke="#52525b" tickLine={false} />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "#18181b", opacity: 0.4 }}
                />
                <Bar
                  dataKey="lessons"
                  fill="#2dd4bf"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Growth Chart Container */}
        <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-6 shadow-xl relative">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">
              User Core Scaling Vector
            </h3>
            <span className="text-[10px] font-mono text-zinc-600">
              Metric: Accounts/Month
            </span>
          </div>

          <div className="w-full h-[300px] text-[10px] font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={userGrowthData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#18181b"
                  vertical={false}
                />
                <XAxis dataKey="name" stroke="#52525b" tickLine={false} />
                <YAxis stroke="#52525b" tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#38bdf8"
                  strokeWidth={2}
                  dot={{
                    fill: "#0f172a",
                    stroke: "#38bdf8",
                    strokeWidth: 2,
                    r: 4,
                  }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ===== TODAY ACTIVITY SUMMARY MONITOR ===== */}
      <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-2 mb-6 border-b border-zinc-900 pb-4">
          <Activity className="w-4 h-4 text-teal-400" />
          <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest">
            Live Stream Activity (24h Window)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Sub item 1 */}
          <div className="flex items-center gap-4 p-4 bg-zinc-900/30 border border-zinc-900 rounded-2xl">
            <div className="p-3 bg-teal-500/5 border border-teal-500/10 text-teal-400 rounded-xl">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xl font-mono font-black text-zinc-100">12</p>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                New Nodes Compiled
              </p>
            </div>
          </div>

          {/* Sub item 2 */}
          <div className="flex items-center gap-4 p-4 bg-zinc-900/30 border border-zinc-900 rounded-2xl">
            <div className="p-3 bg-sky-500/5 border border-sky-500/10 text-sky-400 rounded-xl">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xl font-mono font-black text-zinc-100">38</p>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                Identities Synced
              </p>
            </div>
          </div>

          {/* Sub item 3 */}
          <div className="flex items-center gap-4 p-4 bg-zinc-900/30 border border-zinc-900 rounded-2xl">
            <div className="p-3 bg-red-500/5 border border-red-500/10 text-red-400 rounded-xl">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xl font-mono font-black text-zinc-100">02</p>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                Anomalies Reported
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
