import { useEffect, useState } from "react";

const MostSavedLesson = () => {
  const [lessons, setLessons] = useState([]);

  // 🔹 Dummy data
  const dummyLessons = [
    {
      _id: 1,
      title: "React for Beginners",
      instructor: "John Doe",
      savedCount: 120,
    },
    {
      _id: 2,
      title: "Advanced JavaScript",
      instructor: "Jane Smith",
      savedCount: 98,
    },
    {
      _id: 3,
      title: "Node.js Crash Course",
      instructor: "Rahim Khan",
      savedCount: 75,
    },
    {
      _id: 4,
      title: "CSS Animations",
      instructor: "Karim Ali",
      savedCount: 60,
    },
    {
      _id: 5,
      title: "Fullstack with MERN",
      instructor: "Sakib Ahmed",
      savedCount: 50,
    },
  ];

  useEffect(() => {
    // simulate API delay
    const timer = setTimeout(() => {
      setLessons(dummyLessons);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-6 text-center">
         Most Saved Lessons
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <div
            key={lesson._id}
            className="p-5 bg-base-100 shadow rounded-lg"
          >
            <h3 className="text-lg font-semibold">{lesson.title}</h3>
            <p className="text-sm text-gray-500">
              Instructor: {lesson.instructor}
            </p>

            <div className="mt-3 flex justify-between items-center">
              <span className="font-bold text-primary">
                 {lesson.savedCount}
              </span>
              <span className="badge badge-error">Popular 🔥</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MostSavedLesson;
