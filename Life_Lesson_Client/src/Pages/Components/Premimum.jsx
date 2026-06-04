import React, { useState } from "react";
import { Link } from "react-router";
import useAxios from "../../hooks/useAxios";
import { Lock, Unlock, Sparkles, BookOpen } from "lucide-react";

const Premium = () => {
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const axios = useAxios();

  const handlePayment = async () => {
    try {
      const res = await axios.post("/create-checkout-session", {
        success_url: `${window.location.origin}/premium?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${window.location.origin}/premium`,
      });

      // Stripe checkout redirect
      window.location.href = res.data.url;
      setIsPremiumUser(true);
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed. Please try again.");
    }
  };

  const initialCards = [
    {
      "id": 101,
      "title": "Finding Inner Peace – Mastery Edition",
      "shortDescription": "A deep, guided journey into lasting inner peace and emotional balance.",
      "longDescription": "This premium lesson explores advanced meditation, mindfulness rituals, breathwork techniques, and emotional grounding practices designed to cultivate deep inner peace and resilience in daily life.",
      "category": "Spirituality",
      "emotionalTone": "Deeply Peaceful",
      "creator": {
        "name": "Peter Black",
        "photo": "https://example.com/images/peter-black.jpg",
        "credentials": "Certified Mindfulness Coach & Meditation Teacher"
      },
      "accessLevel": "Premium",
      "price": 19.99,
      "duration": "2h 30m",
      "premiumFeatures": [
        "Guided audio meditations",
        "Downloadable mindfulness workbook",
        "Daily peace rituals",
        "Lifetime access"
      ],
      "createdDate": "2023-04-18",
      "detailsLink": "/premium-life-lesson/101"
    },
    {
      "id": 102,
      "title": "Emotional Healing Blueprint",
      "shortDescription": "Heal emotional wounds and restore inner harmony.",
      "longDescription": "A transformational program focusing on emotional release, forgiveness practices, and self-compassion exercises.",
      "category": "Emotional Wellness",
      "emotionalTone": "Healing",
      "creator": {
        "name": "Sarah Collins",
        "photo": "https://example.com/images/sarah-collins.jpg",
        "credentials": "Emotional Wellness Therapist"
      },
      "accessLevel": "Premium",
      "price": 24.99,
      "duration": "3h",
      "premiumFeatures": [
        "Emotional release exercises",
        "Guided journaling prompts",
        "Therapeutic audio sessions"
      ],
      "createdDate": "2023-05-10",
      "detailsLink": "/premium-life-lesson/102"
    },
    {
      "id": 103,
      "title": "Mindfulness for High Performers",
      "shortDescription": "Achieve peak focus without burnout.",
      "longDescription": "Learn how to integrate mindfulness into high-pressure environments while maintaining clarity and balance.",
      "category": "Mindfulness",
      "emotionalTone": "Focused",
      "creator": {
        "name": "Daniel Wright",
        "photo": "https://example.com/images/daniel-wright.jpg",
        "credentials": "Performance Coach"
      },
      "accessLevel": "Premium",
      "price": 29.99,
      "duration": "2h",
      "premiumFeatures": [
        "Focus training sessions",
        "Stress management tools",
        "Performance tracking sheets"
      ],
      "createdDate": "2023-06-02",
      "detailsLink": "/premium-life-lesson/103"
    },
    {
      "id": 104,
      "title": "Self-Love & Confidence Masterclass",
      "shortDescription": "Build unshakable confidence from within.",
      "longDescription": "A premium masterclass focused on self-worth, confidence building, and eliminating self-doubt.",
      "category": "Personal Growth",
      "emotionalTone": "Empowering",
      "creator": {
        "name": "Emily Stone",
        "photo": "https://example.com/images/emily-stone.jpg",
        "credentials": "Self-Development Coach"
      },
      "accessLevel": "Premium",
      "price": 21.99,
      "duration": "2h 15m",
      "premiumFeatures": [
        "Confidence exercises",
        "Affirmation audios",
        "Self-reflection tools"
      ],
      "createdDate": "2023-06-20",
      "detailsLink": "/premium-life-lesson/104"
    },
    {
      "id": 105,
      "title": "Spiritual Awakening Path",
      "shortDescription": "Awaken your higher consciousness.",
      "longDescription": "Explore spiritual awareness, intuition development, and higher consciousness practices.",
      "category": "Spirituality",
      "emotionalTone": "Awakening",
      "creator": {
        "name": "Liam Harper",
        "photo": "https://example.com/images/liam-harper.jpg",
        "credentials": "Spiritual Guide"
      },
      "accessLevel": "Premium",
      "price": 34.99,
      "duration": "4h",
      "premiumFeatures": [
        "Guided awakening meditations",
        "Energy alignment practices",
        "Spiritual journaling"
      ],
      "createdDate": "2023-07-05",
      "detailsLink": "/premium-life-lesson/105"
    },
    {
      "id": 106,
      "title": "Overcoming Anxiety Naturally",
      "shortDescription": "Practical tools to calm the anxious mind.",
      "longDescription": "A step-by-step system to manage anxiety through mindfulness, breathing, and lifestyle changes.",
      "category": "Mental Health",
      "emotionalTone": "Calming",
      "creator": {
        "name": "Dr. Rachel Moore",
        "photo": "https://example.com/images/rachel-moore.jpg",
        "credentials": "Clinical Psychologist"
      },
      "accessLevel": "Premium",
      "price": 27.99,
      "duration": "3h 30m",
      "premiumFeatures": [
        "Anxiety relief techniques",
        "Breathing guides",
        "Progress tracking tools"
      ],
      "createdDate": "2023-07-22",
      "detailsLink": "/premium-life-lesson/106"
    },
    {
      "id": 107,
      "title": "The Art of Letting Go",
      "shortDescription": "Release emotional baggage and move forward.",
      "longDescription": "Learn how to release past pain, attachments, and limiting beliefs.",
      "category": "Emotional Wellness",
      "emotionalTone": "Liberating",
      "creator": {
        "name": "Anna Reed",
        "photo": "https://example.com/images/anna-reed.jpg",
        "credentials": "Life Coach"
      },
      "accessLevel": "Premium",
      "price": 18.99,
      "duration": "2h",
      "premiumFeatures": [
        "Letting-go rituals",
        "Guided reflection audios",
        "Emotional detox exercises"
      ],
      "createdDate": "2023-08-01",
      "detailsLink": "/premium-life-lesson/107"
    },
    {
      "id": 108,
      "title": "Morning Rituals for Inner Balance",
      "shortDescription": "Start each day grounded and focused.",
      "longDescription": "Design powerful morning rituals to set the tone for peace and productivity.",
      "category": "Lifestyle",
      "emotionalTone": "Balanced",
      "creator": {
        "name": "Michael Grant",
        "photo": "https://example.com/images/michael-grant.jpg",
        "credentials": "Wellness Strategist"
      },
      "accessLevel": "Premium",
      "price": 16.99,
      "duration": "1h 45m",
      "premiumFeatures": [
        "Customizable rituals",
        "Morning meditation audios",
        "Habit-building planner"
      ],
      "createdDate": "2023-08-18",
      "detailsLink": "/premium-life-lesson/108"
    },
    {
      "id": 109,
      "title": "Deep Relaxation & Stress Reset",
      "shortDescription": "Reset your nervous system.",
      "longDescription": "A deeply restorative experience using body scans, breathwork, and guided relaxation.",
      "category": "Stress Management",
      "emotionalTone": "Relaxing",
      "creator": {
        "name": "Sophia Lane",
        "photo": "https://example.com/images/sophia-lane.jpg",
        "credentials": "Relaxation Therapist"
      },
      "accessLevel": "Premium",
      "price": 22.99,
      "duration": "2h 45m",
      "premiumFeatures": [
        "Deep relaxation audios",
        "Stress reset routines",
        "Sleep enhancement guides"
      ],
      "createdDate": "2023-09-01",
      "detailsLink": "/premium-life-lesson/109"
    },
    {
      "id": 110,
      "title": "Building Mental Resilience",
      "shortDescription": "Stay strong through life’s challenges.",
      "longDescription": "Learn psychological tools to develop resilience, adaptability, and inner strength.",
      "category": "Mental Strength",
      "emotionalTone": "Motivational",
      "creator": {
        "name": "James Walker",
        "photo": "https://example.com/images/james-walker.jpg",
        "credentials": "Resilience Coach"
      },
      "accessLevel": "Premium",
      "price": 26.99,
      "duration": "3h",
      "premiumFeatures": [
        "Resilience training",
        "Mindset exercises",
        "Real-life case studies"
      ],
      "createdDate": "2023-09-20",
      "detailsLink": "/premium-life-lesson/110"
    },
    {
      "id": 111,
      "title": "Conscious Living Essentials",
      "shortDescription": "Live with awareness and intention.",
      "longDescription": "A holistic guide to mindful living, conscious choices, and intentional habits.",
      "category": "Mindful Living",
      "emotionalTone": "Awareness",
      "creator": {
        "name": "Olivia Brooks",
        "photo": "https://example.com/images/olivia-brooks.jpg",
        "credentials": "Conscious Living Mentor"
      },
      "accessLevel": "Premium",
      "price": 23.99,
      "duration": "2h 30m",
      "premiumFeatures": [
        "Lifestyle audits",
        "Mindful habit trackers",
        "Conscious living guides"
      ],
      "createdDate": "2023-10-05",
      "detailsLink": "/premium-life-lesson/111"
    },
    {
      "id": 112,
      "title": "Meditation Mastery Program",
      "shortDescription": "From beginner to advanced meditation.",
      "longDescription": "A complete meditation system covering techniques, posture, breath control, and deep states of awareness.",
      "category": "Meditation",
      "emotionalTone": "Serene",
      "creator": {
        "name": "Peter Black",
        "photo": "https://example.com/images/peter-black.jpg",
        "credentials": "Certified Meditation Teacher"
      },
      "accessLevel": "Premium",
      "price": 39.99,
      "duration": "5h",
      "premiumFeatures": [
        "Beginner to advanced lessons",
        "Guided and silent meditations",
        "Progress milestones"
      ],
      "createdDate": "2023-10-22",
      "detailsLink": "/premium-life-lesson/112"
    }
  ];

  return (
    <div className="min-h-screen px-4 sm:px-6 py-16 bg-black font-sans text-zinc-300 selection:bg-teal-950 selection:text-teal-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title */}
        <h2 className="text-4xl sm:text-5xl text-center font-serif font-black mb-4 text-white tracking-tight flex items-center justify-center gap-3">
          <Sparkles className="w-8 h-8 text-amber-400" /> Premium Lessons
        </h2>
        <p className="text-zinc-500 text-center max-w-md mx-auto text-sm font-medium mb-12">
          Unlock exclusive content engineered by professional coaches to optimize your mental blueprint.
        </p>

        {/* Dynamic CTA / Upgrade Banner */}
        <div className="text-center mb-16 bg-zinc-950 border border-zinc-900 rounded-[32px] p-8 max-w-2xl mx-auto shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl" />
          <h3 className="text-xl font-bold text-white mb-2">
            {isPremiumUser ? "Welcome to Premium Access" : "Get Unlimited Lifetime Access"}
          </h3>
          <p className="text-zinc-400 text-xs font-semibold mb-6 max-w-sm mx-auto">
            {isPremiumUser 
              ? "All exclusive guides, masterclasses, and audio tools are now completely fully unlocked." 
              : "Pay once, own forever. Unlock all 12 masterclasses including guides and printable resources."}
          </p>
          
          {!isPremiumUser && (
            <button
              onClick={handlePayment}
              className="px-10 py-4 text-sm font-black uppercase tracking-wider rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white transition-all transform hover:scale-[1.02] shadow-lg shadow-orange-950/20 active:scale-98"
            >
              Upgrade to Premium
            </button>
          )}
        </div>

        {/* Grid System for Premium Lesson Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {initialCards.map((data) => (
            <div
              key={data.id}
              className="group relative bg-zinc-950 rounded-[30px] border border-zinc-900 shadow-2xl transition-all duration-500 flex flex-col justify-between overflow-hidden h-full hover:border-zinc-800"
            >
              
              {/* Header Segment inside Card */}
              <div>
                <div className="h-32 bg-gradient-to-b from-zinc-900 to-zinc-950 border-b border-zinc-900 p-6 flex flex-col justify-end relative">
                  <span className="absolute top-5 left-6 bg-zinc-950 text-teal-400 px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest border border-zinc-900">
                    {data.category}
                  </span>
                  {/* Absolute Badge showing Lock status */}
                  <div className="absolute top-5 right-6 text-zinc-600">
                    {isPremiumUser ? <Unlock className="w-4 h-4 text-teal-400" /> : <Lock className="w-4 h-4 text-amber-500/80" />}
                  </div>
                  <h3 className="font-serif font-black text-lg text-white line-clamp-1 group-hover:text-teal-400 transition-colors mt-2">
                    {data.title}
                  </h3>
                </div>

                {/* Info Metadata Details List */}
                <div className="p-6 space-y-4">
                  <p className="text-zinc-400 text-xs leading-relaxed font-semibold min-h-[40px] line-clamp-2">
                    {data.shortDescription}
                  </p>

                  <div className="space-y-2 text-xs font-bold border-t border-b border-zinc-900/60 py-4">
                    <div className="flex justify-between items-center text-zinc-500">
                      <span>Emotional Tone</span>
                      <span className="text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded-md text-[11px] font-semibold">{data.emotionalTone}</span>
                    </div>
                    <div className="flex justify-between items-center text-zinc-500">
                      <span>Duration</span>
                      <span className="text-zinc-400 font-semibold">{data.duration}</span>
                    </div>
                    <div className="flex justify-between items-center text-zinc-500">
                      <span>Published</span>
                      <span className="text-zinc-500 font-semibold">{data.createdDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Access CTA Area */}
              <div className="p-6 pt-0 mt-auto">
                {isPremiumUser ? (
                  <Link to={data.detailsLink} className="block w-full">
                    <button className="w-full py-3 bg-zinc-900 text-teal-400 border border-zinc-800 hover:bg-zinc-800 text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2">
                      <BookOpen className="w-3.5 h-3.5" /> Open Lesson
                    </button>
                  </Link>
                ) : (
                  <button
                    onClick={handlePayment}
                    className="w-full py-3 bg-zinc-900/40 text-zinc-600 border border-zinc-900/80 hover:border-amber-500/20 hover:text-amber-400 hover:bg-amber-950/5 text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 group-hover:bg-zinc-900"
                  >
                    <Lock className="w-3.5 h-3.5" /> Unlock with Premium
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Premium;