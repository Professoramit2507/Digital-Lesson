import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { User, Image as ImageIcon, ShieldCheck, Layers, Grid, Sparkles } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  const [lessons, setLessons] = useState([]);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

  const isPremium = user?.isPremium; 
  const savedLessonsCount = user?.savedLessons?.length || 0;

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/my-lesson?email=${user.email}`)
        .then((res) => setLessons(res.data))
        .catch(console.error);
    }
  }, [user?.email, axiosSecure]);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    console.log("Updated Name:", displayName);
    console.log("Updated Photo:", photoURL);
  };

  return (
    <div className="space-y-10">
      {/* Top Welcome Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight flex items-center gap-3">
          <User className="w-6 h-6 text-teal-400" /> Identity Matrix
        </h1>
        <p className="text-xs font-medium text-zinc-500 mt-1">
          Manage your author credentials, view profile configurations, and index allocations.
        </p>
      </div>

      {/* Main Core Profile Card Layer */}
      <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-center gap-8 border-b border-zinc-900 pb-8">
          {/* Avatar Container */}
          <div className="relative group">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-teal-500 to-sky-500 opacity-30 blur-md group-hover:opacity-50 transition-opacity duration-300" />
            <img
              src={user?.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"}
              alt="Profile Identity"
              className="relative w-28 h-28 rounded-full object-cover border-2 border-zinc-800 bg-zinc-900"
            />
          </div>

          {/* User Metrics block */}
          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start">
              <h2 className="text-xl sm:text-2xl font-serif font-black text-white tracking-tight">
                {user?.displayName || "Anonymous Node"}
              </h2>
              {isPremium && (
                <span className="text-[10px] font-black tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-0.5 rounded-md uppercase flex items-center gap-1">
                  <Sparkles className="w-3 h-3 fill-amber-400/20" /> Premium Author
                </span>
              )}
            </div>

            <p className="text-xs font-medium text-zinc-500">{user?.email}</p>

            {/* Profile Counts Summary */}
            <div className="flex justify-center md:justify-start gap-8 pt-2">
              <div className="text-center md:text-left">
                <p className="text-xl font-mono font-bold text-zinc-200">{lessons.length}</p>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5">Created</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-xl font-mono font-bold text-zinc-200">{savedLessonsCount}</p>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5">Bookmarked</p>
              </div>
            </div>
          </div>
        </div>

        {/* Configuration Forms */}
        <form onSubmit={handleUpdateProfile} className="space-y-6 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Display Name Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-zinc-500" /> Identity Label
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Display Name"
                className="w-full px-4 py-3 rounded-xl bg-zinc-900/40 border border-zinc-800 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30 transition-all"
              />
            </div>

            {/* Photo URL Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <ImageIcon className="w-3.5 h-3.5 text-zinc-500" /> Avatar Image Vector URL
              </label>
              <input
                type="text"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="Photo URL"
                className="w-full px-4 py-3 rounded-xl bg-zinc-900/40 border border-zinc-800 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30 transition-all"
              />
            </div>
          </div>

          <div className="pt-2">
            <button 
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-zinc-100 text-zinc-950 font-sans font-bold text-xs uppercase tracking-widest hover:bg-white border border-zinc-200 transition-all shadow-xl hover:shadow-zinc-100/5 active:scale-[0.99]"
            >
              Update Registry State
            </button>
          </div>
        </form>
      </div>

      {/* Public Document Grid Section */}
      <div className="space-y-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
          <Grid className="w-4 h-4 text-zinc-500" /> Public Clusters Index
        </h3>

        {lessons.length === 0 ? (
          <div className="h-48 flex items-center justify-center text-xs text-zinc-600 border border-dashed border-zinc-900 rounded-3xl bg-zinc-950/20">
            No published records discovered in this active node.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...lessons]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((lesson) => (
                <div
                  key={lesson._id}
                  className="bg-zinc-950 border border-zinc-900/60 rounded-2xl overflow-hidden shadow-xl hover:border-zinc-800/80 hover:bg-zinc-900/10 transition-all group"
                >
                  {/* Card Media Preview */}
                  <div className="h-40 w-full overflow-hidden bg-zinc-900 relative">
                    <img
                      src={lesson.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe"}
                      alt={lesson.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <div className="absolute top-3 right-3">
                      <span className="text-[9px] font-black tracking-wider bg-zinc-950/80 backdrop-blur-md text-zinc-400 border border-zinc-800/80 px-2 py-1 rounded-md uppercase">
                        {lesson.privacy || "Public"}
                      </span>
                    </div>
                  </div>

                  {/* Card Content Shell */}
                  <div className="p-5 space-y-3">
                    <div className="space-y-1">
                      <span className="text-[9px] font-black tracking-widest text-teal-400 uppercase bg-teal-500/5 px-2 py-0.5 rounded border border-teal-500/10 inline-block">
                        {lesson.category}
                      </span>
                      <h4 className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors truncate pt-1">
                        {lesson.title}
                      </h4>
                    </div>

                    <div className="pt-2 border-t border-zinc-900/60 flex items-center justify-between text-[10px] font-medium text-zinc-500">
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3 h-3 text-zinc-600" /> {lesson.accessLevel || "Free"}
                      </span>
                      <span>
                        {lesson.createdAt ? new Date(lesson.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recent"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;