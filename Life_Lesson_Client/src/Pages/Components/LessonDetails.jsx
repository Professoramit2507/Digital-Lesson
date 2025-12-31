import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useLoaderData } from 'react-router';
import { FacebookShareButton } from 'react-share';
import { toast } from 'react-toastify';

const LessonDetails = () => {
    const data = useLoaderData()
    console.log(data)
      const lesson = useLoaderData(); // loader returns single lesson object
  const [likes, setLikes] = useState(lesson?.likesCount || 0);
  const [liked, setLiked] = useState(false);
  const [favorites, setFavorites] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const [similarLessons, setSimilarLessons] = useState([]);

  useEffect(() => {
    // Load similar lessons from JSON
    fetch("/publicLessons.json")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data
          .filter(
            (item) =>
              item.id !== lesson.id &&
              (item.category === lesson.category ||
                item.emotionalTone === lesson.emotionalTone)
          )
          .slice(0, 6);
        setSimilarLessons(filtered);
      });
  }, [lesson]);

  if (!lesson)
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold text-red-500">Lesson not found</h2>
        <Link to="/public-lesson" className="btn mt-6">
          Go Back
        </Link>
      </div>
    );

  // Handlers
  const handleLike = () => {
    const loggedIn = true; // replace with auth check
    if (!loggedIn) return toast.error("Please log in to like");
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const handleFavorite = () => setFavorites(!favorites);

  const handleReport = () => {
    const reason = prompt(
      "Report Reason:\n1. Inappropriate Content\n2. Hate Speech or Harassment\n3. Misleading or False Information\n4. Spam or Promotional Content\n5. Sensitive or Disturbing Content\n6. Other"
    );
    if (reason) alert(`Reported for reason: ${reason}`);
    // Here you can add DB insert logic for lessonsReports
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      ...comments,
      { user: "You", text: newComment, timestamp: new Date().toLocaleString() },
    ]);
    setNewComment("");
  };
    return (
      <div className="max-w-5xl mx-auto p-6">
      {/* 1. Lesson Information */}
      <div className="mb-8">
        <img src={lesson.img} alt={lesson.title} className="rounded-xl w-full mb-4" />
        <h1 className="text-4xl font-bold mb-2">{lesson.title}</h1>
        <p className="text-gray-700 mb-2">{lesson.shortDescription}</p>
        <div className="flex gap-4 text-sm text-gray-500">
          <span>Category: {lesson.category}</span>
          <span>Emotion: {lesson.emotionalTone}</span>
        </div>
      </div>

      {/* 2. Lesson Metadata */}
      <div className="bg-gray-100 p-4 rounded-lg mb-8 flex gap-4 text-sm">
        <span>Created: {lesson.createdDate}</span>
        <span>Last Updated: {lesson.updatedDate || lesson.createdDate}</span>
        <span>Visibility: Public</span>
        <span>
          Estimated Reading Time: {Math.ceil((lesson.shortDescription?.length || 500) / 200)} mins
        </span>
      </div>

      {/* 3. Author / Creator */}
      <div className="flex items-center gap-4 bg-gradient-to-r from-emerald-50 to-sky-50 p-4 rounded-lg mb-8">
        <img
          src={lesson.creator.photo}
          alt={lesson.creator.name}
          className="w-12 h-12 rounded-full border-2 border-white"
        />
        <div>
          <p className="font-semibold">{lesson.creator.name}</p>
          <p className="text-sm text-gray-500">Total Lessons: {lesson.creator.totalLessons || 0}</p>
          <Link
            to={`/author/${lesson.creator.name}`}
            className="text-sm text-blue-500 hover:underline"
          >
            View all lessons by this author
          </Link>
        </div>
      </div>

      {/* 4. Stats & Engagement */}
      <div className="flex gap-6 items-center mb-8 text-gray-600 text-sm">
        <span>❤️ {likes} Likes</span>
        <span>🔖 {favorites ? 1 : 0} Favorites</span>
        <span>👀 {Math.floor(Math.random() * 10000)} Views</span>
      </div>

      {/* 5. Interaction Buttons */}
      <div className="flex gap-4 mb-8">
        <button onClick={handleLike} className="btn btn-primary">
          {liked ? "❤️ Liked" : "❤️ Like"}
        </button>
        <button onClick={handleFavorite} className="btn btn-outline">
          🔖 {favorites ? "Saved" : "Save to Favorites"}
        </button>
        <button onClick={handleReport} className="btn btn-outline text-red-500">
          🚩 Report
        </button>
        <FacebookShareButton url={window.location.href}>
          <button className="btn btn-outline">Share</button>
        </FacebookShareButton>
      </div>

      {/* 6. Comment Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <form onSubmit={handleCommentSubmit} className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Write a comment..."
            className="flex-1 p-2 border rounded"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Post
          </button>
        </form>
        <div className="flex flex-col gap-2">
          {comments.map((c, idx) => (
            <div key={idx} className="p-2 border rounded">
              <p className="text-sm font-semibold">{c.user}</p>
              <p>{c.text}</p>
              <span className="text-xs text-gray-400">{c.timestamp}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Similar Lessons */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Similar Lessons</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {similarLessons.map((l) => (
            <Link key={l.id} to={`/public-lesson/${l.id}`} className="card p-4 border rounded hover:shadow-lg">
              <img src={l.img} alt={l.title} className="rounded mb-2" />
              <h3 className="font-semibold">{l.title}</h3>
              <p className="text-sm text-gray-500">{l.shortDescription}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
    );
};

export default LessonDetails;