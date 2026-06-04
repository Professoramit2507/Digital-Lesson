import React, { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router';
import { Bookmark, Filter, Eye, Trash2, ShieldCheck, Star } from 'lucide-react';

const MyFavorite = ({ favorites = [] }) => {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [toneFilter, setToneFilter] = useState("");

  const filteredFavorites = useMemo(() => {
    return favorites.filter((lesson) => {
      const categoryMatch = categoryFilter
        ? lesson.category === categoryFilter
        : true;
      const toneMatch = toneFilter ? lesson.tone === toneFilter : true;
      return categoryMatch && toneMatch;
    });
  }, [favorites, categoryFilter, toneFilter]);

  const handleRemove = (id) => {
    // Call API to remove from favorites collection
    toast.success("Removed from favorites 💔");
  };

  return (
    <div className="space-y-10">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight flex items-center gap-3">
            <Bookmark className="w-6 h-6 text-teal-400" /> Bookmarked Wisdom
          </h1>
          <p className="text-xs font-medium text-zinc-500 mt-1">
            Core realizations and architectural life insights you saved to sync later.
          </p>
        </div>
        <div className="text-[11px] font-bold text-zinc-400 bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-2.5 flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-teal-500" />
          <span>Matches Found: <strong className="text-white">{filteredFavorites.length} nodes</strong></span>
        </div>
      </div>

      {/* Analytics Filter Matrix Block */}
      <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Category Filter */}
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-zinc-900/40 border border-zinc-800 text-xs font-semibold text-zinc-300 focus:outline-none focus:border-teal-500/50 appearance-none cursor-pointer transition-all"
            >
              <option value="" className="bg-zinc-950">Filter by Classification (All)</option>
              <option value="Personal Growth" className="bg-zinc-950">Personal Growth</option>
              <option value="Career" className="bg-zinc-950">Career</option>
              <option value="Relationships" className="bg-zinc-950">Relationships</option>
              <option value="Mindset" className="bg-zinc-950">Mindset</option>
              <option value="Mistakes Learned" className="bg-zinc-950">Mistakes Learned</option>
            </select>
          </div>

          {/* Tone Filter */}
          <div className="relative">
            <select
              value={toneFilter}
              onChange={(e) => setToneFilter(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-zinc-900/40 border border-zinc-800 text-xs font-semibold text-zinc-300 focus:outline-none focus:border-teal-500/50 appearance-none cursor-pointer transition-all"
            >
              <option value="" className="bg-zinc-950">Filter by Emotional Frequency (All)</option>
              <option value="Motivational" className="bg-zinc-950">Motivational</option>
              <option value="Sad" className="bg-zinc-950">Sad</option>
              <option value="Realization" className="bg-zinc-950">Realization</option>
              <option value="Gratitude" className="bg-zinc-950">Gratitude</option>
            </select>
          </div>

        </div>
      </div>

      {/* Main Core Table Wrapper */}
      <div className="overflow-x-auto bg-zinc-950 border border-zinc-900 rounded-3xl shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-900 bg-zinc-900/20 text-[10px] font-black tracking-widest text-zinc-500 uppercase">
              <th className="p-5">Lesson Shell Details</th>
              <th className="p-5">Taxonomy</th>
              <th className="p-5">Resonance</th>
              <th className="p-5">Security Protocol</th>
              <th className="p-5">Saved Clock</th>
              <th className="p-5 text-right">Operations</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-900/60 text-xs">
            {filteredFavorites.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-12 text-zinc-600 font-medium tracking-wide">
                  Query returned clean — No favorite nodes matching selected configuration.
                </td>
              </tr>
            ) : (
              filteredFavorites.map((lesson) => (
                <tr
                  key={lesson.id}
                  className="hover:bg-zinc-900/30 transition-colors group"
                >
                  {/* Lesson Meta Detail */}
                  <td className="p-5 max-w-xs sm:max-w-md">
                    <div className="space-y-1">
                      <p className="font-semibold text-zinc-200 group-hover:text-white transition-colors truncate">
                        {lesson.title}
                      </p>
                      <p className="text-[11px] font-medium text-zinc-500 group-hover:text-zinc-400 transition-colors line-clamp-1">
                        {lesson.description}
                      </p>
                    </div>
                  </td>

                  {/* Taxonomy Badge */}
                  <td className="p-5 whitespace-nowrap">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400">
                      {lesson.category}
                    </span>
                  </td>

                  {/* Emotional Resonance Badge */}
                  <td className="p-5 whitespace-nowrap">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-zinc-900/40 border border-zinc-800/60 text-zinc-500">
                      {lesson.tone}
                    </span>
                  </td>

                  {/* Access protocol validation */}
                  <td className="p-5 whitespace-nowrap">
                    {lesson.accessLevel === "Premium" ? (
                      <span className="text-[10px] font-black tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-md uppercase flex items-center gap-1 inline-flex">
                        <Star className="w-3 h-3 fill-amber-400/20" /> Premium
                      </span>
                    ) : (
                      <span className="text-[10px] font-black tracking-wider bg-zinc-900 text-zinc-500 border border-zinc-800/60 px-2 py-0.5 rounded-md uppercase flex items-center gap-1 inline-flex">
                        <ShieldCheck className="w-3 h-3" /> Free Shell
                      </span>
                    )}
                  </td>

                  {/* Timestamp Representation */}
                  <td className="p-5 text-zinc-500 font-medium whitespace-nowrap">
                    {lesson.savedAt ? new Date(lesson.savedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    }) : "Recent"}
                  </td>

                  {/* Functional Stream Actions */}
                  <td className="p-5">
                    <div className="flex items-center justify-end gap-3 text-zinc-500">
                      <Link
                        to={`/lessons/${lesson.id}`}
                        title="Inspect Content Shell"
                        className="hover:text-zinc-200 transition-colors p-1.5 hover:bg-zinc-900 rounded-md"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleRemove(lesson.id)}
                        title="Purge from Favorite Cluster"
                        className="hover:text-red-400 transition-colors p-1.5 hover:bg-red-500/10 rounded-md"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyFavorite;