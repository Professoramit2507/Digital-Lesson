import { useState } from "react";
import { 
  ShieldAlert, 
  Camera, 
  CheckSquare, 
  Trash2, 
  XOctagon, 
  User, 
  Save 
} from "lucide-react";

const AdminProfile = () => {
  const [name, setName] = useState("Admin Smith");
  const [photo, setPhoto] = useState(
    "https://api.dicebear.com/7.x/bottts/svg?seed=Admin" // Premium dynamic placeholder avatar
  );

  const activity = {
    moderatedLessons: 128,
    deletedLessons: 34,
    ignoredReports: 56,
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-fadeIn">
      
      {/* ===== PAGE HEADER ===== */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight flex items-center gap-3">
          Root Identity Profile
        </h1>
        <p className="text-xs font-medium text-zinc-500 mt-1">
          Manage system master credentials, verify session nodes, and view administrative analytics.
        </p>
      </div>

      {/* ===== PREMIUM PROFILE CARD BANNER ===== */}
      <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-8 shadow-2xl relative overflow-hidden flex flex-col sm:flex-row items-center gap-8">
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-amber-500/20 to-transparent" />
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Cyber Avatar Wrapper */}
        <div className="relative group shrink-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500 to-yellow-400 rounded-full blur-sm opacity-40 group-hover:opacity-70 transition-opacity duration-300" />
          <img
            src={photo}
            alt="Admin Identity"
            className="w-28 h-28 rounded-full border-2 border-zinc-800 object-cover relative z-10 bg-zinc-900 p-1"
          />
          <label className="absolute bottom-0 right-0 bg-zinc-900 border border-zinc-800 hover:border-amber-500 hover:text-amber-400 text-zinc-400 p-2 rounded-full cursor-pointer shadow-xl z-20 transition-all duration-200">
            <Camera className="w-4 h-4" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </label>
        </div>

        {/* Identity Details */}
        <div className="text-center sm:text-left space-y-2">
          <h2 className="text-2xl font-serif font-black text-zinc-100 tracking-tight">
            {name}
          </h2>
          <p className="text-xs font-mono text-zinc-500">admin@gmail.com</p>

          <div className="pt-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-widest bg-amber-500/5 text-amber-400 border border-amber-500/20 shadow-sm shadow-amber-500/5">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Root Administrator</span>
            </span>
          </div>
        </div>
      </div>

      {/* ===== SPACIOUS STATS METRICS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Moderated Count */}
        <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider">Shells Moderated</p>
              <p className="text-3xl font-mono font-black text-zinc-100 group-hover:text-emerald-400 transition-colors">{activity.moderatedLessons}</p>
            </div>
            <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 rounded-xl shadow-inner">
              <CheckSquare className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Deleted Count */}
        <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider">Shells Purged</p>
              <p className="text-3xl font-mono font-black text-zinc-100 group-hover:text-red-400 transition-colors">{activity.deletedLessons}</p>
            </div>
            <div className="p-3 bg-red-500/5 border border-red-500/10 text-red-400 rounded-xl shadow-inner">
              <Trash2 className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Ignored Count */}
        <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider">Flags Dismissed</p>
              <p className="text-3xl font-mono font-black text-zinc-100 group-hover:text-sky-400 transition-colors">{activity.ignoredReports}</p>
            </div>
            <div className="p-3 bg-sky-500/5 border border-sky-500/10 text-sky-400 rounded-xl shadow-inner">
              <XOctagon className="w-5 h-5" />
            </div>
          </div>
        </div>

      </div>

      {/* ===== PROFILE UPDATE SETTINGS PANEL ===== */}
      <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-zinc-800 to-transparent" />
        
        <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-6 flex items-center gap-2">
          <User className="w-4 h-4 text-zinc-600" />
          <span>Modify Identity Descriptor</span>
        </h3>

        <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-xl">
          <div className="space-y-2">
            <label className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider block">
              Administrative Alias (Display Name)
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-900/60 border border-zinc-900 focus:border-zinc-700 rounded-2xl px-5 py-3 text-sm font-sans text-zinc-200 focus:text-white focus:outline-none focus:ring-1 focus:ring-zinc-700/50 transition-all placeholder-zinc-700 shadow-inner"
                placeholder="Enter master alias"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-200 hover:text-white px-6 py-3 rounded-2xl text-[11px] font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md"
            >
              <Save className="w-4 h-4 text-amber-400" />
              <span>Commit Changes</span>
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default AdminProfile;