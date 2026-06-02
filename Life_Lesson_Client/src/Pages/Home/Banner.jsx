import React, { useState } from "react";
import i1 from "../../assets/imgaes/john-2FPjlAyMQTA-unsplash.jpg";
import i2 from "../../assets/imgaes/kenny-eliason-1-aA2Fadydc-unsplash.jpg";
import i3 from "../../assets/imgaes/marvin-meyer-SYTO3xs06fU-unsplash.jpg";
import i4 from "../../assets/imgaes/vitaly-gariev-KOTQ96r2m6E-unsplash.jpg";
import { Carousel } from "react-responsive-carousel";
import { motion, AnimatePresence } from "framer-motion";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  
  const [currentSlide, setCurrentSlide] = useState(0);

  const slidesData = [
    {
      img: i1,
      title: "Master Digital Life Skills",
      desc: "Unlock your full potential with industry-standard tech lessons and modern strategies.",
      btnText: "Explore Lessons",
    },
    {
      img: i2,
      title: "Premium Mentorship",
      desc: "Get exclusive access to high-quality resources and direct guidance from experts.",
      btnText: "Go Premium",
    },
    {
      img: i3,
      title: "Collaborative Learning",
      desc: "Connect with thousands of learners worldwide and build real-world projects together.",
      btnText: "Join Community",
    },
    {
      img: i4,
      title: "Shape Your Future",
      desc: "Track your progress with our advanced dashboard and step up your career game.",
      btnText: "Get Started",
    },
  ];

  // Framer Motion Variants (অ্যানিমেশন কনফিগ)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <div className="w-full mx-auto mt-2  relative group">
      {/* 🌟 Background Aura Glow */}
      <div className="absolute -inset-1 bg-linear-to-r from-cyan-500 to-blue-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-35 transition duration-700" />

      <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0A0E1A]">
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          interval={6000}
          transitionTime={1000}
          stopOnHover={false}
          emulateTouch={true}
          onChange={(index) => setCurrentSlide(index)}
          renderIndicator={(clickHandler, isSelected, index) => (
            <span
              onClick={clickHandler}
              className={`inline-block mx-1.5 h-2 rounded-full cursor-pointer transition-all duration-500 bottom-6 relative z-30
                                ${isSelected ? "w-10 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]" : "w-2.5 bg-gray-600 hover:bg-gray-400"}`}
              key={index}
            />
          )}
        >
          {slidesData.map((slide, index) => (
            <div
              key={index}
              className="relative h-125 md:h-145 w-full overflow-hidden"
            >
              {/* 🖼️ Main Image with Zoom Animation on Hover */}
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full h-full object-cover transition-transform duration-6000 scale-105 group-hover:scale-100"
              />

              {/* 🌌 Cinematic Gradient Overlays */}
              <div className="absolute inset-0 bg-linear-to-t from-[#060913] via-[#0A0E1A]/50 to-transparent" />
              <div className="absolute inset-0 bg-linear-to-r from-[#060913]/90 via-transparent to-transparent hidden md:block" />

              {/* ✍️ Framer Motion Content Box */}
              <AnimatePresence mode="wait">
                {currentSlide === index && (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="absolute inset-0 flex flex-col justify-end items-start text-left px-8 pb-16 md:px-16 md:pb-24 max-w-2xl z-20"
                  >
                    

                    {/* Animated Heading */}
                    <motion.h1
                      variants={textVariants}
                      className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4 uppercase leading-none"
                    >
                      {slide.title.split(" ").map((word, wIdx) =>
                        wIdx === slide.title.split(" ").length - 1 ? (
                          <span
                            key={wIdx}
                            className="bg-linear-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(34,211,238,0.2)]"
                          >
                            {" "}
                            {word}
                          </span>
                        ) : (
                          ` ${word}`
                        ),
                      )}
                    </motion.h1>

                    {/* Animated Description */}
                    <motion.p
                      variants={textVariants}
                      className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 max-w-lg"
                    >
                      {slide.desc}
                    </motion.p>

                    {/* Interactive Cyber Button */}
                    <motion.div variants={textVariants}>
                      <motion.button
                        whileHover={{
                          scale: 1.05,
                          shadow: "0px 0px 25px rgb(34, 211, 238)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-bold uppercase tracking-widest text-white rounded-xl group/btn bg-linear-to-br from-cyan-500 to-blue-600 transition-shadow duration-300 shadow-[0_4px_20px_rgba(6,182,212,0.15)]"
                      >
                        <span className="relative px-7 py-3.5 transition-all ease-in duration-75 bg-[#0A0E1A] rounded-[10px] group-hover/btn:bg-opacity-0">
                          {slide.btnText}
                        </span>
                      </motion.button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Banner;
