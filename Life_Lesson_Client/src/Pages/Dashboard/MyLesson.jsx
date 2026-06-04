import React from "react";
import Swal from "sweetalert2";
import { Eye, Edit3, Trash2, ShieldAlert, Layers } from "lucide-react";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";

const MyLesson = ({ userr }) => {
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const isPremium = userr?.isPremium === true;

  const { data: lessons = [] } = useQuery({
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
      toast.error("Premium authorization token required");
      return;
    }

    try {
      await axiosSecure.patch(`/lessons/access/${id}`, {
        accessLevel: value,
      });
      toast.success("Access level state altered");
      queryClient.invalidateQueries(["my-lesson", user?.email]);
    } catch {
      toast.error("Failed to update access metrics");
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Terminate this document?",
      text: "This action alters repository state permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm Delete",
      background: "#09090b",
      color: "#f4f4f5",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#27272a",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/lessons/${id}`);
          toast.success("Lesson node deleted");
          queryClient.invalidateQueries(["my-lesson", user?.email]);
        } catch {
          toast.error("Deletion execution failed");
        }
      }
    });
  };

  return (
    <div className="space-y-10">
      {/* Top Welcome Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight flex items-center gap-3">
          <Layers className="w-6 h-6 text-teal-400" /> My Lessons Repository
        </h1>
        <p className="text-xs font-medium text-zinc-500 mt-1">
          Total index clusters: <span className="text-zinc-300 font-semibold">{lessons.length} nodes registered</span>
        </p>
      </div>

      {/* Responsive Table Control Layer */}
      <div className="overflow-x-auto bg-zinc-950 border border-zinc-900 rounded-3xl shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-900 bg-zinc-900/20 text-[10px] font-black tracking-widest text-zinc-500 uppercase">
              <th className="p-5">Document Title</th>
              <th className="p-5">Privacy Scope</th>
              <th className="p-5">Access Protocol</th>
              <th className="p-5">Timestamp</th>
              <th className="p-5 text-center">Reactions</th>
              <th className="p-5 text-center">Saves</th>
              <th className="p-5 text-right">Operations</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-900/60 text-xs">
            {lessons.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-12 text-zinc-600 font-medium tracking-wide">
                  Null set returned — No custom lessons discovered.
                </td>
              </tr>
            ) : (
              lessons.map((lesson) => (
                <tr
                  key={lesson._id}
                  className="hover:bg-zinc-900/30 transition-colors group"
                >
                  {/* Title block */}
                  <td className="p-5 font-semibold text-zinc-200 group-hover:text-white max-w-xs truncate transition-colors">
                    {lesson.title}
                  </td>

                  {/* Privacy dropdown selector */}
                  <td className="p-5">
                    <select
                      value={lesson.privacy}
                      onChange={(e) => handlePrivacyChange(lesson._id, e.target.value)}
                      className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-[11px] font-medium rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-zinc-700 cursor-pointer appearance-none"
                    >
                      <option value="Public" className="bg-zinc-950">Public</option>
                      <option value="Private" className="bg-zinc-950">Private</option>
                    </select>
                  </td>

                  {/* Access state dropdown selector */}
                  <td className="p-5">
                    <div className="flex items-center gap-2">
                      <select
                        value={lesson.accessLevel}
                        disabled={!isPremium}
                        onChange={(e) => handleAccessChange(lesson._id, e.target.value)}
                        className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-[11px] font-medium rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-zinc-700 disabled:bg-zinc-950 disabled:border-zinc-900/40 disabled:text-zinc-600 disabled:cursor-not-allowed appearance-none cursor-pointer"
                      >
                        <option value="Free" className="bg-zinc-950">Free Tier</option>
                        <option value="Premium" className="bg-zinc-950">Premium</option>
                      </select>
                      {!isPremium && lesson.accessLevel === "Premium" && (
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-500/60" />
                      )}
                    </div>
                  </td>

                  {/* Created date representation */}
                  <td className="p-5 text-zinc-500 font-medium">
                    {lesson.createdAt
                      ? new Date(lesson.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "Undefined"}
                  </td>

                  {/* Interaction Metric Node */}
                  <td className="p-5 text-center font-mono font-bold text-zinc-400 group-hover:text-zinc-300 transition-colors">
                    {lesson.reactions || 0}
                  </td>

                  {/* Document Saving Count Metric */}
                  <td className="p-5 text-center font-mono font-bold text-zinc-400 group-hover:text-zinc-300 transition-colors">
                    {lesson.saves || 0}
                  </td>

                  {/* Inline Functional Triggers */}
                  <td className="p-5">
                    <div className="flex items-center justify-end gap-3.5 text-zinc-500">
                      <button 
                        title="Inspect Document" 
                        className="hover:text-zinc-200 transition-colors p-1 hover:bg-zinc-900 rounded-md"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        title="Mutate Properties" 
                        className="hover:text-zinc-200 transition-colors p-1 hover:bg-zinc-900 rounded-md"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        title="Purge Node"
                        onClick={() => handleDelete(lesson._id)}
                        className="hover:text-red-400 transition-colors p-1 hover:bg-red-500/10 rounded-md"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyLesson;