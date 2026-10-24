import React, { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import {
  Sparkles,
  FileText,
  Mail,
  Image as ImageIcon,
  Layers,
  Eye,
  ShieldAlert,
  Crown,
  Lock,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

const defaultSampleImages = [
  "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1170",
  "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=1170",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200",
  "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1170",
];

const AddLesson = () => {
  const axiosSecure = useAxios();
  const { user, dbUser } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const isPremium =
    dbUser?.role === "premium" ||
    dbUser?.role === "admin" ||
    localStorage.getItem("premiumUser") === "true";

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
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      // If user is premium and chooses Private, automatically align to Premium
      if (name === "privacy" && value === "Private" && isPremium) {
        updated.accessLevel = "Premium";
      }

      return updated;
    });
  };

  const handleSelectPresetImage = (url) => {
    setFormData((prev) => ({ ...prev, image: url }));
  };

  const handlePublish = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim() || !formData.category || !formData.tone) {
      toast.error("Please fill in title, description, category and emotional tone");
      return;
    }

    // If non-premium tries to choose private/premium
    if (!isPremium && (formData.privacy === "Private" || formData.accessLevel === "Premium")) {
      toast.info("Only Premium members can create Private or Premium lessons. Please upgrade your account.");
      return;
    }

    Swal.fire({
      title: "Publish this lesson?",
      text: formData.privacy === "Private" 
        ? "This lesson will be saved as Private (Premium exclusive)."
        : "This lesson will be published to the public library.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Publish 🚀",
      cancelButtonText: "Cancel",
      background: "#09090b",
      color: "#f4f4f5",
      confirmButtonColor: "#06b6d4",
      cancelButtonColor: "#27272a",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setSubmitting(true);
        try {
          const finalImage =
            formData.image.trim() ||
            "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1170";

          // If privacy is private and user is premium, ensure accessLevel is Premium
          const finalAccessLevel =
            formData.privacy === "Private" && isPremium
              ? "Premium"
              : formData.accessLevel;

          const lessonData = {
            title: formData.title.trim(),
            description: formData.description.trim(),
            category: formData.category,
            emotionalTone: formData.tone,
            image: finalImage,
            privacy: formData.privacy,
            accessLevel: finalAccessLevel,
            email: user?.email,
            creator: {
              name: user?.displayName || user?.email?.split("@")[0] || "Contributor",
              photo: user?.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
              email: user?.email,
            },
            createdAt: new Date(),
          };

          const res = await axiosSecure.post("/add-lesson", lessonData);
          const createdId = res.data?.insertedId || res.data?._id;

          queryClient.invalidateQueries(["my-lesson", user?.email]);
          queryClient.invalidateQueries(["public-lessons"]);
          queryClient.invalidateQueries(["premium-lessons"]);

          Swal.fire({
            title: "Lesson Published 🎉",
            text: "Your lesson has been registered and is now viewable in full detail!",
            icon: "success",
            showCancelButton: true,
            confirmButtonText: "View Lesson Details 📖",
            cancelButtonText: "Go to My Lessons",
            background: "#09090b",
            color: "#f4f4f5",
            confirmButtonColor: "#06b6d4",
            cancelButtonColor: "#27272a",
          }).then((navResult) => {
            if (navResult.isConfirmed && createdId) {
              const route = finalAccessLevel === "Premium" ? `/premium-lesson/${createdId}` : `/public-lesson/${createdId}`;
              navigate(route);
            } else {
              navigate("/dashboard/my-lesson");
            }
          });

          setFormData(initData);
        } catch (err) {
          console.error("Failed to publish lesson:", err);
          toast.error("Failed to publish lesson. Please try again.");
        } finally {
          setSubmitting(false);
        }
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Top Welcome Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight flex items-center gap-2.5">
          <Sparkles className="w-6 h-6 text-cyan-400" /> Share Your Life Lesson
        </h1>
        <p className="text-xs font-medium text-zinc-500 mt-1">
          Turn your distinct experiences, struggles, and realizations into structured wisdom.
        </p>
      </div>

      {/* Premium Perks Callout if not premium */}
      {!isPremium ? (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-zinc-900 to-zinc-900 border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl">
              <Crown className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Want to create Private & Premium lessons?</h4>
              <p className="text-[11px] text-zinc-400">Upgrade to Lifetime Premium to unlock private lessons, custom badges, and exclusive features.</p>
            </div>
          </div>
          <Link
            to="/premium-lesson"
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shrink-0"
          >
            Go Premium ($15)
          </Link>
        </div>
      ) : (
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-zinc-900 to-zinc-900 border border-cyan-500/20 flex items-center gap-3">
          <Crown className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span className="text-xs font-bold text-zinc-300">
            Premium Status Active: You can create <span className="text-amber-400 font-black">Private</span> and <span className="text-cyan-400 font-black">Premium Exclusive</span> lessons!
          </span>
        </div>
      )}

      {/* Main Form Container */}
      <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <form className="space-y-6" onSubmit={handlePublish}>
          {/* Title */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-zinc-500" /> Lesson Title *
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="E.g., Overcoming Fear: What Ten Years of Failure Taught Me"
              className="w-full px-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-zinc-500" /> Lesson Narrative & Realizations *
            </label>
            <textarea
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              placeholder="Detail your personal story, what went wrong, the turning point, and the timeless lesson derived..."
              className="w-full px-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800 text-sm text-zinc-200 placeholder-zinc-600 h-40 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all resize-none"
            />
          </div>

          {/* Author Email */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-zinc-600" /> Author Identity
            </label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/20 border border-zinc-900 text-xs text-zinc-500 cursor-not-allowed outline-none select-none"
            />
          </div>

          {/* Image URL & Preset Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center justify-between">
              <span className="flex items-center gap-2">
                <ImageIcon className="w-3.5 h-3.5 text-zinc-500" /> Lesson Cover Image URL
              </span>
              <span className="text-[10px] text-zinc-500 normal-case">(Automatic default applied if left empty)</span>
            </label>

            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all"
            />

            {/* Quick preset selector */}
            <div className="pt-1 space-y-1.5">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Or pick a curated cover:</span>
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {defaultSampleImages.map((imgUrl, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelectPresetImage(imgUrl)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      formData.image === imgUrl ? "border-cyan-400 scale-105" : "border-zinc-800 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={imgUrl} alt="Preset cover" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Image Preview */}
            {formData.image && (
              <div className="pt-2">
                <div className="relative inline-block rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 p-1 shadow-lg">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-48 h-28 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Category & Emotional Tone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-zinc-500" /> Category *
              </label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-sm text-zinc-200 focus:outline-none focus:border-cyan-500 transition-all cursor-pointer"
              >
                <option value="" className="bg-zinc-950">Select category</option>
                <option value="Personal Growth" className="bg-zinc-950">Personal Growth</option>
                <option value="Career" className="bg-zinc-950">Career</option>
                <option value="Relationships" className="bg-zinc-950">Relationships</option>
                <option value="Mindset" className="bg-zinc-950">Mindset</option>
                <option value="Spirituality" className="bg-zinc-950">Spirituality</option>
                <option value="Mental Health" className="bg-zinc-950">Mental Health</option>
                <option value="Mistakes Learned" className="bg-zinc-950">Mistakes Learned</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-zinc-500" /> Emotional Tone *
              </label>
              <select
                name="tone"
                required
                value={formData.tone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-sm text-zinc-200 focus:outline-none focus:border-cyan-500 transition-all cursor-pointer"
              >
                <option value="" className="bg-zinc-950">Select emotional tone</option>
                <option value="Empowering" className="bg-zinc-950">Empowering</option>
                <option value="Motivational" className="bg-zinc-950">Motivational</option>
                <option value="Realization" className="bg-zinc-950">Realization</option>
                <option value="Deeply Peaceful" className="bg-zinc-950">Deeply Peaceful</option>
                <option value="Gratitude" className="bg-zinc-950">Gratitude</option>
                <option value="Healing" className="bg-zinc-950">Healing</option>
              </select>
            </div>
          </div>

          {/* Privacy & Access Level */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Privacy */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5 text-zinc-500" /> Visibility Privacy
                </span>
                {!isPremium && (
                  <span className="text-[9px] text-amber-400 uppercase font-bold">Private needs Premium</span>
                )}
              </label>
              <select
                name="privacy"
                value={formData.privacy}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-sm text-zinc-200 focus:outline-none focus:border-cyan-500 transition-all cursor-pointer"
              >
                <option value="Public" className="bg-zinc-950">Public (Everyone can see)</option>
                <option value="Private" disabled={!isPremium} className="bg-zinc-950">
                  {isPremium ? "Private (Premium Only)" : "Private (🔒 Premium required)"}
                </option>
              </select>
            </div>

            {/* Access Level */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <ShieldAlert className="w-3.5 h-3.5 text-zinc-500" /> Access Tier
                </span>
                {isPremium ? (
                  <span className="text-[9px] text-emerald-400 uppercase font-bold">Unlocked</span>
                ) : (
                  <span className="text-[9px] text-zinc-500 uppercase font-bold">Free only</span>
                )}
              </label>
              <select
                name="accessLevel"
                value={formData.accessLevel}
                onChange={handleChange}
                disabled={!isPremium}
                className="w-full px-4 py-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-sm text-zinc-200 focus:outline-none focus:border-cyan-500 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="Free" className="bg-zinc-950">Free Tier Access</option>
                <option value="Premium" className="bg-zinc-950">Premium Exclusive Masterclass</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-black font-extrabold text-xs uppercase tracking-widest transition-all shadow-xl shadow-cyan-500/20 active:scale-[0.99] cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>{submitting ? "Publishing Lesson..." : "Publish Lesson"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLesson;
