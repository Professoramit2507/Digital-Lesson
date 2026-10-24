import React from "react";
import Swal from "sweetalert2";
import { Eye, Trash2, ShieldAlert, Layers, Image as ImageIcon, Sparkles, ExternalLink } from "lucide-react";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";

const MyLesson = () => {
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();
  const { user, dbUser } = useAuth();

  const isPremium =
    dbUser?.role === "premium" ||
    dbUser?.role === "admin" ||
    localStorage.getItem("premiumUser") === "true";

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["my-lesson", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-lesson?email=${user?.email}`);
      return res.data;
    },
  });

  const handlePrivacyChange = async (id, value) => {
    try {
      await axiosSecure.patch(`/lessons/privacy/${id}`, {
        privacy: value,
      });
      toast.success("Privacy updated successfully");
      queryClient.invalidateQueries(["my-lesson", user?.email]);
    } catch {
      toast.error("Failed to update privacy configuration");
    }
  };

  const handleAccessChange = async (id, value) => {
    if (!isPremium) {
      toast.error("Premium membership required to toggle Premium status");
      return;
    }

    try {
      await axiosSecure.patch(`/lessons/access/${id}`, {
        accessLevel: value,
      });
      toast.success("Access level updated");
      queryClient.invalidateQueries(["my-lesson", user?.email]);
    } catch {
      toast.error("Failed to update access level");
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete this lesson?",
      text: "This lesson will be permanently removed from your account.",
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
          await axiosSecure.delete(`/lessons/${id}`);
          toast.success("Lesson deleted successfully");
          queryClient.invalidateQueries(["my-lesson", user?.email]);
        } catch {
          toast.error("Failed to delete lesson");
        }
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight flex items-center gap-3">
            <Layers className="w-6 h-6 text-cyan-400" /> My Lessons Repository
          </h1>
          <p className="text-xs font-medium text-zinc-500 mt-1">
            Manage your personal lessons, privacy states, and access levels.
          </p>
        </div>

        <Link
          to="/dashboard/add-lesson"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md w-max"
        >
          <Sparkles className="w-4 h-4 text-black" /> Add New Lesson
        </Link>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto bg-zinc-950 border border-zinc-900 rounded-3xl shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-900 bg-zinc-900/30 text-[10px] font-black tracking-widest text-zinc-500 uppercase">
              <th className="p-4 pl-6">Cover</th>
              <th className="p-4">Title & Details</th>
              <th className="p-4">Privacy</th>
              <th className="p-4">Access Level</th>
              <th className="p-4">Created Date</th>
              <th className="p-4 text-right pr-6">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-900/60 text-xs">
            {isLoading ? (
              <tr>
                <td colSpan="6" className="text-center py-12 text-zinc-500">
                  Loading your lessons...
                </td>
              </tr>
            ) : lessons.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-14 text-zinc-600 font-medium">
                  <div className="space-y-2">
                    <p>No lessons added yet.</p>
                    <Link
                      to="/dashboard/add-lesson"
                      className="text-cyan-400 hover:underline text-xs font-bold inline-block"
                    >
                      Click here to add your first lesson &rarr;
                    </Link>
                  </div>
                </td>
              </tr>
            ) : (
              lessons.map((lesson) => {
                const lessonImg =
                  lesson.image ||
                  lesson.img ||
                  "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1170";

                const detailPath =
                  lesson.accessLevel === "Premium" || lesson.privacy === "Private"
                    ? `/premium-lesson/${lesson._id}`
                    : `/public-lesson/${lesson._id}`;

                return (
                  <tr
                    key={lesson._id}
                    className="hover:bg-zinc-900/30 transition-colors group"
                  >
                    {/* Thumbnail Image */}
                    <td className="p-4 pl-6">
                      <div className="w-14 h-14 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 shrink-0 shadow-sm">
                        <img
                          src={lessonImg}
                          alt={lesson.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1170";
                          }}
                        />
                      </div>
                    </td>

                    {/* Title & Category */}
                    <td className="p-4 max-w-xs">
                      <Link
                        to={detailPath}
                        className="font-bold text-zinc-200 hover:text-cyan-400 transition-colors line-clamp-1 text-sm block"
                      >
                        {lesson.title}
                      </Link>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded border border-zinc-800">
                          {lesson.category || "General"}
                        </span>
                        {lesson.emotionalTone && (
                          <span className="text-[10px] text-zinc-500">
                            Tone: {lesson.emotionalTone}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Privacy Dropdown */}
                    <td className="p-4">
                      <select
                        value={lesson.privacy}
                        onChange={(e) =>
                          handlePrivacyChange(lesson._id, e.target.value)
                        }
                        className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-500 cursor-pointer appearance-none"
                      >
                        <option value="Public" className="bg-zinc-950">
                          Public
                        </option>
                        <option value="Private" className="bg-zinc-950">
                          Private
                        </option>
                      </select>
                    </td>

                    {/* Access Level Dropdown */}
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <select
                          value={lesson.accessLevel || "Free"}
                          disabled={!isPremium}
                          onChange={(e) =>
                            handleAccessChange(lesson._id, e.target.value)
                          }
                          className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed appearance-none cursor-pointer"
                        >
                          <option value="Free" className="bg-zinc-950">
                            Free Tier
                          </option>
                          <option value="Premium" className="bg-zinc-950">
                            Premium
                          </option>
                        </select>
                        {!isPremium && lesson.accessLevel === "Premium" && (
                          <ShieldAlert className="w-4 h-4 text-amber-500" />
                        )}
                      </div>
                    </td>

                    {/* Created Date */}
                    <td className="p-4 text-zinc-500 font-medium">
                      {lesson.createdAt
                        ? new Date(lesson.createdAt).toLocaleDateString()
                        : "Recent"}
                    </td>

                    {/* Actions: View & Delete */}
                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* View Details Button */}
                        <Link
                          to={detailPath}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-cyan-400 border border-zinc-800 hover:border-cyan-500/40 rounded-lg text-xs font-bold transition-all shadow-xs"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </Link>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(lesson._id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
                          title="Delete Lesson"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyLesson;
