import React from "react";

const benefits = [
  {
    title: "Real-World Problem Solving",
    description:
      "Life teaches you how to think, adapt, and solve real challenges — not just memorize theories.",
    icon: "💡",
  },
  {
    title: "Confidence & Independence",
    description:
      "Experiences build self-trust, decision-making ability, and emotional strength.",
    icon: "🚀",
  },
  {
    title: "Faster Skill Growth",
    description:
      "Hands-on learning makes skills stick — communication, leadership, discipline, creativity.",
    icon: "🎯",
  },
  {
    title: "Lifelong Perspective",
    description:
      "Life lessons shape your mindset, give meaning, and help you grow as a better human.",
    icon: "🌱",
  },
];

const Benefits = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto text-center px-4">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Why <span className="text-blue-600">Learning From Life</span> Matters
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Real experiences shape who we are. Here’s why life lessons are more
          powerful than any classroom.
        </p>

        {/* 4 Benefit Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="p-6 bg-white shadow-lg rounded-xl hover:shadow-2xl transition duration-500"
            >
              <div className="text-5xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
