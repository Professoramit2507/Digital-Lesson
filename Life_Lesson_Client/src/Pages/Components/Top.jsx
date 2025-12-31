import { useEffect, useState } from "react";

const Top = () => {
  const [contributors, setContributors] = useState([]);

  // 🔹 Dummy data
  const dummyData = [
    { _id: 1, name: "Rahim", email: "rahim@gmail.com", totalLessons: 12 },
    { _id: 2, name: "Karim", email: "karim@gmail.com", totalLessons: 9 },
    { _id: 3, name: "Sakib", email: "sakib@gmail.com", totalLessons: 7 },
    { _id: 4, name: "Farhan", email: "farhan@gmail.com", totalLessons: 5 },
    { _id: 5, name: "Riya", email: "riya@gmail.com", totalLessons: 3 },
  ];

  useEffect(() => {
    // simulate API call delay
    const timer = setTimeout(() => {
      setContributors(dummyData);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-6 text-center">
        🏆 Top Contributors of the Week
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {contributors.map((user, index) => (
          <div
            key={user._id}
            className="p-5 bg-base-100 shadow rounded-lg text-center"
          >
            <h3 className="text-xl font-semibold">
              #{index + 1} {user.name}
            </h3>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="mt-2 font-bold text-primary">
              {user.totalLessons} Lessons
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Top;
