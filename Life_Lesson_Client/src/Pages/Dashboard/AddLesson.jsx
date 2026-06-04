import React, { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { Sparkles, FileText, Mail, Image as ImageIcon, Layers, Eye, ShieldAlert } from "lucide-react";

const AddLesson = ({ userr }) => {
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const isPremium = userr?.isPremium === true;

  const initData = {
    title: "",
    description: "",
    category: "",
    tone: "",
    image: "",
    privacy: "Public",
    accessLevel: "Free",
  };

  const [formData, setFormData] = useState(initData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePublish = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.category ||
      !formData.tone
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    Swal.fire({
      title: "Publish this lesson?",
      text: "You can edit it later",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Publish 🚀",
      background: "#09090b",
      color: "#f4f4f5",
      confirmButtonColor: "#0d9488",
      cancelButtonColor: "#27272a",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const lessonData = {
            ...formData,
            email: user?.email,
            createdAt: new Date(),
          };

          await axiosSecure.post("/add-lesson", lessonData);
          console.log("Lesson Data:", lessonData);

          queryClient.invalidateQueries(["my-lesson", user?.email]);

          Swal.fire({
            title: "Published 🎉",
            text: "Your lesson is now live!",
            icon: "success",
            background: "#09090b",
            color: "#f4f4f5",
            confirmButtonColor: "#0d9488",
          });
          setFormData(initData);
        } catch (err) {
          toast.error("Failed to publish lesson", err);
        }
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10">
      {/* Top Welcome Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight flex items-center gap-2.5">
          <Sparkles className="w-6 h-6 text-teal-400" /> Share Your Life Lesson
        </h1>
        <p className="text-xs font-medium text-zinc-500 mt-1">
          Turn your distinct experiences and realizations into structured wisdom for others.
        </p>
      </div>

      {/* Main Core Form Wrapper */}
      <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        <form className="space-y-6" onSubmit={handlePublish}>
          {/* Title */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-zinc-500" /> Lesson Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="A paradigm shift that altered my core perspective..."
              className="w-full px-4 py-3 rounded-xl bg-zinc-900/40 border border-zinc-800 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30 transition-all"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-zinc-500" /> Full Story & Chronology *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Deeply describe your experience, the contextual friction points, and what you derived..."
              className="w-full px-4 py-3 rounded-xl bg-zinc-900/40 border border-zinc-800 text-sm text-zinc-200 placeholder-zinc-600 h-44 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30 transition-all resize-none"
            />
          </div>

          {/* Email Node Reference */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-zinc-600" /> Author Session Identity
            </label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full px-4 py-3 rounded-xl bg-zinc-900/20 border border-zinc-900 text-sm text-zinc-500 cursor-not-allowed outline-none select-none"
            />
          </div>

          {/* Image Node Stream */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <ImageIcon className="w-3.5 h-3.5 text-zinc-500" /> Lesson Resource Image URL
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full px-4 py-3 rounded-xl bg-zinc-900/40 border border-zinc-800 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30 transition-all"
            />
            {formData.image && (
              <div className="pt-2">
                <div className="relative inline-block rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 p-1.5 shadow-xl">
                  <img
                    src={formData.image}
                    alt="Resource Matrix Preview"
                    className="w-40 h-40 object-cover rounded-xl"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Category & Tone Block Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-zinc-500" /> Taxonomy Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-sm text-zinc-300 focus:outline-none focus:border-teal-500/50 transition-all appearance-none cursor-pointer"
              >
                <option value="" className="bg-zinc-950">Select category</option>
                <option value="Personal Growth" className="bg-zinc-950">Personal Growth</option>
                <option value="Career" className="bg-zinc-950">Career</option>
                <option value="Relationships" className="bg-zinc-950">Relationships</option>
                <option value="Mindset" className="bg-zinc-950">Mindset</option>
                <option value="Mistakes Learned" className="bg-zinc-950">Mistakes Learned</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-zinc-500" /> Emotional Resonance *
              </label>
              <select
                name="tone"
                value={formData.tone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-sm text-zinc-300 focus:outline-none focus:border-teal-500/50 transition-all appearance-none cursor-pointer"
              >
                <option value="" className="bg-zinc-950">Select tone</option>
                <option value="Motivational" className="bg-zinc-950">Motivational</option>
                <option value="Sad" className="bg-zinc-950">Sad</option>
                <option value="Realization" className="bg-zinc-950">Realization</option>
                <option value="Gratitude" className="bg-zinc-950">Gratitude</option>
              </select>
            </div>
          </div>

          {/* Privacy & Access Block Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-zinc-500" /> Visibility Privacy
              </label>
              <select
                name="privacy"
                value={formData.privacy}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-sm text-zinc-300 focus:outline-none focus:border-teal-500/50 transition-all appearance-none cursor-pointer"
              >
                <option value="Public" className="bg-zinc-950">Public</option>
                <option value="Private" className="bg-zinc-950">Private</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <ShieldAlert className="w-3.5 h-3.5 text-zinc-500" /> Document Access Level
                </span>
                {!isPremium && (
                  <span className="text-[9px] font-black tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-md uppercase">
                    Premium Required
                  </span>
                )}
              </label>
              <select
                name="accessLevel"
                value={formData.accessLevel}
                onChange={handleChange}
                disabled={!isPremium}
                className="w-full px-4 py-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-sm text-zinc-300 focus:outline-none focus:border-teal-500/50 transition-all appearance-none disabled:bg-zinc-900/20 disabled:border-zinc-900/60 disabled:text-zinc-600 disabled:cursor-not-allowed"
              >
                <option value="Free" className="bg-zinc-950">Free Tier Access</option>
                <option value="Premium" className="bg-zinc-950">Premium Exclusive</option>
              </select>
            </div>
          </div>

          {/* Action Submission Trigger */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-zinc-100 text-zinc-950 font-sans font-bold text-xs uppercase tracking-widest hover:bg-white border border-zinc-200 transition-all shadow-xl hover:shadow-zinc-100/5 active:scale-[0.99]"
            >
              Commit & Publish Shell
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLesson;