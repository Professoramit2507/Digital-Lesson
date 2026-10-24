import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { Lock, Unlock, Sparkles, BookOpen, Crown, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const initialCardsData = [
  {
    id: 101,
    title: "Finding Inner Peace – Mastery Edition",
    shortDescription:
      "A deep, guided journey into lasting inner peace and emotional balance.",
    longDescription:
      "This premium lesson explores advanced meditation, mindfulness rituals, breathwork techniques, and emotional grounding practices designed to cultivate deep inner peace and resilience in daily life.",
    category: "Spirituality",
    emotionalTone: "Deeply Peaceful",
    creator: {
      name: "Peter Black",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      credentials: "Certified Mindfulness Coach & Meditation Teacher",
    },
    accessLevel: "Premium",
    price: 19.99,
    duration: "2h 30m",
    createdDate: "2024-04-18",
    detailsLink: "/premium-lesson/101",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800",
  },
  {
    id: 102,
    title: "Emotional Healing Blueprint",
    shortDescription: "Heal emotional wounds and restore inner harmony.",
    longDescription:
      "A transformational program focusing on emotional release, forgiveness practices, and self-compassion exercises.",
    category: "Emotional Wellness",
    emotionalTone: "Healing",
    creator: {
      name: "Sarah Collins",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
      credentials: "Emotional Wellness Therapist",
    },
    accessLevel: "Premium",
    price: 24.99,
    duration: "3h",
    createdDate: "2024-05-10",
    detailsLink: "/premium-lesson/102",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=800",
  },
  {
    id: 103,
    title: "Mindfulness for High Performers",
    shortDescription: "Achieve peak focus without burnout.",
    longDescription:
      "Learn how to integrate mindfulness into high-pressure environments while maintaining clarity and balance.",
    category: "Mindfulness",
    emotionalTone: "Focused",
    creator: {
      name: "Daniel Wright",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      credentials: "Performance Coach",
    },
    accessLevel: "Premium",
    price: 29.99,
    duration: "2h",
    createdDate: "2024-06-02",
    detailsLink: "/premium-lesson/103",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=800",
  },
  {
    id: 104,
    title: "Self-Love & Confidence Masterclass",
    shortDescription: "Build unshakable confidence from within.",
    longDescription:
      "A premium masterclass focused on self-worth, confidence building, and eliminating self-doubt.",
    category: "Personal Growth",
    emotionalTone: "Empowering",
    creator: {
      name: "Emily Stone",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
      credentials: "Self-Development Coach",
    },
    accessLevel: "Premium",
    price: 21.99,
    duration: "2h 15m",
    createdDate: "2024-06-20",
    detailsLink: "/premium-lesson/104",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800",
  },
];

const Premium = () => {
  const { user, dbUser } = useAuth();
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [cards, setCards] = useState(initialCardsData);
  const [isProcessing, setIsProcessing] = useState(false);
  const axios = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    const localPremium = localStorage.getItem("premiumUser") === "true";
    const rolePremium = dbUser?.role === "premium" || dbUser?.role === "admin";
    setIsPremiumUser(localPremium || rolePremium);
  }, [dbUser]);

  useEffect(() => {
    const fetchPremiumLessons = async () => {
      try {
        const res = await axios.get("/premium-lessons");
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          const dbCards = res.data.map((item) => ({
            id: item._id,
            _id: item._id,
            title: item.title,
            shortDescription:
              item.description?.slice(0, 110) +
                (item.description?.length > 110 ? "..." : "") ||
              item.shortDescription,
            longDescription: item.description,
            category: item.category || "General Wisdom",
            emotionalTone: item.emotionalTone || item.tone || "Empowering",
            creator: item.creator || {
              name: item.email?.split("@")[0] || "Community Contributor",
              photo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
            },
            accessLevel: item.accessLevel || "Premium",
            duration: item.duration || "Self-paced",
            createdDate: item.createdAt
              ? new Date(item.createdAt).toLocaleDateString()
              : "Recent",
            detailsLink: `/premium-lesson/${item._id}`,
            image:
              item.image ||
              item.img ||
              "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1170",
          }));

          setCards([...dbCards, ...initialCardsData]);
        }
      } catch (err) {
        console.warn("Could not load database premium lessons", err);
      }
    };

    fetchPremiumLessons();
  }, [axios]);

  const handlePayment = async () => {
    if (!user) {
      toast.info("Please sign in to unlock premium membership.");
      navigate("/login", { state: { from: "/premium-lesson" } });
      return;
    }

    setIsProcessing(true);
    try {
      const res = await axios.post("/create-checkout-session", {
        email: user?.email,
        name: user?.displayName || user?.email,
      });

      if (res.data?.url) {
        window.location.href = res.data.url;
      } else {
        toast.error("Checkout session could not be created. Please try again.");
      }
    } catch (err) {
      console.error("Payment Error:", err);
      const errMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Payment connection failed. Please ensure the server is active.";
      toast.error(errMsg);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Title Section */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Exclusive Curriculum
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Premium Life Lessons
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
            Deep-dive masterclasses, audio guides, and mental blueprints crafted by world-class mentors.
          </p>
        </div>

        {/* Dynamic CTA / Upgrade Banner */}
        <div className="mb-14 relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 p-8 sm:p-10 shadow-2xl text-center max-w-3xl mx-auto">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-500/15 rounded-full blur-[100px] pointer-events-none" />

          {isPremiumUser ? (
            <div className="space-y-3">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 mb-2">
                <Crown className="w-7 h-7 fill-amber-400 text-amber-400" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                You Are a Premium Member 🎉
              </h3>
              <p className="text-sm text-zinc-400 max-w-md mx-auto">
                All exclusive courses, audios, and masterclasses are completely unlocked for your account.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20">
                <Crown className="w-3.5 h-3.5 fill-amber-400" /> Lifetime VIP Membership
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Unlock All Premium Masterclasses
              </h3>
              <p className="text-sm text-zinc-400 max-w-md mx-auto">
                Pay once ($15.00) and get permanent lifetime access to all current and future premium lessons.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 py-2 text-xs text-zinc-300 font-semibold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> All Audio Guides
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Printable Blueprints
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Lifetime Access
                </span>
              </div>

              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="px-8 py-3.5 text-xs font-black uppercase tracking-wider rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 mx-auto disabled:opacity-60 cursor-pointer"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      <span>Connecting Stripe Checkout...</span>
                    </>
                  ) : (
                    <>
                      <Crown className="w-4 h-4 fill-black text-black" />
                      <span>Upgrade to Premium ($15.00)</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          )}
        </div>

        {/* Grid of Premium Lesson Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cards.map((data) => (
            <div
              key={data._id || data.id}
              className="group relative bg-zinc-950/80 rounded-2xl border border-zinc-800/80 hover:border-zinc-700 shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Header Segment with Cover Image */}
                <div className="h-36 relative overflow-hidden bg-zinc-900 border-b border-zinc-800/80">
                  <img
                    src={data.image || "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1170"}
                    alt={data.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-85"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1170";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent pointer-events-none" />

                  <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                    <span className="bg-zinc-950/80 backdrop-blur-md text-cyan-400 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-zinc-800">
                      {data.category}
                    </span>
                    <div className="p-1.5 rounded-lg bg-zinc-950/80 backdrop-blur-md border border-zinc-800">
                      {isPremiumUser ? (
                        <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-amber-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Info Metadata Details */}
                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-base text-white line-clamp-1 group-hover:text-amber-400 transition-colors">
                    {data.title}
                  </h3>

                  <p className="text-zinc-400 text-xs leading-relaxed font-normal min-h-9 line-clamp-2">
                    {data.shortDescription}
                  </p>

                  <div className="space-y-1.5 text-xs border-t border-zinc-900 pt-3">
                    <div className="flex justify-between items-center text-zinc-500">
                      <span>Emotional Tone</span>
                      <span className="text-zinc-300 font-medium">
                        {data.emotionalTone}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-zinc-500">
                      <span>Access</span>
                      <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px]">
                        {data.accessLevel}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0 mt-auto">
                {isPremiumUser ? (
                  <Link to={data.detailsLink} className="block w-full">
                    <button className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 text-cyan-400 border border-zinc-800 hover:border-cyan-500/40 text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                      <BookOpen className="w-3.5 h-3.5" /> Open Lesson
                    </button>
                  </Link>
                ) : (
                  <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full py-2.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 hover:border-amber-500/40 text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
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
