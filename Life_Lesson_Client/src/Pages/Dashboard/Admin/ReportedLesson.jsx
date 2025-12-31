import { useState } from "react";
import { FaTrash, FaEye, FaTimesCircle } from "react-icons/fa";

const ReportedLesson = () => {
  const [selectedLesson, setSelectedLesson] = useState(null);

  const reportedLessons = [
    {
      _id: "1",
      title: "React Crash Course",
      reports: [
        {
          reason: "Spam content",
          reporter: "user1@gmail.com",
        },
        {
          reason: "Inappropriate language",
          reporter: "user2@gmail.com",
        },
      ],
    },
    {
      _id: "2",
      title: "Advanced MongoDB",
      reports: [
        {
          reason: "Plagiarism",
          reporter: "user3@gmail.com",
        },
      ],
    },
  ];

  const handleDelete = (id) => {
    if (window.confirm("Delete this lesson permanently?")) {
      console.log("Deleted lesson:", id);
    }
  };

  const handleIgnore = (id) => {
    if (window.confirm("Ignore all reports for this lesson?")) {
      console.log("Ignored reports for lesson:", id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <h2 className="text-2xl font-bold text-gray-800">
        Reported Lessons
      </h2>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table w-full">
          <thead className="bg-red-600 text-white">
            <tr>
              <th>#</th>
              <th>Lesson Title</th>
              <th>Report Count</th>
              <th>View Reports</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {reportedLessons.map((lesson, index) => (
              <tr key={lesson._id} className="hover:bg-gray-100">
                <td>{index + 1}</td>
                <td className="font-medium">{lesson.title}</td>

                {/* Report Count Badge */}
                <td>
                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-semibold">
                    {lesson.reports.length}
                  </span>
                </td>

                {/* View Button */}
                <td>
                  <button
                    onClick={() => setSelectedLesson(lesson)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition"
                  >
                    <FaEye />
                    View
                  </button>
                </td>

                {/* Actions */}
                <td className="flex gap-3">
                  <button
                    onClick={() => handleDelete(lesson._id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete Lesson"
                  >
                    <FaTrash size={18} />
                  </button>

                  <button
                    onClick={() => handleIgnore(lesson._id)}
                    className="text-gray-600 hover:text-gray-800"
                    title="Ignore Reports"
                  >
                    <FaTimesCircle size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== MODAL ===== */}
      {selectedLesson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Reports for: {selectedLesson.title}
            </h3>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {selectedLesson.reports.map((report, idx) => (
                <div
                  key={idx}
                  className="border rounded-lg p-3 bg-gray-50"
                >
                  <p className="text-sm">
                    <span className="font-semibold">Reason:</span>{" "}
                    {report.reason}
                  </p>
                  <p className="text-xs text-gray-600">
                    Reporter: {report.reporter}
                  </p>
                </div>
              ))}
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setSelectedLesson(null)}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800"
              >
                Close
              </button>

              <button
                onClick={() => handleDelete(selectedLesson._id)}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
              >
                Delete Lesson
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportedLesson;
