import React from "react";
import { Link, Outlet } from "react-router";
import { 
  Home, 
  LayoutDashboard, 
  PlusCircle, 
  BookOpen, 
  Star, 
  User, 
  Menu,
  Bell
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="drawer lg:drawer-open font-sans antialiased selection:bg-teal-950 selection:text-teal-200">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      
      {/* Main Content Area */}
      <div className="drawer-content flex flex-col min-h-screen bg-black">
        
        {/* Top Navbar */}
        <nav className="navbar w-full bg-zinc-950 border-b border-zinc-900 px-4 sm:px-6 py-3 text-zinc-300 shadow-xl sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
          
          {/* Drawer Toggle Mobile Button */}
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost text-zinc-400 hover:text-white hover:bg-zinc-900 lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </label>

          {/* Title Area */}
          <div className="flex-1 px-2">
            <span className="text-sm font-black uppercase tracking-widest text-zinc-500 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl">
              Workspace
            </span>
          </div>

          {/* Right Top Actions */}
          <div className="flex items-center gap-4 pr-2">
            <button className="p-2 text-zinc-400 hover:text-teal-400 rounded-xl hover:bg-zinc-900 transition-colors relative">
              <Bell className="w-[18px] h-[18px]" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-teal-500 rounded-full" />
            </button>
            
            <div className="avatar">
              <div className="w-9 h-9 rounded-xl ring-2 ring-zinc-800 ring-offset-2 ring-offset-black bg-zinc-900">
                <img src="https://i.pravatar.cc/100" alt="User Session" className="object-cover" />
              </div>
            </div>
          </div>
        </nav>

        {/* Dynamic Nested Page Content Router Outlet */}
        <main className="flex-1 p-4 sm:p-8 bg-black">
          <div className="bg-zinc-950 border border-zinc-900/80 rounded-[32px] p-6 sm:p-8 min-h-[calc(100vh-140px)] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />
            <Outlet />
          </div>
        </main>
      </div>

      {/* Sidebar Drawer Component Container */}
      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        
        <div className="flex flex-col items-start bg-zinc-950 border-r border-zinc-900 text-zinc-400 h-full w-64 p-5 justify-between">
          
          <div className="w-full space-y-8">
            {/* Brand Logo Header */}
            <div className="flex items-center gap-3 px-3 py-2 border-b border-zinc-900 pb-5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-600 flex items-center justify-center text-black font-black text-sm">
                Ω
              </div>
              <div>
                <h1 className="font-serif font-black text-white leading-none text-base">Control Hub</h1>
                <span className="text-[10px] font-bold text-zinc-600 tracking-wider uppercase">Management Panel</span>
              </div>
            </div>

            {/* Navigation Menus List */}
            <ul className="menu w-full p-0 m-0 space-y-1.5 font-sans">
              
              {/* Context Block: Analytics & Overview */}
              <div className="text-[10px] font-black tracking-widest text-zinc-600 uppercase px-3 mb-2">Overview</div>
              
              <li>
                <Link to="/" className="p-0">
                  <button className="flex items-center gap-3.5 w-full rounded-xl px-4 py-3 text-zinc-400 font-semibold text-xs uppercase tracking-wider hover:bg-zinc-900 hover:text-white border border-transparent hover:border-zinc-800 transition-all text-left">
                    <Home className="w-[17px] h-[17px] text-zinc-500 group-hover:text-white" />
                    <span>Portal Home</span>
                  </button>
                </Link>
              </li>

              <li>
                <Link to="/dashboard" className="p-0">
                  <button className="flex items-center gap-3.5 w-full rounded-xl px-4 py-3 text-zinc-400 font-semibold text-xs uppercase tracking-wider hover:bg-zinc-900 hover:text-white border border-transparent hover:border-zinc-800 transition-all text-left">
                    <LayoutDashboard className="w-[17px] h-[17px] text-zinc-500" />
                    <span>Dashboard Home</span>
                  </button>
                </Link>
              </li>

              {/* Context Block: Content Operations */}
              <div className="text-[10px] font-black tracking-widest text-zinc-600 uppercase px-3 pt-6 mb-2">Management</div>

              <li>
                <Link to="/dashboard/add-lesson" className="p-0">
                  <button className="flex items-center gap-3.5 w-full rounded-xl px-4 py-3 text-zinc-400 font-semibold text-xs uppercase tracking-wider hover:bg-emerald-950/20 hover:text-emerald-400 border border-transparent hover:border-emerald-900/30 transition-all text-left">
                    <PlusCircle className="w-[17px] h-[17px] text-zinc-500" />
                    <span>Add Lesson</span>
                  </button>
                </Link>
              </li>

              <li>
                <Link to="/dashboard/my-lesson" className="p-0">
                  <button className="flex items-center gap-3.5 w-full rounded-xl px-4 py-3 text-zinc-400 font-semibold text-xs uppercase tracking-wider hover:bg-sky-950/20 hover:text-sky-400 border border-transparent hover:border-sky-900/30 transition-all text-left">
                    <BookOpen className="w-[17px] h-[17px] text-zinc-500" />
                    <span>My Lessons</span>
                  </button>
                </Link>
              </li>

              <li>
                <Link to="/dashboard/my-favorite" className="p-0">
                  <button className="flex items-center gap-3.5 w-full rounded-xl px-4 py-3 text-zinc-400 font-semibold text-xs uppercase tracking-wider hover:bg-amber-950/20 hover:text-amber-400 border border-transparent hover:border-amber-900/30 transition-all text-left">
                    <Star className="w-[17px] h-[17px] text-zinc-500" />
                    <span>My Favorites</span>
                  </button>
                </Link>
              </li>

              {/* Context Block: Account Configurations */}
              <div className="text-[10px] font-black tracking-widest text-zinc-600 uppercase px-3 pt-6 mb-2">Identity</div>

              <li>
                <Link to="/dashboard/profile" className="p-0">
                  <button className="flex items-center gap-3.5 w-full rounded-xl px-4 py-3 text-zinc-400 font-semibold text-xs uppercase tracking-wider hover:bg-zinc-900 hover:text-white border border-transparent hover:border-zinc-800 transition-all text-left">
                    <User className="w-[17px] h-[17px] text-zinc-500" />
                    <span>User Profile</span>
                  </button>
                </Link>
              </li>
            </ul>
          </div>

          {/* Sidebar System Footer Status Widget */}
          <div className="w-full bg-zinc-900/40 border border-zinc-900 rounded-2xl p-3.5 text-center mt-auto">
            <p className="text-[10px] font-bold text-zinc-500 tracking-wide">Secured Shell Active</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;