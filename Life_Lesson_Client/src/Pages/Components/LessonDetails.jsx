import React, { useState, useEffect } from "react";
import { Link, useLoaderData, useNavigate } from "react-router";
import { FacebookShareButton } from "react-share";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  Heart,
  Bookmark,
  Flag,
  Share2,
  Calendar,
  Clock,
  User,
  BookOpen,
  MessageSquare,
  Send,
  ArrowLeft,
  Trash2,
  Lock,
  Unlock,
  ShieldCheck,
  Eye,
} from "lucide-react";
import { motion } from "framer-motion";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";

const LessonDetails = () => {
  const lesson = useLoaderData();
  const navigate = useNavigate();
  const axiosSecure = useAxios();
  const { user, dbUser } = useAuth();

  const [likes, setLikes] = useState(lesson?.likesCount || lesson?.reactions || 0);
  const [liked, setLiked] = useState(false);
  const [favorites, setFavorites] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [similarLessons, setSimilarLessons] = useState([]);
  const [views] = useState(Math.floor(Math.random() * 3000) + 850);

  const isOwner = user?.email && lesson?.email && user.email === lesson.email;
  const isAdmin = dbUser?.role === "admin";
  const canDelete = isOwner || isAdmin;

  useEffect(() => {
    if (!lesson) return;
    axiosSecure
      .get("/add-lesson")
      .then((res) => {
        const data = res.data;
        if (Array.isArray(data)) {
          const filtered = data
            .filter(
              (item) =>
                item._id !== lesson._id &&
                (item.category === lesson.category ||
                  item.emotionalTone === (lesson.emotionalTone || lesson.tone))
            )
            .slice(0, 3);
          setSimilarLessons(filtered);
        }
      })
      .catch((err) => console.warn("Error loading similar lessons", err));
  }, [lesson, axiosSecure]);

  const handleBack = () => navigate(-1);

  const handleDeleteLesson = () => {
    const lessonId = lesson?._id || lesson?.id;
    if (!lessonId) return;

    Swal.fire({
      title: "Delete this lesson?",
      text: "This action cannot be undone and will permanently remove this lesson.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete 🗑️",
      cancelButtonText: "Cancel",
      background: "#09090b",
      color: "#f4f4f5",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#27272a",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/lessons/${lessonId}`);
          toast.success("Lesson deleted successfully");
          navigate("/dashboard/my-lesson");
        } catch (err) {
          console.error("Delete error:", err);
          toast.error("Failed to delete lesson");
        }
      }
    });
  };

  const handleLike = () => {
    if (!user) return toast.info("Please sign in to like this lesson");
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const handleFavorite = () => {
    if (!user) return toast.info("Please sign in to save this lesson");
    setFavorites(!favorites);
    toast.success(favorites ? "Removed from favorites" : "Saved to your favorites!");
  };

  const handleReport = () => {
    const reason = prompt(
      "Report Reason:\n1. Inappropriate Content\n2. Misleading Info\n3. Other"
    );
    if (reason) {
      toast.info("Thank you. Our moderators will review this lesson.");
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      ...comments,
      {
        user: user?.displayName || user?.email?.split("@")[0] || "You",
        text: newComment,
        timestamp: "Just now",
      },
    ]);
    setNewComment("");
  };

  if (!lesson) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center text-zinc-200">
        <div className="w-20 h-20 bg-rose-950/30 rounded-3xl flex items-center justify-center text-rose-500 mb-6 border border-rose-900/30 shadow-sm animate-bounce">
          <BookOpen className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-serif font-black text-white">
          Lesson Not Found
        </h2>
        <p className="text-zinc-400 text-sm mt-2 max-w-sm">
          The requested lesson could not be located in our records.
        </p>
        <button
          onClick={handleBack}
          className="mt-6 inline-flex items-center gap-2 bg-zinc-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm border border-zinc-800 hover:bg-zinc-800 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>
      </div>
    );
  }

  const lessonImage =
    lesson.image ||
    lesson.img ||
    "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1170";

  const lessonTone = lesson.emotionalTone || lesson.tone || "Reflective";
  const lessonDesc = lesson.description || lesson.longDescription || lesson.shortDescription || "";
  const authorName = lesson.creator?.name || lesson.authorName || lesson.email?.split("@")[0] || "Anonymous";
  const authorPhoto =
    lesson.creator?.photo ||
    lesson.authorPhoto ||
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80";

  return (
    <section className="w-full min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8 font-sans text-zinc-300">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation & Controls */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 px-4 py-2 rounded-xl transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          {/* Delete Action Button (visible to author or admin) */}
          {canDelete && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDeleteLesson}
              className="inline-flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Lesson</span>
            </motion.button>
          )}
        </div>

        {/* Main Article Container */}
        <div className="bg-zinc-950 rounded-3xl border border-zinc-900 shadow-2xl p-6 sm:p-10 space-y-8 overflow-hidden relative">
          {/* Hero Banner Image */}
          <div className="w-full h-64 sm:h-96 rounded-2xl overflow-hidden relative border border-zinc-900 shadow-md">
            <img
              src={lessonImage}
              alt={lesson.title}
              className="w-full h-full object-cover brightness-90"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1170";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            {/* Badges on Top */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-zinc-900/90 backdrop-blur-md text-cyan-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-zinc-800">
                {lesson.category || "General Wisdom"}
              </span>
              {lesson.accessLevel === "Premium" && (
                <span className="bg-amber-500/20 backdrop-blur-md text-amber-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-500/30 flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Premium
                </span>
              )}
              {lesson.privacy === "Private" && (
                <span className="bg-indigo-500/20 backdrop-blur-md text-indigo-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-500/30">
                  Private Lesson
                </span>
              )}
            </div>
          </div>

          {/* Title and Metadata */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {lesson.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-zinc-500 border-b border-zinc-900 pb-5">
              <span className="flex items-center gap-1.5 bg-zinc-900 px-3 py-1.5 rounded-xl text-zinc-400">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                {lesson.createdAt
                  ? new Date(lesson.createdAt).toLocaleDateString()
                  : lesson.createdDate || "Recently added"}
              </span>
              <span className="flex items-center gap-1.5 bg-zinc-900 px-3 py-1.5 rounded-xl text-zinc-400">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                {Math.ceil((lessonDesc.length || 500) / 200)} min read
              </span>
              <span className="bg-zinc-900 px-3 py-1.5 rounded-xl text-zinc-400">
                Tone: <span className="text-cyan-400">{lessonTone}</span>
              </span>
              <span className="ml-auto text-zinc-500 flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" /> {views} Views
              </span>
            </div>
          </div>

          {/* Lesson Story / Description */}
          <div className="prose prose-invert max-w-none">
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {lessonDesc}
            </p>
          </div>

          {/* Author Widget */}
          <div className="flex items-center justify-between p-4 bg-zinc-900/60 border border-zinc-900 rounded-2xl gap-4">
            <div className="flex items-center gap-3">
              <img
                src={authorPhoto}
                alt={authorName}
                className="w-12 h-12 rounded-full border border-zinc-800 object-cover"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde";
                }}
              />
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  {authorName}
                  {lesson.accessLevel === "Premium" && (
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  )}
                </h4>
                <p className="text-xs text-zinc-500 font-medium">
                  {lesson.creator?.credentials || "Contributor & Author"}
                </p>
              </div>
            </div>
          </div>

          {/* Interaction Buttons Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-zinc-900">
            <div className="flex items-center gap-2">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                  liked
                    ? "bg-rose-500/10 text-rose-400 border-rose-500/30"
                    : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:bg-zinc-800"
                }`}
              >
                <Heart className={`w-4 h-4 ${liked ? "fill-rose-500 text-rose-500" : ""}`} />
                <span>{likes}</span>
              </button>

              <button
                onClick={handleFavorite}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                  favorites
                    ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                    : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:bg-zinc-800"
                }`}
              >
                <Bookmark className={`w-4 h-4 ${favorites ? "fill-amber-400 text-amber-400" : ""}`} />
                <span>{favorites ? "Saved" : "Favorite"}</span>
              </button>

              <FacebookShareButton url={window.location.href}>
                <div className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-xs font-bold transition-all cursor-pointer">
                  <Share2 className="w-4 h-4" /> Share
                </div>
              </FacebookShareButton>
            </div>

            <button
              onClick={handleReport}
              className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors p-2 cursor-pointer"
            >
              <Flag className="w-3.5 h-3.5" /> Report
            </button>
          </div>

          {/* Comments Section */}
          <div className="space-y-4 pt-4 border-t border-zinc-900">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-cyan-400" /> Community Thoughts ({comments.length})
            </h3>

            <form onSubmit={handleCommentSubmit} className="flex gap-2">
              <input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your perspective on this lesson..."
                className="flex-1 bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" /> Post
              </button>
            </form>

            <div className="space-y-2 pt-2">
              {comments.map((c, i) => (
                <div key={i} className="bg-zinc-900/40 border border-zinc-900 p-3 rounded-xl text-xs space-y-1">
                  <div className="flex justify-between items-center text-zinc-400 font-bold">
                    <span>{c.user}</span>
                    <span className="text-[10px] text-zinc-600 font-normal">{c.timestamp}</span>
                  </div>
                  <p className="text-zinc-300 font-medium">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Similar Recommended Lessons */}
        {similarLessons.length > 0 && (
          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-bold text-white">Recommended Similar Lessons</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {similarLessons.map((l) => (
                <Link
                  key={l._id}
                  to={`/public-lesson/${l._id}`}
                  className="bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden hover:border-zinc-800 transition-all group p-3 space-y-2.5"
                >
                  <img
                    src={l.image || "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1170"}
                    alt={l.title}
                    className="w-full h-32 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                  />
                  <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-cyan-400 transition-colors">
                    {l.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LessonDetails;
