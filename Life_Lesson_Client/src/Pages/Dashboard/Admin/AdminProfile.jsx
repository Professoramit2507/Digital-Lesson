import { useState } from "react";
import { FaUserShield, FaCamera } from "react-icons/fa";

const AdminProfile = () => {
  const [name, setName] = useState("Admin Smith");
  const [photo, setPhoto] = useState(
    "https://i.ibb.co/2kRZ0JX/admin-avatar.png"
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
    <div className="max-w-4xl mx-auto space-y-8">

      
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow-lg flex flex-col md:flex-row items-center gap-6">
        
        {/* Avatar */}
        <div className="relative">
          <img
            src={photo}
            alt="Admin"
            className="w-32 h-32 rounded-full border-4 border-white object-cover"
          />
          <label className="absolute bottom-1 right-1 bg-white p-2 rounded-full cursor-pointer shadow">
            <FaCamera className="text-indigo-600" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </label>
        </div>

     
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold">{name}</h2>
          <p className="opacity-90">admin@gmail.com</p>

          <span className="inline-flex items-center gap-2 mt-3 px-4 py-1 rounded-full bg-white text-indigo-600 font-semibold text-sm">
            <FaUserShield />
            Admin
          </span>
        </div>
      </div>

    \
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-100 text-green-700 p-5 rounded-xl shadow">
          <h3 className="text-sm font-semibold">Lessons Moderated</h3>
          <p className="text-3xl font-bold">{activity.moderatedLessons}</p>
        </div>

        <div className="bg-red-100 text-red-700 p-5 rounded-xl shadow">
          <h3 className="text-sm font-semibold">Lessons Deleted</h3>
          <p className="text-3xl font-bold">{activity.deletedLessons}</p>
        </div>

        <div className="bg-blue-100 text-blue-700 p-5 rounded-xl shadow">
          <h3 className="text-sm font-semibold">Reports Ignored</h3>
          <p className="text-3xl font-bold">{activity.ignoredReports}</p>
        </div>
      </div>

     \
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Update Profile
        </h3>

        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Display Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;
