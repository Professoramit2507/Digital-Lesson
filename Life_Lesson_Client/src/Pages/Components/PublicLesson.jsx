import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const PublicLesson = () => {
  const initialCards = [
    {
      "id": 1,
      "title": "How to Overcome Fear",
      "img": "https://images.unsplash.com/photo-1625674967351-655dfa7362c7?q=80&w=1334&auto=format&fit=crop",
      "shortDescription": "A guide to overcoming personal fears and challenges through mindfulness and positive thinking.",
      "category": "Personal Growth",
      "emotionalTone": "Empowering",
      "creator": {
        "name": "John Doe",
        "photo": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100"
      },
      "accessLevel": "Public",
      "createdDate": "2023-10-01",
      "savedCount": 142
    },
    {
      "id": 2,
      "title": "The Power of Gratitude",
      "img": "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1170",
      "shortDescription": "Explore how practicing gratitude can transform your mental and emotional well-being.",
      "category": "Mental Health",
      "emotionalTone": "Positive",
      "creator": {
        "name": "Jane Smith",
        "photo": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100"
      },
      "accessLevel": "Public",
      "createdDate": "2023-11-15",
      "savedCount": 89
    },
    {
      "id": 3,
      "title": "Building Healthy Relationships",
      "img": "https://plus.unsplash.com/premium_photo-1683887033858-be37b32f17a9?q=80&w=1169",
      "shortDescription": "Tips for creating and maintaining strong, healthy relationships in personal and professional life.",
      "category": "Relationships",
      "emotionalTone": "Inspirational",
      "creator": {
        "name": "Michael Brown",
        "photo": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100"
      },
      "accessLevel": "Public",
      "createdDate": "2023-09-22",
      "savedCount": 210
    },
    {
      "id": 4,
      "title": "Achieving Career Success",
      "img": "https://images.unsplash.com/photo-1655337690727-5224680c8c07?q=80&w=1169",
      "shortDescription": "Steps to take for success in your career, from goal-setting to networking.",
      "category": "Career",
      "emotionalTone": "Motivational",
      "creator": {
        "name": "Emily White",
        "photo": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100"
      },
      "accessLevel": "Public",
      "createdDate": "2023-08-30",
      "savedCount": 65
    },
    {
      "id": 5,
      "title": "Mastering Emotional Intelligence",
      "img": "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1170",
      "shortDescription": "Learn to recognize, understand, and manage your emotions effectively for extreme mental resilience.",
      "category": "Mental Health",
      "emotionalTone": "Empowering",
      "creator": {
        "name": "David Miller",
        "photo": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100"
      },
      "accessLevel": "Public",
      "createdDate": "2024-01-12",
      "savedCount": 312
    },
    {
      "id": 6,
      "title": "The Art of Stoic Focus",
      "img": "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=1170",
      "shortDescription": "Ancient strategies to cut through modern noise, optimize deep focus, and maintain total clarity.",
      "category": "Personal Growth",
      "emotionalTone": "Inspirational",
      "creator": {
        "name": "Sophia Alex",
        "photo": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100"
      },
      "accessLevel": "Public",
      "createdDate": "2024-02-05",
      "savedCount": 185
    },
    {
      "id": 7,
      "title": "Financial Freedom Blueprint",
      "img": "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1170",
      "shortDescription": "An uncompromised breakdown of modern asset allocation, budgeting rules, and long-term scaling.",
      "category": "Career",
      "emotionalTone": "Motivational",
      "creator": {
        "name": "Marcus Aurel",
        "photo": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100"
      },
      "accessLevel": "Public",
      "createdDate": "2024-02-28",
      "savedCount": 420
    },
    {
      "id": 8,
      "title": "Conflict Resolution Dynamics",
      "img": "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1170",
      "shortDescription": "Navigate high-stakes professional disputes and heal personal friction with clean psychological tools.",
      "category": "Relationships",
      "emotionalTone": "Positive",
      "creator": {
        "name": "Elena Rostova",
        "photo": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100"
      },
      "accessLevel": "Public",
      "createdDate": "2024-03-15",
      "savedCount": 94
    }
  ];

  const [cards, setCards] = useState(initialCards);
  const [filteredCards, setFilteredCards] = useState(initialCards);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [toneFilter, setToneFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");

  useEffect(() => {
    const fetchNewLessons = async () => {
      try {
        const response = await axios.get("http://localhost:5000/add-lesson");
        const newLessons = response.data;
        setCards(prev => {
          const prevIds = prev.map(card => card.id);
          const uniqueNew = newLessons.filter(lesson => !prevIds.includes(lesson.id));
          return [...prev, ...uniqueNew];
        });
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };
    fetchNewLessons();
  }, []);

  useEffect(() => {
    let temp = [...cards];

    if (categoryFilter) temp = temp.filter(card => card.category === categoryFilter);
    if (toneFilter) temp = temp.filter(card => card.emotionalTone === toneFilter);
    if (searchQuery) {
      temp = temp.filter(card => card.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (sortOption === "newest") {
      temp.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
    }
    if (sortOption === "mostSaved") {
      temp.sort((a, b) => (b.savedCount || 0) - (a.savedCount || 0));
    }

    setFilteredCards(temp);
  }, [cards, categoryFilter, toneFilter, searchQuery, sortOption]);

  const categories = [...new Set(cards.map(card => card.category))];
  const tones = [...new Set(cards.map(card => card.emotionalTone))];

  return (
    <section className="w-full bg-[#070b14] py-16 text-white min-h-screen relative overflow-hidden">
      {/* 🌌 Background Soft Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />

      {/* 🔄 Full Screen Fluid Wrapper */}
      <div className="w-full px-6 md:px-16 lg:px-24 relative z-10">
        
        {/* Header Title */}
        <div className="mb-12">
          <span className="text-[10px] font-bold tracking-[0.3em] text-cyan-400 uppercase mb-2 block font-mono">
            // Open Access Matrix
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase">
            🌐 Public <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(34,211,238,0.15)]">Lessons</span>
          </h2>
        </div>

        {/* 🎛️ Cyberpunk Filters Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-[#0f1424]/40 border border-white/5 rounded-2xl backdrop-blur-xl mb-12 shadow-[0_15px_35px_rgba(0,0,0,0.3)]">
          <input
            type="text"
            placeholder="Search Matrix by Title..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-[#070b14]/80 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500/50 transition-all text-white placeholder-gray-500 font-medium"
          />

          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="w-full bg-[#070b14]/80 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500/50 transition-all text-gray-300 font-medium"
          >
            <option value="">All  Categories</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>

          <select
            value={toneFilter}
            onChange={e => setToneFilter(e.target.value)}
            className="w-full bg-[#070b14]/80 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500/50 transition-all text-gray-300 font-medium"
          >
            <option value="">All Emotional Tones</option>
            {tones.map(tone => <option key={tone} value={tone}>{tone}</option>)}
          </select>

          <select
            value={sortOption}
            onChange={e => setSortOption(e.target.value)}
            className="w-full bg-[#070b14]/80 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500/50 transition-all text-gray-300 font-medium"
          >
            <option value="newest">Sort: Newest First</option>
            <option value="mostSaved">Sort: High Engagement</option>
          </select>
        </div>

        {/* 🎴 Responsive Cards Grid Layout */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredCards.map(card => (
              <LessonCard key={card.id} data={card} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

/* 🚀 Re-designed Futuristic Lesson Card Component */
const LessonCard = ({ data }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ type: "spring", stiffness: 100, damping: 16 }}
    whileHover={{ y: -6, borderColor: "rgba(34, 211, 238, 0.25)" }}
    className="relative bg-[#0f1424]/40 border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between group transition-all duration-300 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
  >
    {/* Top Abstract Laser Line Effect on Hover */}
    <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    <div>
      {/* Card Image Area with Overlay Zoom */}
      <div className="relative h-44 w-full overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1424] to-transparent opacity-60 z-10" />
        <img 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          src={data.img} 
          alt={data.title} 
        />
        {/* Floating Matrix Tags */}
        <span className="absolute top-3 left-3 z-20 text-[9px] font-bold font-mono tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-md uppercase">
          {data.category}
        </span>
      </div>

      {/* Card Content Description */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[9px] font-black font-mono tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded uppercase">
            Free Access
          </span>
          <span className="text-[9px] font-mono tracking-wide text-gray-500">
            • {data.emotionalTone}
          </span>
        </div>

        <h3 className="text-lg font-bold text-white tracking-wide leading-snug group-hover:text-cyan-400 transition-colors duration-300 mb-2">
          {data.title}
        </h3>
        
        <p className="text-xs text-gray-400 font-medium leading-relaxed line-clamp-2">
          {data.shortDescription}
        </p>
      </div>
    </div>

    {/* Bottom Footer Actions inside the Card */}
    <div className="p-5 pt-0 mt-4">
      <div className="h-px bg-white/5 w-full mb-4" />
      <div className="flex items-center justify-between gap-4">
        {/* Creator Identity */}
        <div className="flex items-center gap-2">
          <img 
            src={data.creator?.photo} 
            alt={data.creator?.name} 
            className="w-6 h-6 rounded-full object-cover border border-white/20"
          />
          <span className="text-[11px] font-medium text-gray-400 truncate max-w-[80px]">
            {data.creator?.name}
          </span>
        </div>

        {/* View Action Button */}
        <Link to={`/public-lesson/${data.id}`} className="flex-1">
          <button className="w-full relative inline-flex cursor-pointer hover:text-cyan-400 items-center justify-center p-0.5 overflow-hidden text-xs font-bold uppercase tracking-widest text-white rounded-xl group/btn bg-gradient-to-br from-cyan-500 to-blue-600 transition-all duration-300 active:scale-95">
            <span className="w-full relative px-3 py-2 transition-all ease-in duration-75 bg-[#0a0e1a] rounded-[10px] group-hover/btn:bg-opacity-0">
              View Details 
            </span>
          </button>
        </Link>
      </div>
    </div>
  </motion.div>
);

export default PublicLesson;