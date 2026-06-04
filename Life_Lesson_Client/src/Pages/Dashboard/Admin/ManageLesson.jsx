import React, { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import {
  Trash2,
  Star,
  CheckCircle,
  Globe,
  Lock,
  AlertOctagon,
  BookOpen,
  Layers,
  Sparkles,
  SearchCode,
} from "lucide-react";

const ManageLesson = () => {
  const [filter, setFilter] = useState("all");
  const axios = useAxios();
  const [lessons, setLessons] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`/my-lesson?email=${user.email}`)
        .then((res) => setLessons(res.data))
        .catch(console.error);
    }
  }, [user?.email]);

  // ===== FILTER LOGIC =====
  const filteredLessons = lessons.filter((lesson) => {
    if (filter === "public") return lesson.visibility === "public";
    if (filter === "private") return lesson.visibility === "private";
    if (filter === "flagged") return lesson.flagged;
    return true;
  });

  // ===== ACTION HANDLERS =====
  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this lesson?",
    );
    if (confirm) {
      setLessons(lessons.filter((lesson) => lesson._id !== id));
    }
  };

  const toggleFeatured = (id) => {
    setLessons(
      lessons.map((lesson) =>
        lesson._id === id ? { ...lesson, featured: !lesson.featured } : lesson,
      ),
    );
  };

  const markReviewed = (id) => {
    setLessons(
      lessons.map((lesson) =>
        lesson._id === id ? { ...lesson, reviewed: true } : lesson,
      ),
    );
  };

  // ===== STATS =====
  const publicCount = lessons.filter((l) => l.visibility === "public").length;
  const privateCount = lessons.filter((l) => l.visibility === "private").length;
  const flaggedCount = lessons.filter((l) => l.flagged).length;

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* ===== PAGE HEADER ===== */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight flex items-center gap-3">
          Lesson Repository Cluster
        </h1>
        <p className="text-xs font-medium text-zinc-500 mt-1">
          Monitor code architecture, visibility matrices, and sanitize content
          flags.
        </p>
      </div>

      {/* ===== SPACIOUS STATS CARDS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Public Lessons Card */}
        <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider">
                Public Nodes
              </p>
              <p className="text-3xl font-mono font-black text-zinc-100 group-hover:text-teal-400 transition-colors">
                {publicCount}
              </p>
            </div>
            <div className="p-3 bg-teal-500/5 border border-teal-500/10 text-teal-400 rounded-xl shadow-inner">
              <Globe className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Private Lessons Card */}
        <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider">
                Private Nodes
              </p>
              <p className="text-3xl font-mono font-black text-zinc-100 group-hover:text-sky-400 transition-colors">
                {privateCount}
              </p>
            </div>
            <div className="p-3 bg-sky-500/5 border border-sky-500/10 text-sky-400 rounded-xl shadow-inner">
              <Lock className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Flagged Lessons Card */}
        <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider">
                Anomalies Detected
              </p>
              <p className="text-3xl font-mono font-black text-zinc-100 group-hover:text-red-400 transition-colors">
                {flaggedCount}
              </p>
            </div>
            <div className="p-3 bg-red-500/5 border border-red-500/10 text-red-400 rounded-xl shadow-inner">
              <AlertOctagon className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* ===== MODERN TAB FILTERS ===== */}
      <div className="flex flex-wrap gap-2.5 bg-zinc-950 p-1.5 border border-zinc-900 rounded-2xl w-fit">
        {["all", "public", "private", "flagged"].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-5 py-2.5 rounded-xl text-[11px] font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer border ${
              filter === item
                ? "bg-zinc-900 border-zinc-800 text-white shadow-inner shadow-black/40"
                : "border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/30"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* ===== SPACIOUS TABLE CONTAINER ===== */}
      <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-2 sm:p-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-indigo-500/10 to-transparent" />

        <div className="overflow-x-auto rounded-2xl">
          <table className="w-full text-left border-collapse">
            {/* Table Header */}
            <thead>
              <tr className="border-b border-zinc-900 bg-zinc-900/30 text-zinc-400 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-4 px-5 font-bold">#</th>
                <th className="py-4 px-6 font-bold">Lesson Core Blueprint</th>
                <th className="py-4 px-5 font-bold">Category</th>
                <th className="py-4 px-5 font-bold text-center">
                  Visibility Matrix
                </th>
                <th className="py-4 px-5 font-bold text-center">
                  System Flags
                </th>
                <th className="py-4 px-5 font-bold text-right">Operations</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-zinc-900/60 font-mono text-xs text-zinc-300">
              {filteredLessons.map((lesson, index) => (
                <tr
                  key={lesson._id}
                  className="hover:bg-zinc-900/40 transition-colors duration-150 group"
                >
                  {/* # */}
                  <td className="py-5 px-5 text-zinc-600 font-bold">
                    {index + 1}
                  </td>

                  {/* Lesson Title & Author */}
                  <td className="py-5 px-6 font-sans text-zinc-200 group-hover:text-white transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-zinc-900 rounded-xl border border-zinc-800 text-zinc-500">
                        <BookOpen className="w-4 h-4 text-indigo-400/80" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-zinc-200 leading-tight">
                          {lesson.title}
                        </p>
                        <p className="text-[10px] font-mono text-zinc-500 mt-0.5">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-5 px-5 text-zinc-400">
                    <div className="flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-zinc-700" />
                      <span>{lesson.category}</span>
                    </div>
                  </td>

                  {/* Visibility */}
                  <td className="py-5 px-5 text-center">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                        lesson.visibility === "public"
                          ? "bg-teal-500/5 text-teal-400 border-teal-500/20"
                          : "bg-sky-500/5 text-sky-400 border-sky-500/20"
                      }`}
                    >
                      {lesson.visibility === "public" ? (
                        <Globe className="w-3 h-3" />
                      ) : (
                        <Lock className="w-3 h-3" />
                      )}
                      {lesson.visibility}
                    </span>
                  </td>

                  {/* Status Badges */}
                  <td className="py-5 px-5 text-center">
                    <div className="flex flex-wrap justify-center gap-1.5 max-w-[180px] mx-auto">
                      {lesson.flagged && (
                        <span className="px-2 py-0.5 bg-red-500/5 text-red-400 border border-red-500/10 rounded text-[9px] font-bold uppercase tracking-wide">
                          Flagged
                        </span>
                      )}
                      {lesson.featured && (
                        <span className="px-2 py-0.5 bg-amber-500/5 text-amber-400 border border-amber-500/10 rounded text-[9px] font-bold uppercase tracking-wide">
                          Featured
                        </span>
                      )}
                      {lesson.reviewed && (
                        <span className="px-2 py-0.5 bg-emerald-500/5 text-emerald-400 border border-emerald-500/10 rounded text-[9px] font-bold uppercase tracking-wide">
                          Reviewed
                        </span>
                      )}
                      {!lesson.flagged &&
                        !lesson.featured &&
                        !lesson.reviewed && (
                          <span className="text-zinc-600 text-[10px]">
                            None
                          </span>
                        )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-5 px-5 text-right">
                    <div className="inline-flex items-center gap-3">
                      {/* Toggle Featured */}
                      <button
                        onClick={() => toggleFeatured(lesson._id)}
                        className={`p-2 rounded-xl border transition-all cursor-pointer ${
                          lesson.featured
                            ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                            : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-amber-400 hover:border-zinc-700"
                        }`}
                        title="Toggle Featured Cluster"
                      >
                        <Sparkles className="w-4 h-4 stroke-[2]" />
                      </button>

                      {/* Mark Reviewed */}
                      {!lesson.reviewed && (
                        <button
                          onClick={() => markReviewed(lesson._id)}
                          className="p-2 bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-emerald-400 hover:border-zinc-700 rounded-xl transition-all cursor-pointer"
                          title="Mark Node as Reviewed"
                        >
                          <CheckCircle className="w-4 h-4 stroke-[2]" />
                        </button>
                      )}

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(lesson._id)}
                        className="p-2 bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-red-400 hover:border-zinc-700 rounded-xl transition-all cursor-pointer"
                        title="Purge Lesson Shell"
                      >
                        <Trash2 className="w-4 h-4 stroke-[2]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageLesson;
