import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import axios from "axios";

const PublicLesson = () => {
  const initialCards = [
     {
    "id": 1,
    "title": "How to Overcome Fear",
    "img":"https://images.unsplash.com/photo-1625674967351-655dfa7362c7?q=80&w=1334&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "shortDescription": "A guide to overcoming personal fears and challenges through mindfulness and positive thinking.",
    "category": "Personal Growth",
    "emotionalTone": "Empowering",
    "creator": {
      "name": "John Doe",
      "photo": "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    "accessLevel": "Public",
    "createdDate": "2023-10-01",
    "detailsLink": "/life-lesson/1"
  },
  {
    "id": 2,
    "title": "The Power of Gratitude",
    "img":"https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "shortDescription": "Explore how practicing gratitude can transform your mental and emotional well-being.",
    "category": "Mental Health",
    "emotionalTone": "Positive",
    "creator": {
      "name": "Jane Smith",
     "photo": "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    "accessLevel": "Public",
    "createdDate": "2023-11-15",
    "detailsLink": "/life-lesson/2"
  },
  {
    "id": 3,
    "title": "Building Healthy Relationships",
    "img":"https://plus.unsplash.com/premium_photo-1683887033858-be37b32f17a9?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "shortDescription": "Tips for creating and maintaining strong, healthy relationships in personal and professional life.",
    "category": "Relationships",
    "emotionalTone": "Inspirational",
    "creator": {
      "name": "Michael Brown",
      "photo": "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    "accessLevel": "Public",
    "createdDate": "2023-09-22",
    "detailsLink": "/life-lesson/3"
  },
  {
    "id": 4,
    "title": "Achieving Career Success",
    "img":"https://images.unsplash.com/photo-1655337690727-5224680c8c07?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "shortDescription": "Steps to take for success in your career, from goal-setting to networking.",
    "category": "Career",
    "emotionalTone": "Motivational",
    "creator": {
      "name": "Emily White",
      "photo": "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    "accessLevel": "Public",
    "createdDate": "2023-08-30",
    "detailsLink": "/life-lesson/4"
  },
  {
    "id": 5,
    "title": "Self-Love and Acceptance",
   "img":"https://images.unsplash.com/photo-1655337690727-5224680c8c07?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "shortDescription": "Learn how to accept yourself, love who you are, and stop seeking validation from others.",
    "category": "Self-Improvement",
    "emotionalTone": "Healing",
    "creator": {
      "name": "Sarah Green",
     "photo": "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    "accessLevel": "Public",
    "createdDate": "2023-07-19",
    "detailsLink": "/life-lesson/5"
  },
  {
    "id": 6,
    "title": "Mastering Time Management",
  "img":"https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "shortDescription": "Techniques to manage your time effectively and increase productivity.",
    "category": "Productivity",
    "emotionalTone": "Practical",
    "creator": {
      "name": "David Lee",
     "photo": "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    "accessLevel": "Public",
    "createdDate": "2023-06-12",
    "detailsLink": "/life-lesson/6"
  },
  {
    "id": 7,
    "title": "Dealing with Stress and Anxiety",
    "img":"https://images.unsplash.com/photo-1625674967351-655dfa7362c7?q=80&w=1334&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "shortDescription": "Practical advice and techniques to cope with stress and reduce anxiety.",
    "category": "Mental Health",
    "emotionalTone": "Calming",
    "creator": {
      "name": "Anna Kim",
     "photo": "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    "accessLevel": "Public",
    "createdDate": "2023-05-05",
    "detailsLink": "/life-lesson/7"
  },
  {
    "id": 8,
    "title": "Finding Inner Peace",
    "img":"https://media.istockphoto.com/id/1409722748/photo/students-raising-hands-while-teacher-asking-them-questions-in-classroom.jpg?s=612x612&w=0&k=20&c=NbVChOV9wIbQOhUD6BqpouZHHBbyQ2rkSjaVfIhpMv8=",
    "shortDescription": "Learn how to achieve inner peace and balance through meditation and mindfulness.",
    "category": "Spirituality",
    "emotionalTone": "Peaceful",
    "creator": {
      "name": "Peter Black",
     "photo": "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    "accessLevel": "Public",
    "createdDate": "2023-04-18",
    "detailsLink": "/life-lesson/8"
  }
  ];

  const [cards, setCards] = useState(initialCards);
  const [filteredCards, setFilteredCards] = useState(initialCards);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [toneFilter, setToneFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");

  // Fetch lessons from server (optional)
  useEffect(() => {
    const fetchNewLessons = async () => {
      try {
        const response = await axios.get("http://localhost:5000/add-lesson");
        const newLessons = response.data;
        setCards(prev => {
          const prevIds = prev.map(card => card.id);
          const uniqueNew = newLessons.filter(lesson => !prevIds.includes(lesson.id));
          return [...prev, ...uniqueNew];
        });
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };
    fetchNewLessons();
  }, []);

  // Filter + Search + Sort
  useEffect(() => {
    let temp = [...cards];

    // Filter
    if (categoryFilter) {
      temp = temp.filter(card => card.category === categoryFilter);
    }
    if (toneFilter) {
      temp = temp.filter(card => card.emotionalTone === toneFilter);
    }

    // Search
    if (searchQuery) {
      temp = temp.filter(card =>
        card.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    if (sortOption === "newest") {
      temp.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
    }
    // For "mostSaved", assuming a "savedCount" property exists
    if (sortOption === "mostSaved") {
      temp.sort((a, b) => (b.savedCount || 0) - (a.savedCount || 0));
    }

    setFilteredCards(temp);
  }, [cards, categoryFilter, toneFilter, searchQuery, sortOption]);

  // Get unique categories and tones for filter dropdown
  const categories = [...new Set(cards.map(card => card.category))];
  const tones = [...new Set(cards.map(card => card.emotionalTone))];

  return (
    <div className="p-6">
      {/* Filters & Search */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="border rounded px-3 py-2 flex-1"
        />

        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={toneFilter}
          onChange={e => setToneFilter(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">All Tones</option>
          {tones.map(tone => (
            <option key={tone} value={tone}>{tone}</option>
          ))}
        </select>

        <select
          value={sortOption}
          onChange={e => setSortOption(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="newest">Newest</option>
          <option value="mostSaved">Most Saved</option>
        </select>
      </div>

      {/* Lesson Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredCards.map(card => (
          <LessonCard key={card.id} data={card} />
        ))}
      </div>
    </div>
  );
};

const LessonCard = ({ data }) => (
  <div className="group card bg-white shadow-lg border border-emerald-100
                  hover:shadow-2xl hover:border-emerald-400
                  transition-all duration-300 hover:-translate-y-1">
    <div className="card-body">
      <span className="badge badge-primary font-bold badge-outline text-xs w-fit">
        Free Access
      </span>

      <h2 className="text-2xl font-bold text-gray-800 mt-2">{data.title}</h2>

      <img className="w-full rounded-2xl mt-2" src={data.img} alt={data.title} />
      <p className="text-sm text-gray-600 mt-3">{data.shortDescription}</p>

      <div className="mt-6">
        <Link to={`/public-lesson/${data.id}`}>
          <button className="btn w-full font-semibold btn-primary hover:text-white">
            View Lesson
          </button>
        </Link>
      </div>
    </div>
  </div>
);

export default PublicLesson;
