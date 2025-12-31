import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

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
    <div className="min-h-screen p-6 bg-gradient-to-br from-indigo-50 to-purple-100">
    
      <div className="bg-white rounded-3xl shadow-xl p-8 mb-10">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={user?.photoURL}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-indigo-500 shadow"
          />

          <div className="flex-1 text-center md:text-left">
            <h2  className="text-3xl font-bold text-indigo-700">
              {user?.displayName}

              {isPremium && (
                <span className="ml-2 text-yellow-500 text-xl">
                   Premium
                </span>
              )}
            </h2>

            <p className="text-gray-500">{user?.email}</p>

            <div className="flex justify-center md:justify-start gap-6 mt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-indigo-600">
                  {lessons.length}
                </p>
                <p className="text-sm text-gray-500">Lessons Created</p>
              </div>

              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {savedLessonsCount}
                </p>
                <p className="text-sm text-gray-500">Lessons Saved</p>
              </div>
            </div>
          </div>
        </div>

       
        <form
          onSubmit={handleUpdateProfile}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8"
        >
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Display Name"
            className="input input-bordered w-full"
          />

          <input
            type="text"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            placeholder="Photo URL"
            className="input input-bordered w-full"
          />

          <button className="btn col-span-1 md:col-span-2 bg-indigo-600 hover:bg-indigo-700 text-white">
            Update Profile
          </button>
        </form>
      </div>

    
      <div>
        <h3 className="text-3xl font-bold mb-6 text-purple-700">
          My Public Lessons
        </h3>

        {lessons.length === 0 ? (
          <p className="text-gray-500">No lessons published yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons
              .sort(
                (a, b) =>
                  new Date(b.createdAt) - new Date(a.createdAt)
              )
              .map((lesson) => (
                <div
                  key={lesson._id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition overflow-hidden"
                >
                  <img
                    src={lesson.image}
                    alt={lesson.title}
                    className="h-40 w-full object-cover"
                  />

                  <div className="p-4">
                    <h4 className="text-lg font-semibold text-indigo-700">
                      {lesson.title}
                    </h4>

                    <p className="text-sm text-gray-500 mt-1">
                      {lesson.category}
                    </p>

                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(lesson.createdAt).toDateString()}
                    </p>
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
