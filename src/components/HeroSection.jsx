import React from "react";
import { motion } from "framer-motion";
import heroImg from "../assets/Emirates-airpline-in-flight.webp";

const brands = [
  { name: "Google", logo: "/logos/google.webp" },
  { name: "ChatGPT", logo: "/logos/chat-gpt.webp" },
  { name: "Gemini", logo: "/logos/gemini.webp" },
  { name: "Pinterest", logo: "/logos/pinterest.webp" },
  { name: "Reddit", logo: "/logos/reddit.webp" },
  { name: "Amazon", logo: "/logos/amazon.webp" },
  { name: "Giphy", logo: "/logos/giphy.webp" },
];

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden rounded-3xl">
      {/* Background Image with Blur Effect */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Hero Background"
          className="w-full h-full object-cover scale-110 blur-[8px] brightness-[0.7]"
        />
        <div className="absolute inset-0 bg-gray/5"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Top Badges/Awards*/}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center mb-12"
        >
          {/* Main Heading Text */}
          <h2 className="text-white text-sm md:text-md font-medium tracking-tighter uppercase leading-none mb-3 text-center">
            #1 Most Recommended <br /> Content Marketing Agency
          </h2>

          {/* Awards Section */}
          <div className="flex items-center justify-center">
            {/* Left Wreath Image/Icon */}
            <img
              src="https://www.clker.com/cliparts/k/a/5/G/L/d/half-right-laurel.svg"
              alt="wreath"
              className="h-8 md:h-13 opacity-50 brightness-0 invert"
              style={{ transform: "rotateY(180deg)" }}
            />

            {/* Awards Icons Container */}
            <div className="flex items-center gap-2 md:gap-3 brightness-200 contrast-125 opacity-80">
              <img
                src="/src/assets/marquee/global-search-awards.webp"
                alt="Global Search Awards"
                className="h-6 md:h-8 object-contain"
              />
              <img
                src="/src/assets/marquee/global-search-awards.webp"
                alt="The Drum"
                className="h-6 md:h-8 object-contain"
              />
              <img
                src="/src/assets/marquee/global-search-awards.webp"
                alt="UK Social Media Awards"
                className="h-6 md:h-8 object-contain"
              />
              <img
                src="/src/assets/marquee/global-search-awards.webp"
                alt="Content Awards"
                className="h-6 md:h-8 object-contain"
              />
            </div>

            {/* Right Wreath Image/Icon */}
            <img
              src="https://www.clker.com/cliparts/k/a/5/G/L/d/half-right-laurel.svg"
              alt="wreath"
              className="h-8 md:h-13 opacity-50 brightness-0 invert"
              style={{ cursor: "pointer" }}
            />
          </div>
        </motion.div>

        {/* Main Heading with Integrated Image */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-[120px] font-bold text-white tracking-tighter leading-[0.95] flex flex-wrap items-center justify-center gap-x-4"
        >
          We Create
          <span className="flex items-center gap-2">
            Category
            <div className="w-16 h-16 md:w-30 md:h-30 rounded-2xl overflow-hidden border-2 border-white/20 inline-block rotate-[-2deg] shadow-2xl mx-2">
              <img
                src={heroImg}
                alt="Inline"
                className="w-full h-full object-cover scale-150"
              />
            </div>
          </span>
          Leaders
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-xl md:text-2xl text-white/90 font-medium tracking-tight"
        >
          on every searchable platform
        </motion.p>

        {/* Brand/Platform Logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-80"
        >
          {brands.map((brand) => (
            <img
              key={brand.name}
              src={brand.logo}
              alt={brand.name}
              className="h-6 md:h-5 w-auto object-contain cursor-pointer hover:opacity-100 transition-opacity brightness-0 invert"
            />
          ))}
        </motion.div>
      </div>

      {/* Footer Info within Hero */}
      <div className="absolute bottom-10 w-full px-10 flex justify-between items-end">
        <div className="max-w-[500px]">
          <p className="font-medium leading-normal text-pretty mb-5 | lg:text-base text-white mb-0!">
            Organic media planners creating, distributing & optimising content
            for SEO, Social, PR & Paid Search.
          </p>
        </div>
        <div className="text-right max-w-[300px]">
          <p className="font-medium text-white uppercase font-bold tracking-widest">
            4 Global Offices serving UK, USA (New York) & EU
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
