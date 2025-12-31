import { useEffect, useState } from "react";
import { FaTrash, FaStar, FaCheckCircle } from "react-icons/fa";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";

const ManageLesson = () => {
  const [filter, setFilter] = useState("all");
  const axios = useAxios()
const [lessons, setLessons] = useState([]);
const {user} = useAuth()


useEffect(() => {
  if (user?.email) {
    axios
      .get(`/my-lesson?email=${user.email}`) 
      .then((res) => setLessons(res.data))
      .catch(console.error);
  }
}, [user?.email]);


  // ===== FILTER LOGIC =====
  const filteredLessons = lessons.filter((lesson) => {
    if (filter === "public") return lesson.visibility === "public";
    if (filter === "private") return lesson.visibility === "private";
    if (filter === "flagged") return lesson.flagged;
    return true;
  });

  // ===== ACTION HANDLERS =====
  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this lesson?"
    );
    if (confirm) {
      setLessons(lessons.filter((lesson) => lesson._id !== id));
    }
  };

  const toggleFeatured = (id) => {
    setLessons(
      lessons.map((lesson) =>
        lesson._id === id
          ? { ...lesson, featured: !lesson.featured }
          : lesson
      )
    );
  };

  const markReviewed = (id) => {
    setLessons(
      lessons.map((lesson) =>
        lesson._id === id ? { ...lesson, reviewed: true } : lesson
      )
    );
  };

  // ===== STATS =====
  const publicCount = lessons.filter(l => l.visibility === "public").length;
  const privateCount = lessons.filter(l => l.visibility === "private").length;
  const flaggedCount = lessons.filter(l => l.flagged).length;

  return (
    <div className="space-y-8">

      {/* ===== PAGE TITLE ===== */}
      <h2 className="text-2xl font-bold text-gray-800">
        Manage Lessons
      </h2>

      {/* ===== STATS CARDS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-5 rounded-xl shadow">
          <h3 className="text-sm opacity-90">Public Lessons</h3>
          <p className="text-3xl font-bold">{publicCount}</p>
        </div>

        <div className="bg-gradient-to-r from-gray-500 to-gray-700 text-white p-5 rounded-xl shadow">
          <h3 className="text-sm opacity-90">Private Lessons</h3>
          <p className="text-3xl font-bold">{privateCount}</p>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-red-700 text-white p-5 rounded-xl shadow">
          <h3 className="text-sm opacity-90">Flagged Lessons</h3>
          <p className="text-3xl font-bold">{flaggedCount}</p>
        </div>
      </div>

      {/* ===== FILTER ===== */}
      <div className="flex gap-4">
        {["all", "public", "private", "flagged"].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition
              ${filter === item
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
            `}
          >
            {item.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ===== TABLE ===== */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table w-full">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th>#</th>
              <th>Lesson Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Visibility</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredLessons.map((lesson, index) => (
              <tr key={lesson._id} className="hover:bg-gray-100">
                <td>{index + 1}</td>
                <td className="font-medium">{lesson.title}</td>
                <td>{user?.email}</td>
                <td>{lesson.category}</td>

               
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm
                      ${lesson.visibility === "public"
                        ? "bg-green-500 text-green-700"
                        : "bg-blue-500 text-gray-700"}
                    `}
                  >
                    {lesson.visibility}
                  </span>
                </td>

          
                <td className="space-x-2">
                  {lesson.flagged && (
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                      Flagged
                    </span>
                  )}
                  {lesson.featured && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">
                      Featured
                    </span>
                  )}
                  {lesson.reviewed && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                      Reviewed
                    </span>
                  )}
                </td>

            
                <td className="flex gap-2">
                  <button
                    onClick={() => toggleFeatured(lesson._id)}
                    className="text-yellow-500 hover:text-yellow-600"
                    title="Toggle Featured"
                  >
                    <FaStar />
                  </button>

                  {!lesson.reviewed && (
                    <button
                      onClick={() => markReviewed(lesson._id)}
                      className="text-blue-500 hover:text-blue-600"
                      title="Mark Reviewed"
                    >
                      <FaCheckCircle />
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(lesson._id)}
                    className="text-red-500 hover:text-red-600"
                    title="Delete Lesson"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageLesson;
