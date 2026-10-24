import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  Folder,
  Bookmark,
  Calendar,
  Activity,
  ArrowUpRight,
  Plus,
  Crown,
  Sparkles,
  Compass,
  BookOpen,
  TrendingUp,
  Layers,
  ChevronRight,
} from "lucide-react";

const DashboardHome = () => {
  const axiosSecure = useAxios();
  const { user, dbUser } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isPremium = dbUser?.role === "premium" || dbUser?.role === "admin";

  useEffect(() => {
    if (user?.email) {
      setIsLoading(true);
      axiosSecure
        .get(`/my-lesson?email=${user.email}`)
        .then((res) => setLessons(res.data || []))
        .catch((err) => console.error("Error fetching my lessons:", err))
        .finally(() => setIsLoading(false));
    }
  }, [user, axiosSecure]);

  const recentLessons = [...lessons]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 5);

  // Frequency aggregation for chart
  const chartData = lessons
    .reduce((acc, lesson) => {
      const date = new Date(lesson.createdAt || Date.now()).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      const found = acc.find((item) => item.date === date);

      if (found) found.count += 1;
      else acc.push({ date, count: 1 });

      return acc;
    }, [])
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // If no data yet, create placeholder curve for visual appeal
  const displayChartData =
    chartData.length > 0
      ? chartData
      : [
          { date: "Day 1", count: 0 },
          { date: "Day 2", count: 1 },
          { date: "Day 3", count: 2 },
          { date: "Day 4", count: 2 },
          { date: "Today", count: lessons.length },
        ];

  // Greeting by time of day
  const hour = new Date().getHours();
  const greeting =
    hour < 12
      ? "Good morning"
      : hour < 18
      ? "Good afternoon"
      : "Good evening";

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* 🌟 Top Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0c1222] via-[#090e18] to-[#05070c] p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-64 h-64 rounded-full bg-indigo-500/10 blur-[90px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personal Knowledge Base</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              {greeting},{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                {user?.displayName || "Scholar"}
              </span>
            </h1>
            <p className="text-sm text-zinc-400 max-w-xl font-medium leading-relaxed">
              Track your insights, monitor publishing velocity, and curate timeless life lessons across your learning journey.
            </p>
          </div>

          {/* Quick Date + Membership Chip */}
          <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-3 shrink-0">
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-zinc-300 text-xs font-semibold backdrop-blur-md">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>
                {new Date().toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            {isPremium ? (
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wide">
                <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>VIP Lifetime Access</span>
              </div>
            ) : (
              <Link
                to="/premium-lesson"
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 text-xs font-bold transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Upgrade to VIP</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            )}
          </div>
        </div>

        {/* Quick Action Shortcuts */}
        <div className="mt-6 pt-6 border-t border-white/5 flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 mr-2">
            Quick Actions:
          </span>
          <Link
            to="/dashboard/add-lesson"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs tracking-wide hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Lesson</span>
          </Link>
          <Link
            to="/dashboard/my-lesson"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 font-semibold text-xs tracking-wide transition-all"
          >
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            <span>My Collection</span>
          </Link>
          <Link
            to="/public-lesson"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 font-semibold text-xs tracking-wide transition-all"
          >
            <Compass className="w-3.5 h-3.5 text-teal-400" />
            <span>Public Library</span>
          </Link>
          <Link
            to="/premium-lesson"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 font-semibold text-xs tracking-wide transition-all"
          >
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>Masterclasses</span>
          </Link>
        </div>
      </div>

      {/* 📊 High-Impact Stat Cards Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Lessons */}
        <div className="relative group overflow-hidden rounded-3xl border border-white/10 bg-[#0a0e1a]/80 p-6 backdrop-blur-xl shadow-lg hover:border-cyan-500/30 transition-all duration-300">
          <div className="absolute top-0 right-0 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all" />
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Folder className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full flex items-center gap-1">
              Live <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
            My Lessons
          </p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">
              {isLoading ? "..." : lessons.length}
            </span>
            <span className="text-xs text-zinc-500 font-medium">authored</span>
          </div>
        </div>

        {/* Card 2: Saved / Bookmarks */}
        <div className="relative group overflow-hidden rounded-3xl border border-white/10 bg-[#0a0e1a]/80 p-6 backdrop-blur-xl shadow-lg hover:border-sky-500/30 transition-all duration-300">
          <div className="absolute top-0 right-0 w-28 h-28 bg-sky-500/10 rounded-full blur-2xl group-hover:bg-sky-500/20 transition-all" />
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Bookmark className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2.5 py-1 rounded-full">
              Archived
            </span>
          </div>
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
            Saved Insights
          </p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">
              {isLoading ? "..." : lessons.length}
            </span>
            <span className="text-xs text-zinc-500 font-medium">in library</span>
          </div>
        </div>

        {/* Card 3: Publishing Velocity */}
        <div className="relative group overflow-hidden rounded-3xl border border-white/10 bg-[#0a0e1a]/80 p-6 backdrop-blur-xl shadow-lg hover:border-teal-500/30 transition-all duration-300">
          <div className="absolute top-0 right-0 w-28 h-28 bg-teal-500/10 rounded-full blur-2xl group-hover:bg-teal-500/20 transition-all" />
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <Activity className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2.5 py-1 rounded-full">
              Recent
            </span>
          </div>
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
            Recent Batches
          </p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">
              {isLoading ? "..." : recentLessons.length}
            </span>
            <span className="text-xs text-zinc-500 font-medium">active entries</span>
          </div>
        </div>

        {/* Card 4: Access Level */}
        <div className="relative group overflow-hidden rounded-3xl border border-white/10 bg-[#0a0e1a]/80 p-6 backdrop-blur-xl shadow-lg hover:border-amber-500/30 transition-all duration-300">
          <div className="absolute top-0 right-0 w-28 h-28 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all" />
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Crown className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
              {isPremium ? "Unlocked" : "Standard"}
            </span>
          </div>
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
            Account Status
          </p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-black text-white capitalize">
              {isPremium ? "VIP Member" : "Community"}
            </span>
          </div>
        </div>
      </div>

      {/* 📈 Analytics Chart + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Side (3 cols): Activity Area Chart */}
        <div className="lg:col-span-3 rounded-3xl border border-white/10 bg-[#0a0e1a]/80 p-6 sm:p-7 backdrop-blur-xl shadow-xl flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                  Publishing Velocity
                </h2>
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                Lessons frequency & knowledge creation rate
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[11px] text-zinc-400 font-semibold self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Real-Time Sync</span>
            </div>
          </div>

          <div className="w-full h-72 sm:h-80 overflow-hidden">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={displayChartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="areaGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1e293b"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis
                  allowDecimals={false}
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#070b14",
                    borderColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "16px",
                    color: "#f8fafc",
                    fontSize: "12px",
                    fontWeight: "600",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
                  }}
                  itemStyle={{ color: "#22d3ee" }}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#areaGlow)"
                  dot={{
                    r: 4,
                    fill: "#070b14",
                    stroke: "#06b6d4",
                    strokeWidth: 2,
                  }}
                  activeDot={{
                    r: 6,
                    fill: "#22d3ee",
                    stroke: "#ffffff",
                    strokeWidth: 2,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Side (2 cols): Recent Lessons Stream */}
        <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-[#0a0e1a]/80 p-6 sm:p-7 backdrop-blur-xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-sky-400" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                  Recent Lessons
                </h2>
              </div>
              <Link
                to="/dashboard/my-lesson"
                className="text-[11px] font-bold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-0.5"
              >
                <span>View All</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <p className="text-xs text-zinc-400 mb-5">
              Latest items added to your digital journal
            </p>

            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="h-16 rounded-2xl bg-white/5 animate-pulse"
                  />
                ))}
              </div>
            ) : recentLessons.length === 0 ? (
              <div className="h-56 flex flex-col items-center justify-center text-center p-6 border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
                <Folder className="w-8 h-8 text-zinc-600 mb-2" />
                <p className="text-xs font-semibold text-zinc-400">
                  No lessons published yet
                </p>
                <p className="text-[11px] text-zinc-600 mt-1 max-w-xs">
                  Create your first timeless life lesson and start sharing your perspective.
                </p>
                <Link
                  to="/dashboard/add-lesson"
                  className="mt-4 px-3.5 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold hover:bg-cyan-500/20 transition-all"
                >
                  Create Now
                </Link>
              </div>
            ) : (
              <ul className="space-y-3">
                {recentLessons.map((lesson, idx) => (
                  <li
                    key={lesson._id || idx}
                    className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.07] hover:border-cyan-500/20 transition-all flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {lesson.image ? (
                        <img
                          src={lesson.image}
                          alt=""
                          className="w-10 h-10 rounded-xl object-cover shrink-0 border border-white/10"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-xs shrink-0">
                          {idx + 1}
                        </div>
                      )}
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-zinc-200 group-hover:text-white truncate transition-colors">
                          {lesson.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-semibold text-cyan-400 uppercase tracking-wider">
                            {lesson.category || "General"}
                          </span>
                          <span className="text-[10px] text-zinc-500">•</span>
                          <span className="text-[10px] text-zinc-500">
                            {lesson.createdAt
                              ? new Date(lesson.createdAt).toLocaleDateString(
                                  "en-US",
                                  { month: "short", day: "numeric" }
                                )
                              : "Recent"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Link
                      to={`/public-lesson/${lesson._id || lesson.id}`}
                      className="shrink-0 p-2 rounded-xl bg-white/5 hover:bg-cyan-500 hover:text-black text-zinc-400 transition-all opacity-80 group-hover:opacity-100"
                      title="View Details"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500 font-medium">
            <span>Encrypted Ledger Node</span>
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Connected
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
