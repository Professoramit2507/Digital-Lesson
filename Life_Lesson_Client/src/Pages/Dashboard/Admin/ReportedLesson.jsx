import { useState } from "react";
import { 
  Trash2, 
  Eye, 
  XCircle, 
  AlertTriangle, 
  User, 
  FileText, 
  Fingerprint, 
  X 
} from "lucide-react";

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
      if (selectedLesson?._id === id) setSelectedLesson(null);
    }
  };

  const handleIgnore = (id) => {
    if (window.confirm("Ignore all reports for this lesson?")) {
      console.log("Ignored reports for lesson:", id);
    }
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      
      {/* ===== PAGE HEADER ===== */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight flex items-center gap-3">
          Anomalous Content Control
        </h1>
        <p className="text-xs font-medium text-zinc-500 mt-1">
          Moderate flag submissions, inspect copyright violations, and enforce system discipline.
        </p>
      </div>

      {/* ===== SPACIOUS TABLE CONTAINER ===== */}
      <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-2 sm:p-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-red-500/10 to-transparent" />
        
        <div className="overflow-x-auto rounded-2xl">
          <table className="w-full text-left border-collapse">
            
            {/* Table Header */}
            <thead>
              <tr className="border-b border-zinc-900 bg-zinc-900/30 text-zinc-400 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-4 px-5 font-bold">#</th>
                <th className="py-4 px-6 font-bold">Reported Shell Blueprint</th>
                <th className="py-4 px-5 font-bold text-center">Threat Instances</th>
                <th className="py-4 px-5 font-bold text-center">Audit Payload</th>
                <th className="py-4 px-5 font-bold text-right">System Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-zinc-900/60 font-mono text-xs text-zinc-300">
              {reportedLessons.map((lesson, index) => (
                <tr key={lesson._id} className="hover:bg-zinc-900/40 transition-colors duration-150 group">
                  
                  {/* # */}
                  <td className="py-5 px-5 text-zinc-600 font-bold">{index + 1}</td>
                  
                  {/* Lesson Title */}
                  <td className="py-5 px-6 font-sans text-zinc-200 group-hover:text-white transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-zinc-900 rounded-xl border border-zinc-800 text-red-400/80">
                        <AlertTriangle className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-sm text-zinc-200">{lesson.title}</span>
                    </div>
                  </td>

                  {/* Report Count Badge */}
                  <td className="py-5 px-5 text-center">
                    <span className="inline-block px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-red-500/5 text-red-400 border border-red-500/20 shadow-sm shadow-red-500/5">
                      {lesson.reports.length} Reports
                    </span>
                  </td>

                  {/* View Button */}
                  <td className="py-5 px-5 text-center">
                    <button
                      onClick={() => setSelectedLesson(lesson)}
                      className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md"
                    >
                      <Eye className="w-3.5 h-3.5 text-sky-400" />
                      <span>Inspect</span>
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-5 px-5 text-right">
                    <div className="inline-flex items-center gap-3">
                      
                      {/* Ignore Button */}
                      <button
                        onClick={() => handleIgnore(lesson._id)}
                        className="p-2 bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-emerald-400 hover:border-zinc-700 rounded-xl transition-all cursor-pointer"
                        title="Ignore All System Flags"
                      >
                        <XCircle className="w-4 h-4 stroke-[2]" />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(lesson._id)}
                        className="p-2 bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-red-400 hover:border-zinc-700 rounded-xl transition-all cursor-pointer"
                        title="Purge Corrupted Shell"
                      >
                        <Trash2 className="w-4 h-4 stroke-[2]" />
                      </button>

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* ===== ===== PREMIUM DARK MODAL ===== ===== */}
      {selectedLesson && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-zinc-950 border border-zinc-900 rounded-3xl shadow-2xl w-full max-w-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-red-500/30 to-transparent" />
            
            {/* Modal Header */}
            <div className="flex items-start justify-between mb-6 pb-4 border-b border-zinc-900">
              <div className="space-y-1">
                <p className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-widest">Incident Payload</p>
                <h3 className="text-base font-sans font-bold text-white">
                  Auditing: {selectedLesson.title}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedLesson(null)}
                className="p-1.5 bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Reports List Area */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {selectedLesson.reports.map((report, idx) => (
                <div
                  key={idx}
                  className="border border-zinc-900 rounded-2xl p-4 bg-zinc-900/20 space-y-2 group hover:border-zinc-800 transition-colors"
                >
                  <div className="flex items-start gap-2.5">
                    <FileText className="w-4 h-4 text-zinc-600 mt-0.5" />
                    <p className="text-xs font-sans text-zinc-300 leading-relaxed">
                      <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase tracking-wide block mb-0.5">Reason Submitted:</span>
                      {report.reason}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 pt-2 border-t border-zinc-900/60 text-[11px] font-mono text-zinc-500">
                    <Fingerprint className="w-3.5 h-3.5 text-zinc-700" />
                    <span>Reporter: <span className="text-zinc-400">{report.reporter}</span></span>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer Actions */}
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-zinc-900">
              <button
                onClick={() => setSelectedLesson(null)}
                className="px-5 py-2.5 rounded-xl text-[11px] font-mono font-bold uppercase tracking-wider bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all cursor-pointer"
              >
                Cancel Audit
              </button>

              <button
                onClick={() => handleDelete(selectedLesson._id)}
                className="inline-flex items-center gap-2 bg-red-950/40 border border-red-900/60 hover:border-red-500/50 text-red-400 px-5 py-2.5 rounded-xl text-[11px] font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-lg shadow-black/30"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Purge Node</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default ReportedLesson;