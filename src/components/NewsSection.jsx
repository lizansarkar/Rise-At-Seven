import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

// নিউজ ডেটা
const newsData = [
  {
    id: 1,
    tag: "News",
    image: "https://burst.shopifycdn.com/photos/business-women-working.jpg?width=1000&format=pjpg&exif=0&iptc=0",
    author: "Carrie Rose",
    time: "2 mins",
    title: "Ryan McNamara Is Now Rise at Seven's Global Operations Director",
  },
  {
    id: 2,
    tag: "Food/Hospitality/Drink",
    image: "https://img.magnific.com/free-photo/aerial-view-business-team_53876-124515.jpg?semt=ais_hybrid&w=740&q=80",
    author: "Ray Saddiq",
    time: "2 mins",
    title: "Rise at Seven Appointed by Coneys to Drive Demand and Retail Growth",
  },
  {
    id: 3,
    tag: "Food/Hospitality/Drink",
    image: "https://img.magnific.com/free-photo/group-asia-young-creative-people-smart-casual-wear-smiling-arms-crossed-creative-office-workplace-diverse-asian-male-female-stand-together-startup-coworker-teamwork-concept_7861-2570.jpg?semt=ais_hybrid&w=740&q=80",
    author: "Carrie Rose",
    time: "2 mins",
    title: "Rise at Seven Appointed by Langtins to drive demand and retail growth for Noomz",
  },
];

const NewsSection = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      className="bg-[#efeeec] py-20 px-6 md:px-12 w-full overflow-hidden select-none"
      onMouseMove={handleMouseMove}
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-black/10 pb-10 mb-16 gap-6">
        <h2 className="text-7xl md:text-9xl font-bold tracking-tighter flex items-center gap-4 leading-none">
          What's
          <span className="inline-block w-20 h-20 md:w-28 md:h-28 rounded-[2rem] overflow-hidden shadow-2xl mt-2 rotate-[-5deg]">
            <img
              src={newsData[1].image}
              className="w-full h-full object-cover scale-110"
              alt="icon"
            />
          </span>
          New
        </h2>
        <button className="btn-sweep !text-black !px-6 !py-2.5 !text-sm !font-bold active:scale-95">
          <div className="sweep-text">
            <span className="flex items-center gap-2">
              Explore More Thought
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[10px]" />
            </span>
            <span className="flex items-center gap-2">
              Explore More Thought
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[10px]" />
            </span>
          </div>
        </button>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        {newsData.map((item) => (
          <div
            key={item.id}
            className="group relative cursor-none"
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Image Container with Custom Hover Effect */}
            <div className="relative aspect-[4/4.2] rounded-[1.5rem] overflow-hidden mb-8 bg-accent">
              <motion.img
                src={item.image}
                alt={item.title}
                animate={{
                  scale: hoveredId === item.id ? 1.08 : 1,
                }}
                transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                className="w-full h-full object-cover"
              />

              {/* Rising Blur Overlay (TopBar Effect) */}
              <motion.div
                initial={{ y: "105%", borderRadius: "50% 50% 0% 0%" }}
                animate={{
                  y: hoveredId === item.id ? "0%" : "105%",
                  borderRadius: hoveredId === item.id ? "0% 0% 0% 0%" : "50% 50% 0% 0%",
                }}
                transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
                className="absolute inset-0 z-10 backdrop-blur-md bg-white/5 pointer-events-none"
              />

              {/* Category Tag */}
              <div className="absolute top-8 left-8 z-20">
                <span className="px-5 py-2 bg-white/10 backdrop-blur-xl border border-white/20 text-accent text-[10px] font-bold rounded-full">
                  {item.tag}
                </span>
              </div>

              {/* Custom Hover Cursor */}
              <AnimatePresence>
                {hoveredId === item.id && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    style={{
                      position: "fixed",
                      left: mousePos.x,
                      top: mousePos.y,
                      translateX: "-50%",
                      translateY: "-50%",
                    }}
                    className="z-50 pointer-events-none w-34 h-34 bg-[#b8ffd9] rounded-full flex items-center justify-center shadow-2xl"
                  >
                    <FontAwesomeIcon
                      icon={faArrowUp}
                      className="text-black text-3xl rotate-45"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* News Meta & Content */}
            <div className="space-y-4 px-2">
              <div className="flex items-center gap-4 text-[16px] font-bold text-neutral">
                <div className="flex items-center gap-2.5 bg-accent py-1 px-3 rounded-full">
                  <div className="w-7 h-7 rounded-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-neutral">{item.author}</span>
                </div>
                <div className="flex items-center gap-2.5 bg-accent py-1 px-3 rounded-full">
                  <span className="opacity-40">•</span>
                  <span>{item.time}</span>
                </div>
              </div>
              <h3 className="text-3xl font-medium group-hover:text-neutral transition-colors duration-300 pr-20">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsSection;