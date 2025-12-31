import React, { useMemo, useState } from 'react';
import { toast } from 'react-toastify';

const MyFavorite = ({ favorites = [] }) => {
    const [categoryFilter, setCategoryFilter] = useState("");
      const [toneFilter, setToneFilter] = useState("");
    
      const filteredFavorites = useMemo(() => {
        return favorites.filter((lesson) => {
          const categoryMatch = categoryFilter
            ? lesson.category === categoryFilter
            : true;
          const toneMatch = toneFilter ? lesson.tone === toneFilter : true;
          return categoryMatch && toneMatch;
        });
      }, [favorites, categoryFilter, toneFilter]);
    
      const handleRemove = (id) => {
        // Call API to remove from favorites collection
        toast.success("Removed from favorites 💔");
      };
    return (
       <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6">
      <div className="max-w-6xl mx-auto">

     
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-indigo-700">
            My Favorite Lessons
          </h1>
          <p className="text-gray-600">
            Lessons you saved to revisit later.
          </p>
        </div>


        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-md p-6 mb-6 border border-white/40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="">All Categories</option>
              <option>Personal Growth</option>
              <option>Career</option>
              <option>Relationships</option>
              <option>Mindset</option>
              <option>Mistakes Learned</option>
            </select>

            <select
              value={toneFilter}
              onChange={(e) => setToneFilter(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="">All Emotional Tones</option>
              <option>Motivational</option>
              <option>Sad</option>
              <option>Realization</option>
              <option>Gratitude</option>
            </select>

            <div className="flex items-center font-semibold text-purple-700">
              Showing {filteredFavorites.length} lesson(s)
            </div>
          </div>
        </div>

    
        <div className="bg-white rounded-2xl shadow-xl overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <tr>
                <th>Lesson</th>
                <th>Category</th>
                <th>Tone</th>
                <th>Access</th>
                <th>Date Saved</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredFavorites.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-500">
                    No favorite lessons found.
                  </td>
                </tr>
              ) : (
                filteredFavorites.map((lesson) => (
                  <tr
                    key={lesson.id}
                    className="hover:bg-indigo-50 transition"
                  >
                    <td>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {lesson.title}
                        </p>
                        <p className="text-sm text-gray-500 line-clamp-1">
                          {lesson.description}
                        </p>
                      </div>
                    </td>

                    <td>
                      <span className="badge badge-info badge-outline">
                        {lesson.category}
                      </span>
                    </td>

                    <td>
                      <span className="badge badge-secondary badge-outline">
                        {lesson.tone}
                      </span>
                    </td>

                    <td>
                      {lesson.accessLevel === "Premium" ? (
                        <span className="badge badge-warning">⭐ Premium</span>
                      ) : (
                        <span className="badge badge-success">Free</span>
                      )}
                    </td>

                    <td className="text-sm text-gray-500">
                      {new Date(lesson.savedAt).toLocaleDateString()}
                    </td>

                    <td className="text-center space-x-2">
                      <Link
                        to={`/lessons/${lesson.id}`}
                        className="btn btn-sm btn-outline btn-primary"
                      >
                        View
                      </Link>

                      <button
                        onClick={() => handleRemove(lesson.id)}
                        className="btn btn-sm btn-outline btn-error"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    );
};

export default MyFavorite;