import React, { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";

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

          Swal.fire("Published 🎉", "Your lesson is now live!", "success");
          setFormData(initData);
        } catch (err) {
          toast.error("Failed to publish lesson",err);
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 flex items-center justify-center">
      <div className="max-w-4xl w-full backdrop-blur-xl bg-white/20 rounded-3xl shadow-2xl p-10 border border-white/30">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-white drop-shadow">
            ✨ Share Your Life Lesson
          </h1>
          <p className="text-white/80 mt-2">
            Turn your experience into wisdom for others
          </p>
        </div>

        <form className="space-y-7">
          {/* Title */}
          <div>
            <label className="block text-white font-semibold mb-1">
              Lesson Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="A lesson that changed my life..."
              className="w-full px-5 py-3 rounded-xl bg-white/90 focus:ring-4 focus:ring-pink-400 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-white font-semibold mb-1">
              Full Story *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your experience and what you learned..."
              className="w-full px-5 py-3 rounded-xl bg-white/90 h-44 focus:ring-4 focus:ring-purple-400 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-white font-semibold mb-1">
              Your Email
            </label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full px-5 py-3 rounded-xl bg-gray-200 cursor-not-allowed"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-white font-semibold mb-1">
              Lesson Image
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Paste image URL"
              className="w-full px-5 py-3 rounded-xl bg-white/90"
            />
            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                className="mt-4 w-44 h-44 object-cover rounded-2xl shadow-lg border-4 border-white/60"
              />
            )}
          </div>

          {/* Category & Tone */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-semibold mb-1">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-5 py-3 rounded-xl bg-white/90"
              >
                <option value="">Select category</option>
                <option>Personal Growth</option>
                <option>Career</option>
                <option>Relationships</option>
                <option>Mindset</option>
                <option>Mistakes Learned</option>
              </select>
            </div>

            <div>
              <label className="block text-white font-semibold mb-1">
                Emotional Tone *
              </label>
              <select
                name="tone"
                value={formData.tone}
                onChange={handleChange}
                className="w-full px-5 py-3 rounded-xl bg-white/90"
              >
                <option value="">Select tone</option>
                <option>Motivational</option>
                <option>Sad</option>
                <option>Realization</option>
                <option>Gratitude</option>
              </select>
            </div>
          </div>

          {/* Privacy & Access */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-semibold mb-1">
                Privacy
              </label>
              <select
                name="privacy"
                value={formData.privacy}
                onChange={handleChange}
                className="w-full px-5 py-3 rounded-xl bg-white/90"
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>

            <div>
              <label className="block text-white font-semibold mb-1 flex items-center gap-2">
                Access Level
                {!isPremium && (
                  <span className="text-xs bg-yellow-300 text-yellow-900 px-2 py-0.5 rounded-full">
                    Premium
                  </span>
                )}
              </label>
              <select
                name="accessLevel"
                value={formData.accessLevel}
                onChange={handleChange}
                disabled={!isPremium}
                className="w-full px-5 py-3 rounded-xl bg-white/90 disabled:bg-gray-200"
              >
                <option value="Free">Free</option>
                <option value="Premium">Premium</option>
              </select>
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handlePublish}
            className="w-full py-4 rounded-2xl text-lg font-bold text-white
              bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
              hover:scale-105 transition-transform shadow-xl"
          >
            🚀 Publish Lesson
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLesson;
