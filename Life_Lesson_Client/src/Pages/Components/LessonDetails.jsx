// import React, { useState, useEffect } from 'react';
// import { Link, useLoaderData, useNavigate } from 'react-router'; // useNavigate ইমপোর্ট করা হয়েছে
// import { FacebookShareButton } from 'react-share';
// import { toast } from 'react-toastify';
// import { 
//   Heart, Bookmark, Flag, Share2, Calendar, Clock, 
//   User, BookOpen, MessageSquare, Send, ArrowLeft, Eye, Sun, Moon // Sun এবং Moon আইকন যোগ করা হয়েছে
// } from 'lucide-react';
// import { motion } from 'framer-motion';

// const LessonDetails = () => {
//   const lesson = useLoaderData(); 
//   const navigate = useNavigate(); // Navigation এর জন্য হুক ইনিশিয়ালাইজ করা হয়েছে
  
//   const [likes, setLikes] = useState(lesson?.likesCount || 0);
//   const [liked, setLiked] = useState(false);
//   const [favorites, setFavorites] = useState(false);
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const [similarLessons, setSimilarLessons] = useState([]);
//   const [views] = useState(Math.floor(Math.random() * 4000) + 1200);
  
//   // ডার্ক মোড স্টেট
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   useEffect(() => {
//     if (!lesson) return;
//     fetch("/publicLessons.json")
//       .then((res) => res.json())
//       .then((data) => {
//         const filtered = data
//           .filter(
//             (item) =>
//               item.id !== lesson.id &&
//               (item.category === lesson.category ||
//                 item.emotionalTone === lesson.emotionalTone)
//           )
//           .slice(0, 3); 
//         setSimilarLessons(filtered);
//       })
//       .catch(err => console.error("Error loading similar lessons", err));
//   }, [lesson]);

//   // আগের পেজে ফিরে যাওয়ার ফাংশন
//   const handleBack = () => {
//     navigate(-1);
//   };

//   if (!lesson)
//     return (
//       <div className="min-h-screen bg-[#faf8f5] dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center transition-colors duration-300">
//         <div className="w-20 h-20 bg-rose-50 dark:bg-rose-950/30 rounded-3xl flex items-center justify-center text-rose-500 mb-6 border border-rose-100/60 dark:border-rose-900/30 shadow-sm animate-bounce">
//           <BookOpen className="w-10 h-10" />
//         </div>
//         <h2 className="text-3xl font-serif font-black text-slate-900 dark:text-slate-100">Lesson Not Found</h2>
//         <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 max-w-xs">We are sorry, but the lesson you are looking for does not exist or has been archived.</p>
//         <button onClick={handleBack} className="mt-8 inline-flex items-center gap-2 bg-teal-950 dark:bg-teal-800 text-white px-7 py-3 rounded-2xl font-bold text-sm shadow-lg hover:bg-teal-900 dark:hover:bg-teal-700 hover:scale-[1.02] transition-all">
//           <ArrowLeft className="w-4 h-4" /> Return to Previous Page
//         </button>
//       </div>
//     );

//   const handleLike = () => {
//     const loggedIn = true; 
//     if (!loggedIn) return toast.error("Please log in to like");
//     setLiked(!liked);
//     setLikes(liked ? likes - 1 : likes + 1);
//   };

//   const handleFavorite = () => {
//     setFavorites(!favorites);
//     toast.success(favorites ? "Removed from favorites" : "Saved to favorites");
//   };

//   const handleReport = () => {
//     const reason = prompt(
//       "Report Reason:\n1. Inappropriate Content\n2. Hate Speech\n3. Misleading Info\n4. Spam\n5. Other"
//     );
//     if (reason) {
//       toast.info("Thank you for your report. Our administrators will review it shortly.");
//     }
//   };

//   const handleCommentSubmit = (e) => {
//     e.preventDefault();
//     if (!newComment.trim()) return;
//     setComments([
//       ...comments,
//       { user: "You", text: newComment, timestamp: "Just now" },
//     ]);
//     setNewComment("");
//   };

//   return (
//     <section className={`w-full min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-sans text-slate-800 dark:text-slate-200 selection:bg-teal-100 dark:selection:bg-teal-900 selection:text-teal-900 dark:selection:text-teal-100 transition-colors duration-300 ${isDarkMode ? 'dark bg-slate-950' : 'bg-[#faf8f5]'}`}>
//       <div className="max-w-4xl mx-auto space-y-8">
        
//         {/* Top Controls: Back Button & Dark Mode Toggle */}
//         <div className="flex justify-between items-center">
//           <button 
//             onClick={handleBack} 
//             className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors group"
//           >
//             <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
//           </button>

//           <button 
//             onClick={() => setIsDarkMode(!isDarkMode)} 
//             className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all active:scale-95"
//             title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
//           >
//             {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-teal-700" />}
//           </button>
//         </div>

//         {/* Main Lesson Article Card */}
//         <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800/60 shadow-xl shadow-slate-900/[0.02] dark:shadow-black/[0.2] p-5 sm:p-10 space-y-10 overflow-hidden transition-colors duration-300">
          
//           {/* Immersive Banner Image */}
//           <div className="w-full h-[280px] sm:h-[460px] rounded-[28px] overflow-hidden relative border border-slate-100/50 dark:border-slate-800/50 group shadow-md">
//             <img src={lesson.img} alt={lesson.title} className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-700" />
//             <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
//             <span className="absolute top-6 left-6 bg-teal-950 text-teal-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
//               {lesson.category}
//             </span>
//           </div>

//           {/* Title & Metadata Header Area */}
//           <div className="space-y-6">
//             <h1 className="text-3xl sm:text-5xl font-serif font-black text-slate-900 dark:text-slate-50 leading-[1.15] tracking-tight">
//               {lesson.title}
//             </h1>
            
//             <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-xs font-bold text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 pb-6">
//               <span className="flex items-center gap-2 bg-slate-50 dark:bg-slate-850 px-3 py-1.5 rounded-xl text-slate-600 dark:text-slate-400"><Calendar className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" /> {lesson.createdDate}</span>
//               <span className="flex items-center gap-2 bg-slate-50 dark:bg-slate-850 px-3 py-1.5 rounded-xl text-slate-600 dark:text-slate-400"><Clock className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" /> {Math.ceil((lesson.shortDescription?.length || 500) / 200)} min read</span>
//               <span className="flex items-center gap-2 bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-400 px-3 py-1.5 rounded-xl uppercase tracking-wider text-[10px]">Tone: {lesson.emotionalTone}</span>
//             </div>
//           </div>

//           {/* Main Article Body Text */}
//           <div className="prose prose-slate dark:prose-invert max-w-none">
//             <p className="text-slate-600 dark:text-slate-300 text-base sm:text-[17px] leading-relaxed font-medium whitespace-pre-line text-justify">
//               {lesson.shortDescription}
//             </p>
//           </div>

//           {/* Creator/Author Widget */}
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 rounded-3xl gap-4">
//             <div className="flex items-center gap-4">
//               <img
//                 src={lesson.creator?.photo || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"}
//                 alt={lesson.creator?.name}
//                 className="w-14 h-14 rounded-2xl border-4 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800 object-cover shadow-sm"
//               />
//               <div>
//                 <h4 className="text-base font-black text-slate-900 dark:text-slate-100">{lesson.creator?.name || "Anonymous Contributor"}</h4>
//                 <p className="text-xs text-slate-400 dark:text-slate-500 font-bold mt-0.5">Contributions: {lesson.creator?.totalLessons || 0} lessons</p>
//               </div>
//             </div>
//             <Link to={`/author/${lesson.creator?.name}`} className="w-full sm:w-auto text-center text-xs font-black text-teal-700 dark:text-teal-400 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 hover:bg-teal-50/50 dark:hover:bg-teal-950/30 hover:border-teal-200 dark:hover:border-teal-800 px-5 py-3 rounded-xl transition-all shadow-sm">
//               View Profile
//             </Link>
//           </div>

//           {/* Social Engagement Stats Row */}
//           <div className="flex items-center justify-between text-xs font-bold text-slate-400 dark:text-slate-500 px-1">
//             <div className="flex gap-4">
//               <span className="text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-850 px-2.5 py-1 rounded-lg">{likes} Likes</span>
//               <span className="text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-850 px-2.5 py-1 rounded-lg">{comments.length} Comments</span>
//             </div>
//             <span className="flex items-center gap-1.5"><Eye className="w-4 h-4 text-slate-400 dark:text-slate-500" /> {views.toLocaleString()} Views</span>
//           </div>

//           {/* Action & Engagement Button Module */}
//           <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-800 pt-8">
//             <div className="flex flex-wrap items-center gap-2">
//               <button 
//                 onClick={handleLike} 
//                 className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs font-black transition-all border ${
//                   liked 
//                     ? "bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border-rose-200/60 dark:border-rose-900/40" 
//                     : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
//                 }`}
//               >
//                 <Heart className={`w-4 h-4 ${liked ? "fill-rose-500 text-rose-500" : ""}`} />
//                 {liked ? "Liked" : "Like"}
//               </button>

//               <button 
//                 onClick={handleFavorite} 
//                 className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs font-black transition-all border ${
//                   favorites 
//                     ? "bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border-amber-200/60 dark:border-amber-900/40" 
//                     : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
//                 }`}
//               >
//                 <Bookmark className={`w-4 h-4 ${favorites ? "fill-amber-500 text-amber-500" : ""}`} />
//                 {favorites ? "Saved" : "Favorite"}
//               </button>

//               <button onClick={handleReport} className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-800 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-500 dark:hover:text-red-400 hover:border-red-200/60 dark:hover:border-red-900/40 rounded-2xl text-xs font-black transition-all">
//                 <Flag className="w-4 h-4" /> Flag Report
//               </button>
//             </div>

//             <FacebookShareButton url={window.location.href} className="w-full sm:w-auto">
//               <div className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-teal-950 dark:bg-teal-800 hover:bg-teal-900 dark:hover:bg-teal-700 text-white rounded-2xl text-xs font-black transition-all cursor-pointer shadow-md">
//                 <Share2 className="w-4 h-4 text-teal-400" /> Share Post
//               </div>
//             </FacebookShareButton>
//           </div>

//         </div>

//         {/* Discussion Forum & Comment Section */}
//         <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800/60 shadow-xl shadow-slate-900/[0.02] dark:shadow-black/[0.2] p-6 sm:p-10 space-y-8 transition-colors duration-300">
//           <h2 className="text-xl font-serif font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
//             <MessageSquare className="w-5 h-5 text-teal-600 dark:text-teal-400" /> Comments & Discussion ({comments.length})
//           </h2>
          
//           <form onSubmit={handleCommentSubmit} className="flex items-center gap-2 bg-slate-50 dark:bg-slate-850 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 focus-within:border-teal-500 focus-within:bg-white dark:focus-within:bg-slate-900 transition-all shadow-inner">
//             <input
//               type="text"
//               placeholder="Join the discussion and share your thoughts..."
//               className="flex-1 p-3 bg-transparent text-sm focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-800 dark:text-slate-200 font-medium"
//               value={newComment}
//               onChange={(e) => setNewComment(e.target.value)}
//             />
//             <button type="submit" className="p-3 bg-teal-950 dark:bg-teal-800 hover:bg-teal-900 dark:hover:bg-teal-700 text-teal-400 rounded-xl transition-transform active:scale-95 shadow-sm">
//               <Send className="w-4 h-4" />
//             </button>
//           </form>

//           {/* Comment Stream */}
//           <div className="flex flex-col gap-4">
//             {comments.map((c, idx) => (
//               <motion.div 
//                 initial={{ opacity: 0, y: 12 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 key={idx} 
//                 className="p-5 bg-slate-50/60 dark:bg-slate-850/40 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-2 relative overflow-hidden"
//               >
//                 <div className="flex justify-between items-center text-xs">
//                   <p className="font-black text-slate-900 dark:text-slate-200 flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-slate-400" /> {c.user}</p>
//                   <span className="text-slate-400 dark:text-slate-500 font-bold">{c.timestamp}</span>
//                 </div>
//                 <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium pl-4 border-l-2 border-teal-600/40 dark:border-teal-400/40">{c.text}</p>
//               </motion.div>
//             ))}
//             {comments.length === 0 && (
//               <p className="text-xs font-bold text-slate-400 dark:text-slate-500 text-center py-6 bg-slate-50/40 dark:bg-slate-850/20 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">No comments posted yet. Be the first to start the conversation!</p>
//             )}
//           </div>
//         </div>

//         {/* Suggested / Similar Lessons Grid */}
//         <div className="space-y-6 pt-4">
//           <h2 className="text-2xl font-serif font-black text-slate-900 dark:text-slate-100">Similar Lessons</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//             {similarLessons.map((l) => (
//               <Link key={l.id} to={`/public-lesson/${l.id}`} className="group bg-white dark:bg-slate-900 p-3.5 rounded-[24px] border border-slate-100 dark:border-slate-800/60 shadow-sm hover:shadow-xl hover:shadow-slate-900/[0.03] dark:hover:shadow-black/[0.4] hover:-translate-y-1 transition-all flex flex-col h-full">
//                 <div className="w-full h-36 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
//                   <img src={l.img} alt={l.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
//                 </div>
//                 <div className="pt-4 flex flex-col flex-1 justify-between">
//                   <div>
//                     <h3 className="font-serif font-black text-base text-slate-900 dark:text-slate-100 line-clamp-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{l.title}</h3>
//                     <p className="text-slate-400 dark:text-slate-500 text-xs font-semibold line-clamp-2 mt-1.5 leading-relaxed">{l.shortDescription}</p>
//                   </div>
//                   <span className="text-[10px] font-black text-teal-600 dark:text-teal-400 uppercase tracking-widest block mt-4 bg-teal-50 dark:bg-teal-950/30 w-max px-2.5 py-1 rounded-md">{l.category}</span>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// };

// export default LessonDetails;











import React, { useState, useEffect } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router'; 
import { FacebookShareButton } from 'react-share';
import { toast } from 'react-toastify';
import { 
  Heart, Bookmark, Flag, Share2, Calendar, Clock, 
  User, BookOpen, MessageSquare, Send, ArrowLeft, Eye 
} from 'lucide-react';
import { motion } from 'framer-motion';

const LessonDetails = () => {
  const lesson = useLoaderData(); 
  const navigate = useNavigate(); 
  
  const [likes, setLikes] = useState(lesson?.likesCount || 0);
  const [liked, setLiked] = useState(false);
  const [favorites, setFavorites] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [similarLessons, setSimilarLessons] = useState([]);
  const [views] = useState(Math.floor(Math.random() * 4000) + 1200);

  useEffect(() => {
    if (!lesson) return;
    fetch("/publicLessons.json")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data
          .filter(
            (item) =>
              item.id !== lesson.id &&
              (item.category === lesson.category ||
                item.emotionalTone === lesson.emotionalTone)
          )
          .slice(0, 3); 
        setSimilarLessons(filtered);
      })
      .catch(err => console.error("Error loading similar lessons", err));
  }, [lesson]);

  const handleBack = () => {
    navigate(-1);
  };

  if (!lesson)
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center text-zinc-200">
        <div className="w-20 h-20 bg-rose-950/30 rounded-3xl flex items-center justify-center text-rose-500 mb-6 border border-rose-900/30 shadow-sm animate-bounce">
          <BookOpen className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-serif font-black text-white">Lesson Not Found</h2>
        <p className="text-zinc-400 text-sm mt-2 max-w-xs">We are sorry, but the lesson you are looking for does not exist or has been archived.</p>
        <button onClick={handleBack} className="mt-8 inline-flex items-center gap-2 bg-zinc-900 text-white px-7 py-3 rounded-2xl font-bold text-sm border border-zinc-800 hover:bg-zinc-800 hover:scale-[1.02] transition-all">
          <ArrowLeft className="w-4 h-4" /> Return to Previous Page
        </button>
      </div>
    );

  const handleLike = () => {
    const loggedIn = true; 
    if (!loggedIn) return toast.error("Please log in to like");
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const handleFavorite = () => {
    setFavorites(!favorites);
    toast.success(favorites ? "Removed from favorites" : "Saved to favorites");
  };

  const handleReport = () => {
    const reason = prompt(
      "Report Reason:\n1. Inappropriate Content\n2. Hate Speech\n3. Misleading Info\n4. Spam\n5. Other"
    );
    if (reason) {
      toast.info("Thank you for your report. Our administrators will review it shortly.");
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      ...comments,
      { user: "You", text: newComment, timestamp: "Just now" },
    ]);
    setNewComment("");
  };

  return (
    <section className="w-full min-h-screen bg-black py-16 px-4 sm:px-6 lg:px-8 font-sans text-zinc-300 selection:bg-teal-900 selection:text-teal-100">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Top Controls: History Back Button */}
        <div className="flex justify-between items-center">
          <button 
            onClick={handleBack} 
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-teal-400 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
          </button>
        </div>

        {/* Main Lesson Article Card */}
        <div className="bg-zinc-950 rounded-[40px] border border-zinc-900 shadow-2xl p-5 sm:p-10 space-y-10 overflow-hidden">
          
          {/* Immersive Banner Image */}
          <div className="w-full h-[280px] sm:h-[460px] rounded-[28px] overflow-hidden relative border border-zinc-900 group shadow-md">
            <img src={lesson.img} alt={lesson.title} className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-700 brightness-90" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent" />
            <span className="absolute top-6 left-6 bg-zinc-900 text-teal-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-zinc-800 shadow-lg">
              {lesson.category}
            </span>
          </div>

          {/* Title & Metadata Header Area */}
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-5xl font-serif font-black text-white leading-[1.15] tracking-tight">
              {lesson.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-xs font-bold text-zinc-500 border-b border-zinc-900 pb-6">
              <span className="flex items-center gap-2 bg-zinc-900 px-3 py-1.5 rounded-xl text-zinc-400"><Calendar className="w-3.5 h-3.5 text-teal-400" /> {lesson.createdDate}</span>
              <span className="flex items-center gap-2 bg-zinc-900 px-3 py-1.5 rounded-xl text-zinc-400"><Clock className="w-3.5 h-3.5 text-teal-400" /> {Math.ceil((lesson.shortDescription?.length || 500) / 200)} min read</span>
              <span className="flex items-center gap-2 bg-amber-950/20 text-amber-400 px-3 py-1.5 rounded-xl uppercase tracking-wider text-[10px] border border-amber-900/30">Tone: {lesson.emotionalTone}</span>
            </div>
          </div>

          {/* Main Article Body Text */}
          <div className="prose prose-invert max-w-none">
            <p className="text-zinc-400 text-base sm:text-[17px] leading-relaxed font-medium whitespace-pre-line text-justify">
              {lesson.shortDescription}
            </p>
          </div>

          {/* Creator/Author Widget */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-zinc-900/50 border border-zinc-900 rounded-3xl gap-4">
            <div className="flex items-center gap-4">
              <img
                src={lesson.creator?.photo || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"}
                alt={lesson.creator?.name}
                className="w-14 h-14 rounded-2xl border-4 border-zinc-950 bg-zinc-800 object-cover shadow-sm"
              />
              <div>
                <h4 className="text-base font-black text-white">{lesson.creator?.name || "Anonymous Contributor"}</h4>
                <p className="text-xs text-zinc-500 font-bold mt-0.5">Contributions: {lesson.creator?.totalLessons || 0} lessons</p>
              </div>
            </div>
            <Link to={`/author/${lesson.creator?.name}`} className="w-full sm:w-auto text-center text-xs font-black text-teal-400 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 px-5 py-3 rounded-xl transition-all shadow-sm">
              View Profile
            </Link>
          </div>

          {/* Social Engagement Stats Row */}
          <div className="flex items-center justify-between text-xs font-bold text-zinc-500 px-1">
            <div className="flex gap-4">
              <span className="text-zinc-400 bg-zinc-900 px-2.5 py-1 rounded-lg">{likes} Likes</span>
              <span className="text-zinc-400 bg-zinc-900 px-2.5 py-1 rounded-lg">{comments.length} Comments</span>
            </div>
            <span className="flex items-center gap-1.5"><Eye className="w-4 h-4 text-zinc-500" /> {views.toLocaleString()} Views</span>
          </div>

          {/* Action & Engagement Button Module */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-zinc-900 pt-8">
            <div className="flex flex-wrap items-center gap-2">
              <button 
                onClick={handleLike} 
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs font-black transition-all border ${
                  liked 
                    ? "bg-rose-950/30 text-rose-400 border-rose-900/40" 
                    : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:bg-zinc-800"
                }`}
              >
                <Heart className={`w-4 h-4 ${liked ? "fill-rose-500 text-rose-400" : ""}`} />
                {liked ? "Liked" : "Like"}
              </button>

              <button 
                onClick={handleFavorite} 
                onClick={handleFavorite} 
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs font-black transition-all border ${
                  favorites 
                    ? "bg-amber-950/30 text-amber-400 border-amber-900/40" 
                    : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:bg-zinc-800"
                }`}
              >
                <Bookmark className={`w-4 h-4 ${favorites ? "fill-amber-500 text-amber-400" : ""}`} />
                {favorites ? "Saved" : "Favorite"}
              </button>

              <button onClick={handleReport} className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 bg-zinc-900 text-zinc-500 border border-zinc-800 hover:bg-red-950/20 hover:text-red-400 hover:border-red-900/40 rounded-2xl text-xs font-black transition-all">
                <Flag className="w-4 h-4" /> Flag Report
              </button>
            </div>

            <FacebookShareButton url={window.location.href} className="w-full sm:w-auto">
              <div className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white rounded-2xl text-xs font-black transition-all cursor-pointer shadow-md">
                <Share2 className="w-4 h-4 text-teal-400" /> Share Share Share
              </div>
            </FacebookShareButton>
          </div>

        </div>

        {/* Discussion Forum & Comment Section */}
        <div className="bg-zinc-950 rounded-[40px] border border-zinc-900 shadow-2xl p-6 sm:p-10 space-y-8">
          <h2 className="text-xl font-serif font-black text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-teal-400" /> Comments & Discussion ({comments.length})
          </h2>
          
          <form onSubmit={handleCommentSubmit} className="flex items-center gap-2 bg-zinc-900 p-2 rounded-2xl border border-zinc-800 focus-within:border-teal-500 transition-all shadow-inner">
            <input
              type="text"
              placeholder="Join the discussion and share your thoughts..."
              className="flex-1 p-3 bg-transparent text-sm focus:outline-none placeholder:text-zinc-600 text-white font-medium"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button type="submit" className="p-3 bg-black border border-zinc-800 hover:bg-zinc-900 text-teal-400 rounded-xl transition-transform active:scale-95 shadow-sm">
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Comment Stream */}
          <div className="flex flex-col gap-4">
            {comments.map((c, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                key={idx} 
                className="p-5 bg-zinc-900/30 border border-zinc-900 rounded-2xl space-y-2 relative overflow-hidden"
              >
                <div className="flex justify-between items-center text-xs">
                  <p className="font-black text-zinc-200 flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-zinc-500" /> {c.user}</p>
                  <span className="text-zinc-500 font-bold">{c.timestamp}</span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed font-medium pl-4 border-l-2 border-teal-500/40">{c.text}</p>
              </motion.div>
            ))}
            {comments.length === 0 && (
              <p className="text-xs font-bold text-zinc-500 text-center py-6 bg-zinc-900/20 rounded-2xl border border-dashed border-zinc-800">No comments posted yet. Be the first to start the conversation!</p>
            )}
          </div>
        </div>

        {/* Suggested / Similar Lessons Grid */}
        <div className="space-y-6 pt-4">
          <h2 className="text-2xl font-serif font-black text-white">Similar Lessons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {similarLessons.map((l) => (
              <Link key={l.id} to={`/public-lesson/${l.id}`} className="group bg-zinc-950 p-3.5 rounded-[24px] border border-zinc-900 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all flex flex-col h-full">
                <div className="w-full h-36 rounded-xl overflow-hidden bg-zinc-900 relative">
                  <img src={l.img} alt={l.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90" />
                </div>
                <div className="pt-4 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-serif font-black text-base text-white line-clamp-1 group-hover:text-teal-400 transition-colors">{l.title}</h3>
                    <p className="text-zinc-500 text-xs font-semibold line-clamp-2 mt-1.5 leading-relaxed">{l.shortDescription}</p>
                  </div>
                  <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest block mt-4 bg-zinc-900 w-max px-2.5 py-1 rounded-md border border-zinc-800">{l.category}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default LessonDetails;