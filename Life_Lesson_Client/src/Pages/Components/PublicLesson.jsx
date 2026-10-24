import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Bookmark,
  Sparkles,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Calendar,
  User,
  SlidersHorizontal,
} from "lucide-react";

const PublicLesson = () => {
  const initialCards = [
    {
      id: 1,
      title: "How to Overcome Fear",
      img: "https://images.unsplash.com/photo-1625674967351-655dfa7362c7?q=80&w=1334&auto=format&fit=crop",
      shortDescription:
        "A guide to overcoming personal fears and challenges through mindfulness, self-compassion, and intentional exposure.",
      category: "Personal Growth",
      emotionalTone: "Empowering",
      creator: {
        name: "John Doe",
        photo:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100",
      },
      accessLevel: "Public",
      createdDate: "2023-10-01",
      savedCount: 142,
    },
    {
      id: 2,
      title: "The Power of Gratitude",
      img: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1170",
      shortDescription:
        "Explore how daily gratitude rewires neurobiology and elevates mental resilience during severe adversity.",
      category: "Mental Health",
      emotionalTone: "Positive",
      creator: {
        name: "Jane Smith",
        photo:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100",
      },
      accessLevel: "Public",
      createdDate: "2023-11-15",
      savedCount: 89,
    },
    {
      id: 3,
      title: "Building Healthy Relationships",
      img: "https://plus.unsplash.com/premium_photo-1683887033858-be37b32f17a9?q=80&w=1169",
      shortDescription:
        "Crucial frameworks for setting healthy boundaries, communicating needs clearly, and creating lifelong trust.",
      category: "Relationships",
      emotionalTone: "Inspirational",
      creator: {
        name: "Michael Brown",
        photo:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100",
      },
      accessLevel: "Public",
      createdDate: "2023-09-22",
      savedCount: 210,
    },
    {
      id: 4,
      title: "Achieving Career Success",
      img: "https://images.unsplash.com/photo-1655337690727-5224680c8c07?q=80&w=1169",
      shortDescription:
        "Actionable steps to advance in high-leverage roles, from goal-setting to asymmetric networking.",
      category: "Career",
      emotionalTone: "Motivational",
      creator: {
        name: "Emily White",
        photo:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100",
      },
      accessLevel: "Public",
      createdDate: "2023-08-30",
      savedCount: 65,
    },
    {
      id: 5,
      title: "Mastering Emotional Intelligence",
      img: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1170",
      shortDescription:
        "Learn to recognize subtle psychological triggers, defuse panic, and cultivate calm under intense pressure.",
      category: "Mental Health",
      emotionalTone: "Empowering",
      creator: {
        name: "David Miller",
        photo:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100",
      },
      accessLevel: "Public",
      createdDate: "2024-01-12",
      savedCount: 312,
    },
    {
      id: 6,
      title: "The Art of Stoic Focus",
      img: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=1170",
      shortDescription:
        "Ancient Hellenistic strategies to cut through digital noise, maintain relentless deep work, and achieve quiet clarity.",
      category: "Personal Growth",
      emotionalTone: "Inspirational",
      creator: {
        name: "Sophia Alex",
        photo:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100",
      },
      accessLevel: "Public",
      createdDate: "2024-02-05",
      savedCount: 185,
    },
    {
      id: 7,
      title: "Financial Freedom Blueprint",
      img: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1170",
      shortDescription:
        "An uncompromised breakdown of modern asset allocation, compound savings curves, and anti-fragile investments.",
      category: "Career",
      emotionalTone: "Motivational",
      creator: {
        name: "Marcus Aurel",
        photo:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100",
      },
      accessLevel: "Public",
      createdDate: "2024-02-28",
      savedCount: 420,
    },
    {
      id: 8,
      title: "Conflict Resolution Dynamics",
      img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1170",
      shortDescription:
        "Navigate complex interpersonal friction with active listening, non-violent communication, and mutual respect.",
      category: "Relationships",
      emotionalTone: "Positive",
      creator: {
        name: "Elena Rostova",
        photo:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100",
      },
      accessLevel: "Public",
      createdDate: "2024-03-15",
      savedCount: 94,
    },
  ];

  const [cards, setCards] = useState(initialCards);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [toneFilter, setToneFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch newly added public lessons from backend
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await axios.get("http://localhost:5000/add-lesson");
        const backendLessons = res.data || [];
        setCards((prev) => {
          const prevIds = new Set(prev.map((c) => String(c.id || c._id)));
          const uniqueBackend = backendLessons
            .filter((l) => !prevIds.has(String(l._id || l.id)))
            .map((l) => ({
              ...l,
              id: l._id || l.id,
              img:
                l.image ||
                l.img ||
                "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1170",
              shortDescription: l.shortDescription || l.description || "",
              emotionalTone: l.emotionalTone || l.tone || "Empowering",
              creator: l.creator || {
                name: l.userName || l.userEmail?.split("@")[0] || "Anonymous",
                photo:
                  l.userPhoto ||
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100",
              },
              createdDate: l.createdAt || l.createdDate || new Date().toISOString(),
              savedCount: l.savedCount || 0,
            }));
          return [...prev, ...uniqueBackend];
        });
      } catch (err) {
        console.error("Error fetching public lessons from backend:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLessons();
  }, []);

  // Filter and sort
  const filteredCards = useMemo(() => {
    let result = [...cards];

    if (categoryFilter) {
      result = result.filter(
        (c) => c.category?.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    if (toneFilter) {
      result = result.filter(
        (c) => c.emotionalTone?.toLowerCase() === toneFilter.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (c) =>
          c.title?.toLowerCase().includes(q) ||
          c.shortDescription?.toLowerCase().includes(q) ||
          c.category?.toLowerCase().includes(q)
      );
    }

    if (sortOption === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.createdDate || 0).getTime() -
          new Date(a.createdDate || 0).getTime()
      );
    } else if (sortOption === "mostSaved") {
      result.sort((a, b) => (b.savedCount || 0) - (a.savedCount || 0));
    } else if (sortOption === "alphabetical") {
      result.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    }

    return result;
  }, [cards, categoryFilter, toneFilter, searchQuery, sortOption]);

  const categories = useMemo(
    () => [...new Set(cards.map((c) => c.category).filter(Boolean))],
    [cards]
  );
  const tones = useMemo(
    () => [...new Set(cards.map((c) => c.emotionalTone).filter(Boolean))],
    [cards]
  );

  const resetFilters = () => {
    setCategoryFilter("");
    setToneFilter("");
    setSearchQuery("");
    setSortOption("newest");
  };

  const hasActiveFilters =
    Boolean(categoryFilter) ||
    Boolean(toneFilter) ||
    Boolean(searchQuery) ||
    sortOption !== "newest";

  return (
    <div className="w-full min-h-screen bg-[#05070c] text-white py-12 md:py-20 relative overflow-hidden">
      {/* 🌌 Atmospheric background lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[360px] bg-gradient-to-b from-cyan-500/10 via-blue-500/5 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* 🏷️ Top Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Open Knowledge Archive</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              Public{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                Lessons & Insights
              </span>
            </h1>
            <p className="text-sm md:text-base text-zinc-400 font-medium leading-relaxed">
              Explore timeless wisdom, mental models, and real-life lessons shared openly by thinkers, creators, and mentors worldwide.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md text-xs font-semibold text-zinc-300 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>
                <strong className="text-white font-bold">{filteredCards.length}</strong> Lessons Available
              </span>
            </div>
          </div>
        </div>

        {/* 🎛️ Search & Filters Control Console */}
        <div className="p-4 sm:p-5 rounded-3xl bg-[#0a0e1a]/80 border border-white/10 backdrop-blur-2xl shadow-2xl mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5">
            {/* Search Input (5 cols on lg) */}
            <div className="lg:col-span-5 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search by title, insight, or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#05070c]/90 border border-white/10 rounded-2xl pl-10 pr-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Dropdown (2 cols on lg) */}
            <div className="lg:col-span-3">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                aria-label="Filter lessons by category"
                className="w-full bg-[#05070c]/90 border border-white/10 rounded-2xl px-3.5 py-3 text-sm text-zinc-200 focus:outline-none focus:border-cyan-500/50 transition-all font-medium cursor-pointer"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Emotional Tone Dropdown (2 cols on lg) */}
            <div className="lg:col-span-2">
              <select
                value={toneFilter}
                onChange={(e) => setToneFilter(e.target.value)}
                aria-label="Filter lessons by emotional tone"
                className="w-full bg-[#05070c]/90 border border-white/10 rounded-2xl px-3.5 py-3 text-sm text-zinc-200 focus:outline-none focus:border-cyan-500/50 transition-all font-medium cursor-pointer"
              >
                <option value="">All Tones</option>
                {tones.map((tone) => (
                  <option key={tone} value={tone}>
                    {tone}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown (2 cols on lg) */}
            <div className="lg:col-span-2">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                aria-label="Sort lessons"
                className="w-full bg-[#05070c]/90 border border-white/10 rounded-2xl px-3.5 py-3 text-sm text-zinc-200 focus:outline-none focus:border-cyan-500/50 transition-all font-medium cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="mostSaved">Most Saved</option>
                <option value="alphabetical">Alphabetical</option>
              </select>
            </div>
          </div>

          {/* Active filter pills & Reset Button */}
          {hasActiveFilters && (
            <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-zinc-500 font-semibold uppercase tracking-wider text-[11px]">
                  Active Filters:
                </span>
                {categoryFilter && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-medium">
                    {categoryFilter}
                    <button
                      onClick={() => setCategoryFilter("")}
                      className="hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                )}
                {toneFilter && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 font-medium">
                    {toneFilter}
                    <button
                      onClick={() => setToneFilter("")}
                      className="hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 border border-white/20 text-zinc-200 font-medium">
                    "{searchQuery}"
                    <button
                      onClick={() => setSearchQuery("")}
                      className="hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>

              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All</span>
              </button>
            </div>
          )}
        </div>

        {/* 🎴 Modern Grid of Public Lesson Cards */}
        {filteredCards.length === 0 ? (
          <div className="py-20 px-6 rounded-3xl border border-dashed border-white/10 bg-[#0a0e1a]/40 text-center max-w-md mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mx-auto mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">
              No matching lessons found
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-6">
              Try adjusting your search query, clearing your filters, or browsing other categories.
            </p>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredCards.map((card) => (
                <LessonCard key={card._id || card.id} data={card} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

/* 💎 High-End Public Lesson Card */
const LessonCard = ({ data }) => {
  const lessonId = data._id || data.id;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-[#0a0e1a]/80 backdrop-blur-xl overflow-hidden shadow-xl hover:border-cyan-500/30 hover:shadow-[0_12px_40px_rgba(6,182,212,0.12)] transition-all duration-300"
    >
      {/* Top subtle highlight line */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

      <div>
        {/* Cover Image Container */}
        <div className="relative h-48 w-full overflow-hidden bg-zinc-900 border-b border-white/5">
          <img
            src={
              data.img ||
              data.image ||
              "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1170"
            }
            alt={data.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-transparent to-black/30 z-10" />

          {/* Category Chip */}
          <span className="absolute top-3.5 left-3.5 z-20 px-3 py-1 rounded-xl bg-[#05070c]/80 border border-white/15 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-cyan-300">
            {data.category || "General"}
          </span>

          {/* Saved Count Badge */}
          {Boolean(data.savedCount) && (
            <span className="absolute top-3.5 right-3.5 z-20 px-2.5 py-1 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md text-[10px] font-semibold text-zinc-300 flex items-center gap-1">
              <Bookmark className="w-3 h-3 text-cyan-400 fill-cyan-400" />
              <span>{data.savedCount}</span>
            </span>
          )}
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-3">
          {/* Tone & Access Level */}
          <div className="flex items-center gap-2 text-[10px] font-semibold">
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 uppercase tracking-wider">
              Free Access
            </span>
            {data.emotionalTone && (
              <span className="text-zinc-400">
                • {data.emotionalTone}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
            {data.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-zinc-400 font-medium leading-relaxed line-clamp-2">
            {data.shortDescription || data.description || "Click to explore the full insights, takeaways, and author notes."}
          </p>
        </div>
      </div>

      {/* Card Footer: Author & Details Link */}
      <div className="p-5 pt-0 mt-2">
        <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
          {/* Author avatar & name */}
          <div className="flex items-center gap-2 min-w-0">
            {data.creator?.photo ? (
              <img
                src={data.creator.photo}
                alt={data.creator.name}
                className="w-7 h-7 rounded-full object-cover border border-white/20 shrink-0"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs font-bold shrink-0">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
            <span className="text-[11px] font-semibold text-zinc-400 truncate max-w-24">
              {data.creator?.name || "Anonymous"}
            </span>
          </div>

          {/* View Details Button */}
          <Link
            to={`/public-lesson/${lessonId}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 text-zinc-300 hover:text-white border border-white/10 hover:border-transparent text-xs font-bold transition-all active:scale-95 shadow-xs"
          >
            <span>Read</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PublicLesson;
